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
      <div className="logIn">
        <SignupForm /> 
      </div>

    )

}