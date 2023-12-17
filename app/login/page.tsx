"use client";
import { Input } from "#/components/input";
import { useCallback, useEffect, useState } from "react";
import { Button } from "#/components/button";
import { z } from "zod";
import { useRouter } from "next/navigation";

const schema = z.string().email();

export default function Page(): JSX.Element {

	const [email, setEmail] = useState("");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (email.length === 0) {
			setError(false);
			return;
		}
		const e = schema.safeParse(email);
		setError(!e.success);
	}, [email])

	const handleClick = useCallback(() => {
		const e = schema.safeParse(email);
		if (!e.success) {
			return;
		}
		setLoading(true);
		fetch("/api/user/auth", {
			method: "POST",
			body: JSON.stringify({ email })
		})
			.then(res => {
				if (!res.ok) throw res;
				return res;
			})
			.then(res => res.json())
			.then(() => {
				router.push(`/login/code?email=${encodeURIComponent(email)}`);
			})
			.catch(console.error)
			.finally(() => {
				setLoading(false);
			})
	}, [email, router]);

	return <>
		<p>In order to view properties and save favorites you need to login.</p>
		<p>Please provide us with your email and we will send you a magic code.</p>
		<Input type="email" disabled={loading} autoComplete="email" error={error} value={email} label="Email" onChange={setEmail} />
		<Button disabled={loading} onClick={handleClick} value="Send Magic Code" />
	</>
}