"use client"
import styles from "./styles.module.scss";
import SpotifyWebApi from "spotify-web-api-js";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "../../loading";
import Link from "next/link";

const spotifyApi = new SpotifyWebApi();

export default function TopArtists() {
    const [topArtistData, setTopArtistData] = useState([])
    const [range, setRange] = useState("long_term")
    const [loading, setloading] = useState(false)
    const { data } = useSession()

    useEffect(() => {
        spotifyApi.setAccessToken(`${data?.accessToken}`)
        const handleTimeRange = (time) => {
            spotifyApi.getMyTopArtists({ time_range: `${time}`, limit: "50" }).then((Artist) => {
                setTopArtistData(Artist)
                setloading(true)
            })
        }
        handleTimeRange(range)
    }, [range, data])

    return (
        <section className={styles.TopArtists_container}>
            <div className={styles.TopArtists_wrapper}>
                <div className={styles.nav}>
                    <h2 className={styles.logo}>
                        Top Artists
                    </h2>

                    <ul className={styles.nav__right}>
                        <li onClick={() => { setRange("long_term") }} style={range === "long_term" ? { color: "#ffffff", borderBottom: "1px solid #ffffff" } : {}}>All Time</li>
                        <li onClick={() => { setRange("medium_term") }} style={range === "medium_term" ? { color: "#ffffff", borderBottom: "1px solid #ffffff" } : {}}>Last 6 Months</li>
                        <li onClick={() => { setRange("short_term") }} style={range === "short_term" ? { color: "#ffffff", borderBottom: "1px solid #ffffff" } : {}}>Last 4 Weeks</li>
                    </ul>
                </div>

                <main className={styles.main}>
                    {loading ?
                        topArtistData.items && topArtistData.items.map((artist, index) => {
                            return ( 
                                <Link href={`/user/top-artist/${artist.id}`} className={styles.top_boy} key={index}>
                                    <img src={artist.images[0].url} alt="" />
                                    <p className={styles.top_boy_name}>{artist.name}</p>
                                </Link>
                            )
                        })
                        : 
                        <Loading />
                    }
                </main>
            </div>
        </section>
    )
}