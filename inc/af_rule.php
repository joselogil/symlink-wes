<?php function af_rule() {
  include( plugin_dir_path( __FILE__ ) . 'vars.php');

  if ($result && !empty(array_filter($result))) {

    foreach($result as $r) {

      if ($r['enabled'] == 'page') {
        add_rewrite_rule($r['symlink'], 'index.php?pagename='.$r['url'], 'top');
      } else {
        add_rewrite_rule($r['symlink'], 'index.php?'.$r['enabled'].'='.$r['url'], 'top');
      }

    }

  } else {
    if ($symlink_urls[0] == 'page') {
        add_rewrite_rule($symlink_urls[0], 'index.php?pagename='.$urls[0], 'top');
    } else {
        add_rewrite_rule($symlink_urls[0], 'index.php?'.$enabled[0].'='.$urls[0], 'top');
    }
  }

}

add_action('init', 'af_rule');
?>
