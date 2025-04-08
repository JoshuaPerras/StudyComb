import './Profile.css'
import beePfp from '@/assets/pfpBee.png'
import Image from 'next/image'

export default function Profile() {
    return (
        <section>
            <div className='profileInfo'>
                <Image src={beePfp} alt='Profile Picture'/>
            </div>
            <div className='mapArea'>

            </div>

        </section>
    )

}