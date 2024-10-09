var departmentRouter = require("express").Router({ mergeParams: true });
const departmentCtrl = require("../controllers/departmentCtrl");

departmentRouter
	.route("/")
	.get(departmentCtrl.getDepartments)
	.post(departmentCtrl.createDepartment);
departmentRouter
	.route("/:departmentID")
	.put(departmentCtrl.updateDepartment)
	.delete(departmentCtrl.deleteDepartment);

module.exports = departmentRouter;
