const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    roleID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserRole", UserRoleSchema);
