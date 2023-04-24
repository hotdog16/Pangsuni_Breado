exports.mypage = async (req, res, next) => {
  console.log("req:body ======>1111", req.user);
  const user = req.user;
  res.render("mypage", {
    title: "PangsuniBreado",
    user,
    // 메인 페이지 렌더링시 넌적스에 게시글 목록 전달
  });
};

exports.mypageUpdate = async (req, res) => {
  const user = req.user;
  console.log("mypageuser -------------------->", user);
  const updateUser = await user.findOne({ where: { user: u_id } });
  console.log("updeateuser 0000>", updateUser);
  res.render("mypage_update");
};
