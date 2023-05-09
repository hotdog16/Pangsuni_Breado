const {next} = require("lodash/seq");
const requestIp = require('request-ip');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect(`/login`);
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/`);
  }
};

exports.whoisAdmin = (req, res, next)=>{
  if(req.user.u_grade === '관리자'){
    next();
  }else{
    res.redirect(`/`);
  }
}

// exports.getuserIp = (req)=>{
//   const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   return addr;
// }

// exports.getUserIp = async (req, res) => {
//   let ip = requestIp.getClientIp(req);
//   if (req.cookies[b_no] == undefined) {
//     const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     res.cookie(b_no, addr, {
//       maxAge: 30000
//     })
//     await board.update({
//
//     })
//   }
// }