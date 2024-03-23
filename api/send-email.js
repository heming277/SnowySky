const nodemailer = require('nodemailer');

module.exports = (req, res) => {
  const { name, email, message } = req.body;

  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hemingliu123@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD 
    }
  });

  // Configure the email options
  const mailOptions = {
    from: 'hemingliu123@gmail.com',
    to: 'hemingliu123@gmail.com', // Recipient email address
    subject: 'New Message from Your Website',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
};