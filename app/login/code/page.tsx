"use client";
import { Input } from "#/components/input";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "#/components/button";
import { z } from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const schema = z.string().regex(/^\d{6}$/);

export default function Page(): JSX.Element {

	const [code, setCode] = useState("");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const params = useSearchParams();
	const router = useRouter();
	const email = useMemo(() => params.get("email"), [params]);

	useEffect(() => {
		if (code.length === 0) {
			setError(false);
			return;
		}
		const e = schema.safeParse(code);
		setError(!e.success);
	}, [code])


	const handleClick = useCallback(() => {
		const e = schema.safeParse(code);
		if (!e.success) {
			return;
		}
		setLoading(true);
		fetch("/api/user/verify", {
			method: "POST",
			body: JSON.stringify({ email, code })
		})
			.then(res => {
				if (!res.ok) throw res;
				return res;
			})
			.then(res => res.json())
			.then(() => {
				router.push('/search');
			})
			.catch(console.error)
			.finally(() => {
				setLoading(false);
			})
	}, [code, email, router]);
	return <>
		<p>We sent a code to {email}.</p>
		<Link href="/login">Change Email</Link>
		<Input error={error} disabled={loading} value={code} label="Code" onChange={setCode} />
		<Button disabled={loading} onClick={handleClick} value="Confirm" />
	</>
}