'use client'
import { Awaitable, Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode, Suspense } from 'react'
import { Provider } from 'react-redux'
import ReduxProvider from '../../store/ReduxProvider'
import store from '../../store/store'

type Props = {
    children: ReactNode,
    session: any
}

const ClientProvider = ({ children, session }: Props) => {

    return (
        <ReduxProvider>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </ReduxProvider>
    )
}

export default ClientProvider