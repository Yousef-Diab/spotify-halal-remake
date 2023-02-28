import '../styles/globals.css';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import authOptions from '../pages/api/auth/[...nextauth]';
import ClientProvider from './(components)/ClientProvider';

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
