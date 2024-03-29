<?php

namespace Wiley\Symlinks;

$url = strtok( $_SERVER['REQUEST_URI'], '?' );

if ( substr( $url, -4 ) == '-af/' || substr( $url, -5 ) == '-aff/' || substr( $url, -3 ) == '-af' || substr( $url, -4 ) == '-aff' ) {

	function af_class( $classes ) {
		$classes[] = 'affiliate-page';
		return $classes;
	}

	function wes_enqueue_af() {
		wp_register_script( 'wes-af', '' );
		wp_enqueue_script( 'wes-af' );
		wp_add_inline_script( 'wes-af', 'window.isAffiliatePage=true;' );
	}
	add_filter( 'body_class', __NAMESPACE__ . '\\af_class' );
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\wes_enqueue_af' );
}


