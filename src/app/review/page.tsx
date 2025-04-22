'use client'; 

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import beeFly1 from '../../assets/TanBee (1).png';

interface Review {
  id: number;
  location: string;
  rating: number;
  noise: string;
  wifi: string;
  tags: string[];
  comment: string;
  date: string;
}
  
export default function ReviewPage() {
  // Example reviews
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      location: 'Miller Learning Center',
      rating: 5,
      noise: 'Quiet',
      wifi: 'Strong',
      tags: ['Quiet', 'Study Room', 'Computer'],
      comment: 'Great place to study alone or in groups.',
      date: '2025-04-20',
    },
    {
      id: 2,
      location: 'Bolton Dining Hall',
      rating: 3,
      noise: 'Loud',
      wifi: 'Okay',
      tags: ['Loud', 'Group'],
      comment: 'Okay for casual studying if you like background noise.',
      date: '2025-04-18',
    },
    {
      id: 3,
      location: 'Science Library (Floors 2-4)',
      rating: 5,
      noise: 'Very Quiet',
      wifi: 'Strong',
      tags: ['Quiet', 'Science', 'Library'],
      comment: 'Great for solo or quiet group studying. Cozy upstairs “study cells” are my go-to.',
      date: '2025-04-07',
    },
    {
      id: 4,
      location: 'Main Library',
      rating: 4,
      noise: 'Moderate',
      wifi: 'Strong',
      tags: ['Quiet', 'Group', 'Coffee Nearby'],
      comment: 'Nice employees, varied study areas, and there’s even a coffee shop inside.',
      date: '2025-04-14',
    },
    {
      id: 5,
      location: 'Tate Student Center',
      rating: 4,
      noise: 'Moderate',
      wifi: 'Okay',
      tags: ['Casual', 'Group', 'Lounge'],
      comment: '24/7 access and lots of study rooms, great for when you want something relaxed.',
      date: '2025-04-02',
    },
    {
      id: 6,
      location: 'Snelling Dining Commons',
      rating: 3,
      noise: 'Loud',
      wifi: 'Okay',
      tags: ['Food', 'Late Night', 'Casual'],
      comment: 'Good for late-night work with food nearby. Not super quiet, but very comfy.',
      date: '2025-04-19',
    },
    {
      id: 7,
      location: 'Aderhold Hall',
      rating: 5,
      noise: 'Quiet',
      wifi: 'Strong',
      tags: ['Education', 'Quiet', 'Cozy'],
      comment: 'Clean and welcoming. Cozy rooms with helpful staff—it’s a hidden gem.',
      date: '2025-04-09',
    },
    {
      id: 8,
      location: 'Science Learning Center',
      rating: 4,
      noise: 'Quiet',
      wifi: 'Strong',
      tags: ['Science', 'Labs', 'Quiet'],
      comment: 'Great study space and labs! Wish it stayed open a little later though.',
      date: '2025-04-04',
    },
    {
      id: 9,
      location: 'Geography Building',
      rating: 4,
      noise: 'Quiet',
      wifi: 'Okay',
      tags: ['Quiet', 'Small', 'Solo'],
      comment: 'A peaceful and less crowded spot for focused work. The seating is limited, but it’s perfect for solo studying.',
      date: '2025-04-11',
    },
    {
      id: 10,
      location: 'Barrow Hall Outdoor Benches',
      rating: 3,
      noise: 'Moderate',
      wifi: 'None',
      tags: ['Outdoor', 'Relaxed', 'Study Break'],
      comment: 'Nice if the weather is good, but be prepared for occasional distractions from foot traffic.',
      date: '2025-04-16',
    }        
  ]);
  
  const [form, setForm] = useState({
    location: '',
    rating: '',
    noise: '',
    wifi: '',
    comment: '',
    tags: [] as string[],
  });

  const [availableTags] = useState([
    'Quiet', 'Study Room', 'Computers', 'Group', 'Lounges', 'Multi-leveled', 'Loud', 'Peaceful', 'Independent Study', 
    'Group Study', 'Academic Building', 'Science', 'Humanities', 'Research', 'Casual', 'Light Study', 'Noisy',
    'Library', 'Less Crowded', 'Coffee', 'Dining'
  ]);
  const [availableLocations] = useState([
    'Bolton Dining Hall',
    'Miller Learning Center',
    'Tate Center',
    'McBay Science Library',
    'Main Library', 
    'Park Hall',
    'Dawson Hall',
    'Geography Geology',
    'Boyd Research',
    'Jittery Joes Cafe',
    'Plant Biology',
    'Physics Building',
    'Snelling Dining',
    'Interdisciplinary STEM Research Building 2',
    'Science Learning Center',
    'Oglethorpe Dining Hall',
    'Village Summit Dining Hall',
    'Sanford Hall',
    'Brooks Hall',
    'Cedar Street Building B',
    'Marine Sciences',
    'Vet Med Building',
    'Aderhold Hall',
    'Food Science Building'
  ]);
  
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [filterLocations, setFilterLocations] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);
  const reviewsPerPage = 5;

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.location || !form.rating || !form.noise || !form.wifi || !form.comment) {
      alert('All fields are required');
      return;
    }

    const newReview: Review = {
      id: Date.now(), // simple unique ID
      location: form.location,
      rating: Number(form.rating),
      noise: form.noise,
      wifi: form.wifi,
      tags: form.tags,
      comment: form.comment,
      date: new Date().toISOString().split('T')[0], // today's date
    };

    // Update the reviews list with the new review
    setReviews([newReview, ...reviews]);

    // Reset form after submission
    setForm({
      location: '',
      rating: '',
      noise: '',
      wifi: '',
      comment: '',
      tags: []
    });
    setCurrentPage(1);
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      tags: prevForm.tags.includes(tag) ? prevForm.tags.filter(t => t !== tag) : [...prevForm.tags, tag],
    }));
  };

  const filteredReviews = reviews.filter(review =>
    (locationFilter ? review.location === locationFilter : true) &&
    filterTags.every(tag => review.tags.includes(tag))
  );

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 py-12 px-4">
      {/* Bee images */}
      <Image src={beeFly1} alt="Flying bee" className="absolute bottom-12 left-12 w-12 h-12 animate-pulse" />

      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-yellow-900">Review a Study Spot</h1>
        
        {/* Review form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <Input
            name="location"
            placeholder="Location Name"
            value={form.location}
            onChange={handleChange}
            list="location-options"
          />
          <datalist id="location-options">
            {availableLocations.map(loc => (
              <option key={loc} value={loc} />
            ))}
          </datalist>

          <Input
            name="rating"
            placeholder="Rating (1-5)"
            value={form.rating}
            onChange={handleChange}
            type="number"
            min="1"
            max="5"
          />
          <Input
            name="noise"
            placeholder="Noise level (e.g. quiet, loud)"
            value={form.noise}
            onChange={handleChange}
          />
          <Input
            name="wifi"
            placeholder="Wi-Fi quality (e.g. strong, weak)"
            value={form.wifi}
            onChange={handleChange}
          />

            <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tags:</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <span
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`cursor-pointer px-3 py-1 rounded-full border text-sm ${form.tags.includes(tag) ? 'bg-amber-300 border-amber-600' : 'bg-gray-200 border-gray-400'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Textarea
            name="comment"
            placeholder="Write your thoughts..."
            value={form.comment}
            onChange={handleChange}
          />
          <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white w-full">
            Submit Review
          </Button>
        </form>

        {/* Making the filtering a little prettier */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Filter Reviews</h2>

          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">By Location:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setLocationFilter(null);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-full border text-sm ${locationFilter === null ? 'bg-yellow-400 border-yellow-600' : 'bg-gray-200 border-gray-400'}`}
              >
                All
              </button>
              {(showAllLocations ? availableLocations : availableLocations.slice(0, 5)).map(loc => (
                <button
                  key={loc}
                  onClick={() => {
                   setLocationFilter(loc);
                   setCurrentPage(1);
                 }}
                className={`px-3 py-1 rounded-full border text-sm ${locationFilter === loc ? 'bg-yellow-400 border-yellow-600' : 'bg-gray-200 border-gray-400'}`}
              >
               {loc}
             </button>
            ))}

          {availableLocations.length > 5 && (
           <button
             onClick={() => setShowAllLocations(!showAllLocations)}
             className="px-3 py-1 rounded-full border text-sm bg-yellow-200 border-yellow-600 text-yellow-800"
             >
            {showAllLocations ? 'Show less' : 'Show more'}
             </button>
          )}

            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">By Tag:</h3>
            <div className="flex flex-wrap gap-2">
            {(showAllTags ? availableTags : availableTags.slice(0, 6)).map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setFilterTags(prev =>
                    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                  );
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-full border text-sm ${filterTags.includes(tag) ? 'bg-yellow-400 border-yellow-600' : 'bg-gray-200 border-gray-400'}`}
              >
                {tag}
              </button>
            ))}

            {availableTags.length > 6 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="px-3 py-1 rounded-full border text-sm bg-yellow-200 border-yellow-600 text-yellow-800"
              >
                {showAllTags ? 'Show less' : 'Show more'}
              </button>
            )}

            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-6">
          {paginatedReviews.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-xl shadow flex flex-col">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">{r.location}</h2>
                <span className="text-sm text-gray-500">{r.date}</span>
              </div>
              <div className="flex gap-4 mt-2 text-sm text-gray-700">
                <div><strong>Rating:</strong> {r.rating}/5</div>
                <div><strong>Noise:</strong> {r.noise}</div>
                <div><strong>Wi-Fi:</strong> {r.wifi}</div>
              </div>
              <p className="mt-3 text-gray-800">{r.comment}</p>
              <div className="flex flex-wrap mt-3 gap-2">
                {r.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}