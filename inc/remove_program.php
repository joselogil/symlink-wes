<?php
function program_slug( $post_link, $post ) {
  if ( 'degree' === $post->post_type && 'publish' === $post->post_status ) {
      $post_link = str_replace( '/' . $post->post_type . '/', '/', $post_link );
  }
  return $post_link;
}

function program_main_query( $query ) {
	// Bail if this is not the main query.
	if ( ! $query->is_main_query() ) {
		return;
	}
	// Bail if this query doesn't match our very specific rewrite rule.
	if ( ! isset( $query->query['page'] ) || 2 !== count( $query->query ) ) {
		return;
	}
	// Bail if we're not querying based on the post name.
	if ( empty( $query->query['name'] ) ) {
		return;
	}
	// Add CPT to the list of post types WP will include when it queries based on the post name.
	$query->set( 'post_type', array( 'post', 'page', 'degree', 'degrees','landing-page' ) );
}
//if checked
$remove = get_option('remove_programs');
if ($remove) :
  add_filter( 'post_type_link', 'program_slug', 10, 2 );
  add_action( 'pre_get_posts', 'program_main_query' );
endif;
?>
