<?php

$url = strtok($_SERVER['REQUEST_URI'], '?');

if(substr($url , -4)=='-af/') || substr($url , -5)=='-aff/') {

    function af_class($classes) {
        $classes[] = 'affiliate-page';
        return $classes;
    }

    add_filter('body_class', 'af_class');
}

?>
