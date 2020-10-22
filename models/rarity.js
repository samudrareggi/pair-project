'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rarity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rarity.hasMany(models.Unit)
    }
  };
  Rarity.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rarity',
  });
  return Rarity;
};