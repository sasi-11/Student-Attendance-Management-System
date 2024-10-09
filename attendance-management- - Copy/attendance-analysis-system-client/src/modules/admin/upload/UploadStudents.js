import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { ExcelRenderer } from "react-excel-renderer";

const UploadStudent = () => {
	const [showModal, setShowModal] = useState(false);
	const [tableContent, setTableContent] = useState({ cols: [], rows: [] });
	return (
		<div>
			<Modal
				show={showModal}
				onHide={() => setShowModal(false)}
				backdrop="static"
				keyboard={false}
				size="lg"
			>
				<Modal.Header closeButton>
					<Modal.Title>Add Student</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="formFile" className="mb-3">
						<Form.Label>Select xlsx file</Form.Label>
						<Form.Control
							type="file"
							onChange={(event) => {
								let fileObj = event.target.files[0];

								//just pass the fileObj as parameter
								ExcelRenderer(fileObj, (err, resp) => {
									if (err) {
										console.log(err);
									} else {
										const columns = resp.rows[0]?.splice(
											1,
											resp.rows[0]?.length,
										);
										resp.rows.shift();
										setTableContent({
											cols: columns.map((r) => {
												return {
													name: r,
													selector: (row) => row[r.replace(" ", "")],
												};
											}),
											rows: resp.rows.map((r) => {
												r.shift();
												const rows = [
													r.map((row, ind) => {
														return [columns[ind].replace(" ", ""), row];
													}),
												];
												return Object.fromEntries(new Map(rows.flat()));
											}),
										});
									}
								});
							}}
						/>
					</Form.Group>
					<DataTable
						title="Uploaded Students"
						columns={tableContent.cols}
						data={tableContent.rows}
						striped
						paginationRowsPerPageOptions={[5, 10, 20, 30, 50]}
						paginationTotalRows={tableContent.rows.length}
						pagination
					/>
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
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
			<Button variant="primary" onClick={() => setShowModal(true)} size="sm">
				Upload Multiple Students
			</Button>
		</div>
	);
};

export default UploadStudent;
