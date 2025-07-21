<script>
	import { m } from '$lib/paraglide/messages.js';
</script>

<section class="mission">
	<p>
		<!-- Our Mission is to deliver professional, long-lasting, and beautiful exterior painting solutions
		that enhance your home’s beauty and value while providing outstanding customer service. -->
		{m.mission()}
	</p>
</section>

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

	.mission {
		grid-column: 2 / -2;
		margin-block: calc(var(--size-large) * 1.5) var(--size-large);
		/* padding: 3rem; */
		/* Small tablets and larger mobile devices (481px - 768px) */
		@media (min-width: 481px) {
			margin-block: calc(var(--size-large) * 2);
		}

		p {
			font-size: 1.5rem;
			max-width: 36ch;
			text-align: justify;
			justify-self: center;

			/* Small tablets and larger mobile devices (481px - 768px) */
			@media (min-width: 481px) {
				font-size: 2rem;
			}

			&::first-letter {
				initial-letter: 3 3;
				font-weight: 600;
				background: var(--gradient-gold) fixed;
				color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				margin-inline-end: var(--size-small);
			}
		}
	}
</style>
