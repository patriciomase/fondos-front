import React, { Component } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { merge } from './Utils/Array';
import { lastMonth } from './Utils/Calendar';
import './App.css';

// const absoluteValue = (p, name) => ({ ...p, [name]: p.value, name: p.dateTime });
const percentageValue = (name) => (values, elem) => {
  const lastElem = values.length ? values[values.length - 1] : elem;
  const last = lastElem[name] || 0;
  return values.concat({
    ...elem, [name]: (elem.value * 100 / lastElem.value) - 100 + last, name: elem.dateTime 
  });
}

const funds = [
  { name: 'FACCARB', color: '#0A0' },
  { name: 'FBARFPB', color: '#F00' },
  { name: 'FBAHORA', color: '#F0F' },
  { name: 'BFRENTP', color: '#00F' },
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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prices: initialState.map(day => ({ dateTime: day, name: day }))
    }
  }

  componentDidMount() {
    funds.map(f => axios.get(`//localhost:8998/?fund=${f.name}`)
    .then(response => {
      this.setState(oldState => { return ({
        // prices: response.data[0].price.map()
        prices: merge(
          oldState.prices,
          response.data[0].price.reduce(percentageValue(response.data[0].ticker), [])
          )
      })})
    }));
  }

  render() {
    return (
      <div className="App">
        <SimpleLineChart data={this.state.prices}/>
      </div>
    );
  }
}

export default App;
