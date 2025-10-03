
import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import PatientScheduler from './components/PatientScheduler';

// Define the Appointment interface here to be shared across components
export interface Appointment {
  id: number;
  name: string;
  dateTime: string;
  reason: string;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const getTabClass = (tabName: string) => {
    return `px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 ${
      activeTab === tabName
        ? 'bg-indigo-600 text-white'
        : 'text-slate-300 hover:bg-slate-700'
    }`;
  };

  return (
    <main className="bg-slate-900 text-white min-h-screen flex flex-col items-center p-4 font-sans">
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e70,transparent)] opacity-20"></div>
      <div className="w-full max-w-2xl z-10">
        <div className="mb-8 flex justify-center space-x-2 p-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg">
          <button onClick={() => setActiveTab('chat')} className={getTabClass('chat')}>
            AI Assistant
          </button>
          <button onClick={() => setActiveTab('scheduler')} className={getTabClass('scheduler')}>
            Agenda de Pacientes
          </button>
        </div>
        
        {activeTab === 'chat' && <ChatInterface appointments={appointments} />}
        {activeTab === 'scheduler' && <PatientScheduler appointments={appointments} setAppointments={setAppointments} />}
      </div>
    </main>
  );
};

export default App;
