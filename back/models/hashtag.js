const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Hashtag extends Model {
  static init (sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    }, {
      modelName: 'Hashtag',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //이모티콘 저장 위해 mb4
      sequelize,
    });
  }

  static associate(db) {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashTag' });  //다대다 
  }
};