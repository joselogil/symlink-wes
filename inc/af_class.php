<?php

$url = strtok($_SERVER['REQUEST_URI'], '?');

if(substr($url , -4)=='-af/' || substr($url , -5)=='-aff/') {

    function af_class($classes) {
        $classes[] = 'affiliate-page';
        return $classes;
    }

    function wes_enqueue_af() {
        wp_register_script( 'wes-af', '' );
        wp_enqueue_script( 'wes-af' );
        wp_add_inline_script( 'wes-af', 'window.isAffiliatePage=true;' );
    }
    
    add_filter('body_class', 'af_class');
    add_action( 'wp_enqueue_scripts', 'wes_enqueue_af' );
}

?>
