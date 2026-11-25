import { fail } from '@sveltejs/kit';
import { VITE_GOOGLE_EMAIL } from '$app/env/private';
import transporter from '#lib/emailSetup.server.js';

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** @param {unknown} value */
const clean = (value) => (typeof value === 'string' ? value.trim() : '');

/** @param {string} value */
const escapeHtml = (value) =>
	value.replace(
		/[&<>"']/g,
		(character) =>
			({
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#39;'
			})[character]
	);

export const actions = {
	sendMessage: async ({ request }) => {
		const formData = await request.formData();
		const name = clean(formData.get('name'));
		const email = clean(formData.get('email'));
		const body = clean(formData.get('message'));

		if (
			!name ||
			name.length > MAX_NAME ||
			!body ||
			body.length > MAX_MESSAGE ||
			email.length > MAX_EMAIL ||
			!EMAIL_PATTERN.test(email)
		) {
			return fail(400, { error: 'invalid' });
		}

		const safeName = escapeHtml(name);
		const safeEmail = escapeHtml(email);
		const safeBody = escapeHtml(body).replace(/\r?\n/g, '<br />');

		try {
			await transporter.sendMail({
				from: VITE_GOOGLE_EMAIL,
				to: VITE_GOOGLE_EMAIL,
				replyTo: email,
				subject: `Cariari Painter message from ${name}`,
				text: `${name} <${email}>\n\n${body}`,
				html: `
					<div style="font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333333;">
						<h3 style="color: #000000; font-size: 20px; margin-bottom: 15px;">New message from the Cariari Painter contact form</h3>

						<p style="margin-bottom: 8px;"><strong>From:</strong> <span style="color: #000000;">${safeName}</span></p>
						<p style="margin-bottom: 20px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #C49A2F; text-decoration: none;">${safeEmail}</a></p>

						<div style="background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; border-radius: 5px; margin-top: 15px; word-wrap: break-word;">
							${safeBody}
						</div>

						<p style="margin-top: 20px; font-size: 14px; color: #777777;">This message was sent via the contact form on your website.</p>
					</div>
				`
			});

			return { success: true };
		} catch (error) {
			console.error('Error sending contact email:', error);
			return fail(500, { error: 'send' });
		}
	}
};
