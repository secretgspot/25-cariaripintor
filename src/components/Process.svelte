<script>
	import { m } from '#lib/paraglide/messages.js';

	const steps = [
		{
			image: '/assets/process/preparation.jpg',
			title: m.process_preparation_title(),
			description: m.process_preparation_description()
		},
		{
			image: '/assets/process/painting.jpg',
			title: m.process_painting_title(),
			description: m.process_painting_description()
		},
		{
			image: '/assets/process/cleanup.jpg',
			title: m.process_cleanup_title(),
			description: m.process_cleanup_description()
		},
		{
			image: '/assets/process/signoff.jpg',
			title: m.process_signoff_title(),
			description: m.process_signoff_description()
		}
	];
</script>

<section class="process">
	{#each steps as step}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex (focusable so keyboard users can reveal the copy) -->
		<div class="card" tabindex="0" style={`--card-image: url('${step.image}')`}>
			<div class="content">
				<h2 class="title">{step.title}</h2>
				<p class="copy">{step.description}</p>
			</div>
		</div>
	{/each}
</section>

<style>
	:root {
		--e: cubic-bezier(0.19, 1, 0.22, 1);
	}

	.process {
		grid-column: 1 / -1;
		display: grid;
		grid-gap: var(--size-small);
		padding: var(--size-medium) var(--size-small);
		background: var(--bg-tertiary);
	}
	@media (min-width: 481px) {
		.process {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 769px) {
		.process {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.card {
		position: relative;
		display: flex;
		align-items: flex-end;
		overflow: hidden;
		padding: var(--size-small);
		color: var(--txt-inverted);
		border-radius: var(--border-radius);
		box-shadow: 0 1.5rem 2rem -2rem var(--bg-inverted);
		filter: brightness(var(--brightness));
		> * {
			cursor: default;
		}
	}
	@media (min-width: 481px) {
		.card {
			min-height: 350px;
		}
	}
	.card:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 110%;
		background-image: var(--card-image);
		background-size: cover;
		background-position: 0 0;
		transition: transform calc(var(--duration) * 1.5) var(--e);
		pointer-events: none;
	}
	.card:after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 200%;
		pointer-events: none;
		background-image: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.009) 11.7%,
			rgba(0, 0, 0, 0.034) 22.1%,
			rgba(0, 0, 0, 0.072) 31.2%,
			rgba(0, 0, 0, 0.123) 39.4%,
			rgba(0, 0, 0, 0.182) 46.6%,
			rgba(0, 0, 0, 0.249) 53.1%,
			rgba(0, 0, 0, 0.32) 58.9%,
			rgba(0, 0, 0, 0.394) 64.3%,
			rgba(0, 0, 0, 0.468) 69.3%,
			rgba(0, 0, 0, 0.54) 74.1%,
			rgba(0, 0, 0, 0.607) 78.8%,
			rgba(0, 0, 0, 0.668) 83.6%,
			rgba(0, 0, 0, 0.721) 88.7%,
			rgba(0, 0, 0, 0.762) 94.1%,
			rgba(0, 0, 0, 0.79) 100%
		);
		transform: translateY(-50%);
		transition: transform calc(var(--duration) * 2) var(--e);
	}

	.content {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: var(--size-small);
		transition: transform var(--duration) var(--e);
		z-index: 1;
	}
	.content > * + * {
		margin-top: var(--size-small);
	}

	.title {
		font-size: 1.3rem;
		font-weight: bold;
		line-height: 1.2;
	}

	.copy {
		font-style: italic;
		line-height: 1.35;
	}

	@media (hover: hover) and (min-width: 481px) {
		.card:after {
			transform: translateY(0);
		}

		.content {
			transform: translateY(calc(100% - 4.5rem));
		}
		.content > *:not(.title) {
			opacity: 0;
			transform: translateY(1rem);
			transition:
				transform var(--duration) var(--e),
				opacity var(--duration) var(--e);
		}

		.card:hover,
		.card:focus-within {
			align-items: center;
		}
		.card:hover:before,
		.card:focus-within:before {
			transform: translateY(-4%);
		}
		.card:hover:after,
		.card:focus-within:after {
			transform: translateY(-50%);
		}
		.card:hover .content,
		.card:focus-within .content {
			transform: translateY(0);
		}
		.card:hover .content > *:not(.title),
		.card:focus-within .content > *:not(.title) {
			opacity: 1;
			transform: translateY(0);
			transition-delay: calc(var(--duration) / 8);
		}

		.card:focus-within:before,
		.card:focus-within:after,
		.card:focus-within .content,
		.card:focus-within .content > *:not(.title) {
			transition-duration: 0s;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card:before,
		.card:after,
		.content,
		.content > *:not(.title) {
			transition: none;
		}
	}
</style>
