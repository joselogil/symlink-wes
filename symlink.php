<?php
/*
Plugin Name: Symlinks Builder - WES
Description: Create an alias -or multiple- for any post type & Disable /programs/ from url
Version: 1.2.4
Author: <a href="mailto:jgil@wiley.com">jgil@wiley.com</a>
*/

namespace Wiley\Symlinks;

defined( 'SYMLINK_WES_DIR' ) or define( 'SYMLINK_WES_DIR', plugin_dir_path( __FILE__ ) );
defined( 'SYMLINK_WES_URL' ) or define( 'SYMLINK_WES_URL', plugin_dir_url( __FILE__ ) );

require_once SYMLINK_WES_DIR . 'inc/class-find-post-by-rest-controller.php';

/**
 * WP Admin stuff to manage the URL data
 */
function sidebar_plugin_register() {
	$asset_file = include( __DIR__ . '/build/index.asset.php' );

	$deps = $asset_file['dependencies'];

	wp_register_script(
		'symlink-editor-sidebar',
		plugins_url( 'build/index.js', __FILE__ ),
		$deps,
		'1.2.4'
	);
	wp_register_style( 'symlink-editor-sidebar', SYMLINK_WES_URL . '/build/index.css' );

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

/**
 * Bridge between admin data and rewrites: flush rewrites and regenerate when a symlink is updated
 */
function flag_rewrite_rules_flush_on_symlink_meta_update( $meta_id, $object_id, $meta_key, $meta_value ) {

	// only if symlinks meta has changed
	if ( 'symlinks' !== $meta_key ) {
		return;
	}

	update_option( 'symlinks_flush_rewrite_rules', 1 );
}
add_action( 'update_postmeta', __NAMESPACE__ . '\\flag_rewrite_rules_flush_on_symlink_meta_update', 10, 4 );

function flush_rewrite_rules_on_flag() {
	if ( 1 === (int) get_option( 'symlinks_flush_rewrite_rules' ) ) {
		flush_rewrite_rules();
	}

	update_option( 'symlinks_flush_rewrite_rules', 0 );
}
add_action( 'init', __NAMESPACE__ . '\\flush_rewrite_rules_on_flag' );

/**
 * Actual URL rewrites
 */
// does not include leading or trailing slashes
function generate_path( $symlink, $id ) {

	$type = $symlink['type'] ? $symlink['type'] : 'slug';

	$url = '';

	if ( in_array( $type, array( 'parent', 'parent-slug' ), true ) && isset( $symlink['parent'] ) && $symlink['parent'] ) {
			// get parent and/or ancestor path
			$parent_link = parse_url( get_permalink( $symlink['parent'] ) );

		if ( isset( $parent_link['path'] ) && $parent_link['path'] ) {
			$url .= trim( $parent_link['path'], '/' ) . '/';
		} else {
			// bail early and cancel URL, since we cannot be sure our URL will be unique
			return false;
		}
	}

	if ( in_array( $type, array( 'slug', 'parent-slug' ), true ) && isset( $symlink['slug'] ) && $symlink['slug'] ) {
			// add custom slug
			$url .= $symlink['slug'];
	} else {
			// use default post slug
			$url .= get_post_field( 'post_name', $id );
	}

	// make sure we have an actual URL to return, otherwise `false`
	return '' !== $url ? $url : false;
}

function register_rewrites() {
	global $wpdb;

	$meta_fields = $wpdb->get_results(
		"
			SELECT *
			FROM $wpdb->postmeta
			WHERE meta_key = 'symlinks'
			
		"
	);

	foreach ( $meta_fields as $field ) {
		$id       = $field->post_id;
		$symlinks = unserialize( $field->meta_value );

		$post_type = get_post_field( 'post_type', $id );

		foreach ( $symlinks as $symlink ) {
			$path = generate_path( $symlink, $id );

			$request_str  = 'index.php?';
			$request_str .= "p={$id}&post_type={$post_type}";

			$request_str .= '&do_not_redirect=1';

			if ( $symlink['parent'] ) {
					$request_str .= "&symlink_parent_context={$symlink['parent']}";
			}

			if ( $path ) {
				add_rewrite_rule( "^{$path}/?", $request_str, 'top' );
			}
		}
	}

}
add_action( 'init', __NAMESPACE__ . '\\register_rewrites' );

/**
 * Disable annonying WP canonical redirect
 */
function custom_query_vars( $qvars ) {
	$qvars[] = 'do_not_redirect';

	// also make "parent" ID available for themes/plugins
	// to get "parent" data as needed
	$qvars[] = 'symlink_parent_context';
	return $qvars;
}
add_filter( 'query_vars', __NAMESPACE__ . '\\custom_query_vars' );

function disable_redirect( $location ) {
	$disable_redirect = get_query_var( 'do_not_redirect' );

	if ( ! empty( $disable_redirect ) ) {
		return false;
	}
	return $location;
}
add_filter( 'wp_redirect', __NAMESPACE__ . '\\disable_redirect' );

/******************************* old */

//add class to body
include( plugin_dir_path( __FILE__ ) . 'inc/af_class.php' );
//helper classes for content
include( plugin_dir_path( __FILE__ ) . 'inc/af_helpers.php' );
