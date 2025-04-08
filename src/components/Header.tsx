import './Header.css'
import Link from 'next/link';

const Header = () => {
    return (
        <div className="head">
            <h1>pic</h1>
            <div className="menu">
                <div className='text'><Link href='/' >Home</Link></div>
                <div className='text'><Link href='/profile' >profile</Link></div>
                <div className='text'>filter</div>
                <div className='text'>sign-in</div>
            </div>
        </div>
    );
};

export default Header;