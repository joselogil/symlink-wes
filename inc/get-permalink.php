<?php

namespace Wiley\Symlinks;

function get_symlink_permalink( $permalink, $target_post ) {
	$symlinks = get_post_meta( $target_post->ID, 'symlinks', true );

	if ( ! $symlinks ) {
		// exit early if no permalinks are registered
		return $permalink;
	}

	// get current post
	global $post;
	$current_id = $post->ID;

	foreach ( $symlinks as $symlink ) {
		if ( in_array( $symlink['type'], array( 'parent', 'parent-slug' ), true ) && $symlink['parent'] && $symlink['parent'] === $current_id ) {
			// we have a symlink for our target post that has a "parent" of the current post
			return get_site_url() . '/' . generate_path( $symlink, $target_post->ID ) . '/';
		}
	}

	return $permalink;
}

function enable_context_permalinks() {
	$enable_context_permalinks = apply_filters( 'symlinks/enable_context_permalinks', true );

	if ( $enable_context_permalinks ) {
		add_filter(
			'post_type_link',
			__NAMESPACE__ . '\\get_symlink_permalink',
			100,
			2
		);

		add_filter(
			'post_link',
			__NAMESPACE__ . '\\get_symlink_permalink',
			100,
			2
		);

		add_filter(
			'page_link',
			__NAMESPACE__ . '\\get_symlink_permalink',
			100,
			2
		);
	}
}
add_action( 'init', __NAMESPACE__ . '\\enable_context_permalinks' );
