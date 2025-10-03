import React, { useState } from 'react';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface ResponseDisplayProps {
  text: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (isCopied) return;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Revert after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // In a real app, we might want to show a toast notification for the error.
    }
  };

  return (
    <div className="relative bg-slate-700/30 border border-slate-700 rounded-xl p-4">
      <div className="absolute top-2 right-2">
        <button
          onClick={handleCopy}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500"
          aria-label={isCopied ? "Copied to clipboard" : "Copy response to clipboard"}
          disabled={isCopied}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      <h2 className="text-lg font-semibold text-indigo-400 mb-2 pr-10">Answer</h2>
      <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{text}</p>
    </div>
  );
};

export default ResponseDisplay;
