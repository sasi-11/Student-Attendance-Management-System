var attendanceRouter = require("express").Router({ mergeParams: true });
const attendanceCtrl = require("../controllers/attendanceCtrl");

attendanceRouter
	.route("/")
	.get(attendanceCtrl.getAttendances)
	.post(attendanceCtrl.createAttendance);
attendanceRouter
	.route("/:attendanceID")
	.put(attendanceCtrl.updateAttendance)
	.delete(attendanceCtrl.deleteAttendance);

module.exports = attendanceRouter;
