const models = require('../models');
const jwt = require('jsonwebtoken');

async function programkategoripenyandang(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret') 
 
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
      const programkategoripenyandang = await models.KategoriProgram.findAll({
      })
      res.status(200).json({
        message: 'Success show data',
        // program: homeprogrampenyandang,
        kategori: programkategoripenyandang
      })
    }else{
      res.status(500).json({
        message: "Invalid credentials!",
      });
      } 
}
async function detailprogramkategori(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret') 
 
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
    const id = req.params.id 
    const detailprogramkategori = await models.KategoriProgram.findAll({ 
      attributes: ['id','nama','deskripsi','gambar'],
      include:[{
          model: models.Program,
          include: [models.DataMitra]
          }
      ],
      where:{
      id:id
    }
      })
      res.status(200).json({
        message: 'Success show data',
        // program: homeprogrampenyandang,
        kategori: detailprogramkategori
      })
    }
}
async function detailprogram(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret') 
 
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
    const id = req.params.id 
    const detailprogram = await models.Program.findAll({ 
      include:[{
          model: models.DataMitra
          }
      ],
      where:{
      id:id
    }
      })
      res.status(200).json({
        message: 'Success show data',
        // program: homeprogrampenyandang,
        kategori: detailprogram
      })
    }
}
module.exports = {
programkategoripenyandang:programkategoripenyandang,
detailprogramkategori:detailprogramkategori,
detailprogram:detailprogram
  }