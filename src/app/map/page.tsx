"use client";
import './Map.css';
import beePfp from '@/assets/pfpBee.png';
import Hexagon from '@/components/Hexagon';
import FavoriteMap from '@/components/FavoriteMap';
import { useSession } from "next-auth/react"



export default function MapPage() {
  const { data: session, status } = useSession();

  return (
    <section className="favMap">
      <div className="profileInfo">
        <Hexagon src={beePfp} size={200} borderWidth={3} />
        <h1>Name: {session? session.user?.name : ""}</h1>
        <h2>Email: {session? session.user?.email : ""}</h2>
      </div>

      <FavoriteMap/>
    </section>
  );
}
