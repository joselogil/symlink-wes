/**
 * WordPress dependencies
 */
import {
	Button,
	Dashicon,
	SelectControl,
	FormToggle,
	TextControl,
	Tooltip,
	PanelRow,
	Spinner,
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
		result: select("get-record-by").id(id && Number.isInteger(id) ? id : false),
	}));
	return result;
};

function getWarnings(symlink) {
	const warnings = [];

	// bail early if we need parent but none is selected
	if (["parent", "parent-slug"].includes(symlink?.type) && !symlink?.parent) {
		warnings.push("No Parent Selected");
	}

	// bail early if we need slug but none is entered
	if (["slug", "parent-slug"].includes(symlink?.type) && !symlink?.slug) {
		warnings.push("No Slug Entered");
	}

	return warnings;
}

function buildPreviewUrl(symlink, post, parent = false, warnings = []) {
	// bail early and instead show loader if
	// we are waiting on parent data to load
	if (["parent", "parent-slug"].includes(symlink?.type) && null === parent) {
		return <Spinner />;
	}

	// bail early if there are warnings, which mean we
	// are missing critical info to build the url
	if (warnings.length > 0) {
		return (
			<span className="c-warning-label">
				<Dashicon className="c-symlink-editor__warning-icon" icon="warning" />{" "}
				{warnings.length} Warning{warnings.length > 1 ? "s" : ""}
			</span>
		);
	}

	// data setup
	const parentUrl =
		parent && parent?.link ? new URL(parent.link).pathname : "{...}";

	const postSlug = post?.slug;

	const includeTrailingSlash =
		post && post?.link ? post.link.endsWith("/") : true;

	// build the url
	let url = "";

	switch (symlink?.type) {
		case "slug":
			url += `/${symlink?.slug}`;
			break;
		case "parent":
			url += `${parentUrl}${includeTrailingSlash ? "" : "/"}${postSlug}`;
			break;
		case "parent-slug":
			url += `${parentUrl}${includeTrailingSlash ? "" : "/"}${symlink.slug}`;
			break;

		default:
			break;
	}

	url += includeTrailingSlash ? "/" : "";

	return (
		<a href={url} target="_blank">
			{url}
		</a>
	);
}

export default function SymlinkEditor({
	symlink,
	onChange = (newItem) => false,
	className = false,
	...extraProps
}) {
	const warnings = getWarnings(symlink);

	const baseClass = "c-symlink-editor";

	const parent = usePost(symlink?.parent);

	const currentPost = useSelect((select) =>
		select("core/editor").getCurrentPost()
	);

	const symlinkUpdate = (key, val) => {
		onChange?.({ ...symlink, [`${key}`]: val });
	};

	const symlinkDelete = () => {
		onChange?.(false);
	};

	const helpTexts = {
		slugPlain:
			'Full custom slug appended to the root site URL. Can include "/" to act as a child page',
		slugParent:
			'Appended to main parent URL. Can include "/" to act as a nested child page',
		parent: "Provides base URL",
	};

	const typeTooltips = {
		slug: "Custom Slug",
		parent: "Parent Post",
		["parent-slug"]: "Parent Post + Custom Slug",
	};

	// TODO add spinner and dynamic link preview to disclosure text. MAY have to rework how that component functions
	const text = buildPreviewUrl(symlink, currentPost, parent, warnings);

	return (
		<Disclosure
			className={classnames({
				[`${baseClass}`]: true,
				[`${className}`]: className,
			})}
			closeIcon="no"
			openIcon="edit"
			openLabel="Edit"
			icon={symlink.type.includes("parent") ? "rest-api" : "admin-links"}
			iconTooltip={typeTooltips[symlink.type]}
			text={text}
			// text={symlink?.slug ? symlink.slug : "?"}
			{...extraProps}
		>
			{warnings.length > 0 ? (
				<ul className="c-symlink-editor__warnings">
					{warnings.map((text, i) => (
						<li key={i}>
							<Dashicon
								className="c-symlink-editor__warning-icon"
								icon="warning"
							/>{" "}
							{text}
						</li>
					))}
				</ul>
			) : null}
			<SelectControl
				className={`${baseClass}__type`}
				label="Type"
				labelPosition="side"
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
					label="Parent Post"
					value={symlink?.parent}
					postTypeSelect={true}
					postType={parent?.type}
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
			<Button
				isDestructive
				isSmall
				className={`${baseClass}__delete`}
				onClick={symlinkDelete}
			>
				Delete
			</Button>
		</Disclosure>
	);
}
