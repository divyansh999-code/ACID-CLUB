import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Check, Copy, Sparkles, Mail } from 'lucide-react';

export const JoinClubSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sizePreference, setSizePreference] = useState('L');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [memberCode, setMemberCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);

    // Simulate authentication / sign-up flow
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const code = `ACID-${Math.floor(1000 + Math.random() * 9000)}`;
      setMemberCode(code);

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B4E33D', '#000000', '#F4F4F2'],
        });
      } catch (err) {
        // Fallback
      }
    }, 700);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('VOLT20');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="join" className="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-black text-white p-8 sm:p-12 md:p-16 border-2 border-black relative overflow-hidden">
        {/* Acid Lime corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#B4E33D] -mr-16 -mt-16 rotate-45 pointer-events-none opacity-90" />

        <div className="max-w-2xl relative z-10">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#B4E33D] mb-3">
            MEMBERSHIP ACCESS // DROP ALERT
          </div>
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-none mb-4">
            JOIN THE CLUB.
          </h2>
          <p className="text-sm font-sans-clean text-neutral-400 mb-8 max-w-lg leading-relaxed">
            Gain priority transmission keys for Drop 02, secret archive restocks, and a 20% discount credential for your first acquisition.
          </p>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR PRIMARY EMAIL"
                    className="w-full pl-11 pr-4 py-3.5 bg-neutral-900 border border-neutral-700 text-white font-mono text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#B4E33D] uppercase tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-[#B4E33D] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {isSubmitting ? (
                    <span>ENCRYPTING...</span>
                  ) : (
                    <>
                      <span>GET DROP ACCESS</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Size preference hint */}
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 pt-2">
                <span>PREFERRED SIZE:</span>
                {['S', 'M', 'L', 'XL'].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSizePreference(s)}
                    className={`px-2 py-0.5 text-[11px] border cursor-pointer ${
                      sizePreference === s
                        ? 'border-[#B4E33D] text-[#B4E33D] bg-neutral-800'
                        : 'border-neutral-700 text-neutral-400 hover:border-neutral-500'
                    }`}
                  >
                    {s}
                  </button>
                ))}
                <span className="text-[10px] text-neutral-500 ml-auto hidden sm:inline">
                  NO SPAM // INSTANT UNSUBSCRIBE
                </span>
              </div>
            </form>
          ) : (
            <div className="bg-neutral-900 border border-[#B4E33D]/60 p-6 space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-[#B4E33D] font-mono text-xs font-bold uppercase tracking-wider">
                <Check className="w-5 h-5 stroke-[3]" />
                <span>ACCESS GRANTED // TRANSMISSION CONFIRMED</span>
              </div>

              <div className="font-display font-bold text-2xl uppercase tracking-tight text-white">
                WELCOME TO ACID CLUB CELL // {memberCode}
              </div>

              <p className="text-xs font-sans-clean text-neutral-300">
                A verification transmission has been dispatched to <span className="text-[#B4E33D] font-mono">{email}</span>. Use the authentication code below at checkout for 20% off all drop articles:
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="bg-black px-4 py-2 font-mono font-bold text-sm tracking-widest text-[#B4E33D] border border-neutral-700 select-all">
                  VOLT20
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono font-semibold uppercase text-white transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-[#B4E33D]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'COPIED!' : 'COPY CODE'}</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="text-[11px] font-mono text-neutral-500 hover:text-white underline cursor-pointer"
                >
                  Register another email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
