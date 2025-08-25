'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus('loading');
    
    try {
      // For now, we'll just simulate a successful subscription
      // In production, this would call an API endpoint to save the email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Thank you for subscribing! We\'ll keep you updated with our latest tips.');
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-3 text-slate-900">Stay Updated</h3>
      <p className="text-gray-600 mb-4">
        Get the latest home improvement tips delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-yellow-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
        {message && (
          <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}