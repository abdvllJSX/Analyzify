import Link from "next/link";
import styles from "./styles.module.scss";
import RootLayout from "@/app/layout";

export default function Index() {
    return (
        <RootLayout showSidebar={false}>
            <section className={styles.container}>
                <div className={styles.signup__wrapper}>
                    <h1>Analyzify<span>.</span></h1>
                    <Link href="http://localhost:8888/login">
                        <button className={styles.btn}>
                            log in with spotify
                        </button>
                        </Link>
                </div>
                <footer>
                    <p>Made by <span>404.DEV</span></p>
                </footer>
            </section>
        </RootLayout>
    )
}