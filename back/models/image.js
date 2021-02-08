const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Image extends Model {
  static init(sequelize) {
    return super.init({
      // id는 기본적으로 들어가 있다.
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    }, {
      modelName: 'Image',
      charset: 'utf8',
      collate: 'utf8_general_ci', //이모티콘 저장 위해 mb4
      sequelize,
    })
  }

  static associate(db) {
    db.Image.belongsTo(db.Post);
  }
};