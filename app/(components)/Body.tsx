import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { spotifyApi } from '../../services/SpotifyApi';
import { setActiveTrack, setIsPlaying } from '../../store/Reducers/player';
import { useAppSelector } from '../../store/store';
import Poster from './Poster';
import Search from './Search';
import Track from './Track';



const Body = () => {
    const { data: session }: any = useSession();
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<Array<any>>([]);
    const [newReleases, setNewReleases] = useState<Array<any>>([]);
    const dispatch = useDispatch();
    const currentTrack = useAppSelector(state => state.player.activeTrack);


    // Searching...
    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!session || !session.accessToken) return;

        let cancel = false;

        spotifyApi.instance(session.accessToken).searchTracks(`${search} سورة انشودة قران حديث`).then((res: any) => {
            if (cancel) return;
            setSearchResults(
                res.body.tracks.items.map((track: any) => {
                    return {
                        id: track.id,
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: track.album.images[0].url,
                        popularity: track.popularity,
                    };
                })
            );
        });

        return () => { cancel = true };
    }, [search, session]);

    // New Releases...
    useEffect(() => {
        if (!session || !session.accessToken) return;

        spotifyApi.instance(session.accessToken).searchTracks(`سورة انشودة قران حديث`).then((res: any) => {
            setNewReleases(
                res.body.tracks.items.map((track: any) => {
                    return {
                        id: track.id,
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: track.album.images[0].url,
                    };
                })
            );
        });
    }, [session?.accessToken]);


    useEffect(() => {
        if (currentTrack && currentTrack.uri) {
            dispatch(setIsPlaying(true));
        } else dispatch(setIsPlaying(false));
    }, [currentTrack])

    const handleSelectTrack = (track: any) => {
        dispatch(setActiveTrack(track));
        dispatch(setIsPlaying(true));

    }

    const [expanded, setExpanded] = useState(false);
    return (
        <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
            <Search search={search} setSearch={(value: string) => setSearch(value)} setExpanded={setExpanded} expanded={expanded} />
            <div className={`grid overflow-y-scroll scrollbar-hide py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-1 p-4 transition-all duration-300 delay-300 h-full md:h-96 ${expanded ? '!h-screen gap-y-4' : ''}`}>
                {searchResults.length === 0
                    ? newReleases
                        .map((track) => (
                            <Poster
                                key={track.id}
                                track={track}
                                handleSelectTrack={handleSelectTrack}
                            />
                        ))
                    : searchResults
                        .map((track) => (
                            <Poster
                                key={track.id}
                                track={track}
                                handleSelectTrack={handleSelectTrack}
                            />
                        ))}
            </div>

            <div className="flex gap-x-8 absolute min-w-full md:relative ml-6">


                {/* Tracks */}
                <div className={`w-full pr-11  hidden md:flex md:flex-col transition-transform duration-300 ${expanded ? 'scale-0' : ''}`}>
                    <h2 className="text-white font-bold mb-3">
                        {searchResults.length === 0 ? "New Releases" : "Tracks"}
                    </h2>
                    <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-hide  w-full">
                        {searchResults.length === 0
                            ? newReleases
                                .map((track) => (
                                    <Track
                                        key={track.id}
                                        track={track}
                                        handleSelectTrack={handleSelectTrack}
                                    />
                                ))
                            : searchResults
                                .map((track) => (
                                    <Track
                                        key={track.id}
                                        track={track}
                                        handleSelectTrack={handleSelectTrack}
                                    />
                                ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Body