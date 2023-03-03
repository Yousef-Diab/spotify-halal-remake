'use client'
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { spotifyApi } from '../services/SpotifyApi';
import Body from './(components)/Body';
import Player from './(components)/Player';
import SideBar from './(components)/SideBar';
import Loading from './loading';

const Dashboard = () => {

    const router = useRouter();
    const { data: session, status }: any = useSession();



    if (status === 'loading')
        return <Loading />


    useEffect(() => {
        if (session && session.accessToken) spotifyApi.instance(session.accessToken);
    }, [session])


    if (!session || !session.accessToken) return <Loading />;
    return (

        <main className="flex flex-col md:flex h-screen w-screen bg-black lg:pb-24 md:overflow-hidden">
            <SideBar />

            <div className='flex justify-center w-full'>
                <Body />
            </div>

            {/* Player */}
            <div className="fixed bottom-0 left-0 right-0 z-50">
                <Player accessToken={session.accessToken} />
            </div>
        </main>
    )
}

export default Dashboard