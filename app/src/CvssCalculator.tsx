import SeverityIndicator from './SeverityIndicator';
import { Grid, MenuItem, TextField, Typography, Box } from '@mui/material';
import { getEnvironmentalScore, getTemporalScore, getBaseScore } from 'cvss';
import React, { useState, useEffect } from 'react';

const metricLabels = {
  AV: 'Vetor de Ataque',
  AC: 'Complexidade do Ataque',
  PR: 'Privilégios Necessários',
  UI: 'Interação do Usuário',
  S: 'Escopo',
  C: 'Impacto de Confidencialidade',
  I: 'Impacto de Integridade',
  A: 'Impacto de Disponibilidade',
  CR: 'Requisitos de Confidencialidade',
  IR: 'Requisitos de Integridade',
  AR: 'Requisitos de Disponibilidade',
  E: 'Explotabilidade',
  RL: 'Nível de Remediação',
  RC: 'Confirmação de Relatório',
} as const;

const metricValues: { [key: string]: { [value: string]: string } } = {
  AV: { N: 'Rede', A: 'Adjacente', L: 'Local', P: 'Físico' },
  AC: { L: 'Baixo', H: 'Alto' },
  PR: { N: 'Nenhum', L: 'Baixo', H: 'Alto' },
  UI: { N: 'Nenhum', R: 'Requerido' },
  S: { U: 'Inalterado', C: 'Alterado' },
  C: { H: 'Alto', L: 'Baixo', N: 'Nenhum' },
  I: { H: 'Alto', L: 'Baixo', N: 'Nenhum' },
  A: { H: 'Alto', L: 'Baixo', N: 'Nenhum' },
  CR: { H: 'Alto', L: 'Baixo', M: 'Médio', ND: 'Não Definido' },
  IR: { H: 'Alto', L: 'Baixo', M: 'Médio', ND: 'Não Definido' },
  AR: { H: 'Alto', L: 'Baixo', M: 'Médio', ND: 'Não Definido' },
  E: {
    X: 'Não Definido',
    U: 'Não Conhecido',
    P: 'Prova de Conceito',
    F: 'Funcional',
  },
  RL: { X: 'Não Definido', O: 'Oficial', T: 'Temporário', W: 'Não Disponível' },
  RC: { X: 'Não Definido', U: 'Desconhecido', R: 'Razoável', C: 'Confirmado' },
} as const;

const CvssCalculator: React.FC = () => {
  const [metrics, setMetrics] = useState<{ [key: string]: string }>({});
  const [baseScore, setBaseScore] = useState<number | null>(null);
  const [temporalScore, setTemporalScore] = useState<number | null>(null);
  const [environmentalScore, setEnvironmentalScore] = useState<number | null>(
    null
  );

  useEffect(() => {
    const vectorString = `CVSS:3.0/${Object.keys(metrics)
      .map((key) => `${key}:${metrics[key]}`)
      .join('/')}`;
    if (vectorString) {
      try {
        setBaseScore(getBaseScore(vectorString));
        setTemporalScore(getTemporalScore(vectorString));
        setEnvironmentalScore(getEnvironmentalScore(vectorString));
      } catch (error) {
        console.error('Error calculating CVSS score', error);
      }
    }
  }, [metrics]);

  const handleMetricChange = (metric: string, value: string) => {
    setMetrics({
      ...metrics,
      [metric]: value,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Cálculo Base
        </Typography>
      </Grid>

      {Object.keys(metricValues)
        .slice(0, 8)
        .map((metric) => (
          <Grid item xs={12} sm={6} md={4} key={metric}>
            <TextField
              select
              fullWidth
              label={metricLabels[metric as keyof typeof metricLabels]}
              value={metrics[metric] || ''}
              onChange={(e) =>
                handleMetricChange(metric, e.target.value as string)
              }
            >
              {Object.keys(
                metricValues[metric as keyof typeof metricLabels]
              ).map((value) => (
                <MenuItem value={value} key={value}>
                  {metricValues[metric][value]}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}

      {baseScore !== null && (
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="subtitle1" marginRight={2}>
              Severidade Base:
            </Typography>
            <SeverityIndicator score={baseScore} />
          </Box>
        </Grid>
      )}

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Cálculo Temporal
        </Typography>
      </Grid>

      {Object.keys(metricValues)
        .slice(11)
        .map((metric) => (
          <Grid item xs={12} sm={6} md={4} key={metric}>
            <TextField
              select
              fullWidth
              label={metricLabels[metric as keyof typeof metricLabels]}
              value={metrics[metric] || ''}
              onChange={(e) =>
                handleMetricChange(metric, e.target.value as string)
              }
            >
              {Object.keys(
                metricValues[metric as keyof typeof metricLabels]
              ).map((value) => (
                <MenuItem value={value} key={value}>
                  {metricValues[metric][value]}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}

      {temporalScore !== null && !Number.isNaN(temporalScore) && (
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="subtitle1" marginRight={2}>
              Severidade Temporal:
            </Typography>
            <SeverityIndicator score={temporalScore} />
          </Box>
        </Grid>
      )}

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Cálculo Ambiental
        </Typography>
      </Grid>

      {Object.keys(metricValues)
        .slice(8, 11)
        .map((metric) => (
          <Grid item xs={12} sm={6} md={4} key={metric}>
            <TextField
              select
              fullWidth
              label={metricLabels[metric as keyof typeof metricLabels]}
              value={metrics[metric] || ''}
              onChange={(e) =>
                handleMetricChange(metric, e.target.value as string)
              }
            >
              {Object.keys(
                metricValues[metric as keyof typeof metricLabels]
              ).map((value) => (
                <MenuItem value={value} key={value}>
                  {metricValues[metric][value]}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}

      {environmentalScore !== null && !Number.isNaN(environmentalScore) && (
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="subtitle1" marginRight={2}>
              Severidade Ambiental:
            </Typography>
            <SeverityIndicator score={environmentalScore} />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default CvssCalculator;
