// const { users } = require("../models");
const bcrypt = require("bcrypt");

exports.mypage = async (req, res, next) => {
  console.log("req:body ======>1111", req.user);
  const user = req.user;
  res.render("member/mypage", {
    title: "PangsuniBreado",
    user,
    // 메인 페이지 렌더링시 넌적스에 게시글 목록 전달
  });
};

exports.mypageUpdate = async (req, res) => {
  const user = req.user;
  console.log("mypageuser -------------------->", user);
  res.render("member/mypage_update", { user });
};

exports.mypageUpdateAdd = async (req, res, next) => {
  const user = req.user;
  console.log(req.body);
  const hash = await bcrypt.hash(req.body.u_pwd, 12);
  try {
    await user.update(
      {
        u_pwd: hash,
        u_tel: req.body.u_tel,
        u_email: req.body.u_email,
      },
      {
        where: {
          u_no: req.body.u_no,
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
