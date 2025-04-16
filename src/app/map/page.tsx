import './Map.css';
import beePfp from '@/assets/pfpBee.png';
import Hexagon from '@/components/Hexagon';
import Image from 'next/image';
import FavoriteMap from '@/components/FavoriteMap';

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
  return (
    <section>
      <div className="profileInfo">
        <Hexagon src={beePfp} size={200} borderWidth={3} />
        <h1>Name: </h1>
        <h2>Email: </h2>
      </div>

      <FavoriteMap favoriteLocations={userFavorites} />
    </section>
  );
}
