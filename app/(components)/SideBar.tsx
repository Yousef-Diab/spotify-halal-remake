import { ChartBarIcon, ClockIcon, EllipsisHorizontalIcon, HomeIcon } from '@heroicons/react/24/solid';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { RiCompassFill } from 'react-icons/ri';

import logo from '../../public/images/avatar-image.png';

const SideBar = () => {
    const {data:session}:any=useSession();
    return (
        <section className="fixed top-0 z-40 flex flex-col p-4 items-center bg-black w-[90px] h-screen space-y-8">
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
                <Image src={session?.user?.image ?? logo} width={35} height={35} className="object-contain rounded-full hover:scale-105 cursor-pointer" alt="user" onClick={()=>signOut()}/>
            </div>
        </section>
    )
}

export default SideBar