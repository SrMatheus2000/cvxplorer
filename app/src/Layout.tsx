import Copyright from './Copyright';
import ProTip from './ProTip';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {children}
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
