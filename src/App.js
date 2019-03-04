import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { merge } from './Utils/Array';
import { lastMonth } from './Utils/Calendar';
import './App.css';

// Components.
import Chart from './components/Chart/Chart';
import CurrencySelector from './components/CurrencySelector/CurrencySelector';

const percentageValue = name => (values, elem) => {
  const lastElem = values.length ? values[values.length - 1] : elem;
  const last = lastElem[name] || 0;
  return values.concat({
    ...elem, [name]: (elem.value * 100 / lastElem.value) - 100 + last, name: elem.dateTime 
  });
}

const cleanWeekendsAndHolidays = elem => elem.value;

const byCurrency = currencies => elem => currencies.indexOf(elem.currency) > -1;

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

const availableCurrencies = [ 'ARS', 'USD' ];

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

  const [ currencies, setCurrencies] = useState([ 'ARS' ]);

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
      <Chart
        data={prices.filter(cleanWeekendsAndHolidays)}
        funds={funds.filter(byCurrency(currencies))}
      />
      <CurrencySelector
        availableCurrencies={availableCurrencies}
        currencies={currencies}
        handleCurrencies={c => {
          currencies.find(curr => curr === c) ?
            setCurrencies(currencies.filter(curr => curr !== c)) :
            setCurrencies(currencies.concat(c));
        }}
      />
    </div>
  );
}

export default App;
