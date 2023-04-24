const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stores', {
    s_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    s_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    r_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'regions',
        key: 'r_no'
      }
    },
    s_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    s_addr: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    s_tel: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    s_img: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'stores',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "s_no" },
        ]
      },
      {
        name: "r_no",
        using: "BTREE",
        fields: [
          { name: "r_no" },
        ]
      },
    ]
  });
};
