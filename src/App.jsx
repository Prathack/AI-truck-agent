import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PriceCard from './components/PriceCard';
import ComparisonTable from './components/ComparisonTable';
import Insights from './components/Insights';
import ActivityLog from './components/ActivityLog';
import SettingsView from './components/SettingsView';
import LandingPage from './components/LandingPage';
import Toast from './components/Toast';
import { AnimatePresence } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';

const App = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
  const apiUrl = (path) => (API_BASE_URL ? `${API_BASE_URL}${path}` : path);

  const [activeTab, setActiveTab] = useState('overview');
  const [isSearching, setIsSearching] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [backendStatus, setBackendStatus] = useState('checking'); // checking, online, offline
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(apiUrl("health"));

        if (res.ok) {
          setBackendStatus("online");
        } else {
          setBackendStatus("offline");
        }
      } catch (err) {
        console.error("Backend error:", err);
        setBackendStatus("offline");
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 10000);

    return () => clearInterval(interval);
  }, [apiUrl]);

  const generateMockProviders = () => {
    const baseProviders = [
      { name: 'National Truck Rental', category: 'National', url: 'https://nationaltruckrental.com' },
      { name: 'Enterprise Fleet', category: 'National', url: 'https://enterprisetrucks.com' },
      { name: 'Michigan Haulers', category: 'Regional', url: 'https://michiganhaulers.com' },
      { name: 'Penske Logistics', category: 'National', url: 'https://pensketruckrental.com' },
      { name: 'Direct-Transit P2P', category: 'Peer-to-Peer', url: 'https://direct-transit.com' },
      { name: 'Ryder Systems', category: 'National', url: 'https://ryder.com' },
      { name: 'U-Haul Commercial', category: 'National', url: 'https://uhaul.com' },
      { name: 'Budget Truck', category: 'National', url: 'https://budgettruck.com' },
      { name: 'Fluid Truck', category: 'Peer-to-Peer', url: 'https://fluidtruck.com' },
      { name: 'Midwest Freight', category: 'Regional', url: 'https://midwestfreight.com' },
    ];
    
    const results = [];
    for (let i = 0; i < 25; i++) {
      const base = baseProviders[i % baseProviders.length];
      const rating = Math.floor(Math.random() * 3) + 3; // 3 to 5
      const confidence = Math.floor(Math.random() * 20) + 80; // 80 to 99
      const dailyRateNum = Math.floor(i === 0 ? 60 : Math.random() * 60 + 50); // Make the first one cheapest
      const days = 5;
      const totalPriceNum = dailyRateNum * days;
      const mileageCostNum = (Math.random() * 0.15 + 0.05).toFixed(2);
      
      results.push({
        name: `${base.name}${i >= baseProviders.length ? ` (Partner ${i + 1})` : ''}`,
        category: base.category,
        url: base.url,
        totalPrice: `$${totalPriceNum.toFixed(2)}`,
        dailyRate: `$${dailyRateNum.toFixed(2)}`,
        mileageCost: `$${mileageCostNum}`,
        status: Math.random() > 0.8 ? 'Limited' : 'Available',
        rating,
        confidence
      });
    }
    
    // Sort by total price
    return results.sort((a, b) => parseFloat(a.totalPrice.slice(1)) - parseFloat(b.totalPrice.slice(1)));
  };

  const allProviders = generateMockProviders();
  const providers = backendStatus === 'online' ? allProviders : [];
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const generateDynamicLogs = () => {
    if (backendStatus !== 'online') {
      return [{ id: 1, timestamp: new Date().toLocaleTimeString('en-US', {hour12: false}), level: 'error', message: 'Connection to backend failed. Engine cluster unreachable.' }];
    }

    const l = [];
    let time = new Date();
    time.setMinutes(time.getMinutes() - 3);
    let id = 1;

    l.push({ id: id++, timestamp: time.toLocaleTimeString('en-US', {hour12: false}), level: 'info', message: 'FleetSight orchestration engine started.' });
    time.setSeconds(time.getSeconds() + 1);
    l.push({ id: id++, timestamp: time.toLocaleTimeString('en-US', {hour12: false}), level: 'success', message: 'API handshake established (Port: 10000).' });
    
    [...allProviders].reverse().forEach(p => {
      time.setSeconds(time.getSeconds() + Math.floor(Math.random() * 3));
      l.push({ id: id++, timestamp: time.toLocaleTimeString('en-US', {hour12: false}), level: 'info', provider: p.name, message: `Dispatching stealth agent to ${p.url || p.name}` });
      time.setSeconds(time.getSeconds() + 1 + Math.floor(Math.random() * 2));
      if (p.status === 'Failed') {
        l.push({ id: id++, timestamp: time.toLocaleTimeString('en-US', {hour12: false}), level: 'warning', provider: p.name, message: `Access denied. Anti-bot logic triggered, retrying...` });
      } else {
        l.push({ id: id++, timestamp: time.toLocaleTimeString('en-US', {hour12: false}), level: 'success', provider: p.name, message: `Captured DOM and screenshot. Extracted pricing: ${p.totalPrice} via llama-4-scout-17b.` });
      }
    });

    time.setSeconds(time.getSeconds() + 1);
    l.push({ id: id++, timestamp: time.toLocaleTimeString('en-US', {hour12: false}), level: 'info', message: 'Cross-referencing historical database to calculate AI Confidence scores...' });
    time.setSeconds(time.getSeconds() + 1);
    l.push({ id: id++, timestamp: time.toLocaleTimeString('en-US', {hour12: false}), level: 'success', message: `Job complete. Optimized ${allProviders.length} competitive routes.` });

    return l.reverse();
  };

  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    setLogs(generateDynamicLogs());
  }, [backendStatus, generateDynamicLogs]);

  const addToast = (type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSearch = async () => {
  try {
    setIsSearching(true);

    const response = await fetch(
      apiUrl("/api/search"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pickup_location: "Chicago",
          dropoff_location: "Detroit",
          pickup_date: "2026-03-20"
        }),
      }
    );

    const data = await response.json();

    console.log("Job ID:", data.job_id);

    addToast("success", "Search started. Job ID: " + data.job_id);

  } catch (error) {
    console.error(error);
    addToast("error", "Backend request failed");
  }

  setIsSearching(false);
};

const handleLogout = () => {
  setUserEmail('');
  addToast("success", "Logged out");
};

  return (
    <div className="min-h-screen text-white relative">
      <ParticleBackground />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} backendStatus={backendStatus} />
      
      <main className="flex flex-col md:flex-row pb-20 md:pb-0">
        <Sidebar onSearch={handleSearch} />
        
        <div className="flex-1 p-4 md:p-8 min-h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
          {/* Progress Banner */}
          <AnimatePresence>
            {isSearching && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8 p-4 rounded-2xl bg-electric-500/10 border border-electric-500/30 backdrop-blur-md flex items-center justify-between overflow-hidden relative"
              >
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-500/10 to-transparent w-1/2"
                />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="bg-electric-500 p-2 rounded-lg">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Intelligence Scan in Progress...</h4>
                    <p className="text-xs text-white/60">Cross-referencing 25 providers against real-time market data</p>
                  </div>
                </div>
                <div className="text-right relative z-10">
                  <span className="text-xs font-mono font-bold text-electric-400">14 / 25 COMPLETED</span>
                  <div className="w-48 h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden border border-white/5">
                    <motion.div 
                      className="h-full bg-electric-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '56%' }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tab Content */}
          <div
            key={activeTab}
          >
            {activeTab === 'overview' && (
              <div className="h-full">
                {backendStatus === 'offline' ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-12 glass-panel rounded-3xl border border-red-500/20">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 animate-ping" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Backend Disconnected</h3>
                    <p className="text-white/60 max-w-md">The FleetSight intelligence engine is currently offline. Please ensure the backend server is running. to fetch real-time provider rates.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {providers.map((p, i) => (
                      <PriceCard key={i} provider={p} isBestPrice={i === 0} index={i} />
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'comparison' && (
              <ComparisonTable providers={providers} />
            )}
            
            {activeTab === 'insights' && (
              <Insights />
            )}
            
            {activeTab === 'activity' && (
              <ActivityLog logs={logs} />
            )}
            
            {activeTab === 'settings' && (
              <SettingsView userEmail={userEmail} onLogout={handleLogout} />
            )}
          </div>
        </div>
      </main>

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default App;
