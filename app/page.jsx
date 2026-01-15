"use client";

import React, { useState } from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Safely parse JSON (prevents crash if 404 or 500 returns HTML)
      let data;
      try {
        data = await res.json();
      } catch (parseError) {
        throw new Error('Server returned an invalid response. API route might be missing.');
      }

      if (res.ok) {
        setRefId(data.refCode || `REF: #WL-${Math.floor(1000 + Math.random() * 8999)}`);
        setIsSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Connection failed. Please check your internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#f8fafc] text-[#0d0d0d] selection:bg-[#6366f1] selection:text-white">
      {/* Dots Background */}
      <div className="dots-bg fixed inset-0 z-[-1] opacity-5 pointer-events-none"></div>

      {/* Top Announcement Bar */}
      <div className="marquee-container fixed top-0 w-full z-50 overflow-hidden bg-[#0d0d0d] text-white py-2.5 border-b-[3px] border-black">
        <div className="marquee-content flex whitespace-nowrap font-extrabold uppercase tracking-widest text-[0.75rem]">
          {[1, 2].map((i) => (
            <span key={i} className="flex shrink-0">
             {` RESERVING HANDLES FOR 2026 • PREMIUM THEMES FOR EARLY MEMBERS • JOIN THE OFFICIAL WISHLIST • SECURE YOUR BRAND • JOIN THE OFFICIAL WISHLIST • SECURE YOUR BRAND • JOIN THE OFFICIAL WISHLIST • SECURE YOUR BRAND • JOIN THE OFFICIAL WISHLIST • SECURE YOUR BRAND • JOIN THE OFFICIAL WISHLIST • SECURE YOUR BRAND `}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 pt-24 flex justify-between items-center">
        <div className="brutalist-card flex gap-2 px-5 py-2 text-2xl font-black tracking-tight bg-white">
         <img 
              src="/innovate.png" 
              alt="Logo" 
              className="h-9 w-auto object-contain" 
            />  DapLink
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">{`Build. Share. Connect.`}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
        <div className="max-w-4xl space-y-12">
          {/* Hero Title */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none uppercase">
             {` Your Links.`} <br />
              <span className="highlight-accent italic text-white px-2 py-0.5 bg-[#6366f1] border-2 border-black inline-block">YOUR REVENUE.</span>
            </h1> 
            <p className="text-lg md:text-xl font-bold max-w-2xl mx-auto text-gray-700 leading-relaxed">
            {` The first bio tool built for monetization. Showcase your portfolio and let brands bid for space on your profile`}
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none uppercase">{`Join the First 200 Beta Users`}</h1>
          </div>

          {/* Action Area */}
          <div className="max-w-xl mx-auto w-full relative">
            {!isSubmitted ? (
              <div className="space-y-4">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@email.com"
                    className="brutalist-input flex-1 p-5 text-lg font-bold outline-none border-[3px] border-black bg-white focus:shadow-[4px_4px_0px_rgba(0,0,0,0.1)] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="brutalist-button px-10 py-5 text-lg bg-black text-white font-black uppercase tracking-tight border-[3px] border-black shadow-[4px_4px_0px_#6366f1] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#6366f1] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-50"
                  >
                    {loading ? 'Joining...' : 'Join the Beta'}
                  </button>
                </form>
                
                {/* Error Message UI */}
                {error && (
                  <div className="brutalist-card p-4 bg-red-100 border-[#0d0d0d] border-[3px] shadow-[4px_4px_0px_#0d0d0d] animate-in slide-in-from-top-2 duration-200">
                    <p className="text-red-600 font-bold text-sm uppercase tracking-tight">
                      {`⚠️ Error: ${error}`}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="brutalist-card p-10 space-y-5 bg-white text-left animate-in fade-in zoom-in duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-black uppercase tracking-tight">{`You're locked in!`}</h3>
                  <div className="text-4xl">✨</div>
                </div>
                <p className="font-bold text-gray-700 leading-relaxed">
                  {`We've saved your spot. You are now officially on the daplink.online wishlist. We'll send you an invite as soon as we open the doors.`}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <div className="font-mono text-sm border-2 border-black bg-gray-50 p-2 font-bold px-4">{refId}</div>
                  <span className="text-[10px] font-black uppercase text-[#6366f1] bg-[#6366f1]/10 px-2 py-1">Priority Selection Active</span>
                </div>
              </div>
            )}

            <p className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {`No credit card required • 100% Free for Early Birds`}
            </p>
          </div>
        </div>

        {/* Wishlist Benefits */}
        <div className="mt-28 max-w-6xl w-full">
          <h2 className="text-2xl font-black uppercase mb-8 text-left tracking-tight">{`Why join the wishlist?`}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '👑', title: 'Priority Handles', text: 'Early members get the first pick of usernames. Secure your brand name before it\'s taken by someone else.', bg: 'bg-white' },
              { icon: '🚀', title: 'Beta Access', text: 'Get a random chance to enter our private beta testing group. Help us shape the future of DapLink.', bg: 'bg-[#6366f1]/5' },
              { icon: '🎨', title: 'Premium Themes', text: 'Wishlist members get lifetime access to our exclusive \'Founders Collection\' of premium themes and layouts.', bg: 'bg-white' }
            ].map((benefit, i) => (
              <div key={i} className={`brutalist-card p-8 text-left ${benefit.bg}`}>
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h4 className="text-xl font-extrabold uppercase mb-2">{benefit.title}</h4>
                <p className="text-sm font-bold text-gray-500 leading-relaxed">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t-4 border-black py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="font-black text-2xl tracking-tighter uppercase italic flex items-center justify-center md:justify-start gap-2"> 
            {/* FIXED IMAGE SIZING HERE */}
            <img 
              src="/innovate.png" 
              alt="Logo" 
              className="h-16 w-auto object-contain" 
            />
           
          </div>
          <div className="text-[9px] font-black text-gray-300 tracking-[0.3em] uppercase">
            {`Est. 2026 • Made for Creators & Professionals`}
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content {
          animation: marquee 40s linear infinite;
        }
        .dots-bg {
          background-image: radial-gradient(#0d0d0d 1px, transparent 0);
          background-size: 30px 30px;
        }
        .brutalist-card {
          border: 3px solid #0d0d0d;
          box-shadow: 6px 6px 0px #0d0d0d;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .brutalist-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 10px 10px 0px #0d0d0d;
        }
      `}</style>
    </div>
  );
}
