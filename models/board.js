const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board', {
    b_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bt_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'board_type',
        key: 'bt_no'
      }
    },
    b_writer: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'users',
        key: 'u_id'
      }
    },
    b_title: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    b_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    b_reg_dt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    b_mod_dt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    b_done: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    b_cnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'board',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "b_no" },
        ]
      },
      {
        name: "b_writer",
        using: "BTREE",
        fields: [
          { name: "b_writer" },
        ]
      },
      {
        name: "bt_no",
        using: "BTREE",
        fields: [
          { name: "bt_no" },
        ]
      },
    ]
  });
};
