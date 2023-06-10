import { metricLabels, metricValues } from './util';
import { MenuItem, TextField } from '@mui/material';

type MetricFieldProps = {
  metric: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const MetricField = ({ metric, onChange, value }: MetricFieldProps) => {
  return (
    <TextField
      select
      fullWidth
      label={metricLabels[metric as keyof typeof metricLabels]}
      value={value}
      onChange={onChange}
    >
      {Object.keys(metricValues[metric as keyof typeof metricLabels]).map(
        (value) => (
          <MenuItem value={value} key={value}>
            {metricValues[metric][value]}
          </MenuItem>
        )
      )}
    </TextField>
  );
};

export default MetricField;
