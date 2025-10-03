
import React, { useState, useCallback } from 'react';
import { askAI } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import ResponseDisplay from './ResponseDisplay';
import ErrorDisplay from './ErrorDisplay';
import SendIcon from './icons/SendIcon';

const ChatInterface: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const aiResponse = await askAI(prompt);
      setResponse(aiResponse);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl shadow-slate-950/50">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
        AI Assistant
      </h1>
      <p className="text-center text-slate-400 mb-8">
        Ask me anything, and I'll do my best to answer.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Explain quantum computing in simple terms..."
            className="w-full h-28 p-4 pr-16 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow resize-none"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
              }
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="absolute bottom-4 right-4 h-10 w-10 flex items-center justify-center bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all transform hover:scale-110 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500"
            aria-label="Submit question"
          >
            {isLoading ? <LoadingSpinner /> : <SendIcon />}
          </button>
        </div>
      </form>

      <div className="mt-8 min-h-[120px] flex flex-col justify-center">
        {isLoading && (
            <div className="flex items-center justify-center space-x-2 text-slate-400">
                <LoadingSpinner />
                <span>Thinking...</span>
            </div>
        )}
        {error && <ErrorDisplay message={error} />}
        {response && <ResponseDisplay text={response} />}
      </div>
    </div>
  );
};

export default ChatInterface;
