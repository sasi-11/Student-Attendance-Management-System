var loginRouter = require("express").Router({ mergeParams: true });
const loginCtrl = require("../controllers/loginCtrl");

loginRouter.route("/").post(loginCtrl.login);

module.exports = loginRouter;
