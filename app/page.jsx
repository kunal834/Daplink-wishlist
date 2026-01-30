"use client";

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'; // Import the confetti library

export default function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to trigger the "Founder's Celebration" confetti
  const triggerCelebration = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Confetti from left and right corners
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#6366f1', '#000000', '#ffffff'] // Brand colors
      });
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#6366f1', '#000000', '#ffffff']
      });
    }, 250);
  };

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

      let data;
      try {
        data = await res.json();
      } catch (parseError) {
        throw new Error('Server returned an invalid response.');
      }

      if (res.ok) {
        setRefId(data.refCode || `REF: #WL-${Math.floor(1000 + Math.random() * 8999)}`);
        setIsSubmitted(true);
        triggerCelebration(); // <--- TRIGGER ANIMATION HERE
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Connection failed.');
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
            {!isSubmitted && (
               <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none uppercase">{`Join the First 200 Beta Users`}</h1>
            )}
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
                
                {error && (
                  <div className="brutalist-card p-4 bg-red-100 border-[#0d0d0d] border-[3px] shadow-[4px_4px_0px_#0d0d0d] animate-in slide-in-from-top-2 duration-200">
                    <p className="text-red-600 font-bold text-sm uppercase tracking-tight">
                      {`⚠️ Error: ${error}`}
                    </p>
                  </div>
                )}
              </div>
            ) : (
                /* --- SUCCESS STATE / FOUNDER BADGE POPUP --- */
              <div className="brutalist-card p-0 overflow-hidden bg-white text-left animate-in fade-in zoom-in duration-500 relative">
                {/* Badge Header */}
                <div className="bg-[#6366f1] border-b-[3px] border-black p-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">👑</span>
                        <span className="font-black uppercase tracking-wider text-sm">Alpha Member Status</span>
                    </div>
                    {/* <div className="font-mono text-xs font-bold bg-black px-2 py-1">#{Math.floor(Math.random() * 199) + 1}/200</div> */}
                </div>

                {/* Badge Body */}
                <div className="p-8 space-y-4">
                    <h3 className="text-3xl font-black uppercase tracking-tight leading-none">
                        You're Early!
                    </h3>
                    <p className="font-bold text-gray-600 leading-relaxed">
                       {` You've secured your spot in our exclusive beta. As an early adopter, you have unlocked the`} <strong>Alpha Pioneer</strong> badge for your future profile.
                    </p>
                    
                    <div className="pt-4 border-t-2 border-dashed border-gray-300 mt-4">
                         <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase text-gray-400">Your Ticket ID</span>
                            <span className="font-mono text-sm font-bold bg-yellow-300 border-2 border-black px-3 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                {refId}
                            </span>
                         </div>
                    </div>
                </div>
              </div>
            )}

            {!isSubmitted && (
                <p className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                {`No credit card required • 100% Free for Early Birds`}
                </p>
            )}
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