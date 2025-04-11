import { VITE_GOOGLE_EMAIL } from '$env/static/private';
import transporter from "$lib/emailSetup.server.js";

export const actions = {
	// default: async ({ request }) => {
	// 	const formData = await request.formData();
	// 	const data = Object.fromEntries(formData);
	// 	// return { data };
	// 	console.log('Form data:', data);
	// }
	default: async ({ request }) => {
		try {
			const formData = await request.formData();
			const email = formData.get("email");
			const name = formData.get("name");
			const body = formData.get("message");

			let html = `
				<h3>New message from ${name}, ${email}</h3>
				<pre>${body}</pre>
			`;

			const message = {
				from: VITE_GOOGLE_EMAIL,
				to: "secretgspot@gmail.com",
				subject: `Cariari Painter message from ${name}, ${email}`,
				text: body,
				html: html,
			};

			const sendEmail = async (message) => {
				await new Promise((resolve, reject) => {
					transporter.sendMail(message, (error, info) => {
						if (error) {
							console.error("Error sending email:", error);
							reject(error);
						} else {
							console.log("Email sent:", info.response);
							resolve(info);
						}
					});
				});
			}

			await sendEmail(message);

			return { success: true };
		} catch (error) {
			console.error("Error:", error);
			return { error: true, success: false };
		}
	}
};