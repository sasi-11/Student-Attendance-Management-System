import React, { useState, useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStudent,
  createStudent,
} from "../../../redux/actions/userAction";

const StudentUploadModal = (props) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    rollnumber: "",
    roleID: "",
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (event) => {
    const target = event.target;
    var value = target.value;
    const name = target.name;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (event) => {
    setShowModal(false);
    const form = formRef.current;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      let role = user.roles.filter((r) => r.name === "Student")[0];
      let student = {
        ...formValue,
        roleID: role._id,
        username: formValue.rollnumber,
      };
      dispatch(createStudent(student))
        .then(() => {
          setShowModal(false);
          setFormValue({
            id: "",
            username: "",
            password: "",
            rollnumber: "",
            name: "",
            email: "",
            phoneNumber: "",
          });
          props.getStudents();
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
      let student = {
        ...formValue,
        username: formValue.rollnumber,
      };
      dispatch(updateStudent(student))
        .then(() => {
          props.getStudents();
        })
        .catch((err) => {});
    }
    setValidated(true);
  };

  const setValues = () => {
    let student = user.students.filter((r) => r._id === props.id)[0];
    setFormValue({
      id: props.id,
      username: student.userID.username,
      password: student.userID.password,
      rollnumber: student.rollNumber,
      name: student.name,
      email: student.userID.email,
      phoneNumber: student.userID.phoneNumber,
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
          <Modal.Title>
            {props.id === 0 ? "Add Student" : "Edit Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} ref={formRef}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Roll Number"
                required
                name="rollnumber"
                onChange={handleInputChange}
                value={formValue.rollnumber}
                disabled={props.id !== 0}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a rollnumber.
              </Form.Control.Feedback>
            </Form.Group>
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
              Add Student
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

export default StudentUploadModal;
