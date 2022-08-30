<?php

namespace Wiley\Symlinks;

//vars
$urls         = get_option( 'current_url' );
$symlink_urls = get_option( 'symlink_url' );
$remove       = get_option( 'remove_programs' );
$enabled      = get_option( 'enabled' );
$post_types   = get_post_types( array( 'public' => true ), 'names' );
$result       = array();

if ( $urls ) {
	foreach ( $urls as $id => $url ) {
		if ( $urls[ $id ] != '' ) {
			$result[ $id ] = array(
				'url'     => $urls[ $id ],
				'symlink' => $symlink_urls[ $id ],
				'enabled' => $enabled[ $symlink_urls[ $id ] ],
			);
		}
	}
}
