const models = require('../models');
const jwt = require('jsonwebtoken');

async function homemitra(req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]
  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "mitra") {
    const ambil = await models.Program.findAll({
      include: [
        { model: models.KategoriProgram, as: 'KategoriPrograms' }
      ],
      where: {
        id_mitra: verified.id_user
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
async function homemitradetail(req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]
  const verified = jwt.verify(token, 'secret')
  if (verified.posisi === "mitra") {
    const id = req.params.id
    if (!id) {
      const ambil = await models.Program.findAll({
        include: [
          { model: models.DataMitra, as: 'DataMitras' }
        ],
        where: {
          id_mitra: id
        }
      })
      res.status(200).json({
        message: 'Success show data',
        data: ambil
      })
    } else {
      res.status(400).json({
        message: 'Failed show data'
      })
    }
  } else {
    res.status(500).json({
      message: "Invalid credentials!",
    });
  }
}
async function edithomemitra(req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]
  const verified = jwt.verify(token, 'secret')

  if (verified.posisi === "mitra") {
    const by = req.params.id
      const edit = await models.Program.update({     
        nama: req.body.nama,
      }, 
      {
        where: {
          id: by
        }
      });
      res.status(200).json({
        message: 'Success update data',
        data: edit
      })
    }
    else {
    res.status(500).json({
      message: "Invalid credentials!",
    });
  }
}
async function deletehomemitra(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret') 
 
  if (verified.posisi === "mitra") {
    const id = req.params.id
    console.log(id)
    // check id in table todolist
    // let hapus = await models.Program.findByPk(id)
    // proses delete data
    const hapus1 = await models.Program.destroy({
      where: {
        id: id
      }
    })
    res.json({
      status: 200,
      message: 'Success delete data',
      data: hapus1
    })
  }
}
async function kirimprogram(req, res) {
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret')
  const id = req.params.id
  const idmitra = await models.DataMitra.findByPk(id);

  if (verified.posisi === "mitra") {
    const project = await models.KategoriProgram.findOne({ where: { nama: 'bansos' } });
    const tampung = await models.Program.create({
      nama: req.body.nama,
      deskripsi: req.body.deskripsi,
      tanggal_mulai: req.body.tanggal_mulai,
      tanggal_selesai: req.body.tanggal_selesai,
      kriteria: req.body.kriteria,
      informasi_tambahan: req.body.informasi_tambahan,
      kode_kegiatan: req.body.kode_kegiatan,
      gambar: req.file.filename,
      id_kategori: project.id,
      id_mitra: idmitra.id
    })
    res.status(200).json({
      message: 'Success create data',
      data: tampung
    })

  } else {
    res.status(500).json({
      message: "Invalid credentials!",
    });
  }
}
module.exports = {
  kirimprogram: kirimprogram,
  homemitra: homemitra,
  homemitradetail: homemitradetail,
  edithomemitra: edithomemitra,
  deletehomemitra:deletehomemitra
}