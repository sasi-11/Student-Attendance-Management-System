const Faculties = require("../models/faculty");
const Users = require("../models/user");
const Attendance = require("../models/attendance");

const userRoleCtrl = require("./userRoleCtrl");
const userCtrl = require("./userCtrl");

const facultyCtrl = {
	getFaculties: async (req, res, next) => {
		try {
			await Faculties.find()
				.populate("userID")
				.populate("subjects")
				.populate("departmentID")
				.then(
					(faculties) => {
						if (faculties) {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(faculties);
						} else {
							return res
								.status(400)
								.json({ status: "Failure", msg: "Faculties not found" });
						}
					},
					(err) => next(err),
				)
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
	createFaculty: async (req, res, next) => {
		try {
			await userCtrl
				.createUser(req, res, next)
				.then(async () => {
					let user = await Users.findOne({
						username: req.body.username,
					});
					await userRoleCtrl.createUserRole(
						{ userID: user.id, roleID: req.body.roleID },
						res,
						next,
					);
					Faculties.create({
						name: req.body.name,
						userID: user.id,
						subjects: req.body.subjects,
						departmentID: req.body.departmentID,
					}).then(
						(faculty) => {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json({
								status: "Success",
								msg: "Created faculty successfully",
							});
							res.end();
						},
						(err) => next(err),
					);
				})
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
	updateFaculty: async (req, res, next) => {
		try {
			Faculties.findByIdAndUpdate(
				req.params.facultyID,
				{
					$set: req.body,
				},
				{ new: true },
			)
				.then(
					(fac) => {
						Users.findByIdAndUpdate(
							fac.userID,
							{
								$set: req.body,
							},
							{ new: true },
						)
							.then(() => {
								res.statusCode = 200;
								res.setHeader("Content-Type", "application/json");
								res.json(fac);
							})
							.catch((err) => next(err));
					},
					(err) => next(err),
				)
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
	deleteFaculty: async (req, res, next) => {
		try {
			let user = await Faculties.findById(req.params.facultyID);
			await userRoleCtrl.deleteUserRole(user.userID);
			await userCtrl.deleteUser(user.userID);
			await Faculties.findByIdAndDelete(req.params.facultyID)
				.then(
					() => {
						res
							.status(200)
							.setHeader("Content-Type", "application/json")
							.json({
								status: "Success",
								msg: "Deleted faculty successfully",
							})
							.end();
					},
					(err) => next(err),
				)
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
	getFacultyByUserID: async (req, res, next) => {
		try {
			await Faculties.findOne({ userID: req.params.userID })
				.populate("userID")
				.populate("subjects")
				.populate("departmentID")
				.then(
					async (faculty) => {
						if (faculty) {
							// var faculty_temp = JSON.parse(JSON.stringify(faculty));
							// faculty_temp.studentAttendance = [];
							// let jobQueries = [];
							// faculty.subjects.forEach((subject) => {
							// 	console.log("subjec", subject);
							// 	jobQueries.push(
							// 		Attendance.find({ subjectID: subject._id })
							// 			.populate("studentID")
							// 			.then((att) => {
							// 				if (att) {
							// 					faculty_temp.studentAttendance.push(
							// 						Object.fromEntries(new Map([[subject._id, att]])),
							// 					);
							// 				}
							// 			}),
							// 	);
							// });
							// Promise.all(jobQueries).then((resp) => {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(faculty);
							// });
						} else {
							return res
								.status(400)
								.json({ status: "Failure", msg: "Faculty not found" });
						}
					},
					(err) => next(err),
				)
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
	getFacultySubjectDetails: async (req, res, next) => {
		try {
			console.log(req.params.subjectID);
			Attendance.find({ subjectID: req.params.subjectID })
				.populate("studentID")
				.then((att) => {
					if (att) {
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						res.json(att);
					}
				})
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
};

module.exports = facultyCtrl;
