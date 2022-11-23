const nodemailer = require('nodemailer')
 exports.kirimEmail = dataEmail =>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.email",
        port: 587,
        secure: false,
        requireTLS:true, // true for 465, false for other ports
        auth: {
          user: 'zaidabdillah18@gmail.com', // generated ethereal user
          pass: 'Suho2000', // generated ethereal password
        },
      });
      return (
        transporter.sendMail(dataEmail)
        .then(info =>console.log(`email terkirim:${info.message}`))
        .catch(err=>console.log(`terjadi kesalahan: ${err}`))
      )
 }