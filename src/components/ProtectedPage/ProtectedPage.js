import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSessionStore } from '@/providers/index';

export default function ProtectedPage({ children }) {
  const router = useRouter();
  const session = useSessionStore().session;

  useEffect(
    () => !session?.accessToken && router.replace('/login'),
    [router, session],
  );

  return children;
}
