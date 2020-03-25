<?php
/*
Plugin Name: Symlinks Builder - WES
Description: Create an alias -or multiple- for any post type & Disable /programs/ from url
Version: 0.0.2
Author: <a href="mailto:jgil@wiley.com">jgil@wiley.com</a>
*/

//load plugin menu in dashboard
add_action('admin_menu', 'symlinks_menu');

// Create WordPress admin menu
function symlinks_menu(){

    $page_title = 'Symlinks Builder - WES';
    $menu_title = 'Symlinks - WES';
    $capability = 'manage_options';
    $menu_slug  = 'symlinks-wes';
    $function   = 'symlinks_page';
    $icon_url   = 'dashicons-media-code';
    $position   = 50;
  
    add_options_page( $page_title,
                   $menu_title,
                   $capability,
                   $menu_slug,
                   $function,
                   $icon_url,
                   $position );
  
    // Call update_extra_post_info function to update database
    add_action( 'admin_init', 'update_symlinks' );
}

// Create function to register plugin settings in the database
function update_symlinks() {
    //exclude code
    register_setting( 'symlinks-settings', 'remove_programs' );
    register_setting( 'symlinks-settings', 'current_url' );
    register_setting( 'symlinks-settings', 'symlink_url' );
    register_setting( 'symlinks-settings', 'enabled' );
}

// Create WordPress plugin page

function symlinks_page() { ?>
    <div class="wrap" id="symlinks-wes">
        
        <h1 class="wp-heading-inline">Symlinks Builder - WES</h1>
        
        <form style="margin-top:1.75rem"method="post" action="options.php">
            <?php 
                settings_fields('symlinks-settings'); 
                do_settings_sections('symlinks-settings');
                //
                $remove = get_option('remove_programs');
                $urls = get_option('current_url');
                $symlink_urls = get_option('symlink_url');
                function array_combine_($keys, $values) {
                    $result = array();
                
                    foreach ($keys as $i => $k) {
                        $result[$k][] = $values[$i];
                    }
                
                    array_walk($result, function (&$v) {
                        $v = (count($v) == 1) ? array_pop($v): $v;
                    });
                
                    return $result;
                }
                $final = array_combine_($urls, $symlink_urls);
            ?>
            <table class="form-table">

                <tr>
                    <th colspan="3" style="background:#23282d;padding:10px;color:#fff"><strong>Remove <em>/programs/</em> from url</strong></th>
                </tr>

                <tr>
                    <td colspan="3">   
                        <label>
                            <input type="checkbox" name="remove_programs" value="yes" <?php if($remove):echo 'checked';endif;?>>Yes
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
                
                //echo '<pre>';
                //print_r($final);
                //print_r($remove);
                //echo '</pre>';
                $post_types = get_post_types( array( "public" => true ), 'names' );
                $test = get_option( 'enabled' );

                if (!empty(array_filter($final))) {
                    
                    foreach ($final as $key => $val) {
                        
                        if (is_array($val)) {
                            
                            foreach ($val as $val_key => $val_val) {
                                if(!empty($val_val)) {
                                    echo '<tr class="urls">';
                                    echo '<td><div><input type="text" name="current_url[]" value="'.$key.'"/></div></td>';
                                    echo '<td><div><input type="text" name="symlink_url[]" value="'.$val_val.'"/></div></td>';
                                    echo '<td><div><select name="enabled['.$val_val.'][]"><option value> -- select an option -- </option>';
                                    foreach ( $post_types as $post_type ) {
                                        if ( in_array($post_type, get_option('enabled')[$val_val] )) {    
                                            echo '<option selected value="'.$post_type.'">'.$post_type.'</option>';
                                        } else {
                                            echo '<option value="'.$post_type.'">'.$post_type.'</option>';
                                        }
                                    }
                                    echo '</select>';
                                    echo' <button class="add-id">+</button><button class="kill-id">-</button></div></td>';
                                    echo '</tr>';
                                }
                            }

                        } elseif (!empty($val)) {
                            echo '<tr class="urls">';
                            echo '<td><div><input type="text" name="current_url[]" value="'.$key.'"/></div></td>';
                            echo '<td><div><input type="text" name="symlink_url[]" value="'.$val.'"/></div></td>';
                            echo '<td><div><select name="enabled['.$val.'][]"><option value> -- select an option -- </option>';
                            foreach ( $post_types as $post_type ) {
                                if ( in_array($post_type, get_option('enabled')[$val] )) {    
                                    echo '<option selected value="'.$post_type.'">'.$post_type.'</option>';
                                } else {
                                    echo '<option value="'.$post_type.'">'.$post_type.'</option>';
                                }
                            }
                            echo '</select>';
                            echo' <button class="add-id">+</button><button class="kill-id">-</button></div></td>';
                            echo '</tr>';
                        }
                    }

                } else {

                    echo '<tr class="urls">';
                    echo '<td><div><input type="text" name="current_url[]" value="'.$urls[0].'"/></div></td>';
                    echo '<td><div><input type="text" name="symlink_url[]" value="'.$symlink_urls[0].'"/></div></td>';
                    echo '<td><div><select name="enabled['.$val.'][]"><option value> -- select an option -- </option>';
                    foreach ( $post_types as $post_type ) {
                        echo '<option value="'.$post_type.'">'.$post_type.'</option>';
                    }
                    echo '</select>';
                    echo ' <button class="add-id">+</button><button class="kill-id">-</button></div></td>';
                    echo '</tr>';

                }

                ?>

                <script type="text/javascript">
                    jQuery.noConflict();
                    jQuery(document).ready(function ($) {
                        function tr_count(){
                            $count = $('tr.urls').length;
                            
                            if($count == 1) {
                                //console.log('if')
                                $('.kill-id').attr('disabled', 'disabled').css('opacity', '0.375');
                            } else {
                                $('.kill-id').removeAttr('disabled', 'disabled').css('opacity', '1');
                            }
                            
                        }

                        function clone(){
                            $('.add-id').click(function(){
                                $parent = $(this).parents('tr');

                                $parent.clone(true).addClass('cloned').find("input:text").val("").end().insertAfter($parent);
                                tr_count()

                                return false;
                            })
                        }
                        
                        function kill(){
                            $('.kill-id').click(function(){
                                $parent = $(this).parents('tr');

                                $parent.find("input:text").val("");
                                $parent.remove();

                                tr_count()
                                
                                return false;
                            })
                        }

                        function updt_select() {
                            $("input[name^='symlink_url']").on('keyup change', function (){
                                $val = $(this).val();
                                $parent = $(this).parents('tr');

                                $parent.find('select').attr('name', 'enabled['+$val+'][]');
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
    <?php flush_rewrite_rules(); ?>
<?php }

//
//remove programs/ from program url
//
$remove = get_option('remove_programs');

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
if ($remove) :
add_filter( 'post_type_link', 'program_slug', 10, 2 );
add_action( 'pre_get_posts', 'program_main_query' );
endif;

//
//rewrite rule from input values
//only programs
//todo: make it  work with any content type
//
function af_rule() {    

    $urls = get_option('current_url');
    $symlink_urls = get_option('symlink_url');
    

    function array_combine_rule($keys, $values) {
        $result = array();
                
        foreach ($keys as $i => $k) {
            $result[$k][] = $values[$i];
        }
                
        array_walk($result, function (&$v) {
            $v = (count($v) == 1) ? array_pop($v): $v;
        });
                
        return $result;
    }
    $final = array_combine_rule($urls, $symlink_urls);

    if (!empty(array_filter($final))) {

        foreach ($final as $key => $val) {

            if (is_array($val)) {

                foreach ($val as $val_key => $val_val) {
                    if(!empty($val_val)) {
                        
                        if (get_option('enabled')[$val_val][0] == 'page') { 
                            add_rewrite_rule($val_val, 'index.php?pagename='.$key, 'top');
                        } else {
                            add_rewrite_rule($val_val, 'index.php?'.get_option('enabled')[$val_val][0].'='.$key, 'top');
                        }
                        //echo get_option('enabled')[$val_val][0];
                    }
                }

            } elseif (!empty($val)) {
                
                if (get_option('enabled')[$val][0] == 'page') {
                    add_rewrite_rule($val, 'index.php?pagename='.$key, 'top');
                } else {
                    add_rewrite_rule($val, 'index.php?'.get_option('enabled')[$val][0].'='.$key, 'top');
                }
                
                //echo get_option('enabled')[$val][0];
            }

        }

        
    }
    //add a class too
    global $wp;
    $url = add_query_arg( $wp->query_vars);
    
    if(substr($url , -4)=='-af/'){
        
        function af_class($classes) {
            $classes[] = 'affiliate-page';
            return $classes;
        }

        add_filter('body_class', 'af_class');
    }

    function aff_styles() {
        
        $styles = '.affiliate-show {
            display:none;
        }
        .affiliate-page .affiliate-hide,
        .affiliate-page .affiliate-only{
            display:none;
        }
        .affiliate-page .affiliate-show{
            display:initial;
        }
        '
        ;

        echo '<style type="text/css">';
        echo $styles;
        echo '</style>';

    }
    add_action('wp_head', 'aff_styles', 100);
}

add_action('init', 'af_rule');

//setting link
function symlinks_settings_link( $links ) {
    $settings_link = '<a href="options-general.php?page=symlinks-wes">' . __( 'Settings' ) . '</a>';
    array_push( $links, $settings_link );
    return $links;
}
  
$plugin = plugin_basename( __FILE__ );
add_filter( "plugin_action_links_$plugin", 'symlinks_settings_link' );