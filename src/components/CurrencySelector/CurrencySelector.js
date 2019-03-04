import React from 'react';
import './CurrencySelector.css';

const CurrencySelector = ({ availableCurrencies, currencies, handleCurrencies }) => {
  return (
    <div className="currencySelector">
      {availableCurrencies.map(c =>
          <button
            onClick={e => handleCurrencies(c)}
            className={currencies.find(curr => curr === c) ? 'active': ''}
            key={c}
          >
            {c}
          </button>
        )}
    </div>
  );
}

export default CurrencySelector;
