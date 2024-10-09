require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var rolesRouter = require("./routes/roleRoute");
var departmentsRouter = require("./routes/departmentRoute");
var subjectsRouter = require("./routes/subjectRoute");
var studentRouter = require("./routes/studentRoute");
var facultyRouter = require("./routes/facultyRoute");
var attendanceRouter = require("./routes/attendanceRoute");
var loginRouter = require("./routes/loginRoute");

var app = express();

//Connect to DB
const URI = process.env.MONGODB_URL;
console.log(URI);
mongoose.connect(
  URI,
  {
    // useCreateIndex: true,
    // userFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to DB");
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/departments", departmentsRouter);
app.use("/subjects", subjectsRouter);
app.use("/students", studentRouter);
app.use("/faculties", facultyRouter);
app.use("/attendance", attendanceRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  next();
});

module.exports = app;
