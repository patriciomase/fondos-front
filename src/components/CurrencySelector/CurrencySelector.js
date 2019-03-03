import React from 'react';

const CurrencySelector = ({ availableCurrencies, handleCurrencies }) => {
  return (
    <div className="currencySelector">
      {availableCurrencies.map(c =>
          <button onClick={e => handleCurrencies(c)} key={c}>
            {c}
          </button>
        )}
    </div>
  );
}

export default CurrencySelector;
