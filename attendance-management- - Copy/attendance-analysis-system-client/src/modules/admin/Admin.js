import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Container } from "react-bootstrap";

import {
	deleteDepartment,
	deleteSubject,
	getDepartments,
	getSubjects,
} from "../../redux/actions/userAction";
import DataTable from "react-data-table-component";
import SubjectUploadModal from "./modals/SubjectUploadModal";
import DepartmentUploadModal from "./modals/DepartmentUploadModal";
import Delete from "../../components/deleteRecord";

const Admin = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [isSubjectsLoading, setIsSubjectsLoading] = useState(true);
	const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(true);

	const getSubjectsData = useCallback(async () => {
		setIsSubjectsLoading(true);
		await dispatch(getSubjects())
			.then(() => {
				setIsSubjectsLoading(false);
			})
			.catch((err) => {
				setIsSubjectsLoading(false);
			});
	}, [dispatch]);
	const getDepartmentsData = useCallback(async () => {
		setIsDepartmentsLoading(true);
		await dispatch(getDepartments())
			.then(() => {
				setIsDepartmentsLoading(false);
			})
			.catch((err) => {
				setIsDepartmentsLoading(false);
			});
	}, [dispatch]);

	const deleteDepartmentByID = (id) => {
		dispatch(deleteDepartment(id))
			.then(() => {
				getDepartmentsData();
			})
			.catch((err) => {});
	};

	const deleteSubjectByID = (id) => {
		dispatch(deleteSubject(id))
			.then(() => {
				getSubjectsData();
			})
			.catch((err) => {});
	};

	useEffect(() => {
		getSubjectsData();
		getDepartmentsData();
	}, [getSubjectsData, getDepartmentsData]);

	let subCols = [
		{ selector: (row) => row.name, name: "Name" },
		{ selector: (row) => row.totalClasses, name: "Total Number of Classes" },
		{ selector: (row) => row.actions, name: "Actions" },
	];

	let subRows = user.subjects.map((subject) => {
		return {
			totalClasses: subject.totalClasses,
			name: subject.name,
			actions: (
				<div className="d-flex">
					<SubjectUploadModal id={subject._id} getSubjects={getSubjectsData} />
					<Delete id={subject._id} deleterow={deleteSubjectByID} />
				</div>
			),
		};
	});

	let deptCols = [
		{ selector: (row) => row.name, name: "Name" },
		{ selector: (row) => row.shortName, name: "Short Name" },
		{ selector: (row) => row.actions, name: "Actions" },
	];

	let deptRows = user.departments.map((dept) => {
		return {
			shortName: dept.shortName,
			name: dept.name,
			actions: (
				<div className="d-flex">
					<DepartmentUploadModal
						id={dept._id}
						getDepartments={getDepartmentsData}
					/>
					<Delete id={dept._id} deleterow={deleteDepartmentByID} />
				</div>
			),
		};
	});

	return (
		<div className="bg">
			<Container>
				<div className="row mb-5 mt-5">
					<div className="col-12 pt-3 breadcrumb-bg">
						<Breadcrumb>
							<Breadcrumb.Item active>Home</Breadcrumb.Item>
							<Breadcrumb.Item href="students">Students</Breadcrumb.Item>
							<Breadcrumb.Item href="faculties">Faculty</Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>
				<div className="row mb-5">
					<div className="col-12">
						<SubjectUploadModal id={0} getSubjects={getSubjectsData} />
						<DataTable
							title="Subjects"
							columns={subCols}
							data={subRows}
							striped
							paginationRowsPerPageOptions={[10, 20, 30, 50]}
							paginationTotalRows={subRows.length}
							pagination
							progressPending={isSubjectsLoading}
						/>
					</div>
				</div>
				<div className="row mb-5">
					<div className="col-12">
						<DepartmentUploadModal id={0} getDepartments={getDepartmentsData} />
						<DataTable
							title="Departments"
							columns={deptCols}
							data={deptRows}
							striped
							paginationRowsPerPageOptions={[10, 20, 30, 50]}
							paginationTotalRows={deptRows.length}
							pagination
							progressPending={isDepartmentsLoading}
						/>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Admin;
