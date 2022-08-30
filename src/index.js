/**
 * WordPress dependencies
 */
import { Button, Dashicon } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";
import { registerPlugin } from "@wordpress/plugins";
import SymlinkEditor from "./components/symlink-editor";
import { useSelect, useDispatch } from "@wordpress/data";

/**
 * Internal dependencies
 */
import "./store-find-post-by";
import "./editor.scss";

const PluginDocumentSettingPanelSymlinks = () => {
	const baseClass = "sym-c-symlinks-sidebar";

	const currentPost = useSelect((select) =>
		select("core/editor").getCurrentPost()
	);

	const symlinks = useSelect(function (select) {
		return select("core/editor").getEditedPostAttribute("meta")["symlinks"];
	}, []);

	const panelTitle = `Symlinks${
		symlinks.length > 0 ? ` (${symlinks.length})` : ""
	}`;

	const { editPost } = useDispatch("core/editor");

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

							editPost({
								meta: { symlinks: newSymlinks },
							});
						}}
					/>
				))}
				<Button
					variant="secondary"
					className={`${baseClass}__add`}
					onClick={() => {
						const newSymlinks = [
							...symlinks,
							{
								type: "slug",
								slug: currentPost?.slug ? `${currentPost.slug}-alt` : "",
							},
						];

						editPost({
							meta: { symlinks: newSymlinks },
						});
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
