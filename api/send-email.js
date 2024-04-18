const nodemailer = require('nodemailer');

module.exports = (req, res) => {
  const { name, email, message } = req.body;

  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use TLS
    auth: {
      user: process.env.GMAIL_APP_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  // Configure the email options
  const mailOptions = {
    from: process.env.GMAIL_APP_USER,
    to: process.env.GMAIL_APP_USER, // Recipient email address
    subject: 'New Message from SnowySky',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
};