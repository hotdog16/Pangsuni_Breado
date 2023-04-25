const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");
const fs = require("fs");
const multer = require("multer");
const exios = require("axios");

dotenv.config();

const noticeRouter = require("./routes/notice");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const boardRouter = require("./routes/board");
const {sequelize} = require("./models");

const app = express();


// view engin setup
app.set("views", path.join(__dirname, "views"));

const passportConfig = require("./passport");

passportConfig(); // 패스포트 설정

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
    watch: true,
});

// 파일 업로드를 위해 디렉토리가 있는지 확인하고 없다면 생성
app.listen(3000, ()=>{
    const dir = './public/images';
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    console.log('서버실행');
})


// 파일 업로드를 위해 디렉토리가 있는지 확인하고 없다면 생성
// app.listen(3000, () => {
//   const dir = "./public/images";
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
//   }
//   console.log("서버실행");
// });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/notice", noticeRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/board", boardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
})
// render the error page
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.user = req.user;
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;






