import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getStudents,
	getRoles,
	getSubjects,
} from "../../redux/actions/userAction";
import { Container, Breadcrumb, Tabs, Tab } from "react-bootstrap";
import DataTable from "react-data-table-component";
import UploadStudent from "./upload/UploadStudents";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MyStuDocument } from "./pdfs/studentPDF";
import StudentUploadModal from "./modals/StudentUploadModal";
const Students = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);

	const getRolesData = useCallback(async () => {
		await dispatch(getRoles()).catch((err) => {});
	}, [dispatch]);
	const getSubjectsData = useCallback(async () => {
		await dispatch(getSubjects()).catch((err) => {});
	}, [dispatch]);
	const getStudentsData = useCallback(async () => {
		setIsLoading(true);
		await dispatch(getStudents())
			.then(() => {
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
			});
	}, [dispatch]);

	useEffect(() => {
		getRolesData();
		getStudentsData();
		getSubjectsData();
	}, [getRolesData, getStudentsData, getSubjectsData]);

	let pdfColumns = [
		{ name: "Roll Number", id: "rollnumber" },
		{ name: "Name", id: "name" },
		...user.subjects.map((subject) => {
			return {
				name: subject.name,
				id: subject.name,
				children: [
					{
						name: "Total",
					},
					{
						name: "Attended",
					},
				],
			};
		}),
		{
			name: "No of classes",
			id: "classes",
			children: [
				{
					name: "Total",
				},
				{
					name: "Attended",
				},
			],
		},
		{
			name: "Percentage (%)",
			id: "percent",
		},
	];

	let pdfRows = user.students.map((student) => {
		return {
			rollnumber: student.rollNumber,
			name: student.name,
			...Object.fromEntries(
				new Map(
					user.subjects
						.map((subject) => {
							return [
								[
									subject.name.replace(" ", "").toLowerCase(),
									{
										children: [
											user.subjects?.filter((s) => s._id === subject._id)[0]
												?.totalClasses || 0,
											student.attendance.filter(
												(s) => s.subjectID._id === subject._id,
											)[0]?.classesAttended || 0,
										],
									},
								],
							];
						})
						.flat(),
				),
			),
			classes: {
				children: [
					user.subjects
						?.map((r) => r.totalClasses || 0)
						?.reduce((partial_sum, a) => partial_sum + a, 0),
					student.attendance
						?.map((r) => r.classesAttended || 0)
						?.reduce((partial_sum, a) => partial_sum + a, 0),
				],
			},
			percent:
				Math.round(
					(student.attendance
						?.map((r) => r.classesAttended || 0)
						?.reduce((partial_sum, a) => partial_sum + a, 0) /
						user.subjects
							?.map((r) => r.totalClasses || 0)
							?.reduce((partial_sum, a) => partial_sum + a, 0)) *
						100 *
						100,
				) / 100 || 0,
		};
	});

	let columns = [
		{ selector: (row) => row.rollNumber, name: "Roll Number" },
		{ selector: (row) => row.name, name: "Name" },
		...user.subjects.map((subject) => {
			return {
				selector: (row) => row[subject._id],
				name: (
					<div className="row">
						<div className="col-12 mb-1">{subject.name}</div>
						<hr className="mb-1" />
						<div className="col-4">Total</div>
						<div className="col-8">Attended</div>
					</div>
				),
			};
		}),
		{
			selector: (row) => row.classes,
			name: (
				<div className="row">
					<div className="col-12 mb-1">No. of classes</div>
					<hr className="mb-1" />
					<div className="col-4">Total</div>
					<div className="col-8">Attended</div>
				</div>
			),
			width: "100",
		},
		{
			selector: (row) => row.percent,
			name: "Percentage (%)",
			right: true,
		},
	];

	let rows = user.students.map((student) => {
		return {
			rollNumber: student.rollNumber,
			name: <div style={{ whiteSpace: "pre-wrap" }}>{student.name}</div>,
			...Object.fromEntries(
				new Map(
					user.subjects
						.map((subject) => {
							return [
								[
									subject._id,
									<div style={{ width: "9rem" }}>
										<div className="row">
											<div className="col-4">
												{user.subjects?.filter((s) => s._id === subject._id)[0]
													?.totalClasses || 0}
											</div>
											<div className="col-8">
												{student.attendance.filter(
													(s) => s.subjectID._id === subject._id,
												)[0]?.classesAttended || 0}
											</div>
										</div>
									</div>,
								],
							];
						})
						.flat(),
				),
			),
			classes: (
				<div style={{ width: "9rem" }}>
					<div className="row">
						<div className="col-4">
							{user.subjects
								?.map((r) => r.totalClasses || 0)
								?.reduce((partial_sum, a) => partial_sum + a, 0)}
						</div>
						<div className="col-8">
							{student.attendance
								?.map((r) => r.classesAttended || 0)
								?.reduce((partial_sum, a) => partial_sum + a, 0)}
						</div>
					</div>
				</div>
			),
			percent:
				Math.round(
					(student.attendance
						?.map((r) => r.classesAttended || 0)
						?.reduce((partial_sum, a) => partial_sum + a, 0) /
						user.subjects
							?.map((r) => r.totalClasses || 0)
							?.reduce((partial_sum, a) => partial_sum + a, 0)) *
						100 *
						100,
				) / 100 || 0,
			email: student.userID.email,
			phoneNumber: student.userID.phoneNumber,
			actions: (
				<div className="d-flex">
					<StudentUploadModal id={student._id} getStudents={getStudentsData} />
					{/* <Delete id={faculty._id} deleterow={deleteDepartmentByID} /> */}
				</div>
			),
		};
	});

	let detailsColumns = [
		{ selector: (row) => row.rollNumber, name: "Roll Number" },
		{ selector: (row) => row.name, name: "Name" },
		{ selector: (row) => row.email, name: "Email" },
		{ selector: (row) => row.phoneNumber, name: "phoneNumber" },
		{
			selector: (row) => row.actions,
			name: "Actions",
		},
	];

	return (
		<div className="bg">
			<Container>
				<div className="row mb-5 mt-5">
					<div className="col-12 pt-3 breadcrumb-bg">
						<Breadcrumb>
							<Breadcrumb.Item href="admin">Home</Breadcrumb.Item>
							<Breadcrumb.Item active>Students</Breadcrumb.Item>
							<Breadcrumb.Item href="faculties">Faculty</Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>
				<div className="row mb-5">
					<div className="col-12">
						<div className="float-right d-flex">
							<UploadStudent />
						</div>
					</div>
				</div>
				<div className="row mb-5">
					<div className="col-12">
						<Tabs defaultActiveKey="details" id="uncontrolled-tab-example">
							<Tab eventKey="details" title="Details">
								<StudentUploadModal id={0} getStudents={getStudentsData} />
								<DataTable
									title="Students"
									columns={detailsColumns}
									data={rows}
									striped
									paginationRowsPerPageOptions={[10, 20, 30, 50]}
									paginationTotalRows={rows.length}
									pagination
									progressPending={isLoading}
								/>
							</Tab>
							<Tab
								eventKey="attendance"
								title="Attendance"
								className=" position-relative"
							>
								<PDFDownloadLink
									document={<MyStuDocument cols={pdfColumns} rows={pdfRows} />}
									fileName="students.pdf"
									className="btn-position"
									style={{ right: 30 }}
								>
									{({ blob, url, loading, error }) =>
										loading ? (
											"Loading document..."
										) : (
											<i className="fa fa-file-pdf-o fa-lg"></i>
										)
									}
								</PDFDownloadLink>
								<DataTable
									title="Students"
									columns={columns}
									data={rows}
									striped
									paginationRowsPerPageOptions={[10, 20, 30, 50]}
									paginationTotalRows={rows.length}
									pagination
									progressPending={isLoading}
								/>
							</Tab>
						</Tabs>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Students;
