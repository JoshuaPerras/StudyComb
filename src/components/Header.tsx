'use client';
import './Header.css'
import {useEffect, useState} from 'react';
import Link from 'next/link';
import { Session } from 'next-auth';
import { doLogout } from "../app/actions/index";


interface Session {
    user?: {
      name?: string;
      email?: string;
      image?: string;
    };
  }

  interface NavbarProps {
    session: Session | null;
  }

const Header = ({session}: NavbarProps) => {

    const [isLoggedIn,setIsLoggedIn ] = useState(!!session?.user);

    useEffect(() => {
        setIsLoggedIn(!!session?.user);
        console.log(isLoggedIn);
      }, [session, isLoggedIn]);

    const handleLogout = () => {
        doLogout();
        setIsLoggedIn(!!session?.user);
        console.log(isLoggedIn);
      };
    return (
        <div className="head">
            
            <div className="menu">
                <div className='text'><Link href='/' >Home</Link></div>
                <div className='text'><Link href='/map'>map</Link></div>
                <div className='text'><Link href='/filter' >filter</Link></div>

                {
                    isLoggedIn && session?.user ? (
                        <>
                            <div className='text'><Link href='/profile'>Profile</Link></div>
                            <button onClick={handleLogout}>
                            <div className='text'><Link href='/' >Logout</Link></div>
                            </button>
                        </>
                    ) : (
                        <button><div className='text'><Link href='/signup' >Sign-up</Link></div></button>
                    )
                }
            </div>
        </div>
    );
};

export default Header;