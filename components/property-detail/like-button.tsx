"use client";
import { TbStar, TbStarOff } from "react-icons/tb";
import { Button } from "../button";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import styles from "./like-button.module.css";
import classNames from "classnames";

export function LikeButton({ mls }: { mls: string }): JSX.Element {
	const [isLiked, setIsLiked] = useState(false);
	const [hide, setHide] = useState(true);
	const icon = useMemo(() => isLiked ? TbStarOff : TbStar, [isLiked]);
	const [loading, setLoading] = useState(true);
	const message = useMemo(() => isLiked ? "Unfavorite" : "Favorite", [isLiked]);

	useEffect(() => {
		fetch(`/api/favorite/${mls}`, {
			method: "GET"
		})
			.then(res => {
				if (!res.ok) throw res;
				return res;
			})
			.then(res => res.json())
			.then(res => {
				const { liked } = z.object({ liked: z.boolean() }).parse(res);
				setIsLiked(liked);
				setLoading(false);
				setHide(false);
			})
			.catch(console.error)
	}, [mls]);

	const handleClick = useCallback(() => {
		setLoading(true);
		const likeStatus = !isLiked;
		fetch(`/api/favorite${likeStatus ? "" : `/${mls}`}`, {
			body: likeStatus ? JSON.stringify({ mls }) : undefined,
			method: likeStatus ? "POST" : "DELETE",
		}).finally(() => {
			setLoading(false);
			setIsLiked(likeStatus);
		})
	}, [isLiked, mls]);

	return <Button className={classNames(styles.button, hide && styles.hide)} disabled={loading} type="button" value={message} onClick={handleClick} icon={icon} />
}