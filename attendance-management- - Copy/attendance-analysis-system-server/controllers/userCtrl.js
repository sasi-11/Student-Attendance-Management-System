const Users = require("../models/user");
const userRoleCtrl = require("./userRoleCtrl");

const userCtrl = {
	getUsers: async (req, res, next) => {
		try {
			await Users.find()
				.then(
					(user) => {
						if (user) {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(user);
						} else {
							return res
								.status(400)
								.json({ status: "Failure", msg: "User not found" });
						}
					},
					(err) => next(err),
				)
				.catch((err) => next(err));
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
	createUser: async (req, res, next) => {
		try {
			await Users.findOne({ username: req.body.username })
				.then(
					(user) => {
						if (user) {
							return res
								.status(400)
								.json({ status: "Failure", msg: "Username already exists." });
						} else {
							return Users.create({
								username: req.body.username,
								password: req.body.password,
								email: req.body.email,
								phoneNumber: req.body.phoneNumber,
							});
						}
					},
					(err) => {
						next(err);
					},
				)
				.catch((err) => {
					next(err);
				});
		} catch (err) {
			next(err);
		}
	},
	deleteUser: async (userID, res, next) => {
		try {
			await Users.findByIdAndDelete(userID).catch((err) => {
				next(err);
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = userCtrl;
