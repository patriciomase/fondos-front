import React from 'react';
import './CurrencySelector.css';

const CurrencySelector = ({ availableOptions, activeOptions, handleChange }) => {
  return (
    <div className="currencySelector">
      {availableOptions.map(c =>
          <button
            onClick={e => handleChange(c)}
            className={activeOptions.find(curr => curr === c) ? 'active': ''}
            key={c}
          >
            {c}
          </button>
        )}
    </div>
  );
}

export default CurrencySelector;
