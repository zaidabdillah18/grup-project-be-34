'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pilihprogram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.DataPenyandang.belongsToMany(models.Program, { through: "pilihprogram",foreignKey: 'id_program'})
      models.Program.belongsToMany(models.DataPenyandang, { through: "pilihprogram",foreignKey: 'id_datapenyandang'})

    }
  }
  pilihprogram.init({
    id_program: DataTypes.INTEGER,
    id_datapenyandang: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pilihprogram',
  });
  return pilihprogram;
};