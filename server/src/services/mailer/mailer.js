import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

console.log(process.env.CLIENT_ID)
// Create a SMTP transporter object
let transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'chingunoreply@gmail.com',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
    expires: parseInt(process.env.EXPIRES)
  },
}, {
  // sender info
  from: 'chingu <chingunoreply@gmail.com>',
});

export default message => new Promise((resolve, reject) =>
  transporter.sendMail(message, (error, info) => {
    if (error) return reject(error.message);
    transporter.close();
    return resolve('success');
}));
