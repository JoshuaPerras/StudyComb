import React from 'react';
import './Register.css';

const RegisterPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add registration stuff laterg
    console.log('Register form submitted');
  };

  return (
    <>
      {/* Header */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src="logo.png" alt="App Logo" className="logo" />
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

      {/* Register Form */}
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Create Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Sign Up</button>
        </form>

        {/* Bees and Background */}
        <img src="bee-left.png" className="bee bee-left" alt="Bee flying left" />
        <img src="bee-right.png" className="bee bee-right" alt="Bee flying right" />
      </div>
    </>
  );
};

export default RegisterPage;
