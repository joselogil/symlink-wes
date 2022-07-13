import {
	ComboboxControl,
	SelectControl,
	FormToggle,
	TextControl,
	Tooltip,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useState, useEffect } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * custom hook to program posts
 *
 * @param {array} posts
 */
const usePosts = (postType) => {
	const { result = null } = useSelect((select) => ({
		result: select("core").getEntityRecords("postType", postType, {
			per_page: -1,
			_fields: ["id", "title", "type"],
		}),
	}));
	return result;
};

export default function PostSelectControl({
	value = null,
	onChange = (newItem) => false,
	postTypeSelect = false,
	postType = null,
	label = "Selected Post",
	className = false,
	...extraProps
}) {
	const baseClass = "c-post-select-control";

	const [currentPostType, setCurrentPostType] = useState(postType ?? "post");

	// Reset currentPostType if `postType` prop changes.
	// Needed since post objects that may be being used to set `postType`
	// must be fetched and may not be known on initial render.
	useEffect(() => {
		if (postType && postType !== currentPostType) {
			setCurrentPostType(postType);
		}
	}, [postType]);

	const excludedPostTypes = wp.hooks.applyFilters(
		"symlinks.postSelectControlExcludedPostTypes",
		["attachment", "wp_block"]
	);

	const postTypes = useSelect((select) => {
		const req = select("core").getPostTypes();
		return Array.isArray(req)
			? req
					.filter(
						(type) =>
							!excludedPostTypes.find((excluded) => excluded === type.slug)
					)
					.map((type) => ({
						value: type.slug,
						label: type.name,
					}))
			: req;
	});

	const options = usePosts(
		postTypeSelect ? currentPostType : postType ?? "post"
	);

	return (
		<div
			className={classnames({
				[`${baseClass}`]: true,
				[`${className}`]: className,
			})}
			{...extraProps}
		>
			{postTypeSelect ? (
				<SelectControl
					value={currentPostType}
					label="Post Type"
					options={postTypes ? postTypes : [{ value: "", label: "-" }]}
					disabled={!postTypes}
					onChange={(newPostType) => {
						setCurrentPostType(newPostType);
						onChange(false);
					}}
				/>
			) : null}
			<ComboboxControl
				options={
					Array.isArray(options)
						? options.map((post) => ({
								value: post.id,
								label: post.title.rendered,
						  }))
						: [{ value: "", label: "-" }]
				}
				value={value}
				label={label}
				onChange={onChange}
				disabled={!options}
			/>
		</div>
	);
}
