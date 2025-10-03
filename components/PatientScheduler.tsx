
import React, { useState, FormEvent } from 'react';
import TrashIcon from './icons/TrashIcon';
import { Appointment } from '../App';

interface PatientSchedulerProps {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

const PatientScheduler: React.FC<PatientSchedulerProps> = ({ appointments, setAppointments }) => {
  const [patientName, setPatientName] = useState('');
  const [appointmentDateTime, setAppointmentDateTime] = useState('');
  const [visitReason, setVisitReason] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !appointmentDateTime) return;

    const newAppointment: Appointment = {
      id: Date.now(),
      name: patientName,
      dateTime: appointmentDateTime,
      reason: visitReason,
    };

    setAppointments(prev => [...prev, newAppointment].sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()));
    setPatientName('');
    setAppointmentDateTime('');
    setVisitReason('');
  };

  const handleDelete = (id: number) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl shadow-slate-950/50">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400 mb-2">
        Agenda de Pacientes
      </h1>
      <p className="text-center text-slate-400 mb-8">
        Agregue y administre las citas de sus pacientes.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="patientName" className="block text-sm font-medium text-slate-300 mb-1">Nombre del Paciente</label>
          <input
            id="patientName"
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Ej: Juan Pérez"
            className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
            required
          />
        </div>
        <div>
          <label htmlFor="appointmentDateTime" className="block text-sm font-medium text-slate-300 mb-1">Fecha y Hora</label>
          <input
            id="appointmentDateTime"
            type="datetime-local"
            value={appointmentDateTime}
            onChange={(e) => setAppointmentDateTime(e.target.value)}
            className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
            required
          />
        </div>
        <div>
          <label htmlFor="visitReason" className="block text-sm font-medium text-slate-300 mb-1">Motivo de la Cita</label>
          <textarea
            id="visitReason"
            value={visitReason}
            onChange={(e) => setVisitReason(e.target.value)}
            placeholder="Ej: Consulta de seguimiento"
            className="w-full h-24 p-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 disabled:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500"
        >
          Agregar Cita
        </button>
      </form>

      <div>
        <h2 className="text-xl font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2">Citas Programadas</h2>
        {appointments.length === 0 ? (
          <p className="text-center text-slate-500 py-8">Aún no hay citas programadas.</p>
        ) : (
          <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {appointments.map(app => (
              <li key={app.id} className="bg-slate-700/30 border border-slate-700 rounded-xl p-4 flex justify-between items-start">
                <div>
                  <p className="font-bold text-sky-400">{app.name}</p>
                  <p className="text-sm text-slate-300">
                    {new Date(app.dateTime).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    {' - '}
                    {new Date(app.dateTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {app.reason && <p className="text-sm text-slate-400 mt-2 whitespace-pre-wrap">{app.reason}</p>}
                </div>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-red-500"
                  aria-label="Eliminar cita"
                >
                  <TrashIcon />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PatientScheduler;
