<?php 

namespace Wiley\Symlinks;



//load plugin menu in dashboard
add_action( 'admin_menu', __NAMESPACE__ . '\\symlinks_menu' );

// Create WordPress admin menu
function symlinks_menu() {
	$page_title = 'Symlinks Overview Page';
	$menu_title = 'Symlinks - WES';
	$capability = 'manage_options';
	$menu_slug  = 'symlinks-wes';
	$function   = __NAMESPACE__ . '\\symlinks_page';
	$icon_url   = 'dashicons-media-code';
	$position   = 50;

	add_options_page(
		$page_title,
		$menu_title,
		$capability,
		$menu_slug,
		$function,
		$icon_url,
		$position
	);
}

function symlinks_page() {
	include( WILEY_SYMLINKS_DIR . 'inc/legacy/vars.php' );
?>

<div class="wrap" id="tealium-2-wes">

	<h1 class="wp-heading-inline">Symlinks - WES</h1>

	<div class="post_list">

		<?php foreach($post_types as $post => $val) :
				
			$object = get_post_type_object($val);
			//print '<pre>';print_r($object);die();
			$posts = get_posts(
				array(
					'post_type' => $object->name,
					'numberposts' => -1,
					'orderby'   => 'post_title',
					'order' => 'asc',
				)
			);

			$open = false;
			$count = 1;
			$total = wp_count_posts($object->name);
		
		?>

			
			<?php foreach ($posts as $post) {
					//print '<pre>';print_r($post);die();
				if ($open == false && get_post_meta($post->ID, 'symlinks', true)) {
					$open = true;
					print '<h3>'.$object->label.'</h3>';
					print '<table class="form-table_post_list">';
					print '<thead>
								<tr>
									<th width="30%">Title</th>
									
									<th width="60%">Symlinks</th>
									<th width="10%"></th>
								</tr>
							</thead>';
					print '<tbody>';
				}

				if (get_post_meta($post->ID, 'symlinks', true) ) {
					print '<tr>';
					print '<td><strong><a href="'.get_permalink($post->ID).'">' . $post->post_title . '</a></strong></td>';
					print '<td>';
						//print_r(get_post_meta($post->ID, 'symlinks', true));
						foreach (get_post_meta($post->ID, 'symlinks', true) as $symlink) {
							print '<div><strong>('.$symlink["type"].') </strong>';
							print '<a href="/'.generate_path( $symlink, $post->ID ).'">'.generate_path( $symlink, $post->ID ).'</a></div>';
						}
					print '</td>';
					print edit_post_link('Edit '.$object->labels->singular_name, '<td>', '</td>', $post->ID);
					print '</tr>';
				}
				if ($count == $total->publish) {
					print '</tbody></table>';
				}
				$count ++;
			} ?> 

		<?php endforeach;?>

	</div>

</div>

<?php } ?> 