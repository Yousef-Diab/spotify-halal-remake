import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

import logo from '../../public/images/avatar-image.png';

type Props = {
  styles?: string;
}

const Avatar = ({ styles }: Props) => {
    const { data: session }: any = useSession();
  return (
    <Image src={session?.user?.image ?? logo} width={35} height={35} className={`object-contain rounded-full hover:scale-105 cursor-pointer ${styles}`} alt="user" onClick={() => signOut()} />

  )
}

export default Avatar