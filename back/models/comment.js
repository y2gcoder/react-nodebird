const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {  // Model의 init을 해줘야 테이블이 생성됨.
    //model.init으로 바뀌었다 생각하자.
    return super.init({
      // id는 기본적으로 들어가 있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      modelName: 'Comment',
      tableName: 'comments',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //이모티콘 저장 위해 mb4
      sequelize,
    });
  }

  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
};
// module.exports = (sequelize, DataTypes) => {
//   const Comment = sequelize.define('Comment', { 
//     // id는 기본적으로 들어가 있다.
//     content: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     // UserId: {},
//     // PostId: {},
//   }, {
//     charset: 'utf8mb4',
//     collate: 'utf8mb4_general_ci' //이모티콘 저장 위해 mb4
//   });

//   Comment.associate = (db) => {
//     db.Comment.belongsTo(db.User);
//     db.Comment.belongsTo(db.Post);
//   };
//   return Comment;
// };