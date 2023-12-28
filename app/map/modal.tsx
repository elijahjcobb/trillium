import { useContext } from "react";
import { mapContext } from "./context";
import styles from "./modal.module.css";
import classNames from "classnames";
import { Property } from "#/components/property";

export function Modal(): JSX.Element {
	const { selectedProperty } = useContext(mapContext);
	return <div className={classNames(styles.container, selectedProperty && styles.show)}>
		{selectedProperty ? <Property property={selectedProperty} /> : null}
	</div>
}