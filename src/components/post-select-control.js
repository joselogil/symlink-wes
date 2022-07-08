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
	{ value: 2, label: "Second Test Post" },
	{ value: 3, label: "Last One" },
	{ value: 1286, label: "Real Post" },
];

export default function PostSelectControl({ ...extraProps }) {
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
