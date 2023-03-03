import '../styles/globals.css';

import { getServerSession } from 'next-auth';

import authOptions from '../pages/api/auth/[...nextauth]';
import ClientProvider from './(components)/ClientProvider';

import type { Metadata } from 'next'
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  // if(!session) redirect('/auth/signin');
  return (
    <html>
      <head />
      <body>
        <ClientProvider session={session}>
          {children}
        </ClientProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Spotify Remake - Home',
  icons:{
    icon: '/images/spotify-logo.ico',
    shortcut: '/images/spotify-logo.ico'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};
