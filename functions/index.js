const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.post('/contacto', function (req, res) {
  console.log('entro a enviar correo');
  envio('adan1995a@gmail.com',req.body.tituloMsg,req.body.mensaje,req.body.email,req.body.nombre);

  res.send("success");
});


envio=(correo,titulo,mensaje,correoCliente,cliente)=> {
   const output = `
    <p>${titulo}</p>
    <h3>${titulo}</h3>
    <h3>'Mensaje de '${cliente}</h3>
    <h3>'correo: '${correoCliente}</h3>
    <h3>${mensaje}</h3>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    auth: {
        user: 'adan1995a@gmail.com', // generated ethereal user
        pass: 'eydnaer1'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"EasyBook Contact" <adan1995a@gmail.com', // sender address
      to: correo, // list of receivers   poner correo
      subject: 'envio de formulario', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console('transporter');
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  }

exports.widgets = functions.https.onRequest(app);
