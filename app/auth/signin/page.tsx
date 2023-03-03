import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import { Suspense } from 'react';

import authOptions from '../../../pages/api/auth/[...nextauth]';
import spotifyLogo from '../../../public/images/spotify-full_logo.jpg';
import LoginButton from './(components)/LoginButton';

const Signin = async () => {
    const providers = await getProviders();
    const session : any = await getServerSession(authOptions);

    return (
        <div className="bg-black h-screen flex flex-col items-center pt-40 space-y-8">
            <Image
                src={spotifyLogo}
                height={250}
                width={600}
                className="animate-pulse object-contain" alt={"Spotify Logo"} />
                
                <LoginButton providers={providers!}/>
                
        </div>
    );
}

export default Signin;

export const metadata: Metadata = {
    title: 'Login - Spotify',
};