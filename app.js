const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const fs = require('fs');
dotenv.config();
// const session = require("express-session");
// const passport = require("passport");
// const sequelize = require("sequelize");
// const multer = require('multer');

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const noticeRouter = require("./routes/notice");
const productRouter = require("./routes/product");
// const storeRouter = require("./routes/store");

const app = express();

// const upload = multer({
//   storage:multer.diskStorage({
//     destination(req,file,done){
//       done(null, 'public/images/');
//     },
//     filename(req,file,done){
//       const ext = path.extname(file.originalname);
//       done(null, path.basename(file.originalname, ext)+ext);
//     },
//   }),
//   limits:{fileSize: 5 * 1024 * 1024},
// });

try {

} catch (err) {
    console.error('public/images 폴더가 없어서 폴더를 생성합니다!');
    fs.mkdirSync('public/images');
}


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
    watch: true,
});

// sequelize.sync({force: false})
//     .then(() => {
//         console.log('데이터베이스 연결 성공');
//     })
//     .catch((err) => {
//         console.error(err);
//     });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/notice", noticeRouter);
app.use("/product", productRouter);
// app.use("/store", storeRouter);

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
});

module.exports = app;
