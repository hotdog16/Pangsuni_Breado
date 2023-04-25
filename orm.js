
const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto("bread", "breado", "pangsuni", {
  host: "127.0.0.1",
  port: "3306",
  dialect: "mysql",
});
auto.run((err) => {
  if (err) throw err;
});
