<?php

namespace Wiley\Symlinks;

function admin_bar_symlink_list( $admin_bar ) {
	// var_dump( get_the_ID() );
	// var_dump( get_post_meta( get_the_ID(), 'symlinks', true ) );

	if ( ! is_admin() ) {
		$id = get_the_ID();

		$symlinks = get_post_meta( $id, 'symlinks', true );

		if ( $symlinks ) {
			$admin_bar->add_menu(
				array(
					'id'    => 'symlinks',
					'title' => 'Symlinks (' . count( $symlinks ) . ')',
					'href'  => '#',
					'meta'  => array(
						'title' => __( 'Additional symlinked URLs' ),
					),
				)
			);

			// get canonical first
			$canonical_link = parse_url( get_permalink( $id ) );

			$admin_bar->add_menu(
				array(
					'id'     => 'symlink-canonical',
					'parent' => 'symlinks',
					'title'  => '<strong>Canonical:</strong> ' . $canonical_link['path'],
					'href'   => $canonical_link['path'],
				)
			);

			// then list others
			foreach ( $symlinks as $key => $symlink ) {
				$path = '/' . generate_path( $symlink, $id ) . '/';
				$admin_bar->add_menu(
					array(
						'id'     => 'symlink-' . $key,
						'parent' => 'symlinks',
						'title'  => $path,
						'href'   => $path,
					)
				);
			}
		}
	}
}
add_action( 'admin_bar_menu', __NAMESPACE__ . '\\admin_bar_symlink_list', 100 );
