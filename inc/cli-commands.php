<?php 

class symlink_cli extends WP_CLI_Command {

    function sync() {
        include( WILEY_SYMLINKS_DIR . 'inc/legacy/vars.php' );
        //$result is an array of all symlink values, built in the file vars.php
        if ( ! empty( array_filter( $result ) ) ) {
            $id_array = [];
            $i = 0;
            $symlink_sync = [];
            foreach ( $result as $r ) {
                if ( $r['url'] != '' ) {
                    //get post id from url
                    $post = get_page_by_path( $r['url'], OBJECT, $r['enabled'] );
                    $postid = $post->ID;
                    //end get post id from url
                    //build array with data to be synced
                    $symlink_sync[$postid][$i] = [];
                    $symlink_sync[$postid][$i]['type'] = 'slug';
                    $symlink_sync[$postid][$i]['slug'] = $r['symlink'];
                    $i++;
                    //just because I want to always start from 0
                    if (!in_array($postid, $id_array)) {
                        array_push($id_array, $postid);
                    } else {
                        $i = 0;
                    }
                }
            }
            foreach ($symlink_sync as $key => $value) {
                //$key is post id
                //symlinks is the field name
                //$value is the array with all the legacy symlinks
                //see if field is empty if it's empty update it
                $symlinks = get_post_meta($key, 'symlinks', true);
                if (empty($symlinks)) {
                    update_post_meta( $key, 'symlinks', $value);
                } 
            }
        }
    }
}

WP_CLI::add_command( 'symlink', 'symlink_cli', );