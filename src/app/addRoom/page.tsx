'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ItemAddForm() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 0,
    description: '',
    url: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'owner' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating > 5) {
      formData.rating = 5;
    }
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

      setFormData({ name: '', rating: 0, description: '',location: '', url: '' });
      router.push('/');
    } catch (error) {
      console.error('Error in CreateItem!', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 px-4">
         <h2 className="text-lg font-semibold mt-2">Add new Room</h2>
      <div className={`border border-gray-300 shadow-sm rounded-lg p-4 bg-white`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Adress"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating 1-5"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="url"
            type="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 mt-4"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
