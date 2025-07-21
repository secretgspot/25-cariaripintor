<script>
	import { m } from '$lib/paraglide/messages.js';
</script>

<div class="faq">
	<h2>
		<!-- What affects the cost of exterior paint job? -->
		{m.faq_title()}
	</h2>
	<p>
		<!-- The cost of painting your home's exterior depends on several key factors: -->
		{m.faq_intro()}
	</p>
	<ul>
		<li>
			<strong>
				<!-- Size of your home: -->
				{m.faq_size()}
			</strong>
			<!-- Larger homes take more time, paint and labour, which drives up costs. This includes multi-storey homes, which require scaffolding. -->
			{m.faq_size_text()}
		</li>
		<li>
			<strong>
				<!-- How much prep work is needed: -->
				{m.faq_how()}
			</strong>
			<!-- If there is old peeling paint that needs to be removed, or cracks that need filling and sanding. -->
			{m.faq_how_text()}
		</li>
		<li>
			<strong>
				<!-- Type of surfaces: -->
				{m.faq_type()}
			</strong>
			<!-- If your home’s exterior is timber it may need more TLC before it can be painted, which is more labor-intensive and expensive than brick or concrete. -->
			{m.faq_type_text()}
		</li>
		<li>
			<strong>
				<!-- Exterior features: -->
				{m.faq_features()}
			</strong>
			<!-- Things like verandas with gables and intricate details take more time to prep and paint. -->
			{m.faq_features_text()}
		</li>
	</ul>
</div>

<style>
	.faq {
		grid-column: 2 / -2;
		margin-block: var(--size-small) var(--size-large);
		/* max-width: 36ch; */

		/* Small tablets and larger mobile devices (481px - 768px) */
		@media (min-width: 481px) {
			max-width: 63ch;
			justify-self: center;
		}

		/* Tablets and small laptops (769px - 1024px) */
		@media (min-width: 769px) {
			max-width: 81ch;
		}

		h2 {
			margin-bottom: var(--size-small);
		}

		ul {
			list-style-type: disc;
			padding-left: var(--size-small);
			margin-block: var(--size-extra-small) 0;

			li {
				margin-bottom: var(--size-small);
			}
		}
	}
</style>
