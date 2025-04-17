import React from 'react';
import './Profile.css';
<<<<<<< HEAD
import Image from 'next/image'
import beePfp from '@/assets/pfpBee.png'
import leftBee from '@/assets/bee (1).png';
import rightBee from '@/assets/TanBee (2).png';
=======
import Image from 'next/image';
import Hexagon from '@/components/Hexagon'
import beePfp from '@/assets/pfpBee.png'
>>>>>>> 52ccdd83e47457f1a8ea3fdaee067b4e3429a700


export default function Profile() {
  return (
    <div className="profile-container">
<<<<<<< HEAD
      <Image src={leftBee} alt="Left Bee" className="bee bee-left" />

      <div className="profile-header">
        <Image src={beePfp} 
        alt="Bee Avatar" 
        className="avatar" />
        <h2 className="name">John Doe</h2>
=======
      <Image
        src="/LightBee.png"
        className="Lbee"
        alt="tan bee graphic"
        width={300}
        height={150}
        />

      <div className="profile-header">
      <Hexagon src={beePfp} size={200} borderWidth={3}/>
      <h2 className="name">John Doe</h2>
>>>>>>> 52ccdd83e47457f1a8ea3fdaee067b4e3429a700
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
<<<<<<< HEAD
        <Image src={rightBee} alt="Right Bee" className="bee bee-right" />
=======
        
>>>>>>> 52ccdd83e47457f1a8ea3fdaee067b4e3429a700
      </div>
      <Image
          src="/TanBee.png"
          className="bee"
          alt="tan bee graphic"
          width={300}
          height={150}
                    />

      <button className="logout-button">Log Out</button>
    </div>
  );
}
