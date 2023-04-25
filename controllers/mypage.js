// const { users } = require("../models");

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
  res.render("mypage_update", { user });
};

exports.mypageUpdateAdd = async (req, res, next) => {
  console.log(req.body);
  try {
    await users.update(
      {
        u_pwd: req.body.u_pwd,
        u_email: req.body.u_email,
        u_tel: req.body.u_tel,
      },
      {
        where: {
          u_id: req.body.u_id,
        },
      }
    );
    res.redirect("/mypage");
    console.log("rep.body수정 ----------------------------------->>>>", req.body);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
