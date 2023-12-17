"use client";
import { DetailedHTMLProps, InputHTMLAttributes, useCallback, useRef, useState } from "react";
import styles from "./index.module.css";
import classNames from "classnames";

export interface InputProps {
	value?: string;
	onChange?: (value: string) => void;
	label?: string;
	className?: string;
	disabled?: boolean;
	error?: boolean;
}

type Props = Omit<Partial<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>, "onChange" | "onBlur" | "onFocus" | "ref" | "disabled" | "value" | "className">;

export function Input({ value, onChange, label, className, disabled, error, ...props }: InputProps & Props): JSX.Element {

	const [isFocused, setIsFocused] = useState(false);
	const input = useRef<HTMLInputElement>(null);

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) onChange(event.target.value);
	}, [onChange]);

	const handleFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleBlur = useCallback(() => {
		setIsFocused(false);
	}, []);

	const handleClick = useCallback(() => {
		input.current?.focus();
	}, []);

	return <div onClick={handleClick} className={classNames(styles.container, isFocused && styles.focus, error && styles.error, className)}>
		{(label) ? <label className={classNames(styles.label, (isFocused || value && value.trim().length > 0) && styles.labelFocus)}>{label}</label> : null}
		<input disabled={disabled} ref={input} onFocus={handleFocus} onBlur={handleBlur} value={value} onChange={handleChange} className={styles.input} {...props} />
	</div>
}