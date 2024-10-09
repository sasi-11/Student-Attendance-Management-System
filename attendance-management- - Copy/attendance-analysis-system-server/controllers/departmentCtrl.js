const Departments = require("../models/department");

const departmentCtrl = {
	getDepartments: async (req, res, next) => {
		try {
			await Departments.find()
				.then(
					(department) => {
						if (department) {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(department);
						} else {
							return res
								.status(400)
								.json({ status: "Failure", msg: "Departments not found" });
						}
					},
					(err) => next(err),
				)
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
	createDepartment: async (req, res, next) => {
		try {
			let department = await Departments.findOne({
				shortName: req.body.shortName,
			});
			if (department) {
				return res
					.status(400)
					.json({ status: "Failure", msg: "Department already exists." });
			}
			await Departments.create(req.body)
				.then(
					(department) => {
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						res.json({
							status: "Success",
							msg: "Created department successfully",
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
	updateDepartment: async (req, res, next) => {
		try {
			Departments.findByIdAndUpdate(
				req.params.departmentID,
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
	deleteDepartment: async (req, res, next) => {
		try {
			await Departments.findByIdAndRemove(req.params.departmentID)
				.then(
					(resp) => {
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						res.json({
							status: "Success",
							msg: "Deleted department successfully",
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

module.exports = departmentCtrl;
