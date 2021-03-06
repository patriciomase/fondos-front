import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import pipe from 'pipe-functions';
import { merge } from './Utils/Array';
import { lastMonth } from './Utils/Calendar';
import './App.css';

// Components.
import Chart from './components/Chart/Chart';
import ItemSelector from './components/ItemSelector/ItemSelector';

const percentageValue = name => (values, elem) => {
  const lastElem = values.length ? values[values.length - 1] : elem;
  const last = lastElem[name] || 0;
  return values.concat({
    ...elem, [name]: (elem.value * 100 / lastElem.value) - 100 + last, name: elem.dateTime 
  });
}

const cleanWeekendsAndHolidays = elem => elem.value;

const activeOnes = activeFunds => elem => activeFunds.indexOf(elem.name) > -1;

const funds = [
  { name: 'FACCARA', color: '#0A0', currency: 'ARS', fullName: 'FBA Acciones Argentina A' },
  { name: 'FBARFPA', color: '#F00', currency: 'ARS', fullName: 'FBA Renta Fija Pesos A' },
  { name: 'FBAHORA', color: '#F0F', currency: 'ARS', fullName: 'FBA Horizonte' },
  { name: 'BFRENTP', color: '#00F', currency: 'ARS', fullName: 'FBA Renta pesos' },
  { name: 'BFBARGA', color: '#0FF', currency: 'ARS', fullName: 'FBA Bonos Argentina A' },
  { name: 'FBAHOPA', color: '#333', currency: 'ARS', fullName: 'FBA Horizonte Plus A' },
  { name: 'FBABONA', color: '#999', currency: 'ARS', fullName: 'FBA Bonos Globales A' },
  { name: 'FBARFDA', color: '#FF7', currency: 'USD', fullName: 'FBA Renta Fija Dolar' },
  { name: 'FRFDPLA', color: '#7F7', currency: 'USD', fullName: 'FBA Renta Fija Dolar Plus A' },
  { name: 'FBABLAA', color: '#07F', currency: 'ARS', fullName: 'FBA Bonos Latam A' },
  { name: 'FBARMXA', color: '#0F7', currency: 'ARS', fullName: 'FBA Renta Mixta A' },
  { name: 'FBARTIA', color: '#7F0', currency: 'ARS', fullName: 'FBA Retorno Total A' },
  { name: 'FBRTIIA', color: '#F07', currency: 'USD', fullName: 'FBA Retorno Total II A' },
  { name: 'BFCALIF', color: '#000', currency: 'ARS', fullName: 'FBA Calificado A' },
  { name: 'BFALATA', color: '#7FF', currency: 'ARS', fullName: 'FBA Acciones Latinoamericanas A' },
  { name: 'FBABRAC', color: '#DDD', currency: 'USD', fullName: 'FBA Brasil I C' },
];

const d = new Date();
const initialState = lastMonth(
  d.getFullYear(),
  d.getMonth() + 1,
  d.getDate()
);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App() {

  const [ timeframe, setTimeframe ] = useState('1_MONTH');
  let prevTimeframe = usePrevious(timeframe);
  
  const [ prices, setPrices ] = useState(
    initialState.map(day => ({ dateTime: day, name: day }))
  );

  const [ activeFunds, setActiveFunds ] = useState([ 'FBARFPA', 'FBAHORA', 'BFRENTP' ]);

  useEffect(() => {
    if (prevTimeframe !== timeframe) {
      if (timeframe === '1_MONTH') {
        setPrices(lastMonth(
          d.getFullYear(),
          d.getMonth() + 1,
          d.getDate()
        )); 
      }
  
      if (timeframe === '6_MONTH') {
        setPrices(lastMonth(
          d.getFullYear(),
          d.getMonth() + 1,
          d.getDate()
        ));
      }
    }

    funds.map(f => axios.get(`//localhost:8998/?fund=${f.name}&timeframe=${timeframe}`)
    .then(response => {
      setPrices(oldPrices => 
        merge(
          oldPrices,
          response.data[0].price.reduce(percentageValue(response.data[0].ticker), [])
        )
      )
    }));
  }, [ timeframe ]);

  return (
    <div className="App">
      <Chart
        data={prices.filter(cleanWeekendsAndHolidays)}
        funds={funds.filter(activeOnes(activeFunds))}
      />
      <ItemSelector
        availableOptions={funds.filter(f => f.currency === 'ARS')}
        activeOptions={activeFunds}
        handleChange={c => {
          activeFunds.find(curr => curr === c) ?
            setActiveFunds(activeFunds.filter(curr => curr !== c)) :
            setActiveFunds(activeFunds.concat(c));
        }}
      />
      <ItemSelector
        availableOptions={funds.filter(f => f.currency === 'USD')}
        activeOptions={activeFunds}
        handleChange={c => {
          activeFunds.find(curr => curr === c) ?
            setActiveFunds(activeFunds.filter(curr => curr !== c)) :
            setActiveFunds(activeFunds.concat(c));
        }}
      />
      <ItemSelector
        availableOptions={[ '6_MONTH', '1_MONTH' ]}
        activeOptions={[ timeframe ]}
        handleChange={t => setTimeframe(t)}
      />
    </div>
  );
}

export default App;
