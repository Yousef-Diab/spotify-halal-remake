'use client'
import { Awaitable } from 'next-auth';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import React from 'react';

type Props = {
    providers: Awaitable<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>>
}

const LoginButton = ({ providers }: Props) => {
    return (
        <>
            {Object.values(providers).map((provider: any) => (
                <div key={provider.name} className='className="text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"'>
                    <button onClick={() => signIn(provider.id, {
                        callbackUrl: 'http://localhost:3000/'
                    })}>Login using {provider.name}</button>
                </div>
            ))}
        </>
    )
}

export default LoginButton