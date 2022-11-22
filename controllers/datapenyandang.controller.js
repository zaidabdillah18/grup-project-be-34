const models = require('../models');
const Validator = require('fastest-validator')
const jwt = require('jsonwebtoken')

const v = new Validator()

async function createDatapribadi (req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
    const temp = await models.DataPenyandang.create({
      nama: verified.nama,
      jenis_kelamin: req.body.jenis_kelamin,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      agama: req.body.agama,
      nik: req.body.nik,
      id_user: verified.id_user
    })
    res.json({
      status: 200,
      message: 'Success create data',
      data: temp
    })
}
}
async function getDatapribadi(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]
  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
    const ambil = await models.DataPenyandang.findAll({
      where: {
        id: verified.id_user
      }
    })
    res.status(200).json({
      message: 'Success show data',
      data: ambil
    })
  } else {
    res.status(500).json({
      message: "Invalid credentials!",
    });
  }
}
async function editDatapribadi(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]
  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
    
    const ambil = await models.DataPenyandang.update({
      nama: req.body.nama,
      // nama: req.body.jenis_kelamin,
      // nama: req.body.tempat_lahir,
      // nama: req.body.tanggal_lahir,
      // nama: req.body.agama,
      // nama: req.body.nik
    },
    {
      where: {
        id: verified.id_user
      }
    })
    res.status(200).json({
      message: 'Success show data',
      data: ambil
    })
  } else {
    res.status(500).json({
      message: "Invalid credentials!",
    });
  }
}
async function createkontakpribadi (req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {

    const temp = await models.KontakPribadi.create({
      no_hp: req.body.no_hp,
      alamat: req.body.alamat,
      provinsi: req.body.provinsi,
      kota: req.body.kota,
      kecamatan: req.body.kecamatan,
      desa: req.body.desa,
      kode_pos: req.body.kode_pos,
      id_datapenyandang: verified.id_user
    })
    res.json({
      status: 200,
      message: 'Success create data',
      data: temp
    })
  }
}
async function creatuploadberkas(req,res){
 
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
  const temp = await models.UploadBerkas.create({
    file_ktp: req.file.filename,
    id_datapenyandang: verified.id_user
  })
  res.json({
    status: 200,
    message: 'Success create data',
    data: temp
  })
  }
}

module.exports = {
  createDatapribadi: createDatapribadi,
  getDatapribadi:getDatapribadi,
  editDatapribadi:editDatapribadi,
  createkontakpribadi:createkontakpribadi,
  creatuploadberkas:creatuploadberkas
}
