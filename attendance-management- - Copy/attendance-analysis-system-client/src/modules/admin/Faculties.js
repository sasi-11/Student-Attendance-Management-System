import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getDepartments,
	getFaculties,
	getRoles,
	getSubjects,
} from "../../redux/actions/userAction";
import { Container, Breadcrumb } from "react-bootstrap";
import DataTable from "react-data-table-component";
import FacultyUploadModal from "./modals/FacultyUploadModal";
const Faculties = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);

	const getRolesData = useCallback(async () => {
		await dispatch(getRoles()).catch((err) => {});
	}, [dispatch]);
	const getSubjectsData = useCallback(async () => {
		await dispatch(getSubjects()).catch((err) => {});
	}, [dispatch]);
	const getDepartmentsData = useCallback(async () => {
		await dispatch(getDepartments()).catch((err) => {});
	}, [dispatch]);
	const getFacultiesData = useCallback(async () => {
		setIsLoading(true);
		await dispatch(getFaculties())
			.then(() => {
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
			});
	}, [dispatch]);

	useEffect(() => {
		getRolesData();
		getFacultiesData();
		getSubjectsData();
		getDepartmentsData();
	}, [getRolesData, getFacultiesData, getSubjectsData, getDepartmentsData]);

	const rows = user.faculties.map((faculty) => {
		return {
			username: faculty.userID.username,
			name: faculty.name,
			email: faculty.userID.email,
			phoneNumber: faculty.userID.phoneNumber,
			department: (
				<div style={{ whiteSpace: "pre-wrap" }}>
					{faculty.departmentID.name}
				</div>
			),
			subjects: (
				<div style={{ whiteSpace: "pre-wrap" }}>
					{faculty.subjects?.map((r) => r.name)?.join(", ")}
				</div>
			),
			actions: (
				<div className="d-flex">
					<FacultyUploadModal
						id={faculty._id}
						getFaculties={getFacultiesData}
					/>
					{/* <Delete id={faculty._id} deleterow={deleteDepartmentByID} /> */}
				</div>
			),
		};
	});

	const columns = [
		{ selector: (row) => row.username, name: "Username" },
		{ selector: (row) => row.name, name: "Name" },
		{ selector: (row) => row.email, name: "Email" },
		{ selector: (row) => row.phoneNumber, name: "Mobile Number" },
		{ selector: (row) => row.department, name: "Department" },
		{ selector: (row) => row.subjects, name: "Subjects" },
		{ selector: (row) => row.actions, name: "Actions" },
	];

	return (
		<div className="h100" style={{ backgroundColor: "beige" }}>
			<Container>
				<div className="row mb-5 mt-5">
					<div className="col-12 pt-3 breadcrumb-bg">
						<Breadcrumb>
							<Breadcrumb.Item href="admin">Home</Breadcrumb.Item>
							<Breadcrumb.Item href="students">Students</Breadcrumb.Item>
							<Breadcrumb.Item active>Faculty</Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>
				<FacultyUploadModal id={0} getFaculties={getFacultiesData} />
				<div className="row mb-5">
					<div className="col-12">
						<DataTable
							title="Faculty"
							columns={columns}
							data={rows}
							striped
							paginationRowsPerPageOptions={[10, 20, 30, 50]}
							paginationTotalRows={rows.length}
							pagination
							progressPending={isLoading}
						/>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Faculties;
