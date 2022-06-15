import Link from 'next/link';
import Subtitle from '@/components/Subtitle';
import Title from '@/components/Title';

export default function Dashboard() {
  return (
    <>
      <Title />
      <Subtitle />
      <Link href="/another-page">
        <a>Go to another page</a>
      </Link>
    </>
  );
}
