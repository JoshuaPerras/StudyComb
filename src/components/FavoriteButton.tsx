'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function FavoriteButton({ studyRoomId }: { studyRoomId: string }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFavorite = async () => {
    
    console.log("Session data:", session);
    

    const username = session?.user?.name; 
    
    if (!session || !username) {
      alert("You must be logged in to add favorites.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, studyRoomId }),
      });

      if (res.ok) {
        alert("Added to favorites!");
      } else {
        const errorData = await res.text();
        console.error("API response error:", errorData);
        alert("Failed to add favorite.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className="addFavorite" 
      onClick={handleAddFavorite}
      disabled={isLoading}
    >
      {isLoading ? "Adding..." : "Add to Favorites 💛"}
    </button>
  );
}