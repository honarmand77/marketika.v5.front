import React from 'react';
import { Box, Paper } from '@mui/material';
import Chart from '../../../components/Chart/Chart';

const OverviewSection = ({ data, options, type }) => {
  return (
    <Paper
      sx={{
        borderRadius: '8px',
        background:"transparent",
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Chart type={type} data={data} options={options} />
      </Box>
    </Paper>
  );
};

export default OverviewSection;