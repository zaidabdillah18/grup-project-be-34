const models = require('../models');
const jwt = require('jsonwebtoken');

async function homepenyandang(req,res){
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
  
    const verified = jwt.verify(token, 'secret') 
   
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
        const id = req.params.id
        const detailprogram = await models.KategoriProgram.findAll({
            include: [
              { 
                model: models.Program, as: 'Programs',
                attributes: ['id','nama','deskripsi','gambar','status_program']
            }
            ],
            include:[{
                model: models.DataMitra, as: 'DataMitras',
                attributes: ['id','nama']
            }],
            attributes: ['id','nama','deskripsi','gambar'],
          })
          res.status(200).json({
            message: 'Success show data',
            data: detailprogram
          })
    }    
}
module.exports = {
    homepenyandang:homepenyandang    
}