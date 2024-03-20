"use client"
import styles from "./styles.module.scss";
import SpotifyWebApi from "spotify-web-api-js";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const spotifyApi = new SpotifyWebApi();

export default function TopArtists() {
    const [topArtistData, setTopArtistData] = useState([])
    const [range, setRange] = useState("long_term")
    const { data } = useSession()

    useEffect(() => {
        spotifyApi.setAccessToken(`${data?.accessToken}`)
        const handleTimeRange = (time) => {
            spotifyApi.getMyTopArtists({ time_range: `${time}`, limit: "50" }).then((Artist) => {
                setTopArtistData(Artist)
            })
        }
        handleTimeRange(range)
    }, [range, data])

    return (
        <section className={styles.TopArtists_container}>
            <div className={styles.TopArtists_wrapper}>
                <div className={styles.TopArtists}>
                    <div className={styles.nav}>
                        <h2 className={styles.logo}>
                            Top Artists
                        </h2>

                        <ul className={styles.nav__right}>
                            <li onClick={() => { setRange("long_term") }}>All Time</li>
                            <li onClick={() => { setRange("short_term") }}>Last 6 Months</li>
                            <li onClick={() => { setRange("long_term") }}>Last 4 Weeks</li>
                        </ul>
                    </div>

                    <main className={styles.main}>
                        {
                            topArtistData.items && topArtistData.items.map((artist, index) => {
                                return (
                                    <div className={styles.top_boy} key={index}>
                                        <img src={artist.images[0].url} alt="" />
                                        <p className={styles.top_boy_name}>{artist.name}</p>
                                    </div>
                                )
                            })
                        }
                    </main>
                </div>
            </div>
        </section>
    )
}