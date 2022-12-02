const models = require('../models');
const jwt = require('jsonwebtoken');

async function kegiatanpenyandang(req,res){
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
  
    const verified = jwt.verify(token, 'secret') 
   
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
      const id = verified.id_user
      const tampung = await models.DataPenyandang.findOne({ id_user: id })
      console.log(tampung.id_user)
        const kegiatan = await models.pilihprogram.findAll({ 
          include:[{
              model: models.Program,
              include: [models.DataMitra]
              },
              {
                model: models.DataPenyandang
              }
          ],
          where:{
          id_datapenyandang:tampung.id_user,
          status:"daftar"
        }
          })
          res.status(200).json({
            message: 'Success show data',
            // program: homeprogrampenyandang,
            kegiatan: kegiatan
          })
    }
}
async function kegiatanaktifpenyandang(req,res){
  const auth = await req.headers.authorization
  const token = await auth.split(' ')[1]

  const verified = jwt.verify(token, 'secret') 
 
  if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
     const id = verified.id_user
     const tampung = await models.DataPenyandang.findOne({ id_user: id })
      const kegiatan = await models.pilihprogram.findAll({ 
        include:[{
            model: models.Program,
            include: [models.DataMitra]
            },
            {
              model: models.DataPenyandang
            }
        ],
        where:{
          id_datapenyandang:tampung.id_user,
          status:"diterima"
        }
      })
      res.status(200).json({
        message: 'Success show data',
        // program: homeprogrampenyandang,
        kegiatan: kegiatan
      })    
  }
}
module.exports = {
    kegiatanpenyandang:kegiatanpenyandang,
    kegiatanaktifpenyandang:kegiatanaktifpenyandang
  }