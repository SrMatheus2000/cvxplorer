import Copyright from './Copyright';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
        height: '100svh',
        py: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '5rem',
        }}
      >
        <img
          style={{
            objectFit: 'contain',
          }}
          src="/logo.svg"
          alt="cvXplorer"
        />
      </Box>
      <Box sx={{ py: 4, px: 2, flexGrow: 1 }} component={Paper}>
        {children}
      </Box>
      <Copyright />
    </Container>
  );
}
