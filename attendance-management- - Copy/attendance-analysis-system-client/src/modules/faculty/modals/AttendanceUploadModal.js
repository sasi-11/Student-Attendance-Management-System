import React, { useState, useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateAttendance } from "../../../redux/actions/userAction";

const AttendanceUploadModal = (props) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formValue, setFormValue] = useState({
    id: 0,
    rollNumber: "",
    name: "",
    subjectID: "",
    classesAttended: 0,
  });

  const handleInputChange = (event) => {
    const target = event.target;
    var value = target.value;
    const name = target.name;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleUpdate = (event) => {
    const form = formRef.current;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setShowModal(false);
      dispatch(updateAttendance(formValue))
        .then(() => {
          props.getSubjectDetails(formValue.subjectID);
        })
        .catch((err) => {});
    }
    setValidated(true);
  };

  const setValues = () => {
    let fac = user.facultySubjectDetails.filter((r) => r._id === props.id)[0];
    setFormValue({
      id: props.id,
      rollNumber: fac.studentID.rollNumber,
      name: fac.studentID.name,
      classesAttended: fac.classesAttended,
      subjectID: fac.subjectID,
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
          <Modal.Title>Edit Attendance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} ref={formRef}>
            <Form.Group className="mb-3" controlId="formRollNumber">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Roll Number"
                required
                name="rollNumber"
                value={formValue.rollNumber}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formClasses">
              <Form.Label>Attended Classes</Form.Label>
              <Form.Control
                type="number"
                placeholder="Attended Classes"
                required
                name="classesAttended"
                onChange={handleInputChange}
                value={formValue.classesAttended}
              />
              <Form.Control.Feedback type="invalid">
                Please enter classes attended.
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
          <Button variant="primary" type="submit" onClick={handleUpdate}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col-12 position-relative">
        <div className="float-right">
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
        </div>
      </div>
    </div>
  );
};

export default AttendanceUploadModal;
