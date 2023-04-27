
const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto("bread", "breado", "pangsuni", {
  host: "192.168.10.102",
  port: "3306",
  dialect: "mysql",
});
auto.run((err) => {
  if (err) throw err;
});
