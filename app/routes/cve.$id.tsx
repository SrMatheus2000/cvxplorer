import CvssCalculator from '~/src/CvssCalculator';
import SeverityIndicator from '~/src/SeverityIndicator';
import { type CVE } from '~/src/types';
import { dateFormatter, parseCVE } from '~/src/util';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Link as MuiLink,
} from '@mui/material';
import { LoaderFunction, json, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import axios from 'axios';
import React from 'react';

export const loader: LoaderFunction = async ({ params }) => {
  const cve = params.id;
  if (!cve) return redirect('/');
  try {
    const res = await axios.get<CVE>(
      `https://www.opencve.io/api/cve/${parseCVE(cve)}`,
      {
        auth: {
          username: process.env.API_USER ?? '',
          password: process.env.API_PASSWORD ?? '',
        },
      }
    );

    return json(res.data);
  } catch (error) {
    console.error(error);
    return redirect('/');
  }
};

export default function CVE() {
  const cve = useLoaderData<CVE>();
  const {
    raw_nvd_data: { cve: cveData },
  } = cve;
  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ChevronLeftIcon />}>
        Voltar
      </Button>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {cve.id}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Atribuidor: ${cveData.CVE_data_meta.ASSIGNER}
              </Typography>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Formato: {cveData.data_format}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Criado em: {dateFormatter.format(new Date(cve.created_at))}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Atualizado em:{' '}
                  {dateFormatter.format(new Date(cve.updated_at))}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                component="p"
                sx={{ textAlign: 'justify' }}
              >
                {cve.summary}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {cve.cvss.v2 || cve.cvss.v3 ? (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  CVSS Scores
                </Typography>
                <Grid container spacing={2}>
                  {cve.cvss.v2 && (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                      }}
                    >
                      CVSS v2:
                      <SeverityIndicator score={cve.cvss.v2} />
                    </Grid>
                  )}
                  {cve.cvss.v3 && (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                      }}
                    >
                      CVSS v3:
                      <SeverityIndicator score={cve.cvss.v3} />
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Calcular CVSS
                </Typography>
                <CvssCalculator />
              </CardContent>
            </Card>
          </Grid>
        )}

        {Object.entries(cve.vendors).length > 0 && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Vendors
                </Typography>
                <List>
                  {Object.entries(cve.vendors).map(
                    ([vendor, products], index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={vendor}
                          secondary={`Products: ${products.join(', ')}`}
                        />
                      </ListItem>
                    )
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}

        {cve.cwes.length > 0 && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  CWEs
                </Typography>
                <List>
                  {cve.cwes.map((cwe, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={cwe} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Referências
              </Typography>
              <List>
                {cveData.references.reference_data.map((ref, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <MuiLink href={ref.url} target="_blank">
                          {ref.refsource}
                        </MuiLink>
                      }
                      secondary={`Nome: ${ref.name}, Origem: ${ref.refsource}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
