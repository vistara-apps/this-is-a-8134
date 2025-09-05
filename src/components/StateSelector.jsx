import React, { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { US_STATES } from '../data/stateLaws';

export function StateSelector({ selectedState, onStateChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleStateSelect = (stateCode) => {
    onStateChange(stateCode);
    setIsOpen(false);
  };

  const selectedStateName = US_STATES.find(state => state.code === selectedState)?.name || 'Select State';

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-surface border border-gray-200 rounded-md shadow-sm hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
      >
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-text-primary">{selectedStateName}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-surface border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {US_STATES.map((state) => (
            <button
              key={state.code}
              onClick={() => handleStateSelect(state.code)}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-accent/10 focus:outline-none focus:bg-accent/10 transition-colors ${
                selectedState === state.code ? 'bg-accent/20 text-accent font-medium' : 'text-text-primary'
              }`}
            >
              {state.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}