<script>
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { m } from '#lib/paraglide/messages.js';

	const SURFACE_TYPES = {
		smooth: 1,
		textured: 1.2,
		porous: 1.5
	};

	const QUALITY_LEVELS = {
		economy: 1,
		premium: 1.5,
		luxury: 1.8
	};

	const COATS = 2;
	const COVERAGE_M2_PER_GALLON = 33;
	const LITERS_PER_GALLON = 3.785411784;
	// VITE_PRICE is the 2-coat price per m², so the estimate below matches it exactly.
	const PRICE_PER_M2_USD = Number(import.meta.env.VITE_PRICE) || 16;
	const EXCHANGE_RATE = Number(import.meta.env.VITE_EXCHANGE_RATE) || 506;

	// Spanish visitors start with litres and colones, English visitors with gallons and dollars.
	// Both outputs stay clickable so either can be switched at any time.
	const locale = getLocale();
	const metric = locale !== 'en';

	const SIZE_PRESETS = [
		{ id: 'small', area: 80, label: m.estimator_size_small() },
		{ id: 'medium', area: 140, label: m.estimator_size_medium() },
		{ id: 'large', area: 220, label: m.estimator_size_large() }
	];

	const SURFACE_OPTIONS = [
		{
			id: 'smooth',
			label: m.estimator_surface_type_smooth(),
			hint: m.estimator_surface_type_smooth_hint()
		},
		{
			id: 'textured',
			label: m.estimator_surface_type_textured(),
			hint: m.estimator_surface_type_textured_hint()
		},
		{
			id: 'porous',
			label: m.estimator_surface_type_porous(),
			hint: m.estimator_surface_type_porous_hint()
		}
	];

	const QUALITY_OPTIONS = [
		{
			id: 'economy',
			label: m.estimator_paint_quality_economy(),
			hint: m.estimator_paint_quality_economy_hint()
		},
		{
			id: 'premium',
			label: m.estimator_paint_quality_premium(),
			hint: m.estimator_paint_quality_premium_hint()
		},
		{
			id: 'luxury',
			label: m.estimator_paint_quality_luxury(),
			hint: m.estimator_paint_quality_luxury_hint()
		}
	];

	let surfaceArea = $state(140);
	let selectedSize = $state('medium');
	let showArea = $state(false);
	let surface = $state('smooth');
	let quality = $state('economy');
	let weight = $state(metric ? 'liters' : 'gallons');
	let currency = $state(metric ? 'colones' : 'dollars');

	const chooseSize = (preset) => {
		surfaceArea = preset.area;
		selectedSize = preset.id;
	};

	const adjustArea = (event) => {
		surfaceArea = Number(event.currentTarget.value);
		selectedSize = null;
	};

	const toggleWeight = () => {
		weight = weight === 'liters' ? 'gallons' : 'liters';
	};
	const toggleCurrency = () => {
		currency = currency === 'colones' ? 'dollars' : 'colones';
	};

	const area = $derived(Math.max(0, Number(surfaceArea) || 0));
	const gallons = $derived(
		((area * SURFACE_TYPES[surface]) / COVERAGE_M2_PER_GALLON) * COATS
	);
	const paint = $derived(weight === 'liters' ? gallons * LITERS_PER_GALLON : gallons);
	const costUsd = $derived(area * QUALITY_LEVELS[quality] * SURFACE_TYPES[surface] * PRICE_PER_M2_USD);
	const cost = $derived(currency === 'colones' ? costUsd * EXCHANGE_RATE : costUsd);

	const numberFormat = new Intl.NumberFormat(metric ? 'es-CR' : 'en-US', {
		maximumFractionDigits: 1
	});
	// Matches the original rounding: one decimal, always rounded up.
	const round = (value) => Math.ceil(value * 10) / 10;

	const paintUnit = $derived(weight === 'liters' ? m.estimator_liters() : m.estimator_gallons());
	const costUnit = $derived(currency === 'colones' ? m.estimator_colons() : m.estimator_dollars());
	// Shown under the segmented controls on narrow screens, where the per-option
	// hints are hidden to keep the rows short.
	const surfaceHint = $derived(SURFACE_OPTIONS.find((o) => o.id === surface)?.hint ?? '');
	const qualityHint = $derived(QUALITY_OPTIONS.find((o) => o.id === quality)?.hint ?? '');
</script>

<section id="section--estimator">
	<h2 class="title">
		<!-- Estimator -->
		{m.estimator_title()}
	</h2>

	<div class="calc-wrapper">
		<aside class="inputs">
			<fieldset class="group">
				<legend>{m.estimator_size()}</legend>
				<p class="hint">{m.estimator_size_hint()}</p>
				<div class="presets">
					{#each SIZE_PRESETS as preset}
						<button
							type="button"
							class="preset"
							class:active={selectedSize === preset.id}
							aria-pressed={selectedSize === preset.id}
							onclick={() => chooseSize(preset)}>
							<span class="preset-name">{preset.label}</span>
							<span class="preset-area">≈ {preset.area} m²</span>
						</button>
					{/each}
				</div>
				<button
					type="button"
					class="linkish"
					aria-expanded={showArea}
					aria-controls="area-control"
					onclick={() => (showArea = !showArea)}>
					{m.estimator_area_adjust()}
				</button>
				{#if showArea}
					<label class="slider" id="area-control">
						<span>{m.estimator_surface_area()}: <strong>{surfaceArea} m²</strong></span>
						<input
							type="range"
							min="10"
							max="500"
							step="10"
							value={surfaceArea}
							oninput={adjustArea} />
					</label>
				{/if}
			</fieldset>

			<fieldset class="group">
				<legend>{m.estimator_surface_type()}</legend>
				<div class="options">
					{#each SURFACE_OPTIONS as option}
						<label class="option" class:active={surface === option.id}>
							<input
								type="radio"
								name="surface"
								value={option.id}
								bind:group={surface}
								aria-describedby="surface-hint-{option.id}" />
							<span class="option-title">{option.label}</span>
							<span class="option-hint" id="surface-hint-{option.id}">{option.hint}</span>
						</label>
					{/each}
				</div>
				<p class="selected-hint" aria-hidden="true">{surfaceHint}</p>
			</fieldset>

			<fieldset class="group">
				<legend>{m.estimator_paint_quality()}</legend>
				<div class="options">
					{#each QUALITY_OPTIONS as option}
						<label class="option" class:active={quality === option.id}>
							<input
								type="radio"
								name="quality"
								value={option.id}
								bind:group={quality}
								aria-describedby="quality-hint-{option.id}" />
							<span class="option-title">{option.label}</span>
							<span class="option-hint" id="quality-hint-{option.id}">{option.hint}</span>
						</label>
					{/each}
				</div>
				<p class="selected-hint" aria-hidden="true">{qualityHint}</p>
			</fieldset>

		<small class="note">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				aria-hidden="true">
				<linearGradient
					id="gold1"
					x1="93"
					x2="600"
					y1="333"
					y2="333"
					gradientTransform="matrix(1 0 0 -1 -93 600)"
					gradientUnits="userSpaceOnUse">
					<stop offset="0" stop-color="#c4992f"></stop>
					<stop offset=".12" stop-color="#b1872d"></stop>
					<stop offset=".31" stop-color="#f9f396"></stop>
					<stop offset=".41" stop-color="#e6d16e"></stop>
					<stop offset=".56" stop-color="#c4992f"></stop>
					<stop offset=".59" stop-color="#ceab41"></stop>
					<stop offset=".65" stop-color="#e1c966"></stop>
					<stop offset=".7" stop-color="#efe07e"></stop>
					<stop offset=".75" stop-color="#f7ee8e"></stop>
					<stop offset=".79" stop-color="#f9f396"></stop>
					<stop offset=".88" stop-color="#b1872d"></stop>
					<stop offset="1" stop-color="#c4992f"></stop>
				</linearGradient>
				<path fill="url(#gold1)" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
			</svg>
			<!-- This estimation assumes 2 coats of paint. Actual requirements and costs may vary depending
				on project specifics. This is an approximate estimate, not a final quote. -->
			{m.estimator_note()}
			</small>

		</aside>

		<aside class="outputs" aria-live="polite">
			<h3>
				<span>{surfaceArea}</span>
				<small>{m.estimator_unit_m2()}</small>
			</h3>

			<button
				type="button"
				onclick={toggleWeight}
				class="clickable"
				title={weight === 'liters' ? m.estimator_switch_to_gallons() : m.estimator_switch_to_liters()}>
				<span>{numberFormat.format(round(paint))}</span>
				<small>{paintUnit}</small>
				<span class="sr-only">
					— {weight === 'liters' ? m.estimator_switch_to_gallons() : m.estimator_switch_to_liters()}
				</span>
			</button>

			<hr />

			<button
				type="button"
				onclick={toggleCurrency}
				class="clickable total"
				title={currency === 'colones' ? m.estimator_switch_to_dollars() : m.estimator_switch_to_colons()}>
				<span>{numberFormat.format(round(cost))}</span>
				<small>{costUnit}</small>
				<span class="sr-only">
					— {currency === 'colones' ? m.estimator_switch_to_dollars() : m.estimator_switch_to_colons()}
				</span>
			</button>
		</aside>
</section>

<style>
	#section--estimator {
		grid-column: 2 / -2;

		position: relative;
		margin-block: 0 var(--size-large);
		&::before {
			content: '';
			position: absolute;
			left: 50%;
			top: 0;
			border-style: solid;
			border-width: 36px 36px 0 36px;
			border-color: var(--bg-tertiary) transparent transparent transparent;
			transform: translateX(-50%);
		}
	}

	.calc-wrapper {
		gap: var(--size-small);
		display: flex;
		flex-direction: column;

		/* Tablets and small laptops (769px - 1024px) */
		@media (min-width: 769px) {
			flex-direction: row-reverse;
			justify-content: space-between;
			align-items: flex-start;
		}
	}

	.inputs {
		display: flex;
		flex-direction: column;
		gap: var(--size-small);
		flex: 1 1 auto;
		min-width: 0;
		max-width: 54ch;
	}

	.group {
		border: 0;
		padding: 0;
		margin: 0;
		min-width: 0;

		> legend {
			padding: 0;
			font-size: 0.75rem;
			font-weight: 600;
			color: var(--txt-secondary);
		}
	}

	.hint {
		margin: 2px 0 0;
		font-size: 0.75rem;
		line-height: 1.3;
		color: var(--txt-tertiary);
	}

	.presets {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 4px;
		margin-top: 6px;
	}

	.preset {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1px;
		padding: 0.4rem 0.35rem;
		background: var(--bg-secondary);
		color: var(--txt-primary);
		border: 1px solid var(--bg-tertiary);
		border-radius: var(--border-radius);
		cursor: pointer;
		line-height: 1.2;
		transition: var(--duration) ease;

		&:hover {
			border-color: #c4992f;
		}

		&.active {
			border-color: #c4992f;
			box-shadow: inset 0 0 0 1px #c4992f;
		}
	}

	.preset-name {
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.preset-area {
		font-size: 0.6875rem;
		color: var(--txt-tertiary);
	}

	.linkish {
		align-self: flex-start;
		margin-top: 2px;
		padding: 0;
		background: none;
		border: 0;
		color: var(--txt-secondary);
		font-size: 0.75rem;
		text-decoration: underline;
		text-underline-offset: 2px;
		cursor: pointer;
	}

	.slider {
		display: grid;
		gap: 4px;
		margin-top: 6px;
		font-size: 0.75rem;
		color: var(--txt-secondary);

		> strong {
			color: var(--txt-primary);
		}

		> input {
			width: 100%;
			accent-color: #c4992f;
		}
	}

	.options {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 4px;
		margin-top: 6px;
	}

	.option {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1px;
		min-height: 34px;
		padding: 0.4rem 0.5rem;
		background: var(--bg-secondary);
		border: 1px solid var(--bg-tertiary);
		border-radius: var(--border-radius);
		cursor: pointer;
		line-height: 1.2;
		transition: var(--duration) ease;

		&:hover {
			border-color: #c4992f;
		}

		&.active {
			border-color: #c4992f;
			box-shadow: inset 0 0 0 1px #c4992f;
		}

		&:focus-within {
			outline: 2px solid var(--txt-secondary);
			outline-offset: 2px;
		}

		> input {
			position: absolute;
			width: 0;
			height: 0;
			opacity: 0;
		}
	}

	.option-title {
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.option-hint {
		font-size: 0.6875rem;
		line-height: 1.25;
		color: var(--txt-tertiary);
	}

	.selected-hint {
		display: none;
		margin: 6px 0 0;
		font-size: 0.75rem;
		line-height: 1.3;
		color: var(--txt-tertiary);
	}

	/* Phones: keep the three choices on one row and move the description of
	   the current choice below the row, so the controls stay short. */
	@media (max-width: 480px) {
		.option {
			align-items: center;
			padding: 0.4rem 0.25rem;
			text-align: center;
		}

		.option-hint {
			display: none;
		}

		.selected-hint {
			display: block;
		}
	}

	.outputs {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		flex: 0 0 auto;
		margin: 0 var(--size-small) 0 0;
		justify-content: flex-end;
		/* Tablets and small laptops (769px - 1024px) */
		@media (min-width: 769px) {
			align-self: center;
		}
	}

	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-block: calc(var(--size-large) * 1.5) var(--size-medium);
		background: var(--gradient-gold) fixed;
		color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
	}

	.note {
		margin-top: var(--size-small);
		color: var(--txt-tertiary);
		padding: var(--size-small);
		border: 1px dashed var(--border-color);
		border-radius: var(--border-radius);
		gap: 0 var(--size-small);
		display: grid;
		grid-template-columns: minmax(36px, 45px) 1fr;
		justify-items: center;
		align-items: center;

		/* Tablets and small laptops (769px - 1024px) */
		@media (min-width: 769px) {
			max-width: 81ch;
			place-self: center;
		}

		/* Phones: reduce padding so note doesn't distract from output values */
		@media (max-width: 480px) {
			padding: var(--size-extra-small);
			line-height: normal;
		}

		> svg {
			width: 30px;
			height: auto;
		}
	}

	h3,
	button.clickable {
		font-size: var(--size-large);
		margin: 0;
		font-weight: lighter;
		border: 0;
		background: var(--bg-primary);
		> small {
			text-transform: uppercase;
			font-size: small;
		}
		&.total {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
	}

	hr {
		margin-block: var(--size-small);
	}

	.clickable {
		cursor: pointer;
		transition: var(--duration) ease;
		&:hover {
			background: var(--gradient);
		}
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}
</style>
