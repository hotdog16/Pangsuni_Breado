const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    u_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    u_name: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    u_pwd: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    u_tel: {
      type: DataTypes.CHAR(13),
      allowNull: false
    },
    u_email: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    u_grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    u_reg_dt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    u_mod_dt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    u_done: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "u_id" },
        ]
      },
    ]
  });
};
