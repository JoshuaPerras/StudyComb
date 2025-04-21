'use client'; 

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
<<<<<<< HEAD
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import beeFly1 from '../../assets/TanBee (1).png';
=======
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import beeFly1 from '../../assets/TanBee (1).png';
import beeFly2 from '@/images/bee-right.png';
>>>>>>> 8440931f229cb4d085bb36ef4c0829c4d3fe6009

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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({
    location: '',
    rating: '',
    noise: '',
    wifi: '',
    comment: '',
    tags: [] as string[],
  });

  const [availableTags] = useState([
    'Quiet', 'Study Room', 'Computer', 'Group', 'Lounge', 'Multi-leveled', 'Loud'
  ]);
  const [availableLocations] = useState([
    'Bolton Dining Hall',
    'Miller Learning Center',
    'Tate Center'
  ]);
  const [filterTags, setFilterTags] = useState<string[]>([]);

  // Fetch reviews from the server
  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.location || !form.rating || !form.noise || !form.wifi || !form.comment) {
      alert('All fields are required');
      return;
    }

    // POST request to save the new review
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const newReview = await res.json();

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
    filterTags.every(tag => review.tags.includes(tag))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 py-12 px-4">
      {/* Bee images */}
      <Image src={beeFly1} alt="Flying bee" className="absolute top-20 right-12 w-12 h-12 animate-bounce" />
<<<<<<< HEAD
=======
      <Image src={beeFly2} alt="Flying bee" className="absolute bottom-12 left-12 w-12 h-12 animate-pulse" />

>>>>>>> 8440931f229cb4d085bb36ef4c0829c4d3fe6009
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

        {/* Display existing reviews */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Filter Reviews by Tag</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {availableTags.map(tag => (
              <span
                key={tag}
                onClick={() => setFilterTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                className={`cursor-pointer px-3 py-1 rounded-full border text-sm ${filterTags.includes(tag) ? 'bg-yellow-400 border-yellow-600' : 'bg-gray-200 border-gray-400'}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            {filteredReviews.map((r) => (
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
        </div>
      </div>
    </div>
  );
}
