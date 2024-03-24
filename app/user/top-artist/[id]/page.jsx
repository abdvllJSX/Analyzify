"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss"
import { useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-js";
import Loading from "../../../loading";


const spotifyApi = new SpotifyWebApi()

const Artist = ({ params }) => {
    const [artist, setArtist] = useState()
    const [loading, setloading] = useState(false)

    const { data } = useSession()
    useEffect(() => {
        spotifyApi.setAccessToken(`${data?.accessToken}`)
        const GetArtist = () => {
            spotifyApi.getArtist(params.id).then(artist => {
                setArtist(artist)
                setloading(true)
            })
        }

        GetArtist()
    }, [data])

    console.log(artist)
    return (
        <div className={styles.container}>
            {loading ?
                artist && (
                    <>
                        <img src={artist.images[1].url} alt="" className={styles.artist_img} />
                        <h2 className={styles.artist_name}>{artist.name}</h2>
                        <div className={styles.info}>
                            <div className={styles.info_container}>
                                <div className={styles.value}>{artist.followers.total.toLocaleString()}</div>
                                <div className={styles.label}>FOLLOWERS</div>
                            </div>
                            <div className={styles.info_container}>
                                <div className={styles.value}>{artist.genres[0]}</div>
                                <div className={styles.value}>{artist.genres[1] && artist.genres[1]}</div>
                                <div className={styles.label}>GENRES</div>
                            </div>
                            <div className={styles.info_container}>
                                <div className={styles.value}>{artist.popularity}%</div>
                                <div className={styles.label}>POPULARITY</div>
                            </div>

                        </div>
                    </>

                )
                :
                <Loading />
            }
        </div>
    );
}

export default Artist;