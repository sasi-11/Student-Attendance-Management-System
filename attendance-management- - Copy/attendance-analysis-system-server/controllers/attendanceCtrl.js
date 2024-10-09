const Attendances = require("../models/attendance");

const attendanceCtrl = {
	getAttendances: async (req, res, next) => {
		try {
			await Attendances.find()
				.populate("subjectID")
				.populate("studentID")

				.then(
					(attendance) => {
						if (attendance) {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(attendance);
						} else {
							return res
								.status(400)
								.json({ status: "Failure", msg: "Attendances not found" });
						}
					},
					(err) => next(err),
				)
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
	createAttendance: async (req, res, next) => {
		try {
			let attendance = await Attendances.findOne({
				subjectID: req.body.subjectID,
				studentID: req.body.studentID,
			});
			if (attendance) {
				return res
					.status(400)
					.json({ status: "Failure", msg: "Attendance already exists." });
			}
			await Attendances.create(req.body)
				.then(
					(attendance) => {
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						res.json({
							status: "Success",
							msg: "Created attendance successfully",
						});
						res.end();
					},
					(err) => next(err),
				)
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
	updateAttendance: async (req, res, next) => {
		try {
			Attendances.findByIdAndUpdate(
				req.params.attendanceID,
				{
					$set: req.body,
				},
				{ new: true },
			)
				.then(
					(dept) => {
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						res.json(dept);
					},
					(err) => next(err),
				)
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
	deleteAttendance: async (req, res, next) => {
		try {
			await Attendances.findByIdAndDelete(req.params.attendanceID)
				.then(
					() => {
						res
							.status(200)
							.setHeader("Content-Type", "application/json")
							.json({
								status: "Success",
								msg: "Deleted attendance successfully",
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
};

module.exports = attendanceCtrl;
