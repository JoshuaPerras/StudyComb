'use client';
import { useState, useEffect } from 'react';
import './Filter.css';
import Link from 'next/link';

interface StudySpot {
  _id: string;
  name: string;
  tags: string[];
  url?: string;
}

export default function FilterPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // list of tags available for filtering
  const [availableTags] = useState([
    "Quiet",
    "Peaceful",
    "Independent Study",
    "Group Study",
    "Academic Building",
    "Science",
    "Humanities",
    "Research",
    "Casual",
    "Light Study",
    "Noisy",
    "Library",
    "Less Crowded",
    "Computers",
    "Coffee",
    "Lounges",
    "Dining"
  ]);

  const [spots, setSpots] = useState<StudySpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // helper to generate css class for tag
  const getTagClass = (tag: string) => {
    return `tag-${tag.replace(/\s+/g, '-')}`;
  };

  // fetch study spots from api on component mount
  useEffect(() => {
    const fetchStudySpots = async () => {
      try {
        const response = await fetch('/api/studyspots');
        
        if (!response.ok) {
          throw new Error('Failed to fetch study spots');
        }
        
        const data = await response.json();
        setSpots(data.studySpots);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching study spots:', err);
        setError('Failed to load');
        setLoading(false);
      }
    };

    fetchStudySpots();
  }, []);

  // toggle tag selection
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // clear all selected tags
  const handleClearTags = () => {
    setSelectedTags([]);
  };

  // filter study spots based on selected tags
  const filteredSpots = spots.filter((spot) =>
    selectedTags.length === 0 || selectedTags.every((tag) => spot.tags.includes(tag))
  );

  return (
    <main className="filter-page">
      <div className="filter-section">
        {/* dropdown toggle button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="filter-button"
        >
          Search by Tag...
        </button>

        {/* tag dropdown menu */}
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

        {/* clear tags button */}
        <button onClick={handleClearTags} className="clear-tags">
          Clear Tags
        </button>
      </div>

      {/* loading and error states */}
      {loading && <p className="loading">Loading study spots...</p>}
      {error && <p className="error">{error}</p>}

      {/* grid of filtered study spots */}
      <div className="grid-container">
        {filteredSpots.map((spot) => (
          <Link href={`/details/${spot._id}`} key={spot._id} className="square-link">
            <div className="square">
              <img 
                src={spot.url} 
                alt={`${spot.name} Study Spot`} 
                className="image" 
              />
              <h2 className="spot-name">{spot.name}</h2>

              <div className="tags">
                {spot.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className={`tag-label ${getTagClass(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>        
        ))}

        {/* no matching results message */}
        {filteredSpots.length === 0 && !loading && (
          <p className="no-results">No study spots match your selected filters.</p>
        )}
      </div>
    </main>
  );
}
