const {next} = require("lodash/seq");
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect(`/login`);
    // return res.redirect('/login?path='+req.originalUrl);
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
