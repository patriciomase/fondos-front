import React from 'react';
import './CurrencySelector.css';

const CurrencySelector = ({ availableOptions, activeOptions, handleChange }) => {
  return (
    <div className="currencySelector">
      {availableOptions.map(c =>
          <button
            onClick={e => handleChange(c)}
            className={activeOptions.find(curr => curr === c.name || curr === c) ? 'active': ''}
            key={c.name || c}
            title={c.fullName || c.name || c}
          >
            {c.name || c}
          </button>
        )}
    </div>
  );
}

export default CurrencySelector;
