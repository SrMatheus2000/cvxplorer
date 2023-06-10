import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import { Link } from '@remix-run/react';
import React from 'react';

export default function CVE() {
  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ChevronLeftIcon />}>
        Voltar
      </Button>
    </React.Fragment>
  );
}
