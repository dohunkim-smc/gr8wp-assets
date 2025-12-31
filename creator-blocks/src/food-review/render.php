<?php
$attributes = $attributes ?? [];
$store_name = $attributes['storeName'] ?? '';
$rating     = $attributes['rating'] ?? 5;
$review_text = $attributes['reviewText'] ?? '';
$image_url  = $attributes['imageUrl'] ?? '';
$map_embed  = $attributes['mapEmbed'] ?? '';

// Schema JSON-LD
$schema = [
	'@context' => 'https://schema.org',
	'@type'    => 'Restaurant',
	'name'     => $store_name,
	'image'    => $image_url,
	'review'   => [
		'@type'         => 'Review',
		'reviewRating'  => [
			'@type'       => 'Rating',
			'ratingValue' => $rating,
			'bestRating'  => '5',
		],
		'author'        => [
			'@type' => 'Person',
			'name'  => get_the_author(), // Simple fallback
		],
		'reviewBody'    => wp_strip_all_tags( $review_text ),
	],
];
?>
<div <?php echo get_block_wrapper_attributes( [ 'class' => 'creator-block-food-review' ] ); ?>>
	<div class="food-review-card">
		<?php if ( $image_url ) : ?>
			<div class="food-review-image">
				<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $store_name ); ?>" />
			</div>
		<?php endif; ?>

		<div class="food-review-content">
			<h3 class="store-name"><?php echo esc_html( $store_name ); ?></h3>
			<div class="rating">
				<?php echo str_repeat( '⭐', floor( $rating ) ); ?>
				<span class="rating-number">(<?php echo esc_html( $rating ); ?>/5)</span>
			</div>
			<div class="review-text">
				<?php echo wp_kses_post( $review_text ); ?>
			</div>
		</div>
	</div>

	<?php if ( $map_embed ) : ?>
		<div class="food-review-map">
			<?php echo $map_embed; // Allow iframe ?>
		</div>
	<?php endif; ?>

	<script type="application/ld+json">
		<?php echo wp_json_encode( $schema ); ?>
	</script>
</div>
