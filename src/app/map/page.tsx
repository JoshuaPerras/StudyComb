"use client";
import './Map.css';
import beePfp from '@/assets/pfpBee.png';
import Hexagon from '@/components/Hexagon';
import FavoriteMap from '@/components/FavoriteMap';
import { useSession } from "next-auth/react";

export default function MapPage() {
  // get user session data from next-auth
  const { data: session, status } = useSession();

  return (
    <section className="favMap">
      <div className="profileInfo">
        {/* profile image using hexagon component */}
        <Hexagon src={beePfp} size={200} borderWidth={3} />

        {/* display user name and email if session exists */}
        <h1>Name: {session ? session.user?.name : ""}</h1>
        <h2>Email: {session ? session.user?.email : ""}</h2>
      </div>

      {/* component to render user's favorite locations on map */}
      <FavoriteMap />
    </section>
  );
}
