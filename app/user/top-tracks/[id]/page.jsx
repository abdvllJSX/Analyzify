"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi()


const Track = ({ params }) => {
    const { data } = useSession()
    const [track, setTrack] = useState()


    useEffect(() => {
        spotifyApi.setAccessToken(`${data?.accessToken}`)
        const GetTopTracks = () => {
            spotifyApi.getTrack(params.id).then(track => {
                setTrack(track)
            })
        }
        GetTopTracks()
    }, [data])

    console.log(track)

    return (
        <div className="">{params.id}</div>
    );
}

export default Track;