exports.renderLogin = (req, res) => {
  res.render("login", { title: "로그인" });
};

exports.renderJoin = (req, res) => {
  res.render("member/join", { title: "회원가입" });
};

exports.renderMain = async (req, res, next) => {
  // let user = null;
  // if (req.isAuthenticated()) {
  //   console.log("req:body ======>1111", req.user);
  //   user = req.user;
  // } else {
  //   user = [];
  // }
  const user = req.user;
  res.render("index", {
    title: "PangsuniBreado",
    user,
    // 메인 페이지 렌더링시 넌적스에 게시글 목록 전달
  });
  // next();
};
