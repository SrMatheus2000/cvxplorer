import MetricField from './MetricField';
import SeverityIndicator from './SeverityIndicator';
import { metricValues } from './util';
import { Grid, Typography, Box } from '@mui/material';
import { getEnvironmentalScore, getTemporalScore, getBaseScore } from 'cvss';
import React, { useState, useEffect } from 'react';

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
            <MetricField
              metric={metric}
              value={metrics[metric] || ''}
              onChange={(e) =>
                handleMetricChange(metric, e.target.value as string)
              }
            />
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
            <MetricField
              metric={metric}
              value={metrics[metric] || ''}
              onChange={(e) =>
                handleMetricChange(metric, e.target.value as string)
              }
            />
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
            <MetricField
              metric={metric}
              value={metrics[metric] || ''}
              onChange={(e) =>
                handleMetricChange(metric, e.target.value as string)
              }
            />
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
