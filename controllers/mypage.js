const { users } = require("../models");

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

          s_no: req.body.s_no,
          p_img: req.body.p_img,
        },
        {
          where: {
            p_no: req.body.p_no,
          },
        }
    );
    res.redirect("/product");
  } catch (e) {
    console.error(e);
    next(e);
  }
  res.send("수정이 완료되었습니다");
};