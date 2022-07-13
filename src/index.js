/**
 * WordPress dependencies
 */
import { Button } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";
import { registerPlugin } from "@wordpress/plugins";
import SymlinkEditor from "./components/symlink-editor";
import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import "./store-find-post-by";
import "./editor.scss";

const PluginDocumentSettingPanelSymlinks = () => {
	const baseClass = "c-symlinks-sidebar";

	const currentPost = useSelect((select) =>
		select("core/editor").getCurrentPost()
	);

	// load from post meta, external table, something
	const [symlinks, setSymlinks] = useState([
		{
			// first symlink is a simple alternate URL at the same place
			type: "slug",
			slug: "courses/mgmt-301-af",
		},
		{
			// second symlink is set to "parent", adding a prefix of the slug of post id of 412 to the real slug
			type: "parent",
			parent: 2,
		},
		{
			// third symlink is set to "parent-slug" using a custom slug AND adding a parent prefix
			type: "parent-slug",
			slug: "mgmt-301-yo",
			parent: 1286,
		},
		{
			type: "parent-slug",
		},
	]);

	const panelTitle = `Symlinks${
		symlinks.length > 0 ? ` (${symlinks.length})` : ""
	}`;

	return (
		<PluginDocumentSettingPanel
			name="symlinks"
			title={panelTitle}
			className={baseClass}
		>
			<div className={`${baseClass}__list`}>
				{symlinks.map((item, i) => (
					<SymlinkEditor
						symlink={item}
						onChange={(newItem) => {
							const newSymlinks = [...symlinks];

							// new/updated items will be an object of symlink data
							// deleted items will be `false`
							if (typeof newItem === "object") {
								newSymlinks[i] = newItem;
							} else {
								newSymlinks.splice(i, 1);
							}
							setSymlinks(newSymlinks);
						}}
					/>
				))}
				<Button
					variant="secondary"
					icon="plus"
					className={`${baseClass}__add`}
					onClick={() => {
						setSymlinks([
							...symlinks,
							{
								type: "slug",
								slug: currentPost?.slug ? `${currentPost.slug}-alt` : "",
							},
						]);
					}}
				>
					Add Symlink
				</Button>
			</div>
		</PluginDocumentSettingPanel>
	);
};

registerPlugin("plugin-document-setting-panel-demo", {
	render: PluginDocumentSettingPanelSymlinks,
});
