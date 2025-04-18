"use client";
import './Map.css';
import beePfp from '@/assets/pfpBee.png';
import Hexagon from '@/components/Hexagon';
import Image from 'next/image';
import FavoriteMap from '@/components/FavoriteMap';
import { useSession } from "next-auth/react"


const userFavorites = [
  {
    name: 'Tate Student Center',
    lat: 33.950525839761, 
    lng: -83.37504289690821,
  },
  {
    name: 'Miller Learning Center',
    lat: 33.95160789351042,
    lng: -83.37553277639313,
  },
];

export default function MapPage() {
  const { data: session, status } = useSession();

  return (
    <section>
      <div className="profileInfo">
        <Hexagon src={beePfp} size={200} borderWidth={3} />
        <h1>Name: {session? session.user?.name : ""}</h1>
        <h2>Email: {session? session.user?.email : ""}</h2>
      </div>

      <FavoriteMap favoriteLocations={userFavorites} />
    </section>
  );
}
