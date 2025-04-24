<script>
	import { m } from '$lib/paraglide/messages.js';

	const SURFACE_TYPES = {
		smooth: 1,
		textured: 1.2,
		porous: 1.5,
	};

	const QUALITY_LEVELS = {
		economy: 1,
		premium: 1.5,
		luxury: 1.8,
	};

	const COAT_MULTIPLIERS = {
		1: 1,
		2: 1.25,
		3: 1.5,
	};

	let exchangeRate = import.meta.env.VITE_EXCHANGE_RATE; // Example exchange rate for colones to dollars
	let price = import.meta.env.VITE_PRICE / (1.25 * 1); // Adjusted so total comes to $16 with coats=2 and quality=economy
	let surfaceArea = 1;
	let surface = 'smooth';
	let quality = 'economy';
	let coats = 2;
	let weightType = 'gallons';
	let unitsType = 'meters';
	let currencyType = 'colones';

	const round = (val) => Math.ceil(val * 10) / 10;
	const fixed = (val) => val.toFixed(0);

	const toLiters = (gallons) => gallons * 3.785411784;
	const toDollars = (colones) => colones / exchangeRate;

	$: paint = calcPaint(surfaceArea, coats, SURFACE_TYPES[surface], weightType, unitsType);
	$: cost = calcCost(
		surfaceArea,
		QUALITY_LEVELS[quality],
		COAT_MULTIPLIERS[coats],
		SURFACE_TYPES[surface],
		currencyType,
		unitsType,
	);

	function calcPaint(area, coats, surfaceMult, weight, units) {
		const coverage = units === 'meters' ? 33 : 360;
		const totalArea = area * surfaceMult;
		const gallons = (totalArea / coverage) * coats;
		return weight === 'liters' ? toLiters(gallons) : gallons;
	}

	function calcCost(area, qualityMult, coatMult, surfaceMult, currency, units) {
		const basePrice = price;
		const exchange = exchangeRate;
		const pricePerUnit =
			units === 'meters' ? basePrice * exchange : (basePrice * exchange) / 3.281;
		const colones = area * qualityMult * coatMult * surfaceMult * pricePerUnit;
		return currency === 'dollars' ? toDollars(colones) : colones;
	}
</script>

<section id="section--estimator">
	<h1 class="title">
		<!-- Estimator -->
		{m.estimator_title()}
	</h1>

	<div class="calc-wrapper">
		<aside class="inputs">
			<label>
				<!-- Surface Area: -->
				{m.estimator_surface_area()}
				<input type="number" min="0" max="999" bind:value={surfaceArea} />
			</label>

			<label>
				<!-- Surface Type: -->
				{m.estimator_surface_type()}
				<select bind:value={surface}>
					<option value="smooth">
						<!-- Smooth -->
						{m.estimator_surface_type_smooth()}
					</option>
					<option value="textured">
						<!-- Textured -->
						{m.estimator_surface_type_textured()}
					</option>
					<option value="porous">
						<!-- Porous -->
						{m.estimator_surface_type_porous()}
					</option>
				</select>
			</label>

			<label>
				<!-- Paint Quality: -->
				{m.estimator_paint_quality()}
				<select bind:value={quality}>
					<option value="luxury">
						<!-- Luxury -->
						{m.estimator_paint_quality_luxury()}
					</option>
					<option value="premium">
						<!-- Premium -->
						{m.estimator_paint_quality_premium()}
					</option>
					<option value="economy">
						<!-- Economy -->
						{m.estimator_paint_quality_economy()}
					</option>
				</select>
			</label>
		</aside>

		<aside class="outputs">
			<h3>
				<span>{surfaceArea}</span>
				<small>{unitsType}<sup>2</sup></small>
			</h3>

			<h3
				on:click={() => (weightType = weightType === 'gallons' ? 'liters' : 'gallons')}
				class="clickable">
				<span>{round(paint)}</span>
				<small>{weightType}</small>
			</h3>

			<hr />

			<h3
				on:click={() =>
					(currencyType = currencyType === 'colones' ? 'dollars' : 'colones')}
				class="clickable">
				<span>{round(cost).toLocaleString()}</span>
				<small>{currencyType}</small>
			</h3>
		</aside>
	</div>

	<small class="note">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
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
</section>

<style>
	#section--estimator {
		position: relative;
		max-width: clamp(360px, 69dvw, 93ch);
		margin-block: 0 3rem;
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
		gap: 1rem;
		display: flex;
		flex-direction: column;
		/* Small tablets and larger mobile devices (481px - 768px) */
		@media (min-width: 481px) {
		}

		/* Tablets and small laptops (769px - 1024px) */
		@media (min-width: 769px) {
			flex-direction: row-reverse;
			justify-content: space-between;
		}

		/* Large desktops and high-resolution screens (1025px and up) */
		@media (min-width: 1025px) {
		}

		/* Extra-large screens (1440px and up) */
		@media (min-width: 1440px) {
		}
	}

	.inputs {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		> label {
			font-size: smaller;
			margin-bottom: 1rem;
			> input,
			> select {
				width: 100%;
				padding: 0.5rem;
				margin-top: 0.2rem;
				background: var(--bg-secondary);
				color: var(--txt-primary);
				border: 1px solid var(--bg-tertiary);
				border-radius: var(--border-radius);
				min-height: 45px;
			}
		}
	}

	.outputs {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin: 0 1rem 0 0;
		justify-content: flex-end;
	}

	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-block: 4rem 3rem;
	}

	.note {
		margin-top: 2rem;
		color: var(--txt-tertiary);
		padding: 1rem;
		border: 1px dashed var(--border);
		border-radius: var(--border-radius);
		gap: 0 1rem;
		display: grid;
		grid-template-columns: minmax(36px, 45px) 1fr;
		justify-items: center;
		align-items: center;

		> svg {
			width: 30px;
			height: auto;
		}
	}

	h3 {
		/* font-family: 'Mission Script', cursive; */
		font-size: 2.7rem;
		margin: 0;
		font-weight: lighter;
	}

	h3 small {
		font-family: 'Open Sans', sans-serif;
		text-transform: uppercase;
		font-size: small;
	}

	hr {
		margin-block: 1rem;
	}

	.clickable {
		cursor: pointer;
		transition: 0.3s ease;
		&:hover {
			background: var(--gradient);
		}
	}
</style>
