import styles from "./index.module.css";

export function Skeleton({
	width = '100%',
	height = '100%',
	borderRadius = 8
}: {
	height?: number | string;
	width?: number | string;
	borderRadius?: number | string | false;
}): JSX.Element {
	return <div className={styles.skeleton} style={{
		width,
		height,
		borderRadius: borderRadius ? borderRadius : undefined
	}} >
		<div className={styles.shimmer} />
	</div>
}