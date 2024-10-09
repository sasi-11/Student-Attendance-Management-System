const userRoles = require("../models/userRole");

const userRoleCtrl = {
  createUserRole: async (user, res, next) => {
    try {
      let userRole = await userRoles.findOne({ userID: user.userID });
      if (userRole) {
        return res.status(400).json({
          status: "Failure",
          msg: "User is assigned to role already.",
        });
      }
      await userRoles
        .create({ userID: user.userID, roleID: user.roleID })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  },
  deleteUserRole: async (userID, res, next) => {
    try {
      await userRoles.deleteOne({ userID: userID }).catch((err) => {
        next(err);
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userRoleCtrl;
