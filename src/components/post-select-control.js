import {
	ComboboxControl,
	SelectControl,
	FormToggle,
	TextControl,
	Tooltip,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useState } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * custom hook to program posts
 *
 * @param {array} posts
 */
const usePosts = (id) => {
	const { result = null } = useSelect((select) => ({
		result: Number.isInteger(id)
			? select("core").getEntityRecord("postType", "course", id)
			: false,
	}));
	return result;
};

const options = [
	{ value: 1, label: "My Cool Post" },
	{ value: 2, label: "Sample Page" },
	{ value: 3, label: "Last One" },
	{ value: 1286, label: "Real Post" },
	{ value: 1171, label: "Example Post" },
];

export default function PostSelectControl({
	className = false,
	...extraProps
}) {
	const baseClass = "c-disclosure";
	return (
		<div
			className={classnames({
				[`${baseClass}`]: true,
				[`${className}`]: className,
			})}
			{...extraProps}
		>
			<ComboboxControl options={options} {...extraProps} />
		</div>
	);
}
