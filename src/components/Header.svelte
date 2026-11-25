<script>
	import { getLocale, setLocale } from '#lib/paraglide/runtime.js';

	let locale = $state(getLocale());
</script>

<header>
	<img
		src="./assets/logo.svg"
		alt="Cariari Painters logo, exterior home painting services in Cariari, Costa Rica"
		class="logo"
		width="60"
		height="80"
		loading="eager" />
	<h1 class="title">Cariari Painter</h1>
	<div class="lang-buttons">
		<button
			type="button"
			onclick={() => setLocale('es')}
			class="lang-button"
			class:active={locale === 'es'}
			aria-pressed={locale === 'es'}
			title="Español"
			aria-label="Cambiar a español"
			id="es">
			<img
				src="./assets/flag_cr.png"
				alt=""
				width="27"
				height="27"
				loading="lazy" />
		</button>
		<button
			type="button"
			onclick={() => setLocale('en')}
			class="lang-button"
			class:active={locale === 'en'}
			aria-pressed={locale === 'en'}
			title="English"
			aria-label="Switch to English"
			id="en">
			<img
				src="./assets/flag_usa.png"
				alt=""
				width="27"
				height="27"
				loading="lazy" />
		</button>
	</div>
</header>

<style>
	header {
		display: flex;
		height: 60px;
		top: 30px;
		left: 50%;
		z-index: 3;
		position: absolute;
		gap: 10px;
		flex-direction: column;
		transform: translateX(-50%);
		/* Small tablets and larger mobile devices (481px - 768px) */
		@media (min-width: 481px) {
		}

		/* Tablets and small laptops (769px - 1024px) */
		@media (min-width: 769px) {
			left: 30px;
			transform: translateX(0%);
			flex-direction: row;
			align-items: center;
		}

		/* Large desktops and high-resolution screens (1025px and up) */
		@media (min-width: 1025px) {
		}

		/* Extra-large screens (1440px and up) */
		@media (min-width: 1440px) {
		}
	}
	.logo {
		width: 60px;
		height: auto;
		transition: transform 0.3s ease;
	}

	/* Keeps the page heading available to assistive technology without
	   competing with the hero wordmark visually. */
	.title {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.lang-buttons {
		cursor: default;
		gap: 1ch;
		display: flex;
	}
	.lang-button {
		background: transparent;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		padding: 0;
		border: none;
		cursor: pointer;
		display: grid;
		place-items: center;
		&:hover {
			filter: brightness(1.2);
		}
		&:global(.active) {
			outline: 3px solid var(--color-white);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.logo {
			transition: none;
		}
	}
</style>
