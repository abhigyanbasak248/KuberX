// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import { PieChart } from "@mui/x-charts/PieChart";
// import axios from "../../axios";
// import { getUserID } from "../../hooks/getUserID";
// const pieParams = { height: 200, margin: { right: 5 } };

// const PieColor = () => {
//   const [data, setData] = useState({ expense: 0, income: 0, investment: 0 });

//   useEffect(() => {
//     // Fetching data from API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `user/dashboard/summary/${getUserID()}`
//         );
//         console.log(response.data);
//         setData(response.data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Stack direction="row" width="100%" textAlign="center" spacing={2}>
//       <Box flexGrow={1}>
//         <Typography>Default</Typography>
//         <PieChart
//           series={[
//             {
//               data: [
//                 { value: data.income, name: "Income" },
//                 { value: data.expense, name: "Expense" },
//                 { value: data.investment, name: "Investment" },
//               ],
//             },
//           ]}
//           {...pieParams}
//         />
//       </Box>
//     </Stack>
//   );
// };

// export default PieColor;

import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Savings', value: 330, color: '#0088FE' },
  { label: 'Expenses', value: 470, color: '#00C49F' },
  { label: 'Investments', value: 100, color: '#FFBB28' },
];

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

export default function PieChartWithCustomizedLabel() {
  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}