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
	.mission {
		--gradient-3: oklch(0.41 0.15 258.33);
		--gradient-4: oklch(0.59 0.13 249.56);
		margin-block: 4rem 3rem;
		padding: 3rem;
		/* Small tablets and larger mobile devices (481px - 768px) */
		@media (min-width: 481px) {
			margin-block: 6rem 6rem;
		}

		p {
			font-size: 1.5rem;
			max-width: 36ch;
			text-align: justify;

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
				margin-inline-end: 1rem;
			}
		}
	}
</style>
