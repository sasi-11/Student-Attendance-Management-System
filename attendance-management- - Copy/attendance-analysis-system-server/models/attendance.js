const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema(
	{
		classesAttended: {
			type: Number,
			default: 0,
		},
		studentID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
		},
		subjectID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Subject",
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
