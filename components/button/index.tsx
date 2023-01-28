import { IconType } from "react-icons"
import styles from "./index.module.css";
import { cn } from "#/helpers/cn";
import { useCallback, useMemo } from "react";
import Link from "next/link";

export function RawButton(props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
	return <button {...props} />
}

export function Button({
	value,
	icon: Icon,
	onClick,
	disabled = false,
	href,
	postIcon: PostIcon
}: {
	value: string,
	icon?: IconType,
	disabled?: boolean;
	onClick?: () => void;
	href?: string;
	postIcon?: IconType;
}): JSX.Element {

	const Element = useMemo(() => href ? Link : RawButton, [href]);

	const handleClick = useCallback(() => {
		if (onClick && !disabled) onClick();
	}, [onClick, disabled]);

	return <Element
		href={href!}
		onClick={handleClick}
		className={cn(
			styles.button,
			disabled && styles.disabled
		)}
	>
		{Icon ? <Icon /> : null}
		{value}
		{PostIcon ? <PostIcon /> : null}
	</Element>
}