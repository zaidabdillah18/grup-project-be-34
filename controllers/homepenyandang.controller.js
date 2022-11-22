const models = require('../models');
const jwt = require('jsonwebtoken');

async function homepenyandang(req,res){
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
  
    const verified = jwt.verify(token, 'secret') 
   
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
        const homepenyandang = await models.KategoriProgram.findAll({
            attributes: ['id','nama','deskripsi','gambar'],
          })
          res.status(200).json({
            message: 'Success show data',
            data: homepenyandang,
          })
       
    }else{
        res.status(500).json({
            message: "Invalid credentials!",
          });
    }    
}
async function homeprogrampenyandang(req,res){
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
  
    const verified = jwt.verify(token, 'secret') 
   
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
          const home = await models.Program.findAll({
             include:[{
                model: models.DataMitra, as: 'DataMitras',
                attributes: ['id','nama_mitra']
            }],
            attributes: ['id','nama','deskripsi','gambar','status_program']
          }) 
          res.status(200).json({
            message: 'Success show data',
            data:home,
          })
       
    }else{
        res.status(500).json({
            message: "Invalid credentials!",
          });
    }    
}
module.exports = {
    homepenyandang:homepenyandang,
    homeprogrampenyandang:homeprogrampenyandang    
}