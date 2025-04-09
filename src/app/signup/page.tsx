import './Signup.css'
import beePfp from '@/assets/pfpBee.png'
import Hexagon from '@/components/Hexagon'
import combColor from '@/assets/CombColor.png'

export default function SignUp() {
    return (
        <section className='signUp'>
            <div className='topHex'>
                <div className='hex1'><Hexagon src= {combColor} size={130} borderColor='#D38E02' borderWidth={3}/></div>
                
                <Hexagon src= {combColor} size={130} borderColor='#D38E02' borderWidth={3}/>

            </div>
            
            <div className='middleHex'>
                <Hexagon src= {combColor} size={130} borderColor='#D38E02' borderWidth={3}/>
                <Hexagon src= {combColor} size={130} borderColor='#D38E02' borderWidth={3}/>
                <Hexagon src= {combColor} size={130} borderColor='#D38E02' borderWidth={3}/>
            </div>
            
            <div className='bottomHex'>
                <Hexagon src= {combColor} size={130} borderColor='#D38E02' borderWidth={3}/>
                <Hexagon src= {combColor} size={130} borderColor='#D38E02' borderWidth={3}/>
            </div>
            

        </section>
    )

}