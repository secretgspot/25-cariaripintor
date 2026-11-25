<script>
	import { m } from '#lib/paraglide/messages.js';

	const steps = [
		{
			image: '/assets/process/preparation',
			title: m.process_preparation_title(),
			description: m.process_preparation_description(),
		},
		{
			image: '/assets/process/painting',
			title: m.process_painting_title(),
			description: m.process_painting_description(),
		},
		{
			image: '/assets/process/cleanup',
			title: m.process_cleanup_title(),
			description: m.process_cleanup_description(),
		},
		{
			image: '/assets/process/signoff',
			title: m.process_signoff_title(),
			description: m.process_signoff_description(),
		},
	];

	const sizes = '(min-width: 769px) 25vw, (min-width: 481px) 50vw, 100vw';
</script>

<section class="process" aria-labelledby="process-title">
	<!-- <h2 class="title" id="process-title">{m.process_title()}</h2> -->

	<div class="grid">
		{#each steps as step}
			<article class="card">
				<img
					class="media"
					src={`${step.image}.jpg`}
					srcset={`${step.image}-512.webp 512w, ${step.image}-800.webp 800w`}
					{sizes}
					width="512"
					height="512"
					loading="lazy"
					decoding="async"
					alt=""
				/>
				<div class="content">
					<h3>{step.title}</h3>
					<p>{step.description}</p>
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	.process {
		--e: cubic-bezier(0.19, 1, 0.22, 1);
		grid-column: 1 / -1;
		container-type: inline-size;
		padding: var(--size-medium) var(--size-small) 0;
		background: var(--bg-tertiary);
	}

	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-block: 0 var(--size-medium);
		background: var(--gradient-gold) fixed;
		color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
	}

	.grid {
		display: grid;
		gap: var(--size-small);
		padding-bottom: var(--size-medium);
	}

	@container (min-width: 30rem) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@container (min-width: 48rem) {
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.card {
		position: relative;
		display: grid;
		align-items: end;
		aspect-ratio: 4 / 5;
		overflow: hidden;
		padding: var(--size-small);
		color: var(--txt-inverted);
		border-radius: var(--border-radius);
		box-shadow: 0 1.5rem 2rem -2rem var(--bg-inverted);
		filter: brightness(var(--brightness));

		.media {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			background-image: linear-gradient(
				to bottom,
				rgb(0 0 0 / 0) 20%,
				rgb(0 0 0 / 0.45) 62%,
				rgb(0 0 0 / 0.82) 100%
			);
			pointer-events: none;
		}

		.content {
			position: relative;
			z-index: 1;
			display: grid;
			gap: var(--size-extra-small);

			h3 {
				font-size: 1.3rem;
				font-weight: bold;
				line-height: 1.2;
			}

			p {
				font-style: italic;
				line-height: 1.35;
			}
		}
	}

	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			.card {
				animation: reveal linear both;
				animation-timeline: view();
				animation-range: entry 10% cover 30%;
			}
			.card:nth-child(2) {
				animation-range: entry 15% cover 35%;
			}
			.card:nth-child(3) {
				animation-range: entry 20% cover 40%;
			}
			.card:nth-child(4) {
				animation-range: entry 25% cover 45%;
			}
		}
	}

	@keyframes reveal {
		from {
			opacity: 0;
			translate: 0 2rem;
		}
	}
</style>
