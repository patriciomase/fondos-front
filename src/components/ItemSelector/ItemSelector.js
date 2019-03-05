import React from 'react';
import './ItemSelector.css';

const ItemSelector = ({ availableOptions, activeOptions, handleChange }) => {
  return (
    <div className="itemSelector">
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

export default ItemSelector;
