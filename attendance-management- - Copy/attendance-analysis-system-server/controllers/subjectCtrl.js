const Subjects = require("../models/subject");

const subjectCtrl = {
	getSubjects: async (req, res, next) => {
		try {
			await Subjects.find()
				.then(
					(subject) => {
						if (subject) {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(subject);
						} else {
							return res
								.status(400)
								.json({ status: "Failure", msg: "Subjects not found" });
						}
					},
					(err) => next(err),
				)
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
	createSubject: async (req, res, next) => {
		try {
			let subject = await Subjects.findOne({ name: req.body.name });
			if (subject) {
				return res
					.status(400)
					.json({ status: "Failure", msg: "Subject already exists." });
			}
			await Subjects.create(req.body)
				.then(
					(subject) => {
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						res.json({
							status: "Success",
							msg: "Created subject successfully",
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
	updateSubject: async (req, res, next) => {
		try {
			Subjects.findByIdAndUpdate(
				req.params.subjectID,
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
	deleteSubject: async (req, res, next) => {
		try {
			await Subjects.findByIdAndRemove(req.params.subjectID)
				.then(
					() => {
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						res.json({
							status: "Success",
							msg: "Deleted subject successfully",
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
};

module.exports = subjectCtrl;
