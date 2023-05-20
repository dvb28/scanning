import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const route = useRouter();

  useEffect(() => {
    route.push('/auth/login');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <></>
  );
}
