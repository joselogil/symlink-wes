<?php

namespace Wiley\Symlinks;

// Rewrites are flushed on `init` hook, but we only know
// if they need to be flushed during `update_postmeta` which happens
// later. So whenever symlink meta field is updated on a post we
// need to add a flag to the db so that on _next_ load the
// rewrites regenerate.
function flag_rewrite_rules_flush_on_symlink_meta_update( $meta_id, $object_id, $meta_key, $meta_value ) {

	// only if symlinks meta has changed
	if ( 'symlinks' !== $meta_key ) {
		return;
	}

	update_option( 'symlinks_flush_rewrite_rules', 1 );
}
add_action( 'update_postmeta', __NAMESPACE__ . '\\flag_rewrite_rules_flush_on_symlink_meta_update', 10, 4 );

// We also need to make sure rewrites are flushed on ADD, not just update
function flag_rewrite_rules_flush_on_symlink_meta_add( $object_id, $meta_key, $meta_value ) {

	// only if symlinks meta has changed
	if ( 'symlinks' !== $meta_key ) {
		return;
	}

	update_option( 'symlinks_flush_rewrite_rules', 1 );
}
add_action( 'add_post_meta', __NAMESPACE__ . '\\flag_rewrite_rules_flush_on_symlink_meta_add', 10, 3 );

// We also need to flush rewrites on certain `wp_insert_post_data`,
// in case the slug of a "parent" post is updated.
// If the slug is updated, we need to regenerate rewrite rules since
// some symlinks may be using this slug as a "parent".
function flag_rewrite_rules_flush_on_post_update( $post_data, $postarr, $unsanitize_postarr, $update = true ) {
	// only run on update, not create
	if ( $update ) {

		// Since slugs are not updated often, flush is triggered
		// anytime a post slug is changed.
		// In the future if there was a problem with this we could
		// technically do a query for any `symlinks` meta that has
		// `'"parent";i:' . $id` in the value.

		$prev_slug = get_post_field( 'post_name', $postarr['ID'] );
		$next_slug = isset( $post_data['post_name'] ) ? $post_data['post_name'] : false;

		if ( $next_slug && $prev_slug !== $next_slug ) {
			update_option( 'symlinks_flush_rewrite_rules', 1 );
		}
	}

	return $post_data;
}
add_filter( 'wp_insert_post_data', __NAMESPACE__ . '\\flag_rewrite_rules_flush_on_post_update', 10, 4 );

// flush rewrites only if we have updated a symlink
function flush_rewrite_rules_on_flag() {
	if ( 1 === (int) get_option( 'symlinks_flush_rewrite_rules' ) ) {
		flush_rewrite_rules();
	}

	update_option( 'symlinks_flush_rewrite_rules', 0 );
}
add_action( 'init', __NAMESPACE__ . '\\flush_rewrite_rules_on_flag' );
