'use client';
import "./addRoom.css"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const AVAILABLE_TAGS = [
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
];

export default function ItemAddForm() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 0,
    description: '',
    url: '',
    tags: [] as string[]
  });


  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'owner' ? Number(value) : value,
    }));
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag) // remove if already selected
        : [...prev.tags, tag] // add if not selected
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating > 5) {
      formData.rating = 5;
    } else if (formData.rating < 0) {
      formData.rating = 0;
    }
    console.log("Submitting room with data:", formData);
    try {
      const response = await fetch('/api/studyrooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFormData({ name: '', rating: 0, description: '',location: '', url: '', tags: []});
      router.push('/filter');
    } catch (error) {
      console.error('Error in CreateRoom!', error);
    }
  };

  return (
    <div className="newRoom">
         <h2 className="headText">Add New Room</h2>
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-4 formArea">
          <div className="split">
            <div className="leftSide">
              <div className="input-group">
                <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                  Study Room Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="input"
                />
              </div>
              <div className="input-group">
                <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                  Building Address
                </label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Address"
                  required
                  className="input"
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                  Rating 0-5
                </label>
                <input
                  name="rating"
                  type="number"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="Rating 0-5"
                  required
                  className="input"
                />
              </div>

              <div className="input-group">
                <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  required
                  className="input"
                />
              </div>

              
              <div className="input-group">
                <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  name="url"
                  type="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="Image URL"
                  required
                  className="input"
                />
              </div>
            </div>
            
            <div className="input-group tag">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Select Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`tag-button ${
                      formData.tags.includes(tag) ? 'tag-selected' : ''
                    }`}
                    >
                  {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="register-button"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
