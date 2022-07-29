# symlink-wes

Create one or more additional URL aliases for posts in WordPress.

This plugin adds a new panel to the post settings sidebar that allows for additional custom URLs that point to the post, similar to symbolic links (symlinks for short) in most operating systems. These URLs can be totally custom, or built on top of a separate post's permalink, which will act as a sort of "parent".

## Developer Hooks

### Parent Post Context

If you would like to customize a post template based on which "parent" has been selected for a given symlink, a custom query var is made available called `symlink_parent_context` which will give the post ID of the parent post.

```php
// example: create link to parent

$symlink_parent_id = (int) get_query_var( 'symlink_parent_context' );

// if we are at a symlink we will have a parent query var, otherwise try to use default post parent
$parent_id = $symlink_parent_id ? $symlink_parent_id : $post->post_parent;

if ( $parent_id ) {
	// we have a real parent or symlink parent
	$parent_link = get_permalink( $parent_id );
	echo "<a href='{$parent_link}'>Overview Page</a>";
}
```

### Dynamic Permalinks Based on Context

When on a "parent" post, this plugin will dynamically adjust permalinks for posts that have a symlink for that "parent". To remove this behavior you can use the `symlinks/enable_context_permalinks` filter:

```php
add_filter( 'symlinks/enable_context_permalinks', '__return_false' );
```

### Parent Post Selection

A JS filter is provided to customize which registered post types are available to choose from for the "parent" of a symlink. The filter passes an array of strings of registered post types, which by default includes:

- `"attachment"`,
- `"wp_block"`,
- `"nav_menu_item"`,
- `"wp_template"`,
- `"wp_template_part"`,
- `"wp_navigation"`.

If you have a plugin that registers a custom post type and do not want that post type available here, you can do:

```js
const { addFilter } = wp.hooks;

const filterExcludedPostTypes = (postTypes) => {
	// create new array with all existing excluded types, plus yours
	return [...postTypes, "my_post_type"];
};

addFilter(
	"symlinks.postSelectControlExcludedPostTypes", // symlinks hook name
	"my-plugin/filter-post-types", // name for your filter
	filterExcludedPostTypes
);
```

## Plugin Development

This plugin uses webpack through [`@wordpress/scripts`](https://www.npmjs.com/package/@wordpress/scripts) to build assets for the admin. To make changes:

```sh
npm i

# dev
npm start

# build for release
npm run build
```

### Releases

Raleases are done with semantic versioning through [wp-release](https://github.com/kurtrank/wp-release).

```sh
# generate zip file for testing
npm run generate-zip 0.0.0-dev.0

# test real release
npm run test-release

# create actual real release
npm run release
```

## Symlink Data

Symlink data is stored in a post meta field `symlinks` as an array of objects. Each object contains key data to generate the custom URL, and is structured as follows:

| Property | Type      | Description                                                                                                                       | Required |
| -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `type`   | `string`  | Determines how the URL will be built. Allowed values: `"slug"`, `"parent"`, `"parent-slug"`                                       | Yes      |
| `slug`   | `string`  | Custom slug that will be included when "slug" or "parent-slug" is used.                                                           | No       |
| `parent` | `integer` | WordPress Post ID of the post that will act as the "parent", using the path of the parent post for the first part of the symlink. | No       |

### Symlink Types

- `"slug"`: Completely separate URL, can be anything.
- `"parent"`: Uses the path of the selected parent and the real slug of the current post.
- `"parent-slug"`: Combination of the above two, using a parent path _and_ a custom slug. The benefit of using this over a plain custom `"slug"` is that if the parent path ever updates this symlink will also update, while still getting the ability to modify the ending slug.

### Example

```js
// canonical page is `courses/mgmt-301` and the post slug is `mgmt-301`

symlinks = [
	{
		// first symlink is a simple alternate URL at the same place
		type: "slug",
		slug: "courses/mgmt-301-af",
	},
	{
		// second symlink is set to "parent", adding a prefix of the path of post id 412 to the real slug
		type: "parent",
		parent: 412,
	},
	{
		// third symlink is set to "parent-slug" using a custom slug AND adding a parent prefix
		type: "parent-slug",
		slug: "mgmt-301-yo",
		parent: 412,
	},
];
```

## Project Structure

This plugin is split up between three main areas of functionality:

- The admin experience - PHP: main plugin setup, registering assets
- The admin experience - JS: React components to set up the UI and prepare data for saving.
- The URL rewrite rules that are generated from the post meta
- Supporting functions that make sure the rewrite rule cache is flushed and rules are rebuilt when symlinks are edited.

### Admin - PHP

This code mainly lives in `inc/sidebar.php`. It is responsible for:

- registering the post meta field for use with the REST API (to correctly save from the gutenberg editor)
- enqueuing assets for the post editor
- registering a custom REST API endpoint that can find a post by ID, regardless of post type.

#### Custom REST API Endpoint

The file `inc/class-find-post-by-rest-controller.php` sets up a new endpoint that given an ID will return the full post information, without knowing the post type. Since posts in the database are all stored in one table and each have a unique ID, WordPress has the capability to get a post purely based on ID in PHP. The default REST API routes do not support this and are instead split up by post type, and in the post editor side we typically fetch from API endpoints.

So rather than save the ID _and_ the post type in our symlink data (to know which endpoint to use), this plugin registers a new endpoint to get any post type:

```
http://example.com/wp-json/wiley/v1/find-post-by/id/<id>/
```

### Admin - JS

The actual sidebar panel is a React component that uses WordPress' `PluginDocumentSettingPanel`. The build process for React uses `@wordpress/scripts` and can be run with `npm start`. The `src/` directory contains all of the JS files for building the admin:

- `components/`: stores individual component files.
- `icons/`: custom SVG icons saved as JSX.
- `editor.scss`: styling for admin components
- `index.js`: main plugin file that registers the sidebar panel.
- `store-find-post-by.js`: custom Redux store for fetching and saving selected parent post data with post id.

### URL Rewrites

`inc/rewrites.php` is where the actual URLs are created from the symlink post meta fields. It contains three functions:

- `generate_path()`: responsible for creating the final URL
- `register_rewrites()`: queries the DB for post_meta, loops through and adds the rewrite rules
- `custom_query_vars()`: registers our custom query var. _Note_: it also explicitly adds `do_not_redirect` as well, so that we can use this to prevent Permalink Manager Pro from redirecting to the canonical URL.

### Flush Rewrites

URL rewrites in WordPress are cached to the database so that they don't have to be built on every page load and that cache must be flushed so the URLs will be regenerated when changes are made. `inc/flush.php` is a set of support functions that makes sure when relevant data for symlinks is updated, WordPress' `flush_rewrite_rules()` runs. Rewrites will be flushed when:

- a symlink meta value is changed or added
- the slug of a post changes

since symlinks may rely on this data when using the parent types.

Flushing permalinks happens in the `init` hook, but the hooks for checking meta and slug values all happen after the `init` hook, so we cannot run `flush_rewrite_rules()` directly here. Instead if any values are updated and we want to regenerate URLs, a row `symlinks_flush_rewrite_rules` is added to `wp_options`. This flag will then flush permalinks on the next page load.
