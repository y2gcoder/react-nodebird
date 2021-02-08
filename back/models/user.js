const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init (sequelize) {
    return super.init({
      // id는 기본적으로 들어가 있다.
      email: {
        type: DataTypes.STRING(50), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    }, {
      modelName: 'User',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      sequelize,
    })
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    // 일대일 관계라면 hasOne으로! - belongsTo와 한 짝.
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 별칭을 붙여주지 않으면 헷갈림. through도 대문자, 별칭도 대문자인 편이 좋음. 
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  }
};