const Students = require("../models/student");
const Users = require("../models/user");
const Attendance = require("../models/attendance");
const Subjects = require("../models/subject");

const userRoleCtrl = require("./userRoleCtrl");
const userCtrl = require("./userCtrl");

const studentCtrl = {
	getStudents: async (req, res, next) => {
		try {
			await Students.find()
				.populate("userID")
				.then(
					(students) => {
						if (students) {
							var students_res = students.map(async (student) => {
								var res = await Attendance.find({ studentID: student.id })
									.populate("subjectID")
									.then(
										(attendance) => {
											var student_att = JSON.parse(JSON.stringify(student));
											student_att.attendance = attendance;
											return student_att;
										},
										(err) => next(err),
									);
								return res;
							});
							Promise.all(students_res).then((students) => {
								res.statusCode = 200;
								res.setHeader("Content-Type", "application/json");
								res.json(students);
							});
						} else {
							return res
								.status(400)
								.json({ status: "Failure", msg: "Students not found" });
						}
					},
					(err) => next(err),
				)
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
	createStudent: async (req, res, next) => {
		try {
			await Students.findOne({ rollNumber: req.body.rollnumber })
				.then(
					async (student) => {
						if (student) {
							return res
								.status(400)
								.json({ status: "Failure", msg: "Student already exists." });
						} else {
							await userCtrl.createUser(req, res, next).then(async () => {
								let user = await Users.findOne({
									username: req.body.rollnumber,
								});
								await userRoleCtrl.createUserRole(
									{ userID: user.id, roleID: req.body.roleID },
									res,
									next,
								);
								Students.create({
									rollNumber: req.body.rollnumber,
									name: req.body.name,
									userID: user.id,
								}).then(
									async (student) => {
										var jobQueries = [];
										let subs = await Subjects.find();
										subs.forEach((sub) => {
											jobQueries.push(
												Attendance.create({
													classesAttended: 0,
													studentID: student.id,
													subjectID: sub.id,
												}),
											);
										});
										Promise.all(jobQueries)
											.then(() => {
												res.statusCode = 200;
												res.setHeader("Content-Type", "application/json");
												res.json({
													status: "Success",
													msg: "Created student successfully",
												});
												res.end();
											})
											.catch((err) => next(err));
									},
									(err) => next(err),
								);
							});
						}
					},
					(err) => next(err),
				)
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
	updateStudent: async (req, res, next) => {
		try {
			Students.findByIdAndUpdate(
				req.params.studentID,
				{
					$set: req.body,
				},
				{ new: true },
			)
				.then(
					(stu) => {
						Users.findByIdAndUpdate(
							stu.userID,
							{
								$set: req.body,
							},
							{ new: true },
						)
							.then(() => {
								res.statusCode = 200;
								res.setHeader("Content-Type", "application/json");
								res.json(stu);
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
	deleteStudent: async (req, res, next) => {
		try {
			let user = await Students.findById(req.params.studentID);
			await userRoleCtrl.deleteUserRole(user.userID);
			await userCtrl.deleteUser(user.userID);
			await Students.findByIdAndDelete(req.params.studentID)
				.then(
					() => {
						res
							.status(200)
							.setHeader("Content-Type", "application/json")
							.json({
								status: "Success",
								msg: "Deleted student successfully",
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
	getStudentByID: async (req, res, next) => {
		try {
			await Students.findOne({ userID: req.params.userID })
				.populate("userID")
				.then((student) => {
					Attendance.find({ studentID: student.id })
						.populate("subjectID")
						.then(
							(attendance) => {
								var student_att = JSON.parse(JSON.stringify(student));
								student_att.attendance = attendance;
								res.statusCode = 200;
								res.setHeader("Content-Type", "application/json");
								res.json(student_att);
								res.end();
							},
							(err) => next(err),
						);
				});
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
};

module.exports = studentCtrl;
