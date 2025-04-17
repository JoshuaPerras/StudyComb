import React from 'react';
import './Profile.css';
import Image from 'next/image'
import beePfp from '@/assets/pfpBee.png'
import leftBee from '@/assets/bee (1).png';
import rightBee from '@/assets/TanBee (2).png';


export default function Profile() {
  return (
    <div className="profile-container">
      <Image src={leftBee} alt="Left Bee" className="bee bee-left" />

      <div className="profile-header">
        <Image src={beePfp} 
        alt="Bee Avatar" 
        className="avatar" />
        <h2 className="name">John Doe</h2>
      </div>

      <div className="profile-card">
        <div className="info-row">
          <span className="label">Username</span>
          <span className="value">JohnBeey</span>
        </div>
        <div className="info-row">
          <span className="label">Email</span>
          <span className="value">JohnDoe@gmail.com</span>
        </div>
        <div className="info-row">
          <span className="label">Phone</span>
          <span className="value">(470) 090 - 1111</span>
        </div>
        <div className="info-row">
          <span className="label">Password</span>
          <span className="value">**********</span>
        </div>
        <Image src={rightBee} alt="Right Bee" className="bee bee-right" />
      </div>

      <button className="logout-button">Log Out</button>
    </div>
  );
}
