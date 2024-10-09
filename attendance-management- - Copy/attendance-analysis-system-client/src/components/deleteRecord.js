/**
 * React Imports
 */
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

/**
 * Delete component with modal and button
 * @param {Object} props
 */
const Delete = (props) => {
	const [showModal, setShowModal] = useState(false);

	const handleModalClose = () => {
		setShowModal(!showModal);
	};

	const handleSubmit = () => {
		props.deleterow(props.id);
		setShowModal(!showModal);
	};

	return (
		<div>
			<Button
				onClick={() => setShowModal(!showModal)}
				variant="danger"
				size="sm"
			>
				Delete
			</Button>
			<Modal
				show={showModal}
				onHide={handleModalClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete Record</Modal.Title>
				</Modal.Header>
				<Modal.Body className="modalBodyText">
					Are you sure to delete this record?
				</Modal.Body>
				<Modal.Footer style={{ textAlign: "center" }}>
					<Button variant="primary" type="submit" onClick={handleSubmit}>
						OK
					</Button>
					<Button variant="secondary" onClick={handleModalClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Delete;
