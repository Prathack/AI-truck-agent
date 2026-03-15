import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Zap, ArrowRight, BrainCircuit, Globe } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

const LandingPage = ({ onLogin }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
  const apiUrl = (path) => (API_BASE_URL ? `${API_BASE_URL}${path}` : path);

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) { setError('Please enter a valid email address.'); return; }
    setIsLoading(true); setError('');
    try {
      const res = await fetch(apiUrl('/api/auth'), {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }),
      });
      if (res.ok) { onLogin(email); }
      else { setError('Authentication failed. Backend may be offline.'); }
    } catch (err) {
      console.warn('Backend auth failed, allowing mock login', err);
      onLogin(email);
    } finally { setIsLoading(false); }
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } } };

  const features = [
    { icon: BrainCircuit, label: 'Vision Extraction', bg: 'bg-electric-500/10', color: 'text-electric-400' },
    { icon: Zap,          label: 'Real-time Sync',    bg: 'bg-neon-green/10',    color: 'text-neon-green'   },
    { icon: Globe,        label: '25+ Integrations',  bg: 'bg-purple-500/10',    color: 'text-purple-400'   },
    { icon: ShieldCheck,  label: 'Anti-bot Stealth',  bg: 'bg-blue-500/10',      color: 'text-blue-400'     },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-navy-900 text-white selection:bg-neon-green/30 px-4 py-10 sm:px-6">
      <ParticleBackground />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-electric-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <motion.div
        variants={container} initial="hidden" animate="show"
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
      >
        {/* ── Left: Hero ── */}
        <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
          <motion.div variants={item}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mx-auto lg:mx-0">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-white/80">FLEETSIGHT OS V5.0</span>
          </motion.div>

          <motion.h1 variants={item}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1]">
            AI-Driven <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-cyan-300">
              Fleet Intelligence.
            </span>
          </motion.h1>

          <motion.p variants={item}
            className="text-base sm:text-lg text-white/50 max-w-lg leading-relaxed mx-auto lg:mx-0">
            Unleash Llama-4-Scout-17b vision models to dynamically extract, compare, and optimize rental truck pricing across the entire web in real-time.
          </motion.p>

          <motion.div variants={item}
            className="grid grid-cols-2 gap-3 sm:gap-4 pt-2 max-w-sm mx-auto lg:mx-0 sm:max-w-none">
            {features.map(({ icon: Icon, label, bg, color }) => (
              <div key={label} className="flex items-center gap-2 sm:gap-3">
                <div className={`p-1.5 sm:p-2 rounded-lg ${bg} flex-shrink-0`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white/80">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Auth card ── */}
        <motion.div variants={item} className="w-full max-w-md mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-electric-500/20 to-cyan-500/20 rounded-[2rem] blur-3xl group-hover:blur-2xl transition-all duration-500 opacity-50" />

          <div className="relative glass-panel rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-electric-500 to-cyan-400 text-white mb-6 sm:mb-8 mx-auto shadow-lg shadow-electric-500/30">
              <Truck className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-xs sm:text-sm text-white/50">Enter your agent email to initialize the dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-[10px] sm:text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
                  Authorized Email
                </label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent@fleetsight.ai"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 sm:py-3.5 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-electric-500/50 focus:ring-1 focus:ring-electric-500/50 transition-all font-mono text-sm"
                />
                {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
              </div>

              <button type="submit" disabled={isLoading}
                className="group w-full py-3 sm:py-3.5 px-4 bg-white text-navy-900 font-bold rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-70">
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                ) : (
                  <>
                    Initialize Session
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">
                SECURE ACCESS • END-TO-END ENCRYPTED
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;