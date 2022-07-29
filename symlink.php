<?php
/*
Plugin Name: Symlinks
Description: Create an alias -or multiple- for any post type & Disable /programs/ from url
Version: 1.3.0-dev.sjm-2169.2
Author: <a href="mailto:jgil@wiley.com">jgil@wiley.com</a>
*/

namespace Wiley\Symlinks;

defined( 'WILEY_SYMLINKS_DIR' ) or define( 'WILEY_SYMLINKS_DIR', plugin_dir_path( __FILE__ ) );
defined( 'WILEY_SYMLINKS_URL' ) or define( 'WILEY_SYMLINKS_URL', plugin_dir_url( __FILE__ ) );
defined( 'WILEY_SYMLINKS_FILE' ) or define( 'WILEY_SYMLINKS_FILE', plugin_basename( __FILE__ ) );

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// WP admin stuff to manage the URL data
include_once( WILEY_SYMLINKS_DIR . 'inc/sidebar.php' );

// bridge between admin data and rewrites: flush rewrites when a symlink is updated
include_once( WILEY_SYMLINKS_DIR . 'inc/flush.php' );

// actual URL rewrites
include_once( WILEY_SYMLINKS_DIR . 'inc/rewrites.php' );

// modify permalinks of "child" when on a "parent"
include_once( WILEY_SYMLINKS_DIR . 'inc/get-permalink.php' );

// show other symlinks in admin bar
include_once( WILEY_SYMLINKS_DIR . 'inc/admin-bar.php' );

/**
 * Legacy Affiliate Pages
 */

// rewrites + settings page
include_once( WILEY_SYMLINKS_DIR . 'inc/legacy/af-rule.php' );
include_once( WILEY_SYMLINKS_DIR . 'inc/legacy/remove-program.php' );
include_once( WILEY_SYMLINKS_DIR . 'inc/legacy/symlinks-page.php' );

// affiliate helpers
include_once( WILEY_SYMLINKS_DIR . 'inc/legacy/af-class.php' );
include_once( WILEY_SYMLINKS_DIR . 'inc/legacy/af-helpers.php' );
