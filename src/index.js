import { useState } from "@wordpress/element";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";
import { registerPlugin } from "@wordpress/plugins";
import SymlinkEditor from "./components/symlink-editor";

const PluginDocumentSettingPanelSymlinks = () => {
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
			parent: 1286,
		},
		{
			// third symlink is set to "parent-slug" using a custom slug AND adding a parent prefix
			type: "parent-slug",
			slug: "mgmt-301-yo",
			parent: 1286,
		},
	]);

	return (
		<PluginDocumentSettingPanel
			name="symlinks"
			title="Symlinks"
			className="symlinks"
		>
			{symlinks.map((item, i) => (
				<SymlinkEditor
					symlink={item}
					onChange={(newItem) => {
						const newSymlinks = [...symlinks];
						newSymlinks[i] = newItem;
						setSymlinks(newSymlinks);
					}}
				/>
			))}
		</PluginDocumentSettingPanel>
	);
};

registerPlugin("plugin-document-setting-panel-demo", {
	render: PluginDocumentSettingPanelSymlinks,
});
