const models = require('../models');
const jwt = require('jsonwebtoken');

async function kegiatanpenyandang(req,res){
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
  
    const verified = jwt.verify(token, 'secret') 
   
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
        const id = req.params.id 
        const kegiatan = await models.pilihprogram.findAll({ 
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
            kegiatan: kegiatan
          })
    }
}

module.exports = {
    kegiatanpenyandang:kegiatanpenyandang
  }