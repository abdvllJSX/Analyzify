"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss"
import { useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-js";
import { convertToMintes } from "../../../components/utilis";
import Link from "next/link";

const spotifyApi = new SpotifyWebApi()

const TopTracks = () => {
    const [TopTracksData, setTopTracksData] = useState([])
    const [isHovered, setIsHovered] = useState(false)
    const [range, setRange] = useState("long_term")
    const { data } = useSession()

    useEffect(() => {
        spotifyApi.setAccessToken(`${data?.accessToken}`)
        const GetTopTracks = (time) => {
            spotifyApi.getMyTopTracks({ time_range: `${time}`, limit: "50" }).then(track => {
                setTopTracksData(track)
            })
        }

        GetTopTracks(range)
    }, [range, data])

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h2 className={styles.logo}>
                        Top Tracks
                    </h2>

                    <ul className={styles.nav__right}>
                        <li onClick={() => { setRange("long_term") }} style={range === "long_term" ? { color: "#ffffff", borderBottom: "1px solid #ffffff" } : {}}>All Time</li>
                        <li onClick={() => { setRange("medium_term") }} style={range === "medium_term" ? { color: "#ffffff", borderBottom: "1px solid #ffffff" } : {}}>Last 6 Months</li>
                        <li onClick={() => { setRange("short_term") }} style={range === "short_term" ? { color: "#ffffff", borderBottom: "1px solid #ffffff" } : {}}>Last 4 Weeks</li>
                    </ul>
                </div>

                <main className={styles.main}>
                    {
                        TopTracksData.items && TopTracksData.items.map((track, id) => {
                            return (
                                <Link href={`/user/top-tracks/${track.id}`} className={styles.track_wrapper} key={id}>
                                    <div className={styles.track_profile}>
                                        <div className={styles.img_container}>
                                            <div className={styles.overlay} style={isHovered ? {opacity: "1"} : {}}>
                                                <img src="/query.svg" alt="" />
                                            </div>
                                            <img src={track.album.images[2].url} alt="" className={styles.artist_img} />
                                        </div>
                                        <div className={styles.track_info}>
                                            <p className={styles.album_name}>{track.name}</p>
                                            <p className={styles.artist_name}><span>{track.album.artists[0].name}</span> . <span>{track.album.name}</span></p>
                                        </div>
                                    </div>

                                    <p className={styles.duration}>{convertToMintes(track.duration_ms)}</p>
                                </Link>
                            )
                        })
                    }
                </main>
            </div>
        </div>
    );
}

export default TopTracks;