"use client";
import { IconType } from "react-icons"
import styles from "./index.module.css";
import { cn } from "#/helpers/cn";
import { useCallback, useMemo } from "react";
import Link from "next/link";
import { useAnalytics } from "#/helpers/use-analytics";

export function RawButton(props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
	return <button {...props} />
}

export function Button({
	value,
	icon: Icon,
	onClick,
	disabled = false,
	href,
	postIcon: PostIcon,
	type = 'button',
	form,
	newTab = false,
	analyticsKey
}: {
	value: string,
	icon?: IconType | JSX.Element,
	disabled?: boolean;
	onClick?: () => void;
	href?: string;
	postIcon?: IconType;
	type?: 'submit' | 'button'
	form?: string;
	newTab?: boolean;
	analyticsKey?: string;
}): JSX.Element {

	const Element = useMemo(() => href ? Link : RawButton, [href]);

	const track = useAnalytics("button");

	const handleClick = useCallback(() => {
		if (analyticsKey) track(analyticsKey)
		if (onClick && !disabled) onClick();
	}, [track, analyticsKey, onClick, disabled]);

	return <Element
		form={form}
		type={type}
		href={href!}
		target={newTab ? '_blank' : "_self"}
		onClick={handleClick}
		className={cn(
			styles.button,
			disabled && styles.disabled
		)}
	>
		{Icon ? typeof Icon === 'function' ? <Icon /> : Icon : null}
		<span>{value}</span>
		{PostIcon ? <PostIcon /> : null}
	</Element>
}