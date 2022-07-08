<?php
/*
Plugin Name: Symlinks Builder - WES
Description: Create an alias -or multiple- for any post type & Disable /programs/ from url
Version: 1.2.4
Author: <a href="mailto:jgil@wiley.com">jgil@wiley.com</a>
*/

namespace Wiley\Symlink;

defined( 'SYMLINK_WES_DIR' ) or define( 'SYMLINK_WES_DIR', plugin_dir_path( __FILE__ ) );
defined( 'SYMLINK_WES_URL' ) or define( 'SYMLINK_WES_URL', plugin_dir_url( __FILE__ ) );

require_once SYMLINK_WES_DIR . 'inc/class-find-post-by-rest-controller.php';

function sidebar_plugin_register() {
	$asset_file = include( __DIR__ . '/build/index.asset.php' );

	$deps = $asset_file['dependencies'];

	wp_register_script(
		'symlink-editor-sidebar',
		plugins_url( 'build/index.js', __FILE__ ),
		$deps,
		'1.2.4'
	);
}
add_action( 'init', __NAMESPACE__ . '\\sidebar_plugin_register' );

function sidebar_plugin_script_enqueue() {
	wp_enqueue_script( 'symlink-editor-sidebar' );
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\sidebar_plugin_script_enqueue' );

function register_api_endpoints() {
	$controller = new Find_Post_By_REST_Controller;
	$controller->register_routes();
}
add_action( 'rest_api_init', __NAMESPACE__ . '\\register_api_endpoints' );

/******************************* old */

//load plugin menu in dashboard
add_action( 'admin_menu', __NAMESPACE__ . '\\symlinks_menu' );

// Create WordPress admin menu
function symlinks_menu() {
	$page_title = 'Symlinks Builder - WES';
	$menu_title = 'Symlinks - WES';
	$capability = 'manage_options';
	$menu_slug  = 'symlinks-wes';
	$function   = 'symlinks_page';
	$icon_url   = 'dashicons-media-code';
	$position   = 50;

	add_options_page(
		$page_title,
		$menu_title,
		$capability,
		$menu_slug,
		$function,
		$icon_url,
		$position
	);

	// Call update_extra_post_info function to update database
	add_action( 'admin_init', __NAMESPACE__ . '\\update_symlinks' );
}

// Create function to register plugin settings in the database
function update_symlinks() {
	register_setting( 'symlinks-settings', 'remove_programs' );
	register_setting( 'symlinks-settings', 'current_url' );
	register_setting( 'symlinks-settings', 'symlink_url' );
	register_setting( 'symlinks-settings', 'enabled' );
}

// Create WordPress plugin page
include( plugin_dir_path( __FILE__ ) . 'inc/symlink_page.php' );
//remove programs/ from program url
include( plugin_dir_path( __FILE__ ) . 'inc/remove_program.php' );
//rewrite rule from input values
include( plugin_dir_path( __FILE__ ) . 'inc/af_rule.php' );
//add class to body
include( plugin_dir_path( __FILE__ ) . 'inc/af_class.php' );
//helper classes for content
include( plugin_dir_path( __FILE__ ) . 'inc/af_helpers.php' );

//setting link
function symlinks_settings_link( $links ) {
	$settings_link = '<a href="options-general.php?page=symlinks-wes">' . __( 'Settings' ) . '</a>';
	array_push( $links, $settings_link );
	return $links;
}

$plugin = plugin_basename( __FILE__ );
add_filter( "plugin_action_links_$plugin", __NAMESPACE__ . '\\symlinks_settings_link' );
