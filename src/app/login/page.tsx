import './Login.css'
import Hexagon from '@/components/Hexagon'
import combColor from '@/assets/CombColor.png'
import LoginForm from '@/components/LoginForm'

export default function SignUp() {
    return (
        <section className='signUp'>
            
            
            <LoginForm></LoginForm>
            <div className='bottomHex'>
                <Hexagon src= {combColor} size={110} borderColor='#D38E02' borderWidth={3} label='Submit'/>
            </div>
            
        </section>
    )

}