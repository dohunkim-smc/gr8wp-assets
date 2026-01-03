<?php
/**
 * Render template for Lite YouTube block.
 *
 * @package CreatorBlocks
 */

$attributes = $attributes ?? [];
$video_url   = $attributes['videoUrl'] ?? '';
$video_id    = $attributes['videoId'] ?? '';
$title       = $attributes['title'] ?? 'Video';
$description = $attributes['description'] ?? '';

if ( ! $video_id ) {
	return;
}

$thumbnail_url = "https://img.youtube.com/vi/{$video_id}/hqdefault.jpg";
$embed_url     = "https://www.youtube.com/embed/{$video_id}?autoplay=1";

// Construct Schema.org JSON-LD data for VideoObject
$schema = [
	'@context'     => 'https://schema.org',
	'@type'        => 'VideoObject',
	'name'         => $title,
	'description'  => $description ?: $title,
	'thumbnailUrl' => [ $thumbnail_url ],
	'uploadDate'   => get_the_date( 'c' ), // Fallback to post date if no upload date
	'contentUrl'   => $video_url,
	'embedUrl'     => $embed_url,
];
?>
<div <?php echo get_block_wrapper_attributes( [ 'class' => 'creator-block-lite-youtube' ] ); ?>>
	<div class="lite-youtube-wrapper" data-embed-url="<?php echo esc_url( $embed_url ); ?>">
		<div class="lite-youtube-poster" style="background-image: url('<?php echo esc_url( $thumbnail_url ); ?>');">
			<button class="lite-youtube-play-btn" aria-label="Play Video">
				<svg viewBox="0 0 68 48" width="68" height="48">
					<path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
					<path d="M 45,24 27,14 27,34" fill="#fff"></path>
				</svg>
			</button>
		</div>
		<div class="lite-youtube-player"></div>
	</div>
	<?php if ( $description ) : ?>
		<div class="video-description">
			<p><?php echo esc_html( $description ); ?></p>
		</div>
	<?php endif; ?>

	<script type="application/ld+json">
		<?php echo wp_json_encode( $schema ); ?>
	</script>
</div>
