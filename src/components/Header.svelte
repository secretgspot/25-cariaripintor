<script>
	import { getLocale } from '$lib/paraglide/runtime.js';
	import { setLocale } from '$lib/paraglide/runtime';

	let locale = getLocale();
</script>

<header>
	<img
		src="./assets/logo.svg"
		alt="Cariari Painters logo, exterior home painting services in Cariari, Costa Rica"
		class="logo"
		width="60"
		height="60"
		loading="eager" />
	<h1 class="title">Cariari Painter</h1>
	<div class="lang-buttons">
		<button
			onclick={() => setLocale('es')}
			class="lang-button"
			class:active={locale == 'es'}
			title="Espanol"
			id="es">
			<img
				src="./assets/flag_cr.png"
				alt="Costa Rica flag for Spanish language selection"
				width="27"
				height="27"
				loading="lazy" />
		</button>
		<button
			onclick={() => setLocale('en')}
			class="lang-button"
			class:active={locale == 'en'}
			title="English"
			id="en">
			<img
				src="./assets/flag_usa.png"
				alt="USA flag for English language selection"
				width="27"
				height="27"
				loading="lazy" />
		</button>
	</div>
</header>

<style>
	/* Small tablets and larger mobile devices (481px - 768px) */
	@media (min-width: 481px) {
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
		height: 100%;
		transition: transform 0.3s ease;
		/* cursor: pointer; */
	}

	.title {
		transition: transform 0.3s ease;
		position: relative;
		background:
			radial-gradient(
				ellipse farthest-corner at right bottom,
				#fedb37 0%,
				#fdb931 8%,
				#9f7928 30%,
				#8a6e2f 40%,
				transparent 80%
			),
			radial-gradient(
					ellipse farthest-corner at left top,
					#ffffff 0%,
					#ffffac 8%,
					#d1b464 25%,
					#5d4a1f 62.5%,
					#5d4a1f 100%
				)
				fixed;
		color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
		display: none;
	}
	.lang-buttons {
		cursor: default;
		gap: 1ch;
		display: flex;
	}
	.lang-button {
		background: transparent;
		border-radius: 50%;
		width: 27px;
		height: 27px;
		padding: 0;
		border: none;
		cursor: pointer;
		&:hover {
			filter: brightness(1.2);
		}
		&:global(.active) {
			outline: 3px solid var(--color-white);
		}
	}
</style>
