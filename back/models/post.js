const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init (sequelize) {
    return super.init({
      // id는 기본적으로 들어가 있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      modelName: 'Post',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //이모티콘 저장 위해 mb4
      sequelize,
    })
  }

  static associate (db) {
    db.Post.belongsTo(db.User); // post addUser, post.setUser(바꿔치기) post.getUser(include 있어서 잘 안씀.)  belongsTo는 단수니까!
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashTag' });  // post.addHashtags 다대다 
    db.Post.hasMany(db.Comment);  // post.addComments
    db.Post.hasMany(db.Image);    // post.addImages
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });  //post.addLikers, post.removeLikers  반대쪽도 이름을 똑같이 만들어줘야 함. // as에 따라서 post.getLikers 처럼 게시글 좋아요 누른 사람들 가져오게 됨.
    db.Post.belongsTo(db.Post, { as: 'Retweet' });  //post.addRetweet
  }
};