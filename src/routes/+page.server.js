import { VITE_GOOGLE_EMAIL } from '$env/static/private';
import transporter from '$lib/emailSetup.server.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	try {
		const response = await fetch('https://25-cariari-community.vercel.app/api/ads');
		if (response.ok) {
			const ads = await response.json();
			// console.log('Ads loaded successfully:', ads.length, 'ads');
			return { ads };
		} else {
			console.error('Failed to fetch ads:', response.status, response.statusText);
			return { ads: [] };
		}
	} catch (error) {
		console.error('Error fetching ads:', error);
		return { ads: [] };
	}
}

export const actions = {
	// Renamed from 'default' to 'sendMessage' (or any name you prefer)
	sendMessage: async ({ request }) => {
		try {
			const formData = await request.formData();
			const email = formData.get('email');
			const name = formData.get('name');
			const body = formData.get('message');

			let html = `
				<div style="font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333333;">
						<h3 style="color: #000000; font-size: 20px; margin-bottom: 15px;">New message from Cariari.Pintor Contact Form</h3>

						<p style="margin-bottom: 8px;"><strong>From:</strong> <span style="color: #000000;">${name}</span></p>
						<p style="margin-bottom: 20px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #C49A2F; text-decoration: none;">${email}</a></p>

						<div style="background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; border-radius: 5px; margin-top: 15px; word-wrap: break-word;">
								${body}
						</div>

						<p style="margin-top: 20px; font-size: 14px; color: #777777;">This message was sent via the contact form on your website.</p>
				</div>
			`;

			const message = {
				from: VITE_GOOGLE_EMAIL,
				to: VITE_GOOGLE_EMAIL,
				subject: `Cariari Painter message from ${name}, ${email}`,
				text: body,
				html: html
			};

			const sendEmail = async (message) => {
				await new Promise((resolve, reject) => {
					transporter.sendMail(message, (error, info) => {
						if (error) {
							console.error('Error sending email:', error);
							reject(error);
						} else {
							console.log('Email sent:', info.response);
							resolve(info);
						}
					});
				});
			};

			await sendEmail(message);

			return { success: true };
		} catch (error) {
			console.error('Error:', error);
			return { error: true, success: false };
		}
	},

	logImpression: async ({ request, fetch }) => {
		// console.log('=== Server action logImpression called ===');

		try {
			// Parse FormData instead of JSON
			const formData = await request.formData();
			const adId = formData.get('adId');

			// console.log('Received adId:', adId);

			if (!adId) {
				// console.log('No adId provided');
				return { success: false, error: 'No adId provided' };
			}

			// Now make the external API call
			const apiUrl = `https://25-cariari-community.vercel.app/api/ads/${adId}/impression`;
			// console.log('Making request to:', apiUrl);

			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			// console.log('API response status:', response.status);

			if (response.ok) {
				const responseData = await response.text();
				// console.log('API response:', responseData);
				return { success: true, message: 'Impression logged successfully' };
			} else {
				const errorText = await response.text();
				console.error('API error:', errorText);
				// Return success to not break user experience
				return { success: true, warning: `Analytics API error: ${response.status}` };
			}
		} catch (error) {
			console.error('Error in logImpression:', error);
			return { success: true, warning: `Analytics logging failed: ${error.message}` };
		}
	},

	logClick: async ({ request, fetch }) => {
		// console.log('=== Server action logClick called ===');

		try {
			// Parse FormData instead of JSON
			const formData = await request.formData();
			const adId = formData.get('adId');

			// console.log('Received adId:', adId);

			if (!adId) {
				// console.log('No adId provided');
				return { success: false, error: 'No adId provided' };
			}

			// Now make the external API call
			const apiUrl = `https://25-cariari-community.vercel.app/api/ads/${adId}/click`;
			// console.log('Making request to:', apiUrl);

			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			// console.log('API response status:', response.status);

			if (response.ok) {
				const responseData = await response.text();
				// console.log('API response:', responseData);
				return { success: true, message: 'Click logged successfully' };
			} else {
				const errorText = await response.text();
				console.error('API error:', errorText);
				// Return success to not break user experience
				return { success: true, warning: `Analytics API error: ${response.status}` };
			}
		} catch (error) {
			console.error('Error in logClick:', error);
			return { success: true, warning: `Analytics logging failed: ${error.message}` };
		}
	}
};