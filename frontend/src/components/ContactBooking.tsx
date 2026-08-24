'use client';

import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BookingFormData, StatusState } from '../types';

export default function ContactBooking(): React.JSX.Element {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    service: 'Full Dog Grooming & Styling',
    message: '',
  });
  const [status, setStatus] = useState<StatusState | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: data.message });
        setFormData({ name: '', phone: '', email: '', service: 'Full Dog Grooming & Styling', message: '' });
      } else {
        setStatus({ type: 'error', msg: data.detail || 'Failed to send booking' });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Could not submit request. Please try again.' });
    }
  };

  return (
    <section id="booking" className={`py-20 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12`}>
      <div id="contact" className="flex flex-col justify-center">
        <span className={`${theme === 'dark' ? 'text-[#fb923c]' : 'text-amber-600'} font-semibold text-sm`}>GET IN TOUCH</span>
        <h2 className={`text-3xl font-serif font-bold ${theme === 'dark' ? 'text-[#f3f4f6] mt-2 mb-6' : 'text-neutral-900 mt-2 mb-6'}`}>
          Contact Us &amp; Visit Details
        </h2>
        <div className="space-y-4 ${theme === 'dark' ? 'text-[#d1d5db]' : 'text-neutral-600'}">
          <p className="flex items-center space-x-3">
            <span>📍</span>
            <span>16 Avenue de Verdun, Cagnes-sur-Mer, France</span>
          </p>
          <p className="flex items-center space-x-3">
            <span>📞</span>
            <a href="tel:+33745115270" className={`${theme === 'dark' ? 'hover:text-[#fbbf24]' : 'hover:underline'}`}>+33 7 45 11 52 70</a>
          </p>
          <p className="flex items-center space-x-3">
            <span>✉️</span>
            <a href="mailto:grooming.fr.nat@gmail.com" className={`${theme === 'dark' ? 'hover:text-[#fbbf24]' : 'hover:underline'}`}>grooming.fr.nat@gmail.com</a>
          </p>
        </div>
      </div>

      <div className={`${theme === 'dark' ? 'bg-[#1f2937] border border-[#4b5563]' : 'bg-white border border-neutral-200'} p-8 rounded-2xl shadow-sm`}>
        <h3 className="text-xl font-bold mb-4">Book a Salon Visit</h3>
        {status && (
          <div
            className={`p-3 rounded-lg mb-4 text-sm ${
              status.type === 'success' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#fee2e2] text-[#991b1b]'
            }`}
          >
            {status.msg}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`${theme === 'dark' ? 'text-[#d1d5db]' : 'text-neutral-600'} block text-xs font-semibold uppercase mb-1`}>Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${theme === 'dark' ? 'bg-[#1f2937] border-[#4b5563] text-white' : 'border-neutral-300 text-neutral-900'}`}
            />
          </div>
          <div>
            <label className={`${theme === 'dark' ? 'text-[#d1d5db]' : 'text-neutral-600'} block text-xs font-semibold uppercase mb-1`}>Phone Number</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={`w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${theme === 'dark' ? 'bg-[#1f2937] border-[#4b5563] text-white' : 'border-neutral-300 text-neutral-900'}`}
            />
          </div>
          <div>
            <label className={`${theme === 'dark' ? 'text-[#d1d5db]' : 'text-neutral-600'} block text-xs font-semibold uppercase mb-1`}>Select Service</label>
            <select
              value={formData.service}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormData({ ...formData, service: e.target.value })
              }
              className={`w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${theme === 'dark' ? 'bg-[#1f2937] border-[#4b5563] text-white' : 'border-neutral-300 text-neutral-900'}`}
            >
              <option>Full Dog Grooming & Styling</option>
              <option>Teeth Brushing</option>
              <option>Spa & Ozone Therapy</option>
            </select>
          </div>
          <div>
            <label className={`${theme === 'dark' ? 'text-[#d1d5db]' : 'text-neutral-600'} block text-xs font-semibold uppercase mb-1`}>Notes / Special Requests</label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className={`w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${theme === 'dark' ? 'bg-[#1f2937] border-[#4b5563] text-white' : 'border-neutral-300 text-neutral-900'}`}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-amber-600 text-white font-medium py-3 rounded-lg hover:bg-amber-700 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
}

