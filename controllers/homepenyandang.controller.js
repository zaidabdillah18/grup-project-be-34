const models = require('../models');
const jwt = require('jsonwebtoken');

async function homepenyandang(req,res){
    const auth = await req.headers.authorization
    const token = await auth.split(' ')[1]
  
    const verified = jwt.verify(token, 'secret') 
   
    if (verified.posisi === "penyandang disabilitas no-lsm" || verified.posisi === "penyandang disabilitas lsm") {
        const homekategoripenyandang = await models.KategoriProgram.findAll({
            attributes: ['id','nama','deskripsi','gambar'],
            include:[{
                models:DataProgram,
                include: [DataMitra]
                }
            ]
          })
        //   const homeprogrampenyandang = await models.Program.findAll({
        //      include:[{
        //         model: models.DataMitra, as: 'DataMitras',
        //         attributes: ['id','nama_mitra']
        //     }],
        //     attributes: ['id','nama','deskripsi','gambar','status_program']
        //   }) 
        
          res.status(200).json({
            message: 'Success show data',
            // program: homeprogrampenyandang,
            kategori: homekategoripenyandang
          })
    }else{
    res.status(500).json({
      message: "Invalid credentials!",
    });
    }    
}
module.exports = {
    homepenyandang:homepenyandang    
}