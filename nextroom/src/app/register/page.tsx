'use client';

import React from 'react';
import './Register.css';
import logo from '../../images/bee-right.png';
import beeLeft from '../../images/bee-left.png';
import beeRight from '../../images/bee-right.png';

const RegisterPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register form submitted');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
        <img src={logo.src} alt="Logo" className="logo" />
        <ul className="nav-menu">
            <li><a href="#">Home</a></li>
            <li><a href="#">Filter</a></li>
            <li><a href="#">Maps</a></li>
            <li><a href="#">Profile</a></li>
          </ul>
        </div>
        <div className="navbar-right">
          <button className="btn-signin">Sign in</button>
          <button className="btn-register">Register</button>
        </div>
      </nav>

      {/* Register Form Section */}
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Create Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Sign Up</button>
        </form>

        <img src={beeLeft.src} alt="Bee flying left" className="bee bee-left" />
        <img src={beeRight.src} alt="Bee flying right" className="bee bee-right" />
        </div>
    </>
  );
};

export default RegisterPage;
