'use client';
import './Header.css'
import {useState} from 'react';
import Link from 'next/link';


const Header = () => {

    const [isLoggedIn,setIsLoggedIn ] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(prev => !prev);
    
    }
    return (
        <div className="head">
            
            <div className="menu">
                <div className='text'><Link href='/' >Home</Link></div>
                <div className='text'><Link href='/map'>map</Link></div>
                <div className='text'><Link href='/filter' >filter</Link></div>

                {
                    !isLoggedIn && (
                        <button onClick = {handleLogin}><div className='text'><Link href='/login' >Log-in</Link></div></button>
                    )
                }
                {
                    isLoggedIn && (
                        <>
                            <div className='text'><Link href='/profile'>Profile</Link></div>
                            <button onClick = {handleLogin}>
                            <div className='text'><Link href='/' >Logout</Link></div>
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Header;