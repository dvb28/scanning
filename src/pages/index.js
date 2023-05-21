import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Home() {
  const route = useRouter();

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('user-data-obj'));
    // if(userData) {
    //   route.push('/views/scan');
    // } else {
    // }
    route.push('/auth/login');
  }, [route]);

  return (
    <></>
  );
}
