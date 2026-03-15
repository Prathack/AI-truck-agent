import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Key, User, Shield, Bell, LogOut, CheckCircle2, ChevronRight } from 'lucide-react';

const SettingsView = ({ userEmail, onLogout }) => {
  const [theme, setTheme]   = useState('dark');
  const [apiKey, setApiKey] = useState('groq_vxl_************************');
  const [saved, setSaved]   = useState(false);
  const [activeSection, setActiveSection] = useState('engine');

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const navItems = [
    { id: 'profile',       label: 'Account Profile',    icon: User    },
    { id: 'engine',        label: 'AI Engine Auth',      icon: Key     },
    { id: 'appearance',    label: 'Appearance',          icon: Sun     },
    { id: 'security',      label: 'Security & Privacy',  icon: Shield  },
    { id: 'notifications', label: 'Notifications',       icon: Bell    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto pb-12">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Platform Settings</h2>
        <p className="text-xs sm:text-sm text-white/40">Manage your FleetSight preferences and AI engine configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* ── Sidebar nav ── */}
        <div className="lg:space-y-2">
          {/* Mobile: horizontal scrolling pill nav */}
          <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 -mx-0 px-0 scrollbar-none">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveSection(id)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                  activeSection === id
                    ? 'bg-electric-500/10 text-electric-400 border border-electric-500/20'
                    : 'text-white/60 bg-white/5 border border-white/5 hover:text-white'}`}>
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Desktop: vertical nav */}
          <div className="hidden lg:flex flex-col space-y-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveSection(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === id
                    ? 'bg-electric-500/10 text-electric-400 border border-electric-500/20'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
                <Icon className="w-4 h-4" />
                {label}
                {activeSection === id && <ChevronRight className="w-3 h-3 ml-auto" />}
              </button>
            ))}
            <div className="pt-4 mt-2 border-t border-white/5">
              <button onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* ── Content area ── */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">

          {/* AI Engine Auth */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-electric-500/10 rounded-lg text-electric-400 flex-shrink-0">
                <Key className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">AI Engine Authentication</h3>
            </div>
            <p className="text-xs sm:text-sm text-white/60 mb-4 sm:mb-6">
              Provide your Groq Vision API key to allow FleetSight stealth agents to process real-time UI extractions.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Groq API Key</label>
                <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 sm:py-3 px-4 text-sm text-white/80 focus:outline-none focus:border-electric-500/50 font-mono" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <span className="text-xs text-white/40">
                  Model: <span className="text-electric-400 font-mono">llama-4-scout-17b</span>
                </span>
                <button onClick={handleSave}
                  className="bg-electric-500 hover:bg-electric-400 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 justify-center">
                  {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved</> : 'Save Key'}
                </button>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 flex-shrink-0">
                <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">Appearance</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { id: 'dark',  label: 'Dark Mode',       icon: Moon, beta: false },
                { id: 'light', label: 'Light Mode (Beta)',icon: Sun,  beta: true  },
              ].map(({ id, label, icon: Icon, beta }) => (
                <button key={id} onClick={() => setTheme(id)}
                  className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border-2 transition-all ${
                    theme === id ? 'border-electric-500 bg-electric-500/5' : 'border-white/5 hover:border-white/20 bg-black/20'}`}>
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 ${theme === id ? 'text-electric-400' : 'text-white/40'}`} />
                  <span className={`text-xs sm:font-semibold text-center leading-tight ${theme === id ? 'text-white' : 'text-white/60'}`}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
            {theme === 'light' && (
              <p className="text-xs text-yellow-500 mt-4 px-1">
                Note: Light mode is in beta. Glassmorphism effects are optimised for Dark Mode.
              </p>
            )}
          </div>

          {/* Account profile */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/5 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-electric-600 to-cyan-400 p-0.5 flex-shrink-0">
                <div className="w-full h-full bg-navy-900 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 sm:w-8 sm:h-8 text-white/50" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg">Agent Operator</h3>
                <p className="text-xs sm:text-sm text-white/40 truncate max-w-[180px] sm:max-w-none">{userEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="flex-1 sm:flex-none px-4 py-2 border border-white/10 rounded-lg text-sm font-medium text-white/80 hover:bg-white/5 transition-colors text-center">
                Edit Profile
              </button>
              {/* Logout — mobile only, visible inline */}
              <button onClick={onLogout}
                className="sm:hidden flex items-center gap-2 px-4 py-2 border border-red-500/20 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsView;