<?php function symlinks_page() {
  include( plugin_dir_path( __FILE__ ) . 'vars.php');
?>

  <div class="wrap" id="symlinks-wes">

    <h1 class="wp-heading-inline">Symlinks Builder - WES</h1>

    <form style="margin-top:1.75rem"method="post" action="options.php">

      <?php
      settings_fields('symlinks-settings');
      do_settings_sections('symlinks-settings');
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

        <?php if (!empty(array_filter($result))) {

          foreach($result as $r) {

            if ($r['url'] !='') {
              print '<tr class="urls">';
              print '<td><div><input type="text" name="current_url[]" value="'.$r['url'].'"/></div></td>';
              print '<td><div><input type="text" name="symlink_url[]" value="'.$r['symlink'].'"/></div></td>';
              print '<td><div><select name="enabled['.$r['symlink'].']"><option value> -- select an option -- </option>';

              foreach ( $post_types as $post_type ) {
                  if ( $post_type == $r['enabled'] ) {
                    print '<option selected value="'.$post_type.'">'.$post_type.'</option>';
                  } else {
                    print '<option value="'.$post_type.'">'.$post_type.'</option>';
                  }
              }

              print '</select>';
              print' <button class="sym-add-id">+</button><button class="sym-kill-id">-</button></div></td>';
              print '</tr>';
            }
          }

        } else {
          print '<tr class="urls">';
          print '<td><div><input type="text" name="current_url[]" value="'.$urls[0].'"/></div></td>';
          print '<td><div><input type="text" name="symlink_url[]" value="'.$symlink_urls[0].'"/></div></td>';
          print '<td><div><select name="enabled['.$symlink_urls[0].']"><option value> -- select an option -- </option>';
          foreach ( $post_types as $post_type ) {
            print '<option value="'.$post_type.'">'.$post_type.'</option>';
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
  <?php flush_rewrite_rules(); ?>
<?php } ?>
