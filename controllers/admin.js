const { Sequelize, Op} = require("sequelize");
const { users,orders,products,board } = require("../models");

exports.adminOrder = async (req, res) => {
  let limit = 10; // sql select 쿼리문의 order by limit 부분
  let offset = 0 + Number((req.query.page ? req.query.page : 1) - 1) * limit; // sql select 쿼리문의 order by offset 부분
  let checkNum = (req.query.page ? req.query.page : 1); // 페이지 네비게이션 부분에 페이징을 위한 변수 초기화
  checkNum = Math.floor(checkNum / 10) * 10; // 10자리에서 내림을 해서 10개씩 끊어주려고 위해 재할당
  const listOrder = await orders.findAndCountAll({
    limit,
    offset,
    order:[['o_no', 'desc']],
    include:{
      model:products,
      as:'p_no_product',
      required: true
    }
  });
  let navCheck = Math.ceil(listOrder.count / 10) * 10; // 페이지 네비게이션을 체크하기 위한 변수로 초기화
  navCheck = navCheck / 10; // 초기화 후 쉽게 체크하기 위해 재할당
  const num = []; // 페이지 네비게이션에 나올 숫자들을 담을 배열을 선언
  for (let i = checkNum; i < checkNum + 10; i++) { // checkNum 변수를 이용해서 10개씩 담기 위한 반복문 사용
    if (i < navCheck) {
      num.push(i + 1);
    }
  }
  if (Number.isNaN(req.query.page) || req.query.page > navCheck) {
    res.status(400).json('숫자만 눌러주세요! 현재 페이지는 없습니다!');
  }
  console.log('orders : ',listOrder);
  res.render("admin/order", {title: "주문관리", orders: listOrder, currentPage: offset, num, checkNum, user: req.user});
};

exports.adminProduct = (req, res) => {
  res.render("admin/product", { title: "상품관리" });
};

exports.adminMember = async (req, res, next) => {
  const u_no = req.params.u_no;
  console.log('req.body ====> admin', req.user)
  try {
    const user_list = await users.findAll();
    // console.log("유저목록 -----------");
    // console.log(user_list);
    for (u in user_list) {
      console.log(u);
    }

    // console.log("유저목록 끝 ============================");
    res.render("admin/member", { list: user_list });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.adminBoard = async (req, res) => {
  res.render("admin/board", { title: "게시판관리"});
};

exports.adminBoard2 = async (req, res) => {
  try {
    let limit = 10; // sql select 쿼리문의 order by limit 부분
    let offset = 0 + Number((req.query.page ? req.query.page : 1) - 1) * limit; // sql select 쿼리문의 order by offset 부분
    let checkNum = (req.query.page ? req.query.page : 1); // 페이지 네비게이션 부분에 페이징을 위한 변수 초기화
    checkNum = Math.floor(checkNum / 10) * 10; // 10자리에서 내림을 해서 10개씩 끊어주려고 위해 재할당
    const qnaList = await board.findAndCountAll({ // 검색결과와 전체 count를 같이 보기 위해 사용
      limit: 10,
      offset: offset,
      order: [['b_no', 'desc']], // 최신부터 보여주기 위해 역순으로 정렬
    })
    let navCheck = Math.ceil(qnaList.count / 10) * 10; // 페이지 네비게이션을 체크하기 위한 변수로 초기화
    navCheck = navCheck / 10; // 초기화 후 쉽게 체크하기 위해 재할당
    const num = []; // 페이지 네비게이션에 나올 숫자들을 담을 배열을 선언
    for (let i = checkNum; i < checkNum + 10; i++) { // checkNum 변수를 이용해서 10개씩 담기 위한 반복문 사용
      if (i < navCheck) {
        num.push(i + 1);
      }
    }
    if (Number.isNaN(req.query.page) || req.query.page > navCheck) {
      return res.status(400).json('숫자만 눌러주세요! 현재 페이지는 없습니다!');
    }
    return res.json({board: qnaList, currentPage: offset, num, checkNum, user: req.user});
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

exports.deleteBoard = async (req, res)=>{
  try{
    const {b_no} = req.body;
    await board.destroy({
      where:{b_no}
    });
    return res.json({msg: '성공'});
  }catch (e) {
    console.error(e);
    return res.status(500).json({msg:'실패!'});
  }
}

exports.adminStore = (req, res) => {
  res.render("admin/store", { title: "스토어관리" });
};


exports.member = async (req,res) =>{
  try {
    let limit = 10; // sql select 쿼리문의 order by limit 부분
    let offset = 0 + Number((req.query.page ? req.query.page : 1) - 1) * limit; // sql select 쿼리문의 order by offset 부분
    let checkNum = (req.query.page ? req.query.page : 1); // 페이지 네비게이션 부분에 페이징을 위한 변수 초기화
    checkNum = Math.floor(checkNum / 10) * 10; // 10자리에서 내림을 해서 10개씩 끊어주려고 위해 재할당
    const memberList = await users.findAndCountAll({ // 검색결과와 전체 count를 같이 보기 위해 사용
      limit: 10,
      offset: offset,
      order: [['u_id', 'desc']], // 최신부터 보여주기 위해 역순으로 정렬
    })
    let navCheck = Math.ceil(qnaList.count / 10) * 10; // 페이지 네비게이션을 체크하기 위한 변수로 초기화
    navCheck = navCheck / 10; // 초기화 후 쉽게 체크하기 위해 재할당
    const num = []; // 페이지 네비게이션에 나올 숫자들을 담을 배열을 선언
    for (let i = checkNum; i < checkNum + 10; i++) { // checkNum 변수를 이용해서 10개씩 담기 위한 반복문 사용
      if (i < navCheck) {
        num.push(i + 1);
      }
    }
    if (Number.isNaN(req.query.page) || req.query.page > navCheck) {
      return res.status(400).json('숫자만 눌러주세요! 현재 페이지는 없습니다!');
    }
    return res.json({users: memberList, currentPage: offset, num, checkNum, user: req.user});
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
}

exports.DetailMember = async(req,res) =>{

  console.log("userdetail111=======>",req.params);

  const {id} = req.params;
  const user = req.user;
  const userdetailorder = await orders.findAll({
    raw: true,
    include : [{
      model: products,
      as : 'p_no_product',
    },{
      model:users,
      as:'u',
    }]
  })
  console.log("userdetail=======>",userdetailorder);
  if(userdetailorder){
    res.status(200).json({userdetailorder});
  }
}


exports.deleteMember = async (req, res)=>{
  try{
    const user = req.user;
    await users.destroy({
      where:user.u_id
    });
    return res.json({msg: '성공'});
  }catch (e) {
    console.error(e);
    return res.status(500).json({msg:'실패!'});
  }
}