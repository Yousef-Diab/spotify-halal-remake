import { ChartBarIcon, ClockIcon, EllipsisHorizontalIcon, HomeIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { RiCompassFill } from 'react-icons/ri';

import Avatar from './Avatar';


const SideBar = () => {
    
    return (
        <section className="hidden md:flex fixed top-0 z-40 flex-col p-4 items-center bg-black w-[90px] h-screen space-y-8">
            <Image
                src="/images/spotify-logo.png"
                width={56}
                height={56}
                alt="Spotify Logo"
                className='object-contain '
            />
            <div className="flex flex-col space-y-8">
                <HomeIcon className="sidebarIcon text-white opacity-[0.85]" />
                <RiCompassFill className="sidebarIcon text-4xl" />
                <FaMicrophoneAlt className="sidebarIcon ml-2.5" />
                <ChartBarIcon className="sidebarIcon" />
                <ClockIcon className="sidebarIcon" />
                <EllipsisHorizontalIcon className="sidebarIcon" />
                <Avatar/>
            </div>
        </section>
    )
}

export default SideBar