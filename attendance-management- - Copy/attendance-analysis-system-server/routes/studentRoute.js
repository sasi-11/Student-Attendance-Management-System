var studentRouter = require("express").Router({ mergeParams: true });
const studentCtrl = require("../controllers/studentCtrl");

studentRouter
	.route("/")
	.get(studentCtrl.getStudents)
	.post(studentCtrl.createStudent);
studentRouter.route("/:userID").get(studentCtrl.getStudentByID);
studentRouter
	.route("/:studentID")
	.put(studentCtrl.updateStudent)
	.delete(studentCtrl.deleteStudent);

module.exports = studentRouter;
