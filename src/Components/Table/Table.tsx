import styles from "./Table.module.css";
import {TableProps} from "../../types/FetchedTables.ts";

export default function Table<T>({ data, handlePrev, handleNext, currPage, children, disableNext }: TableProps<T>) {
    return (
        <>
            <ul>
                {children}
                {data.map((item, index) => (
                    <li key={index} className={styles.tableRow}>
                        {Object.entries(item as Record<string, string | undefined>)
                            .slice(0, 5)
                            .map(([key, value]) => (
                                <span key={key}>
                                    {value != null ? value.toString() : "N/A"}
                                </span>
                            ))}
                    </li>
                ))}
            </ul>
            <div className={styles.pagination}>
                <button onClick={handlePrev} disabled={currPage === 1}>
                    Previous
                </button>
                <span>Page {currPage}</span>
                <button onClick={handleNext} disabled={disableNext}>
                    Next
                </button>
            </div>
        </>
    );
}
