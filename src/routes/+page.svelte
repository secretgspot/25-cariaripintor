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

	// Responsive image srcset for hero background
	let houseUrl = `./assets/houses/house_${generateRandomNumber(1, 25)}.jpg`;
	let houseSrcSet = Array.from({length: 25}, (_, i) => `/assets/houses/house_${i+1}.jpg 1200w`).join(', ');
</script>

<article id="home" class="home">
	<Header />

	<section id="section--home-hero" style="background-image: url({houseUrl})">
		<img
			src="/assets/logos/cariari_painter_v6_{getLocale()}.png"
			alt="Cariari Painter logo, exterior home painting services in Cariari, Costa Rica"
			class="hero-text-1"
			loading="eager"
		/>
	</section>

	<Intro />

	<Process />
	<Estimator />

	<Faq />

	<Mission />

	<Contact />

	<Footer />
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		background: var(--bg-primary);
		max-width: 1280px;

		/* Large desktops and high-resolution screens (1025px and up) */
		@media (min-width: 1025px) {
			width: 93vw;
			border-radius: var(--border-radius);
			margin-block: 3em;
			box-shadow: var(--bg-primary) 0px 20px 30px -10px;
		}

		/* Extra-large screens (1440px and up) */
		@media (min-width: 1440px) {
			width: 80vw;
		}
	}

	section {
		background-size: cover;
		background-position: center;
		position: relative;
		width: 100%;
		height: 69vh;
		display: grid;
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
