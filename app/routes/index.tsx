import { InputAdornment, TextField } from '@mui/material';
import { type MetaFunction } from '@remix-run/node';
import * as React from 'react';

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: 'cvXplorer',
    description: 'App para explorar CVEs e calcular CVSS!',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <React.Fragment>
      <TextField
        variant="outlined"
        label="Código da CVE"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">CVE-</InputAdornment>
          ),
        }}
      />
    </React.Fragment>
  );
}
