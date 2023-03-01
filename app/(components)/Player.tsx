import React from 'react';
import { useDispatch } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

import { setIsPlaying } from '../../store/Reducers/player';
import { useAppSelector } from '../../store/store';


type Props = {
  accessToken: any;
}

const Player = ({ accessToken }: Props) => {
  const dispatch = useDispatch();
  const isPlaying = useAppSelector(state => state.player.isPlaying);
  const activeTrack = useAppSelector(state => state.player.activeTrack);

  return (
    <>
      {/* Premium Users */}
      <SpotifyPlayer
        styles={{
          activeColor: "#fff",
          bgColor: "#181818",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
          height: 70,
          sliderTrackColor: "#535353",
          sliderTrackBorderRadius: "4px",
          sliderHandleColor: "#fff",
          errorColor: "#fff",

        }}
        token={accessToken}
        showSaveIcon

        callback={(state) => {
          dispatch(setIsPlaying(state.isPlaying));
        }}
        play={isPlaying}
        uris={activeTrack && activeTrack.uri ? [activeTrack.uri] : []}
        magnifySliderOnHover={true}
        hideAttribution
        layout='responsive'
      />
    </>
  )
}

export default Player