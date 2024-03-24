"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss"
import { extractYearFromDate, convertToMintes } from "../../../../components/utilis";
import SpotifyWebApi from "spotify-web-api-js";
import BarChart from "../../../../components/barchart";
import Loading from "../../../loading";

const spotifyApi = new SpotifyWebApi()


const Track = ({ params }) => {
    const { data } = useSession()
    const [track, setTrack] = useState()
    const [audioFeatures, setAudioFeatures] = useState()
    const [audioAnalysis, setAudioAnalysis] = useState()
    const [loading, setloading] = useState(false)
    useEffect(() => {
        spotifyApi.setAccessToken(`${data?.accessToken}`)
        const GetTopTracks = () => {
            spotifyApi.getTrack(params.id).then(track => {
                setTrack(track)
            })
            spotifyApi.getAudioFeaturesForTrack(params.id).then(track => {
                setAudioFeatures(track)
            })
            spotifyApi.getAudioAnalysisForTrack(params.id).then(track => {
                setAudioAnalysis(track)
                setloading(true)
            })
        }
        GetTopTracks()
    }, [data])



    const keys = {
        0: "C",
        1: "D♭",
        2: "D",
        3: "E♭",
        4: "E",
        5: "F",
        6: "G♭",
        7: "G",
        8: "A♭",
        9: "A",
        10: "B♭",
        11: "B"
    }

    const GetKey = (key) => {
        for (let i = 0; i < 11; i++) {
            if (i === key) {
                return keys[i]
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
              {
                loading ?
                (
                    <div className={styles.main}>
                    <div className={styles.track_proflie}>
                        {
                            track && (
                                <>
                                    <img src={track.album.images[1].url} className={styles.album_img} alt="" />
                                    <div className={styles.info}>
                                        <p className={styles.track_name}>{track.name}</p>
                                        <p className={styles.artist_name}>{track.artists[0].name}</p>
                                        <p className={styles.date}><span>{track.album.name}</span> . <span>{extractYearFromDate(track.album.release_date)}</span></p>
                                        <button className={styles.btn}>play on spotify</button>
                                    </div>
                                </>
                            )
                        }
                    </div>

                    {
                        track && audioFeatures && audioAnalysis && (
                            <div className={styles.track_feature_container}>
                                <div className={styles.track_feature}>
                                    <p className={styles.track_feature_text}>{convertToMintes(track.duration_ms)}</p>
                                    <p className={styles.track_feature_label}>Duration</p>
                                </div>
                                <div className={styles.track_feature}>
                                    <p className={styles.track_feature_text}>{GetKey(audioFeatures.key)}</p>
                                    <p className={styles.track_feature_label}>key</p>
                                </div>
                                <div className={styles.track_feature}>
                                    <p className={styles.track_feature_text}>{audioFeatures.mode === 0 ? "Minor" : "Major"}</p>
                                    <p className={styles.track_feature_label}>modality</p>
                                </div>
                                <div className={styles.track_feature}>
                                    <p className={styles.track_feature_text}>{audioFeatures.time_signature}</p>
                                    <p className={styles.track_feature_label}>Time Signature</p>
                                </div>
                                <div className={styles.track_feature}>
                                    <p className={styles.track_feature_text}>{Math.floor(audioFeatures.tempo)}</p>
                                    <p className={styles.track_feature_label}>Tempo (BPM)</p>
                                </div>
                                <div className={styles.track_feature}>
                                    <p className={styles.track_feature_text}>{`${track.popularity}%`}</p>
                                    <p className={styles.track_feature_label}>Popularity</p>
                                </div>
                                <div className={styles.track_feature}>
                                    <p className={styles.track_feature_text}>{audioAnalysis.bars.length}</p>
                                    <p className={styles.track_feature_label}>Bars</p>
                                </div>
                                <div className={styles.track_feature}>
                                    <p className={styles.track_feature_text}>{audioAnalysis.beats.length}</p>
                                    <p className={styles.track_feature_label}>Beats</p>
                                </div>
                                <div className={styles.track_feature}>
                                    <p className={styles.track_feature_text}>{audioAnalysis.sections.length}</p>
                                    <p className={styles.track_feature_label}>Sections</p>
                                </div>
                                <div className={styles.track_feature}>
                                    <p className={styles.track_feature_text}>{audioAnalysis.segments.length}</p>
                                    <p className={styles.track_feature_label}>Segment</p>
                                </div>

                            </div>
                        )
                    }
                    {
                        audioFeatures && (
                            <div className={styles.chart}>
                               <BarChart data = {audioFeatures}/>
                            </div>
                        )
                    }
                </div>
                ) : (
                    <Loading />
                )
              }
            </div>
        </div>
    );
}

export default Track;