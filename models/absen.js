'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Absen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Absen.belongsTo(models.Users)
    }
  }
  Absen.init({
    date: {
      type: DataTypes.DATEONLY
    },
    clockIn: {
      type: DataTypes.BOOLEAN
    },
    clockOut: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'Absen',
  });
  return Absen;
};