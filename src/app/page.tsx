"use client";

import { useState } from 'react';
import Image from 'next/image'; // Importing Next.js Image component
import { supabase } from '../lib/supabase';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setStatus('loading');
      setErrorMessage('');

      // Check if email already exists
      const { data: existing } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email)
        .single();

      if (existing) {
        setStatus('error');
        setErrorMessage('You&apos;re already on the waitlist!');
        return;
      }

      // Insert new email
      const { error } = await supabase.from('waitlist').insert([{ email }]);

      if (error) throw error;

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="px-32 py-8 flex justify-between items-center">
        {/* Replace <img> with <Image /> */}
        <Image
          src="/images/atelier.svg"
          alt="atelier OS"
          width={120}
          height={24} // Explicit dimensions
        />
        <a
          href="https://twitter.com/useatelieros"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E2FF66] border border-[#E2FF66] rounded-full px-6 py-2 text-sm hover:bg-[#E2FF66]/10"
        >
          Follow us on @useatelieros
        </a>
      </div>

      <div className="max-w-[1000px] mx-auto px-32 pb-32">
        <div className="max-w-2xl pt-24 mb-16 border-b border-[#262626] pb-16">
          <h1 className="text-6xl text-white font-normal mb-6">
            Effortless client management
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            The all-in-one platform that helps freelancers and agencies deliver premium
            client service while maintaining profitability and control.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              className="flex-1 h-12 px-4 bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg
               placeholder-[#404040] text-white
               focus:outline-none focus:border-[#E2FF66]
               hover:border-[#E2FF66] hover:border-opacity-50
               disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!email || status === 'loading' || status === 'success'}
              className={`px-6 rounded-lg font-medium h-12 whitespace-nowrap
               ${
                 !email || status === 'loading' || status === 'success'
                   ? 'bg-[#1A1A1A] text-[#404040] cursor-not-allowed'
                   : 'bg-[#E2FF66] text-black hover:bg-[#E2FF66]/90'
               }`}
            >
              {status === 'loading'
                ? 'Adding...'
                : status === 'success'
                ? 'Added!'
                : 'Get early access'}
            </button>
          </form>

          {/* Status Messages */}
          {status === 'error' && (
            <p className="mt-2 text-red-500 text-sm">{errorMessage}</p>
          )}
          {status === 'success' && (
            <p className="mt-2 text-[#E2FF66] text-sm">
              Thanks for joining the waitlist! We&apos;ll be in touch soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
