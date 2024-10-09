import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
	getStudentByUserID,
	getSubjects,
} from "../../../redux/actions/userAction";

const Student = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	// let subjects = [
	// 	...user.subjects.map(row => {
	// 		return {

	// 		}
	// 	}),
	// 	{
	// 		totalClasses: user.subjects
	// 			?.map((r) => r.totalClasses || 0)
	// 			?.reduce((partial_sum, a) => partial_sum + a, 0),
	// 		attendedClasses: user.studentDetails.attendance
	// 			?.map((r) => r.classesAttended || 0)
	// 			?.reduce((partial_sum, a) => partial_sum + a, 0),
	// 	},
	// ];

	console.log("userDetails", user);

	const [isLoading, setIsLoading] = useState(true);

	const fetchStudentDetails = useCallback(async () => {
		setIsLoading(true);
		await dispatch(getStudentByUserID())
			.then(() => {
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
			});
	}, [dispatch]);
	const getSubjectsData = useCallback(async () => {
		await dispatch(getSubjects()).catch((err) => {});
	}, [dispatch]);
	useEffect(() => {
		getSubjectsData();
		fetchStudentDetails();
	}, [getSubjectsData, fetchStudentDetails]);

	let columns = [
		{ selector: (row) => row.subjectName, name: "Subject Name" },
		{ selector: (row) => row.totalClasses, name: "Total Classes", right: true },
		{
			selector: (row) => row.attendedClasses,
			name: "Attended Classes",
			right: true,
		},
		{ selector: (row) => row.percent, name: "Percentage (%)", right: true },
	];

	let rows = [
		...user.subjects.map((sub) => {
			return {
				subjectName: sub.name,
				totalClasses: sub.totalClasses,
				attendedClasses:
					user.studentDetails?.attendance?.filter(
						(row) => row.subjectID._id === sub._id,
					)[0]?.classesAttended || 0,
				percent:
					Math.round(
						((user.studentDetails?.attendance?.filter(
							(row) => row.subjectID._id === sub._id,
						)[0]?.classesAttended || 0) /
							sub.totalClasses) *
							100 *
							100,
					) / 100,
			};
		}),
		{
			subjectName: <div style={{ fontWeight: "bold" }}>Total</div>,
			totalClasses: (
				<div style={{ fontWeight: "bold" }}>
					{user.subjects
						?.map((r) => r.totalClasses || 0)
						?.reduce((partial_sum, a) => partial_sum + a, 0)}
				</div>
			),
			attendedClasses: (
				<div style={{ fontWeight: "bold" }}>
					{user.studentDetails?.attendance
						?.map((r) => r.classesAttended || 0)
						?.reduce((partial_sum, a) => partial_sum + a, 0)}
				</div>
			),
			percent: (
				<div style={{ fontWeight: "bold" }}>
					{Math.round(
						(user.studentDetails?.attendance
							?.map((r) => r.classesAttended || 0)
							?.reduce((partial_sum, a) => partial_sum + a, 0) /
							user.subjects
								?.map((r) => r.totalClasses || 0)
								?.reduce((partial_sum, a) => partial_sum + a, 0)) *
							100 *
							100,
					) / 100}
				</div>
			),
		},
	];
	return (
		<div className="bg">
			<Container>
				<div className="row mb-5 mt-5">
					<div className="col-12">
						<div className="row">
							<div className="col-2 text-bold">Name</div>
							<div className="col-3">{user.studentDetails?.name}</div>
						</div>
					</div>
					<div className="col-12">
						<div className="row">
							<div className="col-2 text-bold">Roll Number</div>
							<div className="col-3">{user.studentDetails?.rollNumber}</div>
						</div>
					</div>
					<div className="col-12">
						<div className="row">
							<div className="col-2 text-bold">Email</div>
							<div className="col-3">
								{user.studentDetails?.userID?.email || "-"}
							</div>
						</div>
					</div>
					<div className="col-12">
						<div className="row">
							<div className="col-2 text-bold">Phone number</div>
							<div className="col-3">
								{user.studentDetails?.userID?.phoneNumber || "-"}
							</div>
						</div>
					</div>
				</div>
				<div className="row mb-5 mt-5">
					<div className="col-12">
						<DataTable
							title="Attendance"
							columns={columns}
							data={rows}
							striped
							progressPending={isLoading}
						/>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Student;
