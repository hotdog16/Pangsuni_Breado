exports.getPagingData = (data, page, limit) => {
    const {count: totalItems, rows: tutorials} = data;
    const currentPage = page ? page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    const pnStart = ((Math.ceil(page / limit) - 1) * limit) + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호.
    let pnEnd = (pnStart + limit); // NOTE: 현재 페이지의 페이지네이션 끝 번호.
    if (pnEnd > totalPages) pnEnd = totalPages; // NOTE: 페이지네이션의 끝 번호가 페이지네이션 전체 카운트보다 높을 경우.
    return {totalItems, tutorials, totalPages, currentPage, pnStart, pnEnd};
};

exports.getPagingDataCount = (totalItems, page, limit) => {
    const currentPage = page ? page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    const pnStart = ((Math.ceil(page / limit) - 1) * limit) + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호.
    let pnEnd = (pnStart + limit); // NOTE: 현재 페이지의 페이지네이션 끝 번호.
    if (pnEnd > totalPages) pnEnd = totalPages; // NOTE: 페이지네이션의 끝 번호가 페이지네이션 전체 카운트보다 높을 경우.
    return {totalItems, totalPages, currentPage, pnStart, pnEnd};
};

exports.getPagination = (page, size) => {
    // const contentSize = Number(process.env.CONTENTSIZE); // 한페이지에 나올 개수
    // const currentPage = Number(req.query.currentPage) || 1; //현재페이지
    const skipSize = (page - 1) * size; // NOTE: 다음 페이지 갈 때 건너뛸 리스트 개수.
    const limit = size ? size : 3;
    const offset = skipSize ? skipSize : 0;
    return {limit, offset};
};

exports.getPagination_airplne = (page, size) => {
    const skipSize = (page - 1) * size; // NOTE: 다음 페이지 갈 때 건너뛸 리스트 개수.
    const limit_airplne = size ? size : 3;
    const offset_airplne = skipSize ? skipSize : 0;
    return {limit_airplne, offset_airplne};
};
