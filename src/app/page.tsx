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
        setErrorMessage("You're already on the waitlist!");
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
        {/* Updated to use Next.js Image */}
        <Image
          src="/images/atelier.svg"
          alt="atelier OS"
          width={120}
          height={24} // Provide explicit width and height
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

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="h-6 w-6 mb-4 text-[#E2FF66]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3 className="text-xl text-white font-medium mb-3">
              White-label client portal
            </h3>
            <p className="text-gray-400">
              Turn scattered communications into a premium branded experience. Custom
              domains, your design, your brand - all managed from one place.
            </p>
          </div>

          <div>
            <div className="h-6 w-6 mb-4 text-[#E2FF66]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <h3 className="text-xl text-white font-medium mb-3">
              Scope management that pays
            </h3>
            <p className="text-gray-400">
              Transform scope creep from a profit killer into a revenue stream. Track
              changes, assess impact, and manage client expectations effortlessly.
            </p>
          </div>

          <div>
            <div className="h-6 w-6 mb-4 text-[#E2FF66]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
            <h3 className="text-xl text-white font-medium mb-3">Project dashboard</h3>
            <p className="text-gray-400">
              Keep everything organized and visible. Track progress, manage timelines,
              and deliver updates - all with professional polish.
            </p>
          </div>

          <div>
            <div className="h-6 w-6 mb-4 text-[#E2FF66]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3l1.8 5.5h5.7l-4.6 3.3 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.6-3.3h5.7z" />
              </svg>
            </div>
            <h3 className="text-xl text-white font-medium mb-3">Smart automation</h3>
            <p className="text-gray-400">
              Save hours on routine tasks. Automated updates, scheduled check-ins, and
              intelligent assistance when you need it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
