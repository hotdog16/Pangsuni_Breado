const {makePaginate}= require('sequelize-cursor-pagination');
const {products} = require("../models");
const Sequelize = require('sequelize');


const Products = sequelize.define('products', {
    p_no : {
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    value: Sequelize.INTEGER
});
Products.paginate = makePaginate(Products);

const firstResult = await Products.paginate({
    order:[['p_no', 'DESC']],
    limit:20
});
let secondResult = await Products.paginate({
    order:[['p_no', 'DESC']],
    limit:20,
    after:firstResult.pageInfo.endCursor
});
let thirdResult = await Products.paginate({
    order:[['p_no', 'DESC']],
    limit:20,
    before:secondResult.pageInfo.endCursor
});

module.exports = firstResult;