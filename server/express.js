
const environment = require('./environments/environment');
const nodemailer = require('nodemailer');
const cors = require('cors');
const express = require('express');
const crypto = require('crypto');
const { env } = require('process');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const signingSecret = environment.sigParserSecretKey; // Replace with your actual signing secret


app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: environment.EMAIL_HOST,
    port: environment.EMAIL_PORT,
    secure: false,
    auth: {
      user: environment.EMAIL_USER,
      pass: environment.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: environment.EMAIL_USER,
    to: req.body.emails.join(', '),
    subject: 'Meeting Attendee Arrival',
    text: `Hello, ${req.body.name} has arrived for the meeting.`
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error occurred: ', err);
    } else {
      console.log('Email sent: ', data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const axios = require('axios');
// ...

app.get('/image/:imageName', async (req, res) => {
  try {
    const { imageName } = req.params;
    const url = `${environment.imageURL}/${imageName}`;
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    res.set('Content-Type', 'image/webp');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }
});