<script>
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { m } from '#lib/paraglide/messages.js';
	import { generateRandomNumber } from '#lib/utils.js';
	import Header from '../components/Header.svelte';
	import Process from '../components/Process.svelte';
	import Footer from '../components/Footer.svelte';
	import Mission from '../components/Mission.svelte';
	import Intro from '../components/Intro.svelte';
	import Contact from '../components/Contact.svelte';
	import Faq from '../components/FAQ.svelte';
	import Estimator from '../components/Estimator.svelte';
	import Ad from '../components/Ad.svelte';

	const locale = getLocale();
	const wordmark = `/assets/logos/cariari_painter_v6_${locale}`;
	const houseUrl = `/assets/houses/house_${generateRandomNumber(1, 25)}.jpg`;
	const ogImage = `https://cariaripintor.com/assets/logos/og-image${locale === 'en' ? '-en' : ''}.jpg`;
</script>

<svelte:head>
	<title>{m.meta_title()}</title>
	<meta name="description" content={m.meta_description()} />
	<link rel="canonical" href="https://cariaripintor.com/" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Cariari Painter" />
	<meta property="og:locale" content={locale === 'es' ? 'es_CR' : 'en_US'} />
	<meta property="og:title" content={m.meta_title()} />
	<meta property="og:description" content={m.meta_description()} />
	<meta property="og:url" content="https://cariaripintor.com/" />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={m.meta_title()} />
	<meta name="twitter:description" content={m.meta_description()} />
	<meta name="twitter:image" content={ogImage} />
	<link rel="preload" as="image" href={houseUrl} />
</svelte:head>

<article id="home" class="home">
	<Header />

	<section id="section--home-hero" style={`background-image: url('${houseUrl}')`}>
		<img
			src={`${wordmark}.webp`}
			srcset={`${wordmark}-800.webp 800w, ${wordmark}.webp 1424w`}
			sizes="(min-width: 1440px) 54vw, (min-width: 481px) 73vw, 96vw"
			width="1424"
			height="751"
			alt="Cariari Painter logo, exterior home painting services in Cariari, Costa Rica"
			class="hero-text-1"
			loading="eager"
			decoding="async"
			fetchpriority="high" />
	</section>

	<Intro />

	<Process />
	<Estimator />

	<Faq />

	<Mission />

	<Contact />

	<Ad />

	<Footer />
</article>

<style>
	article {
		display: grid;
		/* min() keeps the content column inside narrow viewports: a bare 42ch
		   is ~374px wide and overflows phones. */
		grid-template-columns: 1fr min(42ch, 100% - var(--size-medium)) 1fr;
		align-items: center;
		justify-content: center;
		position: relative;
		background: var(--bg-primary);
		width: 100%;

		/* Small tablets and larger mobile devices (481px - 768px) */
		@media (min-width: 481px) {
			grid-template-columns: 1fr min(72ch, 100% - var(--size-medium)) 1fr;
		}

		/* Tablets and small laptops (769px - 1024px) */
		@media (min-width: 769px) {
			grid-template-columns: 1fr min(81ch, 100% - var(--size-medium)) 1fr;
		}

		/* Large desktops and high-resolution screens (1025px and up) */
		@media (min-width: 1025px) {
			grid-template-columns: 1fr min(90ch, 100% - var(--size-medium)) 1fr;
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
		width: min(96dvw, 100%);
		max-width: 801px;
		height: auto;
		transform: translateY(73px);
		z-index: 2;

		/* Small tablets and larger mobile devices (481px - 768px) */
		@media (min-width: 481px) {
			width: min(73dvw, 100%);
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
			width: min(54dvw, 100%);
			transform: translateY(135px);
		}
	}
</style>
