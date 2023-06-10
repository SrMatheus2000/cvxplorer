import { type CVEListItem } from '~/src/types';
import { parseCVE } from '~/src/util';
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
import { json, type MetaFunction, ActionArgs } from '@remix-run/node';
import { useFetcher, useNavigate } from '@remix-run/react';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const cve = body.get('cve');
  const res = await axios.get<CVEListItem[]>(
    `https://www.opencve.io/api/cve?search=${parseCVE(cve as string)}`,
    {
      auth: {
        username: process.env.API_USER ?? '',
        password: process.env.API_PASSWORD ?? '',
      },
    }
  );

  return json(res.data);
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

  const { data = [], submit, state, Form } = useFetcher<CVEListItem[]>();

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
      <Form>
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
      </Form>
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
