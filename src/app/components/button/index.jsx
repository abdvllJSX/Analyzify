import styles from "./styles.module.scss";

export default function Button({ children }) {
    return(
        <button className={styles.btn}>{children}</button>
    )
}