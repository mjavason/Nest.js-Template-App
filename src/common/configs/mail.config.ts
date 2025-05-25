import nodeMailer from 'nodemailer';
import { MAIL_ADDRESS, MAIL_PASSWORD } from './constants';

export const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: MAIL_ADDRESS,
    pass: MAIL_PASSWORD,
  },
});
