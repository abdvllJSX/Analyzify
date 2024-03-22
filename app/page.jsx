"use client"
import styles from "./styles.module.scss";
import { signIn } from "next-auth/react"

export default function Index() {
    return (
        <section className={styles.container}>
            <div className={styles.signup__wrapper}>
                <h1>Analyzify<span>.</span></h1>
                <button onClick={() => signIn("spotify", { callbackUrl: '/user/profile' })} className={styles.btn}>
                    log in with spotify
                </button>
            </div>
            <footer>
                <p>Made by <span>404.DEV</span></p>
            </footer>
        </section>
    )
}