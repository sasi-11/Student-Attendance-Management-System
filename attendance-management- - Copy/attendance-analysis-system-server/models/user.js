const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			default: "",
			unique: true,
		},
		phoneNumber: {
			type: String,
			default: "",
			unique: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("User", UserSchema);