<?php
/**
 * Plugin Name: Creator Blocks
 * Description: Custom blocks for Reviewers and Creators (Food, Music, Tech, Dev).
 * Version: 1.0.1
 * Author: Jules
 * License: GPL-2.0-or-later
 * Text Domain: creator-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function creator_blocks_register_blocks() {
	// Register the Food Review block
	register_block_type( __DIR__ . '/build/food-review' );

	// Register the Lite YouTube block
	register_block_type( __DIR__ . '/build/lite-youtube' );

	// Register the Tech Review block
	register_block_type( __DIR__ . '/build/tech-review' );

    // Register the Dev Chat block
	register_block_type( __DIR__ . '/build/dev-chat' );
}
add_action( 'init', 'creator_blocks_register_blocks' );
