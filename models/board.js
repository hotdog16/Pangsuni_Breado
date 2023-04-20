const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board', {
    b_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "게시글번호"
    },
    bt_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "게시판 타입",
      references: {
        model: 'board_type',
        key: 'bt_no'
      }
    },
    b_writer: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "작성자",
      references: {
        model: 'users',
        key: 'u_id'
      }
    },
    b_title: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "게시글 제목"
    },
    b_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "게시글 내용"
    },
    b_reg_dt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "게시글 생성날짜"
    },
    b_mod_dt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "게시글 수정날짜"
    },
    b_done: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: "게시글 삭제여부"
    },
    b_cnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "게시글 조회수"
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
