const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'Email', // replace with your email
        pass: 'Password'  // replace with your email password or app-specific password
    }
});

app.post('/send-2fa-code', (req, res) => {
    console.log('Received request to /send-2fa-code');
    const { username, twoFACode } = req.body;

    console.log('Username:', username);
    console.log('2FA Code:', twoFACode);

    const mailOptions = {
        from: 'ChaarMatthew16@gmail.com', // replace with your email
        to: username,  // Assuming username is the email for simplicity
        subject: 'Your 2FA Code',
        text: `Your 2FA code is: ${twoFACode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('2FA code sent');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
