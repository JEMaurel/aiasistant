
import React from 'react';

interface ResponseDisplayProps {
  text: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ text }) => (
  <div className="bg-slate-700/30 border border-slate-700 rounded-xl p-4">
    <h2 className="text-lg font-semibold text-indigo-400 mb-2">Answer</h2>
    <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{text}</p>
  </div>
);

export default ResponseDisplay;
