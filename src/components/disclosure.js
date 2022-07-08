import { Dashicon } from "@wordpress/components";
import { useState } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from "classnames";

export default function Disclosure({
	children,
	className = false,
	icon = false,
	text = "Disclosure",
	openIcon = "plus",
	closeIcon = "minus",
	initialOpen = false,
	...extraProps
}) {
	const baseClass = "c-disclosure";

	const [isExpanded, setIsExpanded] = useState(initialOpen);

	return (
		<div
			className={classnames({
				[`${baseClass}`]: true,
				[`${className}`]: className,
			})}
			{...extraProps}
		>
			<div className={`${baseClass}__header`}>
				{icon ? <Dashicon icon={icon} /> : null}
				<span className={`${baseClass}__text`}>{text}</span>
				<button onClick={() => setIsExpanded(!isExpanded)}>
					<Dashicon icon={isExpanded ? closeIcon : openIcon} />
				</button>
			</div>
			<div className={`${baseClass}__panel`} hidden={!isExpanded}>
				{children}
			</div>
		</div>
	);
}
