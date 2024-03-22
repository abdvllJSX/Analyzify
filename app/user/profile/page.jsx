"use client"
// pages/profile.js
import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import styles from "./styles.module.scss";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { convertToMintes } from "../../../components/utilis";

const spotifyApi = new SpotifyWebApi();

//profile

const Profile = () => {
    const [userInfo, setUserInfo] = useState([])
    const [playlist, setPlaylist] = useState([])
    const [followedArtist, setFollowedArtist] = useState([])
    const [topArtist, setTopArtist] = useState([])
    const [topTracks, setTopTracks] = useState([])
    const TrackId = []
    const { data } = useSession()

    useEffect(() => {
        spotifyApi.setAccessToken(`${data?.accessToken}`)
    }, [data])

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' })
    };

    useEffect(() => {
        spotifyApi.getMe().then((user) => {
            if (user) {
                setUserInfo(user)
            }
        })
        spotifyApi.getFollowedArtists().then((artist) => {
            setFollowedArtist(artist)
        })

        spotifyApi.getUserPlaylists().then((playlist) => {
            setPlaylist(playlist)

        })
        spotifyApi.getMyTopArtists({ time_range: "long_term", limit: "10" }).then((Artist) => {
            setTopArtist(Artist.items)
        })
        spotifyApi.getMyTopTracks({ time_range: "long_term", limit: "10" }).then((track) => {
            setTopTracks(track.items)
        })

    }, [spotifyApi, data])


    return (
        <div>
            <main className={styles.profile}>
                <div className={styles.profile__container}>
                    <div className={styles.header}>
                        {userInfo.images && userInfo.images.length == 0 ?
                            <div className={styles.header__image}>
                                <div className={styles.avater}>
                                    <svg id="user-icon" viewBox="0 0 1024 1024" width="100%" height="100%"><path d="m730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084q-29.747 19.159-51.175 57.729t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z"></path></svg>
                                </div>
                            </div>

                            :
                            <div className={styles.user__image}>
                                <img src={userInfo.images && userInfo.images[1] && userInfo.images[1].url} />
                            </div>
                        }
                        <h1 className={styles.user__name}>{userInfo.display_name}</h1>
                        <div className={styles.header__info}>
                            <div className={styles.col1}>
                                <h1 className={styles.followers}>{userInfo.followers && userInfo.followers.total}</h1>
                                <p>followers</p>
                            </div>
                            <div className={styles.col2}>
                                <h1 className={styles.followers}>{followedArtist.artists && followedArtist.artists.items.length}</h1>
                                <p>following</p>
                            </div>
                            <div className={styles.col3}>
                                <h1 className={styles.followers}>{playlist.total && playlist.total}</h1>
                                <p>playlists</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className={styles.btn}>logout</button>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.content_right}>
                            <div className={styles.content_top}>
                                <h2>Top Artists of All Time</h2>
                                <Link href="/user/top-artist">
                                    <button className={styles.btn}>
                                        see more
                                    </button>
                                </Link>
                            </div>
                            <div className={styles.content_bottom}>
                                {
                                    topArtist.map((artist, index) => {
                                        return (
                                            <Link href={`/user/top-artist/${artist.id}`} className={styles.artist} key={index}>
                                                <img src={artist.images[1].url} alt="" />
                                                <p className={styles.artist_name}>{artist.name}</p>
                                            </Link>
                                        )
                                    })

                                }
                            </div>
                        </div>

                        <div className={styles.content_left}>
                            <div className={styles.content_top}>
                                <h2>Top Tracks of All Time</h2>
                                <Link href="/user/top-tracks">
                                    <button className={styles.btn}>
                                        see more
                                    </button>
                                </Link>
                            </div>
                            <div className={styles.content_bottom}>
                                {
                                    topTracks.map((track, index) => {
                                        return (
                                            <div className={styles.artist} key={index}>
                                                <Link href={`/user/top-tracks/${track.id}`} className={styles.artist_left}>
                                                    <img src={track.album.images[2].url} alt="" />
                                                    <div className={styles.artist_info}>
                                                        <p className={styles.track_name}>{track.name}</p>
                                                        <p className={styles.artist_name}>{track.album.artists[0].name} . {track.album.name}</p>
                                                    </div>
                                                </Link>
                                                <p className={styles.track_time}>{convertToMintes(track.duration_ms)}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
