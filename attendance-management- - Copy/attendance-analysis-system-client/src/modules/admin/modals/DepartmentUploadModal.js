import React, { useState, useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createDepartment,
  updateDepartment,
} from "../../../redux/actions/userAction";

const DepartmentUploadModal = (props) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formValue, setFormValue] = useState({
    id: 0,
    name: "",
    shortName: "",
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
      dispatch(createDepartment(formValue))
        .then(() => {
          setShowModal(false);
          setFormValue({
            id: "",
            name: "",
            shortName: "",
          });
          props.getDepartments();
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
      dispatch(updateDepartment(formValue))
        .then(() => {
          props.getDepartments();
        })
        .catch((err) => {});
    }
    setValidated(true);
  };

  const setValues = () => {
    let dept = user.departments.filter((r) => r._id === props.id)[0];
    setFormValue({
      id: props.id,
      name: dept.name,
      shortName: dept.shortName,
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
            {props.id === 0 ? "Add Department" : "Edit Department"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} ref={formRef}>
            <Form.Group className="mb-3" controlId="formName">
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
                Please choose a name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formShortName">
              <Form.Label>Short Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Short Name"
                required
                name="shortName"
                onChange={handleInputChange}
                value={formValue.shortName}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a short name.
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
              Add Department
            </Button>
          ) : (
            <Button
              variant="success"
              size="sm"
              style={{ marginRight: "10px" }}
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

export default DepartmentUploadModal;
