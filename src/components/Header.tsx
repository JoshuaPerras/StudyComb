import './Header.css'
import Link from 'next/link';

const Header = () => {
    return (
        <div className="head">
            <h1>pic</h1>
            <div className="menu">
                <div className='text'><Link href='/' >Home</Link></div>
                <div className='text'><Link href='/map' >map</Link></div>
                <div className='text'>filer</div>
                <div className='text'><Link href='/signup' >sign-up</Link></div>
            </div>
        </div>
    );
};

export default Header;