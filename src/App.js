import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { merge } from './Utils/Array';
import { lastMonth } from './Utils/Calendar';
import './App.css';

const percentageValue = name => (values, elem) => {
  const lastElem = values.length ? values[values.length - 1] : elem;
  const last = lastElem[name] || 0;
  return values.concat({
    ...elem, [name]: (elem.value * 100 / lastElem.value) - 100 + last, name: elem.dateTime 
  });
}

const cleanWeekendsAndHolidays = elem => elem.value; 

const funds = [
  // { name: 'FACCARB', color: '#0A0' },
  { name: 'FBARFPB', color: '#F00' },
  { name: 'FBAHORA', color: '#F0F' },
  { name: 'BFRENTP', color: '#00F' },
  // { name: 'BFBARGB', color: '#0FF' },
  { name: 'FBAHOPB', color: '#333' },
  // { name: 'FBABONB', color: '#999' },
  // { name: 'FBARFDA', color: '#FF7' },
  // { name: 'FRFDPLB', color: '#7F7' },
  // { name: 'FBABLAA', color: '#07F' },
  // { name: 'FBARMXB', color: '#0F7' },
  // { name: 'FBARTIB', color: '#7F0' },
  // { name: 'FBRTIIB', color: '#F07' },
  // { name: 'BFCALIF', color: '#000' },
  // { name: 'BFALATB', color: '#7FF' },
  // { name: 'FBABRAD', color: '#DDD' },
];

const SimpleLineChart = ({ data }) => {
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
      {funds.map(f => <Line key={f.name} dataKey={`${f.name}:AR`} stroke={f.color} connectNulls={true} />)}
    </LineChart>
  );
};

const d = new Date();
const initialState = lastMonth(
  d.getFullYear(),
  d.getMonth() + 1,
  d.getDate()
);

function App() {
  const [ prices, setPrices ] = useState(
    initialState.map(day => ({ dateTime: day, name: day }))
  );

  useEffect(() => {
    funds.map(f => axios.get(`//localhost:8998/?fund=${f.name}`)
    .then(response => {
      setPrices(oldPrices => 
        merge(
          oldPrices,
          response.data[0].price.reduce(percentageValue(response.data[0].ticker), [])
        )
      )
    }));
  }, []);

  return (
    <div className="App">
      <SimpleLineChart data={prices.filter(cleanWeekendsAndHolidays)}/>
    </div>
  );
}

export default App;
