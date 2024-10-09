var subjectRouter = require("express").Router({ mergeParams: true });
const subjectCtrl = require("../controllers/subjectCtrl");

subjectRouter
	.route("/")
	.get(subjectCtrl.getSubjects)
	.post(subjectCtrl.createSubject);
subjectRouter
	.route("/:subjectID")
	.put(subjectCtrl.updateSubject)
	.delete(subjectCtrl.deleteSubject);

module.exports = subjectRouter;
