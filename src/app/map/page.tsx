import './Map.css'
import beePfp from '@/assets/pfpBee.png'
import Image from 'next/image'
import Hexagon from '@/components/Hexagon'


export default function Map() {
    return (
        <section>
            <div className='profileInfo'>
                <Hexagon src={beePfp} size={200} borderWidth={3}/>
                <h1>Name: </h1>
                <h2>Email: </h2>
                
            </div>
            <div className='mapArea'>
                Map
            </div>

        </section>
    )

}