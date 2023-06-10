import { Typography, Box } from '@mui/material';
import React from 'react';

const getSeverity = (score: number) => {
  if (score === 0) return { label: 'None', color: '#2E8B57' };
  if (score >= 0.1 && score <= 3.9) return { label: 'Low', color: '#32CD32' };
  if (score >= 4.0 && score <= 6.9)
    return { label: 'Medium', color: '#FFA500' };
  if (score >= 7.0 && score <= 8.9) return { label: 'High', color: '#FF4500' };
  if (score >= 9.0 && score <= 10.0)
    return { label: 'Critical', color: '#B22222' };
  return { label: 'Unknown', color: '#808080' };
};

type SeverityIndicatorProps = {
  score: number;
};

const SeverityIndicator = ({ score }: SeverityIndicatorProps) => {
  const { label, color } = getSeverity(score);

  return (
    <Box textAlign="center">
      <Box
        width={40}
        height={40}
        borderRadius="50%"
        bgcolor={color}
        display="inline-block"
        lineHeight={2.5}
      >
        <Typography variant="subtitle1" component="span" color="#FFFFFF">
          {score}
        </Typography>
      </Box>
      <Typography variant="body2" component="div">
        {label}
      </Typography>
    </Box>
  );
};

export default SeverityIndicator;
