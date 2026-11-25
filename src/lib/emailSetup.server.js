import nodemailer from 'nodemailer';
import { VITE_GOOGLE_EMAIL, VITE_GOOGLE_EMAIL_PASSWORD } from '$app/env/private';

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: VITE_GOOGLE_EMAIL,
		pass: VITE_GOOGLE_EMAIL_PASSWORD
	}
});

export default transporter;
