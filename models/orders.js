const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    o_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    u_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'users',
        key: 'u_id'
      }
    },
    p_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'p_no'
      }
    },
    o_reg_dt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    o_pickup_dt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    o_cnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "o_no" },
        ]
      },
      {
        name: "u_id",
        using: "BTREE",
        fields: [
          { name: "u_id" },
        ]
      },
      {
        name: "orders_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "p_no" },
        ]
      },
    ]
  });
};
