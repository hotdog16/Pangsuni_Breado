const {comments,board,users} = require("../models");

exports.selectListComment = async (req, res) => {
    console.log('selectListComment!!!!!!!!!!!!!!!!!1');
    const b_no = req.params.b_no;
    try {
        let limit = 10; // sql select 쿼리문의 order by limit 부분
        let offset = 0 + Number((req.query.page ? req.query.page : 1) - 1) * limit; // sql select 쿼리문의 order by offset 부분
        let checkNum = (req.query.page ? req.query.page : 1); // 페이지 네비게이션 부분에 페이징을 위한 변수 초기화
        checkNum = Math.floor(checkNum / 10) * 10; // 10자리에서 내림을 해서 10개씩 끊어주려고 위해 재할당
        const commentList = await comments.findAndCountAll({ // 검색결과와 전체 count를 같이 보기 위해 사용
            limit: 10,
            offset: offset,
            order: [['c_no', 'desc']], // 최신부터 보여주기 위해 역순으로 정렬
            where:{
                b_no
            },
            include: [{
                model: board,
                as: 'b_no_board'
            }, {
                model: users,
                as: 'u_no_user'
            }]
        });
        console.log('comment를 생성!!!!');
        let navCheck = Math.ceil(commentList.count / 10) * 10; // 페이지 네비게이션을 체크하기 위한 변수로 초기화
        navCheck = navCheck / 10; // 초기화 후 쉽게 체크하기 위해 재할당
        const num = []; // 페이지 네비게이션에 나올 숫자들을 담을 배열을 선언
        for (let i = checkNum; i < checkNum + 10; i++) { // checkNum 변수를 이용해서 10개씩 담기 위한 반복문 사용
            if (i < navCheck) {
                num.push(i + 1);
            }
        }
        console.log('return 전이다!!!!!!!!!!!!!!!!!!!!!!!!!11');
        console.log('page : ', req.query.page);
        console.log('navCheck : ', navCheck);
        if (Number.isNaN(req.query.page) || req.query.page > navCheck) {
            return res.status(400).json('숫자만 눌러주세요! 현재 페이지는 없습니다!');
        }
        return res.json({comments: commentList, currentPage: offset, num, checkNum, user: req.user});
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
};