const Roles = require("../models/role");

const roleCtrl = {
  getRoles: async (req, res, next) => {
    try {
      await Roles.find()
        .then(
          (role) => {
            if (role) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(role);
            } else {
              return res
                .status(400)
                .json({ status: "Failure", msg: "Roles not found" });
            }
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    } catch (err) {
      return res.status(500).json({ status: "Failure", msg: err.message });
    }
  },
  createRole: async (req, res, next) => {
    try {
      let role = await Roles.findOne({ name: req.body.name });
      if (role) {
        return res
          .status(400)
          .json({ status: "Failure", msg: "Role already exists." });
      }
      await Roles.create(req.body)
        .then(
          (role) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              status: "Success",
              msg: "Created role successfully",
            });
            res.end();
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    } catch (err) {
      return res.status(500).json({ status: "Failure", msg: err.message });
    }
  },
  deleteRole: async (req, res, next) => {
    try {
      await Roles.findByIdAndDelete(req.params.roleID)
        .then(
          () => {
            res
              .status(200)
              .setHeader("Content-Type", "application/json")
              .json({
                status: "Success",
                msg: "Deleted role successfully",
              })
              .end();
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    } catch (err) {
      return res.status(500).json({ status: "Failure", msg: err.message });
    }
  },
};

module.exports = roleCtrl;
