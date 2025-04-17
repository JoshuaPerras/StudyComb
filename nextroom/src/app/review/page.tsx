'use client'; 

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import logo from '../../images/logo.png';
import beeFly1 from '../../images/bee-left.png';
import beeFly2 from '../../images/bee-right.png';

interface Review {
  id: number;
  location: string;
  rating: number;
  noise: string;
  wifi: string;
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
  });

  // Fetch reviews from the server
  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (
      !form.location ||
      !form.rating ||
      !form.noise ||
      !form.wifi ||
      !form.comment
    ) {
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
    });
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 py-12 px-4">
      {/* Bee images */}
      <Image src={logo} alt="Bee dog logo" className="absolute top-4 left-4 w-16 h-16" />
      <Image src={beeFly1} alt="Flying bee" className="absolute top-20 right-12 w-12 h-12 animate-bounce" />
      <Image src={beeFly2} alt="Flying bee" className="absolute bottom-12 left-12 w-12 h-12 animate-pulse" />

      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-yellow-900">Review a Study Spot</h1>
        
        {/* Review form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <Input
            name="location"
            placeholder="Location Name"
            value={form.location}
            onChange={handleChange}
          />
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
        <div className="mt-10 space-y-6">
          {reviews.map((r) => (
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
