import "../../app/globals.css";
import styles from "./styles.module.scss";
import { getAcessToken } from "@/app/get-acesstoken";
import SpotifyWebApi from "spotify-web-api-js";
import RootLayout from "@/app/layout";

const spotifyApi = new SpotifyWebApi();

export default function TopArtists(){
    return(
        <RootLayout showSidebar={true}>

        </RootLayout>
    )
}