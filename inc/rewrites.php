<?php

namespace Wiley\Symlinks;

// Does not include leading or trailing slashes
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
		$post_name = get_post_field( 'post_name', $id );

		foreach ( $symlinks as $symlink ) {
			$path = generate_path( $symlink, $id );

			$request_str = 'index.php?';
			// $request_str .= "p={$id}&post_type={$post_type}";
			switch ( $post_type ) {
				case 'page':
					$request_str .= "page_id={$id}";
					break;
				case 'post':
					$request_str .= "p={$id}";
					break;
				default:
					$request_str .= "{$post_type}={$post_name}";
					break;
			}

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

// Disable annonying WP canonical redirect
function custom_query_vars( $qvars ) {
	$qvars[] = 'do_not_redirect';

	// also make "parent" ID available for themes/plugins
	// to get "parent" data as needed
	$qvars[] = 'symlink_parent_context';
	return $qvars;
}
add_filter( 'query_vars', __NAMESPACE__ . '\\custom_query_vars' );



