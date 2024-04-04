import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

const pieParams = { height: 200, margin: { right: 5 } };

const PieColor = () => {
  const [data, setData] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    // Fetching data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('localhost:8080/api/data'); // change the API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Stack direction="row" width="100%" textAlign="center" spacing={2}>
      <Box flexGrow={1}>
        <Typography>Default</Typography>
        <PieChart
          series={[
            {
              data: [
                { value: data.income, name: 'Income' },
                { value: data.expense, name: 'Expense' }
              ]
            }
          ]}
          {...pieParams}
        />
      </Box>
    </Stack>
  );
};

export default PieColor;
