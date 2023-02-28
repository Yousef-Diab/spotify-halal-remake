import Image from 'next/image';
import React from 'react';

import spotifyLogo from '../public/images/spotify-full_logo.jpg';

const Loader = () => {
    return (
        <div className="h-screen bg-black">
            <div className="pt-40 flex flex-col items-center space-y-4">
                <span className="relative w-[400px] h-[250px] lg:w-[550px] lg:h-[240px]">
                    <Image
                        src={spotifyLogo}
                        className="animate-pulse object-contain"
                        alt={'Spotify Logo'} />
                </span>
                {/* <ThreeBounce size={23} color="#15883e" /> */}
            </div>
        </div>
    )
}

export default Loader