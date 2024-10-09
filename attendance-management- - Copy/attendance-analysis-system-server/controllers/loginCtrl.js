const Users = require("../models/user");
const Roles = require("../models/role");
const UserRoles = require("../models/userRole");
const Faculties = require("../models/faculty");
const Students = require("../models/student");

const loginCtrl = {
	login: async (req, res, next) => {
		console.log(req.body);
		try {
			await Users.findOne({
				username: req.body.username,
				password: req.body.password,
			}).then(async (user) => {
				console.log("user", user);
				if (!user) {
					return res
						.status(400)
						.json({ status: "Failure", msg: "Invalid username / password" });
				}
				await UserRoles.findOne({ userID: user.id }).then(async (userrole) => {
					console.log("userrole", userrole);
					await Roles.findById(req.body.roleID).then(async (loginRole) => {
						console.log("loginrole", loginRole);
						if (!userrole.roleID.equals(loginRole.id)) {
							return res.status(400).json({
								status: "Failure",
								msg: loginRole.name + " doesn't exist",
							});
						} else {
							console.log("result");
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json({
								result: "Success",
								msg: "Logged in successfully",
								loginUserID: user.id,
							});
							res.end();
						}
					});
				});
			});
		} catch (err) {
			return res.status(500).json({ status: "Failure", msg: err.message });
		}
	},
};

module.exports = loginCtrl;
