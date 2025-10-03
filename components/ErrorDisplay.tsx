
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
  <div className="bg-red-900/50 border border-red-700 text-red-300 rounded-xl p-4">
    <h2 className="text-lg font-semibold text-red-200 mb-2">Error</h2>
    <p className="text-sm">{message}</p>
  </div>
);

export default ErrorDisplay;
