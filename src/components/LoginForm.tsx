'use client';
import { useState } from "react"



function LoginForm() {

    const [values, setValues] = useState({email: '', password: ''});
    const [showPassword, setShowPassword] = useState(false);


    function togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const eye1 = document.getElementById('eye1');
        const eye2 = document.getElementById('eye2');
      
        // if (passwordInput.type === 'password') {
        //   passwordInput.type = 'text';
        //   eye1.style.display = 'none';
        //   eye2.style.display = 'block';
        // } else {
        //   passwordInput.type = 'password';
        //   eye1.style.display = 'block';
        //   eye2.style.display = 'none';
        // }
      }
    const handleSubmit = async () => {

    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };


    return(
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleInput}
                />
                
                    <label htmlFor="password">Password</label>
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleInput}
                    />
                
                
            </div>

        </form>
    )
}

export default LoginForm;