<script>
	/**
	 * @typedef {Object} AdConfig
	 * @property {string} id
	 * @property {string} file - Image filename
	 * @property {string} title - Ad title/alt text
	 * @property {string} href - Click destination URL
	 * @property {number} width - Ad width in pixels
	 * @property {number} height - Ad height in pixels
	 * @property {number} [weight] - Weight for random selection (higher = more likely)
	 * @property {boolean} [active] - Whether the ad is currently active
	 */

	let { ads: adList = [] } = $props();

	const selectedAd = $derived.by(() => {
		if (!adList || adList.length === 0) return null;

		const activeAds = adList.filter((ad) => ad.active !== false);
		if (activeAds.length === 0) return null;

		const totalWeight = activeAds.reduce((sum, ad) => sum + (ad.weight || 1), 0);
		let random = Math.random() * totalWeight;

		for (const ad of activeAds) {
			random -= ad.weight || 1;
			if (random <= 0) return ad;
		}

		return activeAds[0]; // Fallback
	});

	/**
	 * Logs ad impression for analytics
	 * @param {string} adId
	 */
	async function logImpression(adId) {
		try {
			// console.log('Logging impression for ad:', adId);

			// Use FormData instead of JSON
			const formData = new FormData();
			formData.append('adId', adId);

			const response = await fetch('?/logImpression', {
				method: 'POST',
				body: formData, // Send FormData instead of JSON
			});

			// console.log('Impression response status:', response.status);

			if (!response.ok) {
				const errorText = await response.text();
				console.error('Error logging ad impression:', response.status, errorText);
			} else {
				// console.log('Impression logged successfully');
			}
		} catch (error) {
			console.error('Network error logging ad impression:', error);
		}
	}

	/**
	 * Logs ad click for analytics
	 * @param {string} adId
	 */
	async function logClick(adId) {
		try {
			// console.log('Logging click for ad:', adId);

			// Use FormData instead of JSON
			const formData = new FormData();
			formData.append('adId', adId);

			const response = await fetch('?/logClick', {
				method: 'POST',
				body: formData, // Send FormData instead of JSON
			});

			// console.log('Click response status:', response.status);

			if (!response.ok) {
				const errorText = await response.text();
				console.error('Error logging ad click:', response.status, errorText);
			} else {
				// console.log('Click logged successfully');
			}
		} catch (error) {
			console.error('Network error logging ad click:', error);
		}
	}

	$effect(() => {
		if (selectedAd) {
			// console.log('Selected ad:', selectedAd);
			// console.log('Ad ID:', selectedAd.id);

			const adId = selectedAd.id;
			let impressionLogged = false;

			const log = () => {
				if (!impressionLogged) {
					logImpression(adId);
					impressionLogged = true;
				}
			};

			// Log impression after a short delay to ensure visibility
			const timer = setTimeout(log, 1000);

			return () => {
				clearTimeout(timer);
			};
		}
	});
</script>

{#if selectedAd}
	<a
		class="advertising"
		style="width:{selectedAd.width}px; height:{selectedAd.height}px; aspect-ratio:{selectedAd.width}/{selectedAd.height};"
		href={selectedAd.href}
		target="_blank"
		rel="noopener noreferrer"
		title={selectedAd.title}
		aria-label={selectedAd.title}
		onclick={() => logClick(selectedAd.id)}>
		<img
			src={selectedAd.file}
			alt={selectedAd.title}
			width={selectedAd.width}
			height={selectedAd.height}
			loading="lazy"
			decoding="async" />
	</a>
{:else}
	<!-- Fallback placeholder -->
	<div class="advertising-placeholder" aria-label="Advertisement placeholder">
		<small class="placeholder-text">
			320×100<br />
			<span class="ad-text">AD</span>
		</small>
	</div>
{/if}

<style>
	.advertising {
		grid-column: 1 / -1;
		justify-self: center;
		margin-block-start: var(--size-large);
		position: relative;
		display: block;
		line-height: 0;
		text-decoration: none;
		border-radius: var(--border-radius);
		background: var(--bg-primary);
		color: var(--bg-primary-content);

		&:hover {
			filter: brightness(1.05);
		}

		&::after {
			content: 'ad';
			position: absolute;
			top: var(--size-extra-small);
			right: var(--size-extra-small);
			color: var(--bg-primary-content);
			line-height: 1;
			text-transform: uppercase;
			background: var(--bg-primary);
			padding: calc(var(--size-extra-small) / 2) calc(var(--size-extra-small) / 2);
			border-radius: calc(var(--border-radius) / 2);
			pointer-events: none;
			font-size: xx-small;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: inherit;
		}
	}

	.advertising-placeholder {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		background: var(--bg-primary);
		color: var(--bg-primary-content);
		border-radius: var(--border-radius);
		place-self: center;
		width: 320px;
		height: 100px;
		aspect-ratio: 320/100;

		.placeholder-text {
			font-size: 12px;
			font-weight: 500;
			user-select: none;

			.ad-text {
				font-weight: 700;
				opacity: 0.7;
			}
		}
	}
</style>
