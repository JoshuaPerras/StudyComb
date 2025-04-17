"use client";
import './Signup.css'
import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SignupForm from '../../components/SignupForm';


export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState("/CloseHoney.png");
    const [showConfirmPassword, setShowConfirmPassword] = useState("/CloseHoney.png");

    const togglePasswordVisibility = () => {
        setShowPassword(showPassword === "/CloseHoney.png" ? "/OpenHoney.png" : "/CloseHoney.png");
    }
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(showConfirmPassword === "/CloseHoney.png" ? "/OpenHoney.png" : "/CloseHoney.png");
    }



    return (
      <div className="flex flex-col justify-center items-center">
        <SignupForm /> 
      </div>

      //   <section className='logIn'>
            
      //       <div className="register-container">
      //   <div className="register-form-card">
      //     <h2>Join Us!</h2>
      //     <h3>Create your account</h3>

      //     <form className="register-form">
      //       <div className="input-group">
      //         <label htmlFor="new-username">User name</label>
      //         <input
      //           type="text"
      //           id="new-username"
      //           placeholder="Choose a user name"
      //           value={username}
      //           onChange={(e) => setUsername(e.target.value)}
      //           required
      //         />
      //       </div>

      //       <div className="input-group">
      //         <label htmlFor="new-email">Email</label>
      //         <input
      //           type="email"
      //           id="new-email"
      //           placeholder="Enter your email"
      //           value={email}
      //           onChange={(e) => setEmail(e.target.value)}
      //           required
      //         />
      //       </div>

      //       <div className="input-group password-container">
      //         <label htmlFor="new-password">Password</label>
      //         <div className="textImgDiv">
      //           <input
      //             type={showPassword ? "text" : "password"}
      //             id="new-password"
      //             placeholder="Create a password"
      //             value={password}
      //             onChange={(e) => setPassword(e.target.value)}
      //             required
      //           />
      //           <Image
      //               src={showConfirmPassword}
      //               className="toggle-password"
      //               alt="Hide password"
      //               onClick={toggleConfirmPasswordVisibility}
      //               width={25}
      //               height={25}
      //           />
      //         </div>
      //       </div>

      //       <div className="input-group password-container">
      //         <label htmlFor="confirm-password">Confirm Password</label>
      //         <div className="textImgDiv">
      //           <input
      //             type={showConfirmPassword ? "text" : "password"}
      //             id="confirm-password"
      //             placeholder="Confirm your password"
      //             value={confirmPassword}
      //             onChange={(e) => setConfirmPassword(e.target.value)}
      //             required
      //           />
      //           <Image
      //               src={showPassword}
      //               className="toggle-password"
      //               alt="Hide password"
      //               onClick={togglePasswordVisibility}
      //               width={25}
      //               height={25}
      //           />
      //         </div>
      //       </div>

      //       <button type="submit" className="register-button">Register</button>
      //     </form>

      //     <div className="login-link">
      //       Already have an account? <Link href="/login">Log-in</Link>
      //     </div>
      //   </div>
      // </div>
            
            
            
      //   </section>
    )

}