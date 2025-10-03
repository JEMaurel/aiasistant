
import React from 'react';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <main className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e70,transparent)] opacity-20"></div>
      <div className="w-full max-w-2xl z-10">
        <ChatInterface />
      </div>
    </main>
  );
};

export default App;
