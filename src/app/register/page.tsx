'use client';

import React from 'react';
import './Register.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import beeLeft from '../../assets/TanBee (1).png';
import beeRight from '../../images/bee-right.png';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface FormState {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: FormState) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password || !form.confirmPassword) {
      alert('All fields are required');
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.username,
        password: form.password
      })
    });

    if (!res.ok) {
      alert('Registration failed');
      return;
    }

    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Create Account</h2>
          <Input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <Button type="submit" className="w-full bg-amber-600 text-white hover:bg-amber-700">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
