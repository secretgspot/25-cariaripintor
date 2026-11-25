import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	VITE_GOOGLE_EMAIL: {},
	VITE_GOOGLE_EMAIL_PASSWORD: {}
});
