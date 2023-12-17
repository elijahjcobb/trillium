import { ReactNode } from "react";
import styles from "./index.module.css";

export default function Layout({ children }: { children: ReactNode }): JSX.Element {
	return <div className={styles.container} >
		<h1>Login</h1>
		{children}
	</div>
}