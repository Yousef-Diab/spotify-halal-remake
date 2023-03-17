import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';

import { useAppSelector } from '../../store/store';

type Props = {
    track: any;
    handleSelectTrack: Function;
}

function Poster({ track, handleSelectTrack }: Props) {
    const isPlaying = useAppSelector(state => state.player.isPlaying);
    const activeTrack = useAppSelector(state => state.player.activeTrack);

    const handlePlay = () => {
        handleSelectTrack(track);

    };

    return (
        <div
            className="w-[260px] h-[360px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto"
            onClick={handlePlay}
        >
            <img
                src={track.albumUrl}
                alt=""
                className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
            />

            <div className="absolute pb-10 h-20 bottom-0 group-hover:bg-gradient-to-t group-hover:from-[rgb(0,0,0,0.4)] inset-x-0 pl-4 flex items-end space-x-3.5">
                <div className="h-10 w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
                    {activeTrack != null && track.uri === activeTrack?.uri && isPlaying ? (
                        <BsFillPauseFill className="text-white text-xl" />
                    ) : (
                        <BsFillPlayFill className="text-white text-xl ml-[1px]" />
                    )}
                </div>

                <div className="text-[15px]">
                    <h4 className="font-extrabold truncate w-44">{track.title}</h4>
                    <h6>{track.artist}</h6>
                </div>
            </div>
        </div>
    );
}

export default Poster;