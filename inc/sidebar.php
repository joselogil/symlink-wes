<?php

namespace Wiley\Symlinks;

require_once WILEY_SYMLINKS_DIR . 'inc/class-find-post-by-rest-controller.php';

function sidebar_plugin_register() {
	$asset_file = include( WILEY_SYMLINKS_DIR . 'build/index.asset.php' );

	$deps = $asset_file['dependencies'];

	wp_register_script(
		'symlink-editor-sidebar',
		WILEY_SYMLINKS_URL . 'build/index.js',
		$deps,
		'1.2.4'
	);
	wp_register_style( 'symlink-editor-sidebar', WILEY_SYMLINKS_URL . 'build/index.css' );

	register_post_meta(
		'',
		'symlinks',
		array(
			'show_in_rest' => array(
				'schema' => array(
					'type'  => 'array',
					'items' => array(
						'type'       => 'object',
						'required'   => array( 'type' ),
						'properties' => array(
							'type'   => array(
								'type'        => 'string',
								'enum'        => array( 'slug', 'parent', 'parent-slug' ),
								'description' => 'How the symlinks will be generated',
							),
							'slug'   => array(
								'type'        => 'string',
								'description' => 'Custom slug used to generate the end of the new URL, if not `parent` type',
							),
							'parent' => array(
								'type'        => 'integer',
								'description' => 'Post ID of parent post that will be prepended to the new URL',
							),
						),
					),
				),
			),
			'single'       => true,
			'type'         => 'array',
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\\sidebar_plugin_register' );

function sidebar_plugin_script_enqueue() {
	wp_enqueue_script( 'symlink-editor-sidebar' );
	wp_enqueue_style( 'symlink-editor-sidebar' );
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\sidebar_plugin_script_enqueue' );

// custom API route to find any post by ID
function register_api_endpoints() {
	$controller = new Find_Post_By_REST_Controller;
	$controller->register_routes();
}
add_action( 'rest_api_init', __NAMESPACE__ . '\\register_api_endpoints' );
