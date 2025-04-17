'use client';
import { useState } from 'react';
import './Filter.css';

export default function FilterPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags] = useState([
    "Quiet", "Study Room", "Computer", "Group", "Lounge", "Multi-leveled", "Loud"
  ]);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClearTags = () => {
    setSelectedTags([]);
  };

  const spots = [
    { name: "Bolton Dining Hall", tags: ["Loud", "Group"] },
    { name: "Miller Learning Center", tags: ["Group", "Computer", "Lounge", "Study Room"] },
    { name: "Tate Center", tags: ["Computer", "Multi-leveled", "Lounge"] },
    { name: "Tate Center", tags: ["Computer", "Multi-leveled", "Lounge", "Group", "Study Room"] },
    { name: "Tate Center", tags: ["Computer", "Multi-leveled", "Lounge"] },
    { name: "Tate Center", tags: ["Computer", "Multi-leveled", "Lounge"] },
    { name: "Tate Center", tags: ["Computer", "Multi-leveled", "Lounge"] },
    { name: "Tate Center", tags: ["Computer", "Multi-leveled", "Lounge"] },
    { name: "Tate Center", tags: ["Computer", "Multi-leveled", "Lounge"] },
    { name: "Tate Center", tags: ["Computer", "Multi-leveled", "Lounge"] },
    { name: "Tate Center", tags: ["Computer", "Multi-leveled", "Lounge"] },
    { name: "Tate Center", tags: ["Computer", "Multi-leveled", "Lounge"] },
  ];

  const filteredSpots = spots.filter((spot) =>
    selectedTags.every((tag) => spot.tags.includes(tag))
  );

  return (
    <main className="filter-page">
      <div className="filter-section">
        <button 
          onClick={() => setDropdownOpen(!dropdownOpen)} 
          className="filter-button"
        >
          Search by Tag...
        </button>

        {dropdownOpen && (
          <div className="dropdown">
            {availableTags.map((tag) => (
              <div
                key={tag}
                className={`tag-item ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        <button onClick={handleClearTags} className="clear-tags">
          Clear Tags
        </button>
      </div>

      <div className="grid-container">
        {filteredSpots.map((spot, index) => (
          <div key={index} className="square">
            <img src="https://npr.brightspotcdn.com/legacy/sites/wuga/files/201809/studentlearningcentersouthlg_0.jpg" alt="Study Spot" className="image" />
            <h2 className="spot-name">{spot.name}</h2>
            <div className="tags">
              {spot.tags.map((tag, i) => (
                <span key={i} className="tag-label">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
