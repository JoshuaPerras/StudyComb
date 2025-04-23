'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
    }, 3000); // 3 seconds delay before redirecting

    return () => clearTimeout(timeout); // clean up timeout
  }, [router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>Redirecting you to the homepage...</p>
    </div>
  );
}