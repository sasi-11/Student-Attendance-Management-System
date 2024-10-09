var facultyRouter = require("express").Router({ mergeParams: true });
const facultyCtrl = require("../controllers/facultyCtrl");

facultyRouter
	.route("/")
	.get(facultyCtrl.getFaculties)
	.post(facultyCtrl.createFaculty);
facultyRouter
	.route("/:facultyID")
	.put(facultyCtrl.updateFaculty)
	.delete(facultyCtrl.deleteFaculty);
facultyRouter.route("/:userID").get(facultyCtrl.getFacultyByUserID);
facultyRouter
	.route("/subject/:subjectID")
	.get(facultyCtrl.getFacultySubjectDetails);

module.exports = facultyRouter;
