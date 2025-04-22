'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function FavoriteButton({ studyRoomId }: { studyRoomId: string }) {
  // get current session data from next-auth
  const { data: session } = useSession();

  // track loading state for button
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFavorite = async () => {
    // debug: log session to console
    console.log("Session data:", session);

    // extract username from session
    const username = session?.user?.name; 

    // check if user is logged in
    if (!session || !username) {
      alert("You must be logged in to add favorites.");
      return;
    }

    setIsLoading(true);

    try {
      // send post request to favorites api route
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, studyRoomId }),
      });

      // handle successful and failed responses
      if (res.ok) {
        alert("Added to favorites!");
      } else {
        const errorData = await res.text();
        console.error("API response error:", errorData);
        alert("Failed to add favorite.");
      }
    } catch (err) {
      // catch and log any errors
      console.error("Error:", err);
      alert("An error occurred");
    } finally {
      // reset loading state
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
