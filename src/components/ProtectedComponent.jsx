'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function ProtectedComponent({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Get the token from cookies
    const token = Cookies.get('admin-token');
    if (!token) {
      // Redirect to login if the token doesn't exist
      router.push('/admin/login');
    }
  }, [router]);

  // Optionally render a loading state while the check is performed
  return <>{children}</>;
}
