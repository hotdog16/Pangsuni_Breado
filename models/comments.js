const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    c_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    b_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'board',
        key: 'b_no'
      }
    },
    c_writer: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'users',
        key: 'u_id'
      }
    },
    c_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    c_reg_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    c_mod_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'comments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "c_no" },
        ]
      },
      {
        name: "c_writer",
        using: "BTREE",
        fields: [
          { name: "c_writer" },
        ]
      },
      {
        name: "b_no",
        using: "BTREE",
        fields: [
          { name: "b_no" },
        ]
      },
    ]
  });
};
