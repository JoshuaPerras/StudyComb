"use client";
import React from 'react';
import './Profile.css';
import Image from 'next/image';
import Hexagon from '@/components/Hexagon'
import beePfp from '@/assets/pfpBee.png'
import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();



  if (status === "loading") {
    return <div className='profile-container'>Loading user data...</div>
  }

  if (!session) {
    return <div className='profile-container'>Not Logged In</div>
  }
  return (
    <div className="profile-container">
      <Image
        src="/LightBee.png"
        className="Lbee"
        alt="tan bee graphic"
        width={300}
        height={150}
        />

      <div className="profile-header">
      <Hexagon src={beePfp} size={200} borderWidth={3}/>
      <h2 className="name">{session.user?.name}</h2>
      </div>

      <div className="profile-card">
        <div className="info-row">
          <span className="label">Username</span>
          <span className="value">{session.user?.name}</span>
        </div>
        <div className="info-row">
          <span className="label">Email</span>
          <span className="value">{session.user?.email}</span>
        </div>
        <div className="info-row">
          <span className="label">Phone</span>
          <span className="value">(470) 090 - 1111</span>
        </div>
        <div className="info-row">
          <span className="label">Password</span>
          <span className="value">**********</span>
        </div>
        
      </div>
      <Image
          src="/TanBee.png"
          className="bee"
          alt="tan bee graphic"
          width={300}
          height={150}
                    />

    </div>
  );
}