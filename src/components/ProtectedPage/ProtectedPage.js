import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { store } from '@/providers/index';

export default function ProtectedPage({ children }) {
  const router = useRouter();
  const session = store.useStore().session;

  useEffect(
    () => !session.accessToken && router.replace('/login'),
    [router, session],
  );

  return children;
}
