import { type CVEListItem } from '~/src/types';
import { dateFormatter, parseCVE } from '~/src/util';
import {
  CircularProgress,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { json, type MetaFunction, ActionArgs, redirect } from '@remix-run/node';
import { useFetcher, useNavigate } from '@remix-run/react';
import { Fragment, useEffect, useState } from 'react';

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const cve = body.get('cve');
  const res = await fetch(
    `https://www.opencve.io/api/cve?search=${parseCVE(cve as string)}`,
    {
      method: 'GET',
      headers: {
        Authorization:
          'Basic ' +
          btoa(
            `${process.env.API_USER ?? ''}:${process.env.API_PASSWORD ?? ''}`
          ),
      },
    }
  );
  if (res.status !== 200) return redirect('/');

  const data = (await res.json()) as CVEListItem[];

  return json(data);
}

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: 'cvXplorer',
    description: 'App para explorar CVEs e calcular CVSS!',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const navigate = useNavigate();

  const { data = [], submit, state } = useFetcher<CVEListItem[]>();

  const [cve, setCve] = useState('CVE-');

  useEffect(() => {
    const timer = setTimeout(() => {
      submit({ cve }, { method: 'POST' });
    }, 500);
    return () => clearTimeout(timer);
  }, [cve, submit]);

  function handleClick(id: string): void {
    navigate(`/cve/${id}`);
  }

  return (
    <Fragment>
      <TextField
        name="cve"
        variant="outlined"
        label="Código da CVE"
        fullWidth
        value={cve}
        onChange={(e) => setCve(parseCVE(e.target.value))}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {state === 'submitting' && <CircularProgress />}
            </InputAdornment>
          ),
        }}
      />
      <Table sx={{ minWidth: 650 }} aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Resumo</TableCell>
            <TableCell>Criação</TableCell>
            <TableCell>Edição</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover
              onClick={() => handleClick(row.id)}
            >
              <TableCell component="th" scope="row" sx={{ minWidth: 150 }}>
                {row.id}
              </TableCell>
              <TableCell>{row.summary}</TableCell>
              <TableCell>
                {dateFormatter.format(new Date(row.created_at))}
              </TableCell>
              <TableCell>
                {dateFormatter.format(new Date(row.updated_at))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
