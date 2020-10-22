'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnitClassRace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UnitClassRace.belongsTo(models.Unit)
      UnitClassRace.belongsTo(models.Race)
      UnitClassRace.belongsTo(models.Class)
    }
  };
  UnitClassRace.init({
    UnitId: DataTypes.INTEGER,
    ClassId: DataTypes.INTEGER,
    RaceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UnitClassRace',
  });
  return UnitClassRace;
};