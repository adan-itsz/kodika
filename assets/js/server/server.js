var express = require('express');
var app = express();
const functions = require('firebase-functions');
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
  envio(req.body.email,"contacto de "+ req.body.nombre,req.body.mensaje);

  res.send("success");
});


envio=(correo,titulo,mensaje)=> {
   const output = `
    <p>${titulo}</p>
    <h3>${titulo}</h3>
    <img src='https://firebasestorage.googleapis.com/v0/b/prueba-login-edbcc.appspot.com/o/hola%2F2017-09-13-PHOTO-00003545.jpg?alt=media&token=ab833cf0-fa7d-4680-ba32-73e0a1d71513'/>
    <h3>${mensaje}</h3>
    <p>https://prueba-login-edbcc.firebaseapp.com/</p>
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



  exports.bigben = functions.https.onRequest((req, res) => {
  const hours = (new Date().getHours() % 12) + 1 // London is UTC + 1hr;
  res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
    </head>
    <body>
      ${'BONG '.repeat(hours)}
    </body>
  </html>`);
});

  app.listen(5000, function () {
    console.log('Example app listening on port 4000!');
  });
