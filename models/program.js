'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Program.belongsTo(models.DataMitra, {
        as:'DataMitras',
        foreignKey: "id_mitra",
      });
      Program.belongsTo(models.KategoriProgram, {
        as:'KategoriPrograms',
        foreignKey: "id_kategori",
      });
    }
  }
  Program.init({
    nama: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    tanggal_mulai: DataTypes.DATE,
    tanggal_selesai: DataTypes.DATE,
    informasi_tambahan: DataTypes.STRING,
    kode_kegiatan: DataTypes.STRING,
    status_program: DataTypes.STRING,
    gambar: DataTypes.STRING,
    id_mitra: DataTypes.INTEGER,
    id_kategori: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Program',
  });
  return Program;
};