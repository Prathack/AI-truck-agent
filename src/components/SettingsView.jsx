import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Key, User, Shield, Bell, LogOut, CheckCircle2 } from 'lucide-react';

const SettingsView = ({ userEmail, onLogout }) => {
  const [theme, setTheme] = useState('dark');
  const [apiKey, setApiKey] = useState('groq_vxl_************************');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-6 pb-12"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Platform Settings</h2>
          <p className="text-sm text-white/40">Manage your FleetSight preferences and AI engine configurations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar Nav (Mock) */}
        <div className="space-y-2">
          {[
            { id: 'profile', label: 'Account Profile', icon: User, active: true },
            { id: 'engine', label: 'AI Engine Auth', icon: Key },
            { id: 'appearance', label: 'Appearance', icon: Sun },
            { id: 'security', label: 'Security & Privacy', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
          ].map((item) => (
            <button key={item.id} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              item.active ? 'bg-electric-500/10 text-electric-400 border border-electric-500/20' : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-white/5">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Auth Section */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-electric-500/10 rounded-lg text-electric-400">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">AI Engine Authentication</h3>
            </div>
            <p className="text-sm text-white/60 mb-6">Provide your Groq Vision API key to allow the FleetSight stealth agents to process real-time UI extractions.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Groq API Key</label>
                <input 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white/80 focus:outline-none focus:border-electric-500/50 font-mono"
                />
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-white/40">Model routing: <span className="text-electric-400 font-mono">llama-4-scout-17b</span></span>
                <button onClick={handleSave} className="bg-electric-500 hover:bg-electric-400 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
                  {saved ? <><CheckCircle2 className="w-4 h-4"/> Saved</> : 'Save Key'}
                </button>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Appearance Settings</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                  theme === 'dark' ? 'border-electric-500 bg-electric-500/5' : 'border-white/5 hover:border-white/20 bg-black/20'
                }`}
              >
                <Moon className={`w-8 h-8 mb-3 ${theme === 'dark' ? 'text-electric-400' : 'text-white/40'}`} />
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-white/60'}`}>Dark Mode</span>
              </button>
              <button 
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                  theme === 'light' ? 'border-electric-500 bg-electric-500/5' : 'border-white/5 hover:border-white/20 bg-gray-900'
                }`}
              >
                <Sun className={`w-8 h-8 mb-3 ${theme === 'light' ? 'text-electric-400' : 'text-white/40'}`} />
                <span className={`font-semibold ${theme === 'light' ? 'text-white' : 'text-white/60'}`}>Light Mode (Beta)</span>
              </button>
            </div>
            {theme === 'light' && (
               <p className="text-xs text-yellow-500 mt-4 px-2">Note: Light mode is currently in beta. Some premium glassmorphism effects are optimized for Dark Mode.</p>
            )}
          </div>

          {/* Account Profile */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-electric-600 to-cyan-400 p-1">
                 <div className="w-full h-full bg-navy-900 rounded-full flex items-center justify-center overflow-hidden">
                   <User className="w-8 h-8 text-white/50" />
                 </div>
               </div>
               <div>
                 <h3 className="font-bold text-white text-lg">Agent Operator</h3>
                 <p className="text-sm text-white/40">{userEmail}</p>
               </div>
            </div>
            <button className="px-4 py-2 border border-white/10 rounded-lg text-sm font-medium text-white/80 hover:bg-white/5 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsView;
