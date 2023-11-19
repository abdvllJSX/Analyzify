import "../globals.css";
import styles from "./styles.module.scss";
import SpotifyWebApi from "spotify-web-api-js";
import { token } from "../lib/info";
import { use, useEffect, useState } from "react";
import RootLayout from "../layout";

const spotifyApi = new SpotifyWebApi();

export default function TopArtists() {
    const [topArtistData, setTopArtistData] = useState([])

    useEffect(() => {
        spotifyApi.setAccessToken(`${token}`)
        spotifyApi.getMyTopArtists({ time_range: "long_term", limit: "50" }).then((Artist) => {
            setTopArtistData(Artist)
        })
    }, [])
    const handleTimeRangeLong = () => {
        spotifyApi.getMyTopArtists({ time_range: "long_term", limit: "50" }).then((Artist) => {
            setTopArtistData(Artist)
        })
    }

    const handleTimeRangeMedium = () => {
        spotifyApi.getMyTopArtists({ time_range: "medium_term", limit: "50" }).then((Artist) => {
            setTopArtistData(Artist)
        })
    }
    const handleTimeRangeShort = () => {
        spotifyApi.getMyTopArtists({ time_range: "short_term", limit: "50" }).then((Artist) => {
            setTopArtistData(Artist)
        })
    }

    console.log(topArtistData.items)

    return (
        <RootLayout showSidebar={true}>
            <section className={styles.TopArtists_container}>
                <div className={styles.TopArtists_wrapper}>
                    <div className={styles.TopArtists}>
                        <div className={styles.nav}>
                            <h2 className={styles.logo}>
                                Top Artists
                            </h2>

                            <ul className={styles.nav__right}>
                                <li onClick={handleTimeRangeLong}>All Time</li>
                                <li onClick={handleTimeRangeMedium}>Last 6 Months</li>
                                <li onClick={handleTimeRangeShort}>Last 4 Weeks</li>
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
        </RootLayout>
    )
}