<?php


function af_helpers() {

    $styles = '
    body:not(.affiliate-page) .affiliate-show {
        display:none;
    }
    .affiliate-page .affiliate-hide,
    .affiliate-page .affiliate-only{
        display:none;
    }
    ';

    echo '<style type="text/css">';
    echo $styles;
    echo '</style>';

    $js = '
    document.addEventListener("DOMContentLoaded", function(){

     var af_links = document.querySelectorAll(".affiliate-page .af-link");

     if (af_links) {
       for (var i = 0; i < af_links.length; i++) {

         href = af_links[i].getAttribute("href");

         if (href.endsWith("/")) {
           href = href.slice(0, -1);
         }

         href = href + "-af/";
         af_links[i].setAttribute("href", href);
       }

      }

    });
    ';

    echo '<script type="text/javascript">';
    echo $js;
    echo '</script>';

}

add_action('wp_head', 'af_helpers', 100);

?>
