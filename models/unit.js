'use strict';
const {
  Model
} = require('sequelize');
const { Op } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Unit.belongsTo(models.Rarity)
      Unit.hasMany(models.UnitClassRace)
    }

    static findAllTank() {
      return Unit.findAll({
        where: {
          hp: {
            [Op.gt]: 2800
          }
        }
      })
    }

  };
  Unit.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true
      }
    },
    damage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true
      }
    },
    RarityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Unit',
  });
  return Unit;
};