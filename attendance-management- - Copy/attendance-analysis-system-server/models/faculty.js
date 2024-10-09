const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FacultySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		userID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		subjects: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Subject",
			},
		],
		departmentID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Department",
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Faculty", FacultySchema);
