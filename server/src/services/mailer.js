import nodemailer from 'nodemailer';
import secrets from './gmail_secrets';

// Create a SMTP transporter object
let transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'chingunoreply@gmail.com',
    clientId: secrets.CLIENT_ID,
    clientSecret: secrets.CLIENT_SECRET,
    refreshToken: secrets.REFRESH_TOKEN,
    accessToken: secrets.ACCESS_TOKEN,
    expires: parseInt(secrets.EXPIRES)
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
