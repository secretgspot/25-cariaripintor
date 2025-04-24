<script>
	import { m } from '$lib/paraglide/messages.js';
	import { enhance } from '$app/forms';
	let { data, form } = $props();
	let sending = $state(false);
	let success = $state(false);
	let error = $state(false);
</script>

<section class="contact" id="contact">
	<div class="message">
		<header>
			<h2>
				<!-- Get in touch to schedule a consultation. -->
				{m.contact_title()}
			</h2>
		</header>
		<hr />
		<p>
			<!-- We’re helping homes in the Real Cariari area look their best. -->
			{m.contact_subtitle()}
		</p>
		<footer>
			<h3>{import.meta.env.VITE_PHONE}</h3>
		</footer>
	</div>

	<form
		method="POST"
		class="contact-form"
		use:enhance={() => {
			sending = true;

			return async ({ result, update }) => {
				await update();
				sending = false;
				if (result.type === 'success') {
					success = true;
					error = false;
				} else if (result.type === 'error') {
					success = false;
					error = true;
				}
			};
		}}>
		<div>
			<label for="name">
				<!-- Name -->
				{m.contact_name()}
			</label>
			<input type="text" id="name" name="name" autocomplete="name" required />
		</div>
		<div>
			<label for="email">
				<!-- Email -->
				{m.contact_email()}
			</label>
			<input type="email" id="email" name="email" autocomplete="email" required />
		</div>
		<div>
			<label for="message">
				<!-- Message -->
				{m.contact_message()}
			</label>
			<textarea id="message" name="message" rows="5"></textarea>
		</div>
		<div>
			<button type="submit" class="btn-grad" disabled={sending}>
				{#if sending}
					<!-- Sending... -->
					{m.contact_sending()}
				{:else}
					<!-- Send -->
					{m.contact_send()}
				{/if}
			</button>
			{#if error}
				<span class="error">
					<!-- Error sending message. -->
					{m.contact_error()}
				</span>
			{/if}
		</div>
	</form>
</section>

{#if success}
	<p class="success">
		<!-- Thank you for reaching out! We've received your message and will respond as soon as possible. -->
		{m.contact_success()}
	</p>
{/if}

<style>
	.contact {
		/* @media (prefers-color-scheme: dark) {
			--text-1: oklch(95% none none);
			--text-2: oklch(85% none none);
			--text-3: oklch(70% none none);
		} */

		/* font-family: system-ui, sans-serif; */
		display: grid;
		place-content: center;

		/* Small tablets and larger mobile devices (481px - 768px) */
		@media (min-width: 481px) {
			grid-template-columns: 1fr 1.5fr;
			margin: 5vmin;
		}

		/* Tablets and small laptops (769px - 1024px) */
		@media (min-width: 769px) {
		}

		/* Large desktops and high-resolution screens (1025px and up) */
		@media (min-width: 1025px) {
		}

		/* Extra-large screens (1440px and up) */
		@media (min-width: 1440px) {
		}
	}

	.message {
		display: grid;
		gap: 2ch;
		margin-inline: 12vmin;
		margin-block: 7.2vmin;

		/* Small tablets and larger mobile devices (481px - 768px) */
		@media (min-width: 481px) {
			margin-inline: 5vmin;
			margin-block: 7.5vmin;
		}

		header {
			display: grid;
			color: var(--txt-primary);
		}

		p {
			max-inline-size: 40ch;
			text-wrap: balance;
			line-height: 1.5;
			color: var(--txt-tertiary);
		}

		h2 {
			text-wrap: balance;
		}

		footer {
			color: var(--txt-secondary);
		}
	}

	.contact-form {
		display: grid;
		gap: 1.5ch;
		margin-inline: 5vmin;
		margin-block: 7.5vmin;
		background: var(--color-footer);
		padding: 2rem;
		border-radius: var(--border-radius);
		box-shadow: 0 0.6rem 2rem -2rem var(--bg-inverted);

		label {
			color: var(--txt-tertiary);
		}

		input,
		textarea {
			width: 100%;
			padding: 0.5rem;
			border: none;
			background: var(--color-footer-accent);
			border-radius: var(--border-radius);
			font-size: 1rem;
			color: var(--txt-inverted);
		}
	}

	p.success {
		max-width: 43ch;
		padding: 1rem;
		border: 3px solid var(--color-success);
		border-radius: var(--border-radius);
	}

	.btn-grad {
		background-image: var(--gradient-gold);
	}
	.btn-grad {
		padding: 15px 45px;
		text-align: center;
		text-transform: uppercase;
		transition: var(--duration);
		background-size: 200% auto;
		color: var(--txt-inverted);
		border-radius: var(--border-radius);
		display: block;
		border: none;
		cursor: pointer;
	}

	.btn-grad:hover {
		background-position: right center; /* change the direction of the change here */
		color: var(--txt-inverted);
		text-decoration: none;
	}
</style>
