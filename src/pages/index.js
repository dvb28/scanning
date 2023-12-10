import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function View() {
  // Route
  const route = useRouter();

  useEffect(() => {
    // Route to home page
    const routing = async () => {
      setTimeout(async () => {
        await route.push('/views/dashboard');
      }, 1000);
    }
    // Routing
    routing();
  }, []);

  return (
    <Box height="100vh" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress />
    </Box>
  );
}
