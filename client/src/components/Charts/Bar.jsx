import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'money(in rupees)',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const dataset = [
  {
    expenditure: 55,
    investments: 10,
    savings: 35,
    month: 'Jan',
  },
  {
    expenditure: 59,
    investments: 10,
    savings: 31,
    month: 'Fev',
  },
  {
    expenditure: 50,
    investments: 15,
    savings: 35,
    month: 'Mar',
  },
  {
    expenditure: 60,
    investments: 5,
    savings: 35,
    month: 'Apr',
  },
  {
    expenditure: 49,
    investments: 16,
    savings: 35,
    month: 'May',
  },
  {
    expenditure: 57,
    investments: 12,
    savings: 31,
    month: 'June',
  },
  {
    expenditure: 55,
    investments: 10,
    savings: 35,
    month: 'July',
  },
  {
    expenditure: 51,
    investments: 17,
    savings: 32,
    month: 'Aug',
  },
  {
    expenditure: 50,
    investments: 10,
    savings: 40,
    month: 'Sept',
  },
  {
    expenditure: 52,
    investments: 13,
    savings: 35,
    month: 'Oct',
  },
  {
    expenditure: 45,
    investments: 15,
    savings: 40,
    month: 'Nov',
  },
  {
    expenditure: 70,
    investments: 10,
    savings: 20,
    month: 'Dec',
  },
];

const valueFormatter = (value) => `${value}mm`;

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'expenditure', label: 'Exp', valueFormatter },
        { dataKey: 'investments', label: 'Inv', valueFormatter },
        { dataKey: 'savings', label: 'Sav', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
