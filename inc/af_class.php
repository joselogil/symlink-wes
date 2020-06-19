<?php

global $wp;
$url = add_query_arg( $wp->query_vars);

if(substr($url , -4)=='-af/'){

    function af_class($classes) {
        $classes[] = 'affiliate-page';
        return $classes;
    }

    add_filter('body_class', 'af_class');
}

?>
