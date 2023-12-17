"use client";
import { IconType } from "react-icons"
import styles from "./index.module.css";
import { cn } from "#/lib/cn";
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
	postIcon: PostIcon,
	type = 'button',
	form,
	newTab = false,
	className
}: {
	value?: string,
	icon?: IconType | JSX.Element,
	disabled?: boolean;
	onClick?: () => void;
	href?: string;
	postIcon?: IconType;
	type?: 'submit' | 'button'
	form?: string;
	className?: string;
	newTab?: boolean;
}): JSX.Element {

	const Element = useMemo(() => href ? Link : RawButton, [href]);

	const handleClick = useCallback(() => {
		if (onClick && !disabled) onClick();
	}, [onClick, disabled]);

	return <Element
		form={form}
		type={type}
		href={href!}
		target={newTab ? '_blank' : "_self"}
		onClick={handleClick}
		className={cn(
			styles.button,
			disabled && styles.disabled,
			className
		)}
	>
		{Icon ? typeof Icon === 'function' ? <Icon /> : Icon : null}
		{value ? <span>{value}</span> : null}
		{PostIcon ? <PostIcon /> : null}
	</Element>
}