import {
	SelectControl,
	FormToggle,
	TextControl,
	Tooltip,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import Disclosure from "./disclosure";
import PostSelectControl from "./post-select-control";

/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * custom hook to get parent post
 *
 * @param {number} id
 */
const usePost = (id) => {
	const { result = null } = useSelect((select) => ({
		result: Number.isInteger(id)
			? select("get-record-by").id(id)
			: // ? select("core").getEntityRecord("postType", "course", id)
			  false,
	}));
	return result;
};

// TODO
function buildPreviewUrl(symlink, parent = false) {
	return "";
}

export default function SymlinkEditor({
	symlink,
	onChange = (newItem) => false,
	className = false,
	...extraProps
}) {
	const parent = ["parent", "parent-slug"].includes(symlink.type)
		? usePost(symlink.parent)
		: false;

	console.log(parent?.link);

	const symlinkUpdate = (key, val) => {
		onChange?.({ ...symlink, [`${key}`]: val });
	};

	const helpTexts = {
		slugPlain:
			'Full custom slug appended to the root site URL. Can include "/" to act as a child page',
		slugParent:
			'Appended to main parent URL. Can include "/" to act as a nested child page',
		parent: "Provides base URL",
	};

	// TODO add spinner ad dynamic link preview to disclosure text. MAY have to rework how that component functions
	const text = (
		<p>
			Hello <strong>World</strong>.
		</p>
	);

	return (
		<Disclosure
			closeIcon="no"
			openIcon="edit"
			icon={symlink.type.includes("parent") ? "rest-api" : "admin-links"}
			text={text}
			// text={symlink?.slug ? symlink.slug : "?"}
			{...extraProps}
		>
			<SelectControl
				label="Type"
				value={symlink.type}
				onChange={(val) => {
					symlinkUpdate("type", val);
				}}
				options={[
					{ value: "slug", label: "Slug" },
					{ value: "parent", label: "Parent" },
					{ value: "parent-slug", label: "Parent + Slug" },
				]}
			/>
			{["parent", "parent-slug"].includes(symlink.type) ? (
				<PostSelectControl
					label="Parent"
					value={symlink?.parent}
					onChange={(val) => {
						// console.log(val);
						symlinkUpdate("parent", val);
					}}
					help={helpTexts.parent}
				/>
			) : null}
			{["slug", "parent-slug"].includes(symlink.type) ? (
				<TextControl
					label="Slug"
					value={symlink?.slug}
					onChange={(val) => {
						symlinkUpdate("slug", val);
					}}
					help={
						"parent-slug" === symlink.type
							? helpTexts.slugParent
							: helpTexts.slugPlain
					}
				/>
			) : null}
		</Disclosure>
	);
}
