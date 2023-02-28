import Image from 'next/image';
import React from 'react';

import spotifyLogo from '../public/images/spotify-full_logo.jpg';

const Loading = () => {
  return (
    <div className="bg-black h-screen flex flex-col items-center pt-40 space-y-8">
      <Image
        src={spotifyLogo}
        height={250}
        width={600}
        className="animate-pulse object-contain" alt={"Spotify Logo"} />


    </div>
  )
}

export default Loading