<?php

namespace Wiley\Symlinks;

function af_rule() {
	include( WILEY_SYMLINKS_DIR . 'inc/legacy/vars.php' );

	if ( $result && ! empty( array_filter( $result ) ) ) {  // If there are symlink urls

		foreach ( $result as $r ) {

			if ( $r['enabled'] == 'page' ) {  // If the symlink post type is set to "Page"
				add_rewrite_rule( $r['symlink'], 'index.php?pagename=' . $r['url'], 'top' );
			} else {  // If the symlink post type is set to anything other than "Page"
				add_rewrite_rule( $r['symlink'], 'index.php?' . $r['enabled'] . '=' . $r['url'], 'top' );
			}
		}
	} else {  // If there are NO symlink urls
		//Do Nothing
	}

}
add_action( 'init', __NAMESPACE__ . '\\af_rule' );

