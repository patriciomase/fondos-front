import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const Chart = ({ data, funds }) => {
  return (
    <LineChart
      width={1000}
      height={500}
      data={data}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}
    >
      <XAxis dataKey="name"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Legend />
      {funds.map(f => <Line key={f.name} dataKey={`${f.name}:AR`} stroke={f.color} connectNulls={true} isAnimationActive={false} />)}
    </LineChart>
  );
};

export default Chart;
