import React, { useState, useEffect, useRef, createRef } from "react";
import axios from "axios";
import * as faceapi from "face-api.js";

faceapi.env.monkeyPatch({
  Video: HTMLVideoElement,
});

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function WebPlayback(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);

  async function searchSongsByGenre(genre) {
    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: genre,
          type: "track",
        },
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });

      return response.data.tracks.items;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async function queueTrack(uri, token) {
    try {
      const url = `https://api.spotify.com/v1/me/player/queue?uri=${encodeURIComponent(
        uri
      )}`;
      const response = await axios.post(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error.response.data);
      throw error;
    }
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.7,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        // happy - happy
        // surprise - surprise
        // neutral - lofi
        // angry - bon jovi
        searchSongsByGenre(props.emotion).then((response) =>
          queueTrack(response[0].uri, props.token)
            .then((result) => {
              console.log("Success:", result);
            })
            .catch((error) => {
              console.error("Error:", error);
            })
        );

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, []);

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b style={{ color: "white" }}>
              {" "}
              Instance not active. Transfer your playback using your Spotify app{" "}
            </b>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <div className="container">
          <div className="main-wrapper">
            <img
              src={current_track.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />

            <div className="now-playing__side">
              <div className="now-playing__name">{current_track.name}</div>
              <div className="now-playing__artist">
                {current_track.artists[0].name}
              </div>

              <button
                className="spotify-btn"
                onClick={() => {
                  player.togglePlay();
                }}
              >
                {is_paused ? "PLAY" : "PAUSE"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WebPlayback;
