import React, { useState, useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  createFaculty,
  updateFaculty,
} from "../../../redux/actions/userAction";

const FacultyUploadModal = (props) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formValue, setFormValue] = useState({
    username: "",
    id: 0,
    password: "",
    roleID: "",
    name: "",
    subjects: [],
    email: "",
    phoneNumber: "",
    departmentID: "",
  });

  const handleInputChange = (event) => {
    const target = event.target;
    var value = target.value;
    const name = target.name;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (event) => {
    const form = formRef.current;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      let role = user.roles.filter((r) => r.name === "Faculty")[0];
      let faculty = {
        ...formValue,
        roleID: role._id,
        subjects: formValue.subjects.map((r) => r.value),
        phoneNumber: formValue.phoneNumber,
      };
      dispatch(createFaculty(faculty))
        .then(() => {
          setShowModal(false);
          setFormValue({
            id: "",
            username: "",
            name: "",
            subjects: [],
            email: "",
            phoneNumber: "",
            departmentID: "",
          });
          props.getFaculties();
          setValidated(false);
        })
        .catch((err) => {});
    }

    setValidated(true);
  };

  const handleUpdate = (event) => {
    const form = formRef.current;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setShowModal(false);
      let faculty = {
        ...formValue,
        subjects: formValue.subjects.map((r) => r.value),
        phoneNumber: formValue.phoneNumber,
      };
      dispatch(updateFaculty(faculty))
        .then(() => {
          props.getFaculties();
        })
        .catch((err) => {});
    }
    setValidated(true);
  };

  const setValues = () => {
    let faculty = user.faculties.filter((r) => r._id === props.id)[0];
    setFormValue({
      id: props.id,
      username: faculty.userID.username,
      name: faculty.name,
      subjects: faculty.subjects?.map((r) => {
        return { label: r.name, value: r._id };
      }),
      email: faculty.userID.email,
      phoneNumber: faculty.userID.phoneNumber,
      departmentID: faculty.departmentID._id,
    });
  };

  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Faculty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} ref={formRef}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                required
                name="name"
                onChange={handleInputChange}
                value={formValue.name}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name.
              </Form.Control.Feedback>
            </Form.Group>
            {props.id === 0 && (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  required
                  name="username"
                  onChange={handleInputChange}
                  value={formValue.username}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a username.
                </Form.Control.Feedback>
              </Form.Group>
            )}

            {props.id === 0 && (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  onChange={handleInputChange}
                  value={formValue.password}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a password.
                </Form.Control.Feedback>
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                required
                name="email"
                onChange={handleInputChange}
                value={formValue.email}
              />
              <Form.Control.Feedback type="invalid">
                Please enter email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile Number"
                required
                name="phoneNumber"
                onChange={handleInputChange}
                maxLength={10}
                minLength={10}
                value={formValue.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                Please enter mobile number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Select
                aria-label="Select Department"
                placeholder="Select Department"
                name="departmentID"
                onChange={handleInputChange}
                required
                value={formValue.departmentID}
              >
                <option value="">Select Department</option>
                {user.departments?.map((dept, key) => (
                  <option value={dept._id} key={key}>
                    {dept.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please choose a department.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubjects">
              <Form.Label>Subjects</Form.Label>
              <Select
                isMulti
                options={user.subjects.map((r) => {
                  return { label: r.name, value: r._id };
                })}
                onChange={(value) => {
                  setFormValue({ ...formValue, subjects: value });
                }}
                placeholder="Select Subject"
                value={formValue.subjects}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a subject.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={props.id === 0 ? handleSubmit : handleUpdate}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col-12 position-relative">
        <div className="float-right">
          {props.id === 0 ? (
            <Button
              variant="primary"
              size="sm"
              className="btn-position"
              onClick={() => setShowModal(true)}
            >
              Add Faculty
            </Button>
          ) : (
            <Button
              style={{ marginRight: "10px" }}
              variant="success"
              size="sm"
              onClick={() => {
                setShowModal(true);
                setValues();
              }}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyUploadModal;
