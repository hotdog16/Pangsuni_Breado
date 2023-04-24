const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const fs = require('fs');
const multer = require('multer');
dotenv.config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const noticeRouter = require("./routes/notice");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");

const app = express();

// view engine setup
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

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/notice", noticeRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

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
