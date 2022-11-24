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
async function getDataPribadi(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]
  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
    const {nama} = req.body
    const penyandang = await models.DataPenyandang.findOne({nama:nama})
    if(penyandang){
    const ambil = await models.DataPenyandang.findAll({
      where: {
        id: penyandang.id
      }
    })
    res.status(200).json({
      message: 'Success show data',
      data: ambil
    })
  }
  }
}
async function editDataPribadi(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]
  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
  const {nama} = req.body
  const penyandang = await models.DataPenyandang.findOne({nama:nama})
  if(penyandang){
    await models.User.update({nama:req.body.nama},{
      where:{
        id:penyandang.id
      }
    })
    res.status(200).json({
      message:'berhasil di update'
    })
  }
}
}
async function createkontakpribadi (req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
    const id = req.params.id
    const idpenyandang = await models.DataPenyandang.findByPk(id);
    const temp = await models.KontakPribadi.create({
      no_hp: req.body.no_hp,
      alamat: req.body.alamat,
      provinsi: req.body.provinsi,
      kota: req.body.kota,
      kecamatan: req.body.kecamatan,
      desa: req.body.desa,
      kode_pos: req.body.kode_pos,
      id_datapenyandang: idpenyandang.id
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
  
  const id = req.params.id
  const idpenyandang = await models.DataPenyandang.findByPk(id); 

  const temp = await models.UploadBerkas.create({
    file_ktp: req.file.filename,
    id_datapenyandang: idpenyandang.id
  })
  res.json({
    status: 200,
    message: 'Success create data',
    data: temp
  })
  }
}
// async function getDataPenyandang (req, res) {
//   const auth = await req.headers.authorization
//   const token = await auth.split(' ')[1]

//   const verified = jwt.verify(token, 'secret')
//   const ambil = await DataPenyandang.findAll({
//     where: {
//       user_id: verified.user_id
//     }
//   })
//   res.status(200).json({
//     message: 'Success get all data',
//     data: ambil
//   })
// }
// async function getDataPenyandangbyid (req, res) {
//   const auth = await req.headers.authorization
//   const token = await auth.split(' ')[1]

//   const verified = jwt.verify(token, 'secret')

//   const id = req.params.id
//   // check id in table todolist
//   let ambilid = await TODO.findByPk(id)
//   if (!ambilid) {
//     res.status(404).json({ status: 404, message: 'Data not found' })
//   } else {
//     if (ambilid.user_id == verified.user_id) {
//       res.status(200).json({ message: 'Success get data', data: ambilid })
//     } else {
//       res.status(400).json({ message: 'failed get data' })
//     }
//   }
// }
// async function editTODO (req, res) {
//   const auth = await req.headers.authorization
//   const token = await auth.split(' ')[1]

//   const verified = jwt.verify(token, 'secret')
//   // validation
//   const schema = {
//     name: 'string|optional',
//     description: 'string|optional'
//   }
//   const validate = v.validate(req.body, schema)
//   if (validate.length) {
//     return res.status(400).json(validate)
//   }
//   const id = req.params.id
//   let note = await TODO.findByPk(id)
//   if (!note) {
//     res.status(404).json({ status: 404, message: 'Data not found' })
//   } else {
//     if (note.user_id == verified.user_id) {
//       // proses update
//       edit = await TODO.update(
//         {
//           name: req.body.name,
//           description: req.body.description,
//           isDone: req.body.isDone
//         },
//         {
//           where: {
//             id: id
//           }
//         }
//       )
//       res.json({
//         status: 200,
//         message: 'Success update data',
//         data: edit
//       })
//     } else {
//       res.json({
//         status: 400,
//         message: 'Failed update data'
//       })
//     }
//   }
// }
// async function hapusTODObyid (req, res) {
//   const auth = await req.headers.authorization
//   const token = await auth.split(' ')[1]

//   const verified = jwt.verify(token, 'secret')
//   const id = req.params.id
//   // check id in table todolist
//   let hapus = await TODO.findByPk(id)
//   if (!hapus) {
//     return res.status(404).json({ status: 404, message: 'Data not found' })
//   }
//   if (hapus.user_id == verified.user_id) {
//     // proses delete data
//     const hapus1 = await TODO.destroy({
//       where: {
//         id: id
//       }
//     })
//     res.json({
//       status: 200,
//       message: 'Success delete data',
//       data: hapus1
//     })
//   } else {
//     res.json({
//       status: 400,
//       message: 'failed delete data'
//     })
//   }
// }
// async function hapusTODO (req, res) {
//   // proses delete data
//   const auth = await req.headers.authorization
//   const token = await auth.split(' ')[1]

//   const verified = jwt.verify(token, 'secret')

//   if (!verified) {
//     res.json({
//       status: 400,
//       message: 'failed delete data'
//     })
//   } else {
//     const hapusid = await TODO.destroy({
//       where: {
//         user_id: verified.user_id
//       }
//     })
//     res.json({
//       status: 200,
//       message: 'Success delete data',
//       data: hapusid
//     })
//   }
// }
module.exports = {
  createDatapribadi: createDatapribadi,
  createkontakpribadi:createkontakpribadi,
  creatuploadberkas:creatuploadberkas,
  getDataPribadi:getDataPribadi,
  editDataPribadi:editDataPribadi
//   getDataPenyandang: getDataPenyandang,
//   getTODObyid: getTODObyid,
//   editTODO: editTODO,
//   hapusTODObyid: hapusTODObyid,
//   hapusTODO: hapusTODO
}
