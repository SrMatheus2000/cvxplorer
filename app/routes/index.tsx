import { TextField } from '@mui/material';
import { type MetaFunction } from '@remix-run/node';
import { Fragment, useEffect, useState } from 'react';

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: 'cvXplorer',
    description: 'App para explorar CVEs e calcular CVSS!',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const [cve, setCve] = useState('');

  useEffect(() => {
    const cveRegex = /^\d{4}-\d{4,7}$/;
    if (cveRegex.test(cve)) {
      // TODO Temp
      //console.log('cve válida');
    }
  }, [cve]);

  const parseCVE = (cve: string): string => {
    const stripped = cve.replace(/[^\d]/g, '');

    if (stripped.length > 4) {
      return `${stripped.slice(0, 4)}-${stripped.slice(4, 11)}`;
    }
    return stripped;
  };

  return (
    <Fragment>
      <TextField
        variant="outlined"
        label="Código da CVE"
        fullWidth
        value={cve}
        onChange={(e) => setCve(parseCVE(e.target.value))}
        InputProps={{
          startAdornment: 'CVE-',
        }}
      />
    </Fragment>
  );
}
