import './Header.css'
import Link from 'next/link';

const Header = () => {
    return (
        <div className="head">
            <h1>pic</h1>
            <div className="menu">
                <Link href='/' className='text'>Home</Link>
                <Link href='/profile' className='text'>profile</Link>
                <div className='text'>filter</div>
                <div className='text'>sign-in</div>
            </div>
        </div>
    );
};

export default Header;