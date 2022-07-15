import { Dashicon, Tooltip } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { useInstanceId } from "@wordpress/compose";
import { Icon, chevronUp, chevronDown } from "@wordpress/icons";

/**
 * External dependencies
 */
import classnames from "classnames";

export default function Disclosure({
	children,
	className = false,
	icon = false,
	iconTooltip = null,
	text = "Disclosure",
	openIcon = chevronDown,
	closeIcon = chevronUp,
	openLabel = "Open",
	closeLabel = "Close",
	initialOpen = false,
	...extraProps
}) {
	const baseClass = "sym-c-disclosure";

	const instanceId = useInstanceId(Disclosure, "symlink-disclosure");

	const [isExpanded, setIsExpanded] = useState(initialOpen);

	let iconEl = icon ? (
		<span className={`${baseClass}__icon`} aria-label={iconTooltip}>
			<Icon icon={icon} />
		</span>
	) : null;
	if (icon && iconTooltip) {
		iconEl = <Tooltip text={iconTooltip}>{iconEl}</Tooltip>;
	}

	const triggerText = isExpanded ? closeLabel : openLabel;

	return (
		<div
			className={classnames({
				[`${baseClass}`]: true,
				[`${className}`]: className,
			})}
			{...extraProps}
		>
			<div className={`${baseClass}__header`}>
				{iconEl}
				<span className={`${baseClass}__text`}>{text}</span>
				<Tooltip text={triggerText}>
					<button
						aria-expanded={isExpanded}
						className={`${baseClass}__trigger`}
						onClick={() => setIsExpanded(!isExpanded)}
						aria-controls={`${instanceId}-panel`}
						aria-label={triggerText}
					>
						<Icon icon={isExpanded ? closeIcon : openIcon} />
					</button>
				</Tooltip>
			</div>
			<div
				className={`${baseClass}__panel`}
				id={`${instanceId}-panel`}
				hidden={!isExpanded}
			>
				{children}
			</div>
		</div>
	);
}
