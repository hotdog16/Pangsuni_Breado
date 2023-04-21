const multer = require('multer');
const upload = multer({dest: '../public/images/'});

// exports.singleUpload = (req, res, next) => {
//     console.log('업로드 미들웨어 start!!!');
//     console.log('req.body : ',req.body);
//     console.log('req.body : ',req.);
//     console.log('req.body : ',req.body);
//     upload.single(req.body.p_img);
//     console.log(req.body.p_img);
//     console.log('업로드 미들웨어 end!!!');
//     try{
//
//         next();
//     }catch (e) {
//         console.error(e);
//         next(e);
//     }
// }
exports.singleUpload = (req, res, next) => {
    console.log('업로드 미들웨어 start!!!');
    console.log('req.body : ', req.body);
    console.log('req.body : ', req);
    console.log('req.body : ', req.body);
    upload.single(req.body.p_img);
    console.log(req.body.p_img);
    console.log('업로드 미들웨어 end!!!');
    try {

        next();
    } catch (e) {
        console.error(e);
        next(e);
    }
}