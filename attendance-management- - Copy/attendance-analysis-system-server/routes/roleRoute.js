var roleRouter = require("express").Router({ mergeParams: true });
const roleCtrl = require("../controllers/roleCtrl");

roleRouter.route("/").get(roleCtrl.getRoles).post(roleCtrl.createRole);
roleRouter.route("/:roleID").delete(roleCtrl.deleteRole);

module.exports = roleRouter;
