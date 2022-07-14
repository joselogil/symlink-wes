<?php
/*
Plugin Name: Symlinks
Description: Create an alias -or multiple- for any post type & Disable /programs/ from url
Version: 2.0.0
Author: <a href="mailto:jgil@wiley.com">jgil@wiley.com</a>
*/

namespace Wiley\Symlinks;

defined( 'WILEY_SYMLINKS_DIR' ) or define( 'WILEY_SYMLINKS_DIR', plugin_dir_path( __FILE__ ) );
defined( 'WILEY_SYMLINKS_URL' ) or define( 'WILEY_SYMLINKS_URL', plugin_dir_url( __FILE__ ) );

// WP admin stuff to manage the URL data
include_once( WILEY_SYMLINKS_DIR . 'inc/sidebar.php' );

// bridge between admin data and rewrites: flush rewrites when a symlink is updated
include_once( WILEY_SYMLINKS_DIR . 'inc/flush.php' );

// actual URL rewrites
include_once( WILEY_SYMLINKS_DIR . 'inc/rewrites.php' );

// show other symlinks in admin bar
include_once( WILEY_SYMLINKS_DIR . 'inc/admin-bar.php' );

/******************************* old */

//add class to body
include( plugin_dir_path( __FILE__ ) . 'inc/af_class.php' );
//helper classes for content
include( plugin_dir_path( __FILE__ ) . 'inc/af_helpers.php' );
