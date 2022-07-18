<?php

namespace Wiley\Symlinks;

//load plugin menu in dashboard
add_action( 'admin_menu', __NAMESPACE__ . '\\symlinks_menu' );

// Create WordPress admin menu
function symlinks_menu() {
	$page_title = 'Symlinks Builder - WES';
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

	// Call update_extra_post_info function to update database
	add_action( 'admin_init', __NAMESPACE__ . '\\update_symlinks' );
}

// Create function to register plugin settings in the database
function update_symlinks() {
	register_setting( 'symlinks-settings', 'remove_programs' );
	register_setting( 'symlinks-settings', 'current_url' );
	register_setting( 'symlinks-settings', 'symlink_url' );
	register_setting( 'symlinks-settings', 'enabled' );
}

//setting link
function symlinks_settings_link( $links ) {
	$settings_link = '<a href="options-general.php?page=symlinks-wes">' . __( 'Settings' ) . '</a>';
	array_push( $links, $settings_link );
	return $links;
}
add_filter( 'plugin_action_links_' . WILEY_SYMLINKS_FILE, __NAMESPACE__ . '\\symlinks_settings_link' );

function symlinks_page() {
	include( WILEY_SYMLINKS_DIR . 'inc/legacy/vars.php' );
	?>

	<div class="wrap" id="symlinks-wes">

	<h1 class="wp-heading-inline">Symlinks Builder - WES</h1>

	<form style="margin-top:1.75rem"method="post" action="options.php">

		<?php
			settings_fields( 'symlinks-settings' );
			do_settings_sections( 'symlinks-settings' );
		?>

		<table class="form-table">

		<tr>
			<th colspan="3" style="background:#23282d;padding:10px;color:#fff"><strong>Remove <em>/programs/</em> from url</strong></th>
		</tr>
		<tr>
			<td colspan="3">
			<label>
				<input type="checkbox" name="remove_programs" value="yes" 
				<?php
				if ( $remove ) :
					echo 'checked';
endif;
				?>
				>Yes
			</label>
			</td>
		</tr>
		<tr>
			<th colspan="3" style="background:#23282d;padding:10px;color:#fff"><strong>Symlinks Builder</strong></th>
		</tr>
		<tr>
			<td><strong>Current Url</strong></td>
			<td><strong>Symlink Url</strong></td>
			<td><strong>Post Type</strong></td>
		</tr>

		<?php
		if ( ! empty( array_filter( $result ) ) ) {

			foreach ( $result as $r ) {

				if ( $r['url'] != '' ) {
					print '<tr class="urls">';
					print '<td><div><input type="text" name="current_url[]" value="' . $r['url'] . '"/></div></td>';
					print '<td><div><input type="text" name="symlink_url[]" value="' . $r['symlink'] . '"/></div></td>';
					print '<td><div><select name="enabled[' . $r['symlink'] . ']"><option value> -- select an option -- </option>';

					foreach ( $post_types as $post_type ) {
						if ( $post_type == $r['enabled'] ) {
							print '<option selected value="' . $post_type . '">' . $post_type . '</option>';
						} else {
							print '<option value="' . $post_type . '">' . $post_type . '</option>';
						}
					}

					print '</select>';
					print' <button class="sym-add-id">+</button><button class="sym-kill-id">-</button></div></td>';
					print '</tr>';
				}
			}
		} else {
			print '<tr class="urls">';
			print '<td><div><input type="text" name="current_url[]" value="' . $urls[0] . '"/></div></td>';
			print '<td><div><input type="text" name="symlink_url[]" value="' . $symlink_urls[0] . '"/></div></td>';
			print '<td><div><select name="enabled[' . $symlink_urls[0] . ']"><option value> -- select an option -- </option>';
			foreach ( $post_types as $post_type ) {
				print '<option value="' . $post_type . '">' . $post_type . '</option>';
			}
			print '</select>';
			print' <button class="sym-add-id">+</button><button class="sym-kill-id">-</button></div></td>';
			print '</tr>';
		}
		?>

		<script type="text/javascript">
			jQuery.noConflict();
			jQuery(document).ready(function ($) {

			function tr_count(){
				$count = $('tr.urls').length;

				if($count == 1) {
				$('.sym-kill-id').attr('disabled', 'disabled').css('opacity', '0.375');
				} else {
				$('.sym-kill-id').removeAttr('disabled', 'disabled').css('opacity', '1');
				}
			}

			function clone(){
			  $('.sym-add-id').click(function(){
				$parent = $(this).parents('tr');

				$parent.clone(true).addClass('cloned').find("input:text").val("").end().insertAfter($parent);
				//$parent.next().find('select').val('').change();
				tr_count();
				return false;
				});
			}

			function kill(){
				$('.sym-kill-id').click(function(){
				$parent = $(this).parents('tr');

				$parent.find("input:text").val("");
				$parent.remove();
				tr_count()
				return false;
				})
			}

			function updt_select() {
				$("input[name^='symlink']").on('keyup change', function (){
				$val = $(this).val();
				$parent = $(this).parents('tr');
				$parent.find('select').attr('name', 'enabled['+$val+']');
				});		
			}

			tr_count();
			clone();
			kill();
			updt_select();
			});
		</script>

		</table>
		<?php submit_button(); ?>
	</form>

	</div>
	<?php
	flush_rewrite_rules();
}
