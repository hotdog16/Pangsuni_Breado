var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _board_type = require("./board_type");
var _comments = require("./comments");
var _orders = require("./orders");
var _products = require("./products");
var _regions = require("./regions");
var _stores = require("./stores");
var _users = require("./users");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var board_type = _board_type(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var regions = _regions(sequelize, DataTypes);
  var stores = _stores(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  comments.belongsTo(board, { as: "b_no_board", foreignKey: "b_no"});
  board.hasMany(comments, { as: "comments", foreignKey: "b_no"});
  board.belongsTo(board_type, { as: "bt_no_board_type", foreignKey: "bt_no"});
  board_type.hasMany(board, { as: "boards", foreignKey: "bt_no"});
  orders.belongsTo(products, { as: "p_no_product", foreignKey: "p_no"});
  products.hasMany(orders, { as: "orders", foreignKey: "p_no"});
  stores.belongsTo(regions, { as: "r_no_region", foreignKey: "r_no"});
  regions.hasMany(stores, { as: "stores", foreignKey: "r_no"});
  products.belongsTo(stores, { as: "s_no_store", foreignKey: "s_no"});
  stores.hasMany(products, { as: "products", foreignKey: "s_no"});
  board.belongsTo(users, { as: "u_no_user", foreignKey: "u_no"});
  users.hasMany(board, { as: "boards", foreignKey: "u_no"});
  comments.belongsTo(users, { as: "u_no_user", foreignKey: "u_no"});
  users.hasMany(comments, { as: "comments", foreignKey: "u_no"});
  orders.belongsTo(users, { as: "u_no_user", foreignKey: "u_no"});
  users.hasMany(orders, { as: "orders", foreignKey: "u_no"});

  return {
    board,
    board_type,
    comments,
    orders,
    products,
    regions,
    stores,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
