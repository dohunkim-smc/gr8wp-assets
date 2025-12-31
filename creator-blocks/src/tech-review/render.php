<?php
$attributes = $attributes ?? [];
$product_name  = $attributes['productName'] ?? '';
$specs         = $attributes['specs'] ?? [];
$pros          = $attributes['pros'] ?? [];
$cons          = $attributes['cons'] ?? [];
$affiliate_link = $attributes['affiliateLink'] ?? '';

// Convert specs to associative array for schema
$specs_assoc = [];
foreach ( $specs as $spec ) {
	if ( ! empty( $spec['label'] ) && ! empty( $spec['value'] ) ) {
		$specs_assoc[ $spec['label'] ] = $spec['value'];
	}
}

// Schema JSON-LD
$schema = [
	'@context' => 'https://schema.org',
	'@type'    => 'Product',
	'name'     => $product_name,
	'review'   => [
		'@type'        => 'Review',
		'author'       => [
			'@type' => 'Person',
			'name'  => get_the_author(),
		],
		'positiveNotes' => [
			'@type' => 'ItemList',
			'itemListElement' => array_map( function( $item ) {
				return [ '@type' => 'ListItem', 'name' => wp_strip_all_tags( $item ) ];
			}, $pros ),
		],
		'negativeNotes' => [
			'@type' => 'ItemList',
			'itemListElement' => array_map( function( $item ) {
				return [ '@type' => 'ListItem', 'name' => wp_strip_all_tags( $item ) ];
			}, $cons ),
		],
	],
];

// Add additional properties from specs to schema if possible, or just keep it simple.
// For full spec schema, we'd need mapped keys (brand, sku, etc.), but generic additionalProperty is okay.
$additional_properties = [];
foreach ( $specs_assoc as $key => $value ) {
	$additional_properties[] = [
		'@type' => 'PropertyValue',
		'name'  => $key,
		'value' => $value,
	];
}
if ( ! empty( $additional_properties ) ) {
	$schema['additionalProperty'] = $additional_properties;
}

?>
<div <?php echo get_block_wrapper_attributes( [ 'class' => 'creator-block-tech-review' ] ); ?>>
	<h3 class="product-title"><?php echo esc_html( $product_name ); ?></h3>

	<?php if ( ! empty( $specs ) ) : ?>
		<div class="specs-container">
			<table class="specs-table">
				<thead>
					<tr>
						<th colspan="2"><?php esc_html_e( 'Specifications', 'creator-blocks' ); ?></th>
					</tr>
				</thead>
				<tbody>
					<?php foreach ( $specs as $spec ) : ?>
						<?php if ( ! empty( $spec['label'] ) ) : ?>
							<tr>
								<td class="spec-label"><?php echo esc_html( $spec['label'] ); ?></td>
								<td class="spec-value"><?php echo esc_html( $spec['value'] ); ?></td>
							</tr>
						<?php endif; ?>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
	<?php endif; ?>

	<div class="pros-cons-container">
		<div class="pros-column">
			<h4>✅ <?php esc_html_e( 'Pros', 'creator-blocks' ); ?></h4>
			<ul>
				<?php foreach ( $pros as $pro ) : ?>
					<li><?php echo wp_kses_post( $pro ); ?></li>
				<?php endforeach; ?>
			</ul>
		</div>
		<div class="cons-column">
			<h4>❌ <?php esc_html_e( 'Cons', 'creator-blocks' ); ?></h4>
			<ul>
				<?php foreach ( $cons as $con ) : ?>
					<li><?php echo wp_kses_post( $con ); ?></li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>

	<?php if ( $affiliate_link ) : ?>
		<div class="affiliate-cta">
			<a href="<?php echo esc_url( $affiliate_link ); ?>" target="_blank" rel="sponsored noopener noreferrer" class="wp-block-button__link">
				<?php esc_html_e( 'Check Price / Buy Now', 'creator-blocks' ); ?>
			</a>
		</div>
	<?php endif; ?>

	<script type="application/ld+json">
		<?php echo wp_json_encode( $schema ); ?>
	</script>
</div>
