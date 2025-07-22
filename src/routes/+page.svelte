<script>
	import { getLocale } from '$lib/paraglide/runtime.js';
	import { scale } from 'svelte/transition';
	import { generateRandomNumber } from '$lib/utils.js';
	import Header from '../components/Header.svelte';
	import Process from '../components/Process.svelte';
	import Footer from '../components/Footer.svelte';
	import Mission from '../components/Mission.svelte';
	import Intro from '../components/Intro.svelte';
	import Contact from '../components/Contact.svelte';
	import Faq from '../components/FAQ.svelte';
	import Estimator from '../components/Estimator.svelte';
	import Ad from '../components/Ad.svelte';

	// Responsive image srcset for hero background
	let houseUrl = `./assets/houses/house_${generateRandomNumber(1, 25)}.jpg`;
	let houseSrcSet = Array.from(
		{ length: 25 },
		(_, i) => `/assets/houses/house_${i + 1}.jpg 1200w`,
	).join(', ');
</script>

<article id="home" class="home">
	<Header />

	<section id="section--home-hero" style="background-image: url({houseUrl})">
		<img
			src="/assets/logos/cariari_painter_v6_{getLocale()}.png"
			alt="Cariari Painter logo, exterior home painting services in Cariari, Costa Rica"
			class="hero-text-1"
			loading="eager" />
	</section>

	<Intro />

	<Process />
	<Estimator />

	<Faq />

	<Mission />

	<Contact />

	<Ad width="320" height="100">
		<a
			href="//cariari.agency"
			target="_blank"
			rel="noreferrer"
			title="Cariari Agency Real Estate Listings">
			<img src="/assets/ads/cariari.agency_a.webp" alt="Cariari Agency" loading="lazy" />
		</a>
	</Ad>

	<Footer />
</article>

<style>
	article {
		display: grid;
		grid-template-columns: 1fr 42ch 1fr;
		align-items: center;
		justify-content: center;
		position: relative;
		background: var(--bg-primary);
		width: 100%;

		/* Small tablets and larger mobile devices (481px - 768px) */
		@media (min-width: 481px) {
			grid-template-columns: 1fr 72ch 1fr;
		}

		/* Tablets and small laptops (769px - 1024px) */
		@media (min-width: 769px) {
			grid-template-columns: 1fr 81ch 1fr;
		}

		/* Large desktops and high-resolution screens (1025px and up) */
		@media (min-width: 1025px) {
			grid-template-columns: 1fr 90ch 1fr;
			max-width: 1080px;
			border-radius: var(--border-radius);
			margin-block: var(--size-large);
		}

		/* Extra-large screens (1440px and up) */
		@media (min-width: 1440px) {
		}
	}

	section {
		background-size: cover;
		background-position: center;
		position: relative;
		width: 100%;
		height: 69vh;
		display: grid;
		grid-column: 1 / -1;
		justify-items: center;
		align-items: end;
		border-top-left-radius: inherit;
		border-top-right-radius: inherit;
		filter: brightness(var(--brightness));
		&::before {
			content: '';
			position: absolute;
			z-index: 2;
			background-image: url(/assets/painter.png);
			background-size: contain;
			width: 160px;
			height: 300px;
			bottom: 10px;
			left: auto;
		}
		/* Tablets and small laptops (769px - 1024px) */
		@media (min-width: 769px) {
			&::before {
				bottom: 10px;
				right: 10%;
			}
		}
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(0deg, var(--bg-primary), transparent 13%);
			border-top-left-radius: inherit;
			border-top-right-radius: inherit;
			/* Tablets and small laptops (769px - 1024px) */
			@media (min-width: 769px) {
				top: 1px;
			}
		}
	}
	img.hero-text-1 {
		width: 96dvw;
		max-width: 801px;
		transform: translateY(73px);
		z-index: 2;

		/* Small tablets and larger mobile devices (481px - 768px) */
		@media (min-width: 481px) {
			width: 73dvw;
			transform: translateY(101px);
		}

		/* Tablets and small laptops (769px - 1024px) */
		@media (min-width: 769px) {
			transform: translateY(130px);
		}

		/* Large desktops and high-resolution screens (1025px and up) */
		@media (min-width: 1025px) {
		}

		/* Extra-large screens (1440px and up) */
		@media (min-width: 1440px) {
			width: 54dvw;
			transform: translateY(135px);
		}
	}
</style>
