var userRouter = require("express").Router({ mergeParams: true });
const userCtrl = require("../controllers/userCtrl");

userRouter
  .route("/")
  .get(userCtrl.getUsers)
  .post(userCtrl.createUser)
  .delete(userCtrl.deleteUser);

module.exports = userRouter;
