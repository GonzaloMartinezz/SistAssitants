import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function CalendarScheduler({ bookings, onAddBooking }) {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [selectedTime, setSelectedTime] = useState(null);
  const [clientName, setClientName] = useState('');
  const [clientSport, setClientSport] = useState('Gimnasio');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const times = ['09:00', '11:00', '15:00', '17:00', '19:00'];

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedTime || !clientName) return;
    setErrorMessage('');

    const newBooking = {
      clientName,
      sport: clientSport,
      day: selectedDay,
      time: selectedTime,
      date: new Date().toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })
    };

    try {
      await onAddBooking(newBooking);
      setBookingSuccess(true);
    } catch (error) {
      setErrorMessage(error.message || 'Error al agendar la consulta.');
    }
  };

  const isSlotTaken = (day, time) => {
    return bookings.some(b => b.day === day && b.time === time);
  };

  const handleReset = () => {
    setSelectedTime(null);
    setClientName('');
    setBookingSuccess(false);
    setErrorMessage('');
  };

  return (
    <section id="calendar" className="section-container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '850px' }}>
      
      {/* Title */}
      <div className="flex flex-col text-left select-none">
        <span className="section-label">Google Calendar Sync</span>
        <h2 className="section-title">
          agenda tu consulta
        </h2>
      </div>

      {bookingSuccess ? (
        /* Success Screen card styled exactly like google calendar popup card */
        <div className="invite-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="sidebar-icon-pad" style={{ backgroundColor: '#ffffff', padding: '0.6rem' }}>
              <CheckCircle size={28} />
            </div>
            <div>
              <span className="font-tech text-xs font-bold uppercase opacity-85">Simulador Google Calendar</span>
              <h3 className="font-display text-2xl font-black leading-tight mt-0.5">
                ¡Consulta Agendada Exitosamente!
              </h3>
            </div>
          </div>

          <div className="sidebar-divider" style={{ backgroundColor: 'var(--color-dark)', opacity: 0.3 }}></div>

          {/* Invited details */}
          <div className="invite-card-inner">
            <h4 className="font-tech text-xs font-bold uppercase" style={{ color: 'var(--kraft-brown)' }}>Invitación de Calendario</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontWeight: 'bold', fontSize: '0.9rem' }}>
              <p className="invite-card-row">
                <span style={{ color: 'var(--kraft-brown)' }}>📅 Evento:</span>
                <span>Asesoría Nutricional Deportiva con Lic. Leticia</span>
              </p>
              <p className="invite-card-row">
                <span style={{ color: 'var(--kraft-brown)' }}>👤 Paciente:</span>
                <span>{clientName} ({clientSport})</span>
              </p>
              <p className="invite-card-row">
                <span style={{ color: 'var(--kraft-brown)' }}>⏰ Horario:</span>
                <span>{selectedDay} a las {selectedTime} hs</span>
              </p>
            </div>
            
            <div className="sidebar-divider" style={{ opacity: 0.1 }}></div>
            <p className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--color-muted)' }}>
              📨 Se ha enviado un correo electrónico de confirmación con el enlace de Google Meet.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="btn-neo"
            style={{ backgroundColor: '#ffffff', alignSelf: 'flex-start' }}
          >
            Reservar Otra Consulta ⚡
          </button>
        </div>
      ) : (
        /* Booking Scheduler Form */
        <div className="scheduler-grid">
          
          {/* Left Column grid selection */}
          <div className="scheduler-slots">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="font-tech" style={{ fontWeight: 'bold', fontSize: '0.75rem', color: 'var(--color-muted)' }}>1. Selecciona el Día</label>
              <div className="scheduler-days-row">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                    className="btn-neo"
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: selectedDay === day ? 'var(--pastel-pink)' : 'white',
                      transform: selectedDay === day ? 'translate(-1.5px, -1.5px)' : 'none',
                      boxShadow: selectedDay === day ? '3px 3px 0px var(--color-dark)' : '1px 1px 0px var(--color-dark)'
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              <label className="font-tech" style={{ fontWeight: 'bold', fontSize: '0.75rem', color: 'var(--color-muted)' }}>2. Selecciona el Horario</label>
              <div className="time-slots-grid">
                {times.map((time) => {
                  const taken = isSlotTaken(selectedDay, time);
                  const active = selectedTime === time;
                  return (
                    <button
                      key={time}
                      disabled={taken}
                      onClick={() => setSelectedTime(time)}
                      className="time-slot-btn"
                      style={{
                        backgroundColor: active ? 'var(--pastel-blue)' : taken ? '#e0dbd2' : '#ffffff',
                        transform: active ? 'translate(-1.5px, -1.5px)' : 'none',
                        boxShadow: active ? '3px 3px 0px var(--color-dark)' : taken ? 'none' : '1px 1px 0px var(--color-dark)'
                      }}
                    >
                      <Clock size={14} />
                      <span>{time} hs</span>
                      <span style={{ fontSize: '0.55rem', fontWeight: 'bold', marginTop: '0.25rem', opacity: 0.7 }}>
                        {taken ? 'Ocupado' : 'Disponible'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column Details Input */}
          <form 
            onSubmit={handleBooking}
            className="scheduler-form"
          >
            <div className="scheduler-form-inputs">
              <h3>Tus Datos Deportivos</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="font-tech" style={{ fontWeight: 'bold', fontSize: '0.65rem', color: 'var(--kraft-brown)' }}>Tu Nombre Completo</label>
                <input 
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="input-neo"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="font-tech" style={{ fontWeight: 'bold', fontSize: '0.65rem', color: 'var(--kraft-brown)' }}>Disciplina Deportiva</label>
                <select 
                  value={clientSport}
                  onChange={(e) => setClientSport(e.target.value)}
                  className="input-neo font-tech"
                  style={{ fontWeight: 'bold' }}
                >
                  <option value="Gimnasio">Gimnasio / Culturismo</option>
                  <option value="Crossfit">Crossfit / HIIT</option>
                  <option value="Running/Ciclismo">Running / Ciclismo</option>
                  <option value="Powerlifting">Powerlifting</option>
                  <option value="Estilo de Vida">Estilo de Vida Saludable</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {errorMessage && (
                <span className="font-tech" style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#dc2626', textAlign: 'center', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
                  <AlertCircle size={12} /> {errorMessage}
                </span>
              )}
              <button 
                type="submit"
                disabled={!selectedTime || !clientName}
                className="btn-neo btn-accent"
                style={{ width: '100%' }}
              >
                Confirmar Cita ⚡
              </button>
              {!selectedTime && (
                <span className="font-tech" style={{ fontSize: '0.55rem', fontWeight: 'bold', color: '#b45309', textAlign: 'center' }}>
                  * Debes seleccionar un horario primero
                </span>
              )}
            </div>
          </form>

        </div>
      )}

    </section>
  );
}
