import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import CalendarScheduler from './CalendarScheduler';

const TOPICS = [
  '🍽️ Plan de alimentación',
  '💊 Suplementación',
  '📊 Composición corporal',
  '🤝 Consulta general'
];

export default function Contact({ bookings, onAddBooking }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(TOPICS[3]);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Consulta desde la web — ${topic}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\nMotivo: ${topic}\n\nMensaje:\n${message}`
    );
    window.location.href = `mailto:guada@nutri.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setTopic(TOPICS[3]);
    setMessage('');
    setSent(false);
  };

  return (
    <section id="contact" className="section-container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

      {/* Title */}
      <div className="flex flex-col text-left select-none">
        <span className="section-label">Estoy Para Ayudarte</span>
        <h2 className="section-title">contacto</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-muted)', maxWidth: '38rem' }}>
          ¿Tenés una duda puntual sobre tu nutrición deportiva antes de agendar una consulta
          completa? Escribime por acá y te respondo a la brevedad.
        </p>
      </div>

      {/* Quick contact info cards */}
      <div className="contact-grid-top">
        <div className="contact-info-card" style={{ backgroundColor: 'var(--pastel-green)' }}>
          <div className="contact-info-icon">
            <MessageCircle size={18} />
          </div>
          <h4>WhatsApp Directo</h4>
          <a href="https://wa.me/5491155556789" target="_blank" rel="noreferrer">+54 9 11 5555-6789</a>
        </div>

        <div className="contact-info-card" style={{ backgroundColor: 'var(--pastel-blue)' }}>
          <div className="contact-info-icon">
            <Mail size={18} />
          </div>
          <h4>Email</h4>
          <a href="mailto:guada@nutri.com">guada@nutri.com</a>
        </div>

        <div className="contact-info-card" style={{ backgroundColor: 'var(--pastel-peach)' }}>
          <div className="contact-info-icon">
            <MapPin size={18} />
          </div>
          <h4>Consultorio</h4>
          <p>San Miguel de Tucumán, Argentina<br/>(también atención online)</p>
        </div>
      </div>

      {/* Contact form */}
      <div className="contact-form-card">
        {sent ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={24} color="#059669" />
              <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 900 }}>¡Listo, se abrió tu cliente de correo!</h3>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-muted)' }}>
              Confirmá el envío desde tu app de correo. Si no se abrió automáticamente, escribime
              directamente a <strong>guada@nutri.com</strong>.
            </p>
            <button onClick={resetForm} className="btn-neo" style={{ backgroundColor: '#ffffff' }}>
              Enviar otra consulta
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 900 }}>Envíame tu consulta</h3>

            <div className="contact-form-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="font-tech" style={{ fontWeight: 'bold', fontSize: '0.65rem', color: 'var(--kraft-brown)' }}>Tu Nombre</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. María Gómez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-neo"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="font-tech" style={{ fontWeight: 'bold', fontSize: '0.65rem', color: 'var(--kraft-brown)' }}>Tu Email</label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-neo"
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="font-tech" style={{ fontWeight: 'bold', fontSize: '0.65rem', color: 'var(--kraft-brown)' }}>Motivo de tu Consulta</label>
              <div className="contact-topic-row">
                {TOPICS.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTopic(t)}
                    className="btn-neo"
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.45rem 0.8rem',
                      backgroundColor: topic === t ? 'var(--pastel-pink)' : '#ffffff',
                      transform: topic === t ? 'translate(-1.5px, -1.5px)' : 'none',
                      boxShadow: topic === t ? '3px 3px 0px var(--color-dark)' : '1px 1px 0px var(--color-dark)'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label className="font-tech" style={{ fontWeight: 'bold', fontSize: '0.65rem', color: 'var(--kraft-brown)' }}>Tu Mensaje</label>
              <textarea
                required
                rows={4}
                placeholder="Contame en qué disciplina entrenás y cuál es tu duda..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-neo console-form-textarea"
              />
            </div>

            <button type="submit" className="btn-neo btn-accent" style={{ alignSelf: 'flex-start' }}>
              Enviar Consulta <Send size={14} />
            </button>
          </form>
        )}
      </div>

      <div className="contact-section-divider"></div>

      {/* Booking scheduler reused for a full consultation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="flex flex-col text-left select-none">
          <span className="section-label">¿Ya Sabés Que Querés Empezar?</span>
          <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 900 }}>Reservá tu primera consulta</h3>
        </div>
        <CalendarScheduler bookings={bookings} onAddBooking={onAddBooking} embedded />
      </div>

    </section>
  );
}
