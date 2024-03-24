"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss"
import { useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-js";
import { convertToMintes } from "../../../components/utilis";
import Link from "next/link";
import Loading from "../../loading";

const spotifyApi = new SpotifyWebApi()

const Recents = () => {
    const [recent, setRecent] = useState([])
    const [loading, setLoading] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const { data } = useSession()

    useEffect(() => {
        spotifyApi.setAccessToken(`${data?.accessToken}`)
        const GetTopTracks = () => {
            spotifyApi.getMyRecentlyPlayedTracks({ limit: 50, after: 1484811043508 }).then(track => {
                setRecent(track)
                setLoading(true)
            })
        }
        GetTopTracks()
    }, [data])

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h2 className={styles.logo}>
                        Recently Played Tracks
                    </h2>
                </div>

                <main className={styles.main}>
                    {loading ?
                        recent.items && recent.items.map((track, id) => {
                            return (
                                <Link href={`/user/top-tracks/${track.track.id}`} className={styles.track_wrapper} key={id}>
                                    <div className={styles.track_profile}>
                                        <div className={styles.img_container}>
                                            <div className={styles.overlay} style={isHovered ? { opacity: "1" } : {}}>
                                                <img src="/query.svg" alt="" />
                                            </div>
                                            <img src={track.track.album.images[2].url} alt="" className={styles.artist_img} />
                                        </div>
                                        <div className={styles.track_info}>
                                            <p className={styles.album_name}>{track.track.name}</p>
                                            <p className={styles.artist_name}><span>{track.track.artists[0].name}</span> . <span>{track.track.album.name}</span></p>
                                        </div>
                                    </div>

                                    <p className={styles.duration}>{convertToMintes(track.track.duration_ms)}</p>
                                </Link>
                            )
                        }) :
                        <Loading />

                    }
                </main>
            </div>
        </div>
    );
}

export default Recents;