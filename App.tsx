import React, { useState, useEffect } from 'react';
import { SheetResponse, TabView } from './types';
import { fetchData } from './services/sheetService';
import { API_URL } from './constants';
import Header from './components/Header';
import InjuryCard from './components/InjuryCard';
import TransferCard from './components/TransferCard';

const App: React.FC = () => {
  const [data, setData] = useState<SheetResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabView>(TabView.TRANSFERS);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchData();
        setData(result);
      } catch (err) {
        setError("Kunde inte ansluta till servern.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="h-8 w-8 border-2 border-gray-700 border-t-elfsborg-yellow rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold mt-4 uppercase tracking-widest text-xs">Hämtar data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-950/20 border border-red-900/50 p-6 text-center mx-auto max-w-lg mt-12">
          <h2 className="text-red-500 font-display font-bold text-xl mb-2 uppercase">Systemfel</h2>
          <span className="block text-sm text-red-400 opacity-80">{error}</span>
        </div>
      );
    }

    if (!data) return null;

    if (activeTab === TabView.INJURIES) {
      if (data.injuries.length === 0) {
        return (
           <div className="text-center py-24 bg-elfsborg-surface border border-elfsborg-border">
             <p className="text-gray-400 font-display text-xl uppercase">Skadelistan är tom</p>
             <p className="text-sm text-gray-600 mt-2">Inga rapporterade skador i truppen.</p>
           </div>
        );
      }
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-20">
          {data.injuries.map((item, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <InjuryCard data={item} />
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === TabView.TRANSFERS) {
      if (data.transfers.length === 0) {
        return (
          <div className="text-center py-24 bg-elfsborg-surface border border-elfsborg-border">
             <p className="text-gray-400 font-display text-xl uppercase">Inga övergångar</p>
             <p className="text-sm text-gray-600 mt-2">Det är tyst på marknaden just nu.</p>
          </div>
        );
      }
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-20">
          {data.transfers.map((item, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <TransferCard data={item} />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-elfsborg-black text-gray-100 font-sans selection:bg-elfsborg-yellow selection:text-black flex flex-col">
      
      <Header />

      <main className="max-w-6xl mx-auto px-4 flex-grow w-full">
        
        {/* Professional Tab Switcher */}
        <div className="flex border-b border-elfsborg-border mb-6 mt-6 md:mb-8 md:mt-8">
          <button
            onClick={() => setActiveTab(TabView.TRANSFERS)}
            className={`flex-1 md:flex-none pb-3 px-2 md:px-6 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-2 text-center ${
              activeTab === TabView.TRANSFERS
                ? 'border-elfsborg-yellow text-white'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            Silly Season
          </button>
          <button
            onClick={() => setActiveTab(TabView.INJURIES)}
            className={`flex-1 md:flex-none pb-3 px-2 md:px-6 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-2 text-center ${
              activeTab === TabView.INJURIES
                ? 'border-elfsborg-yellow text-white'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            Skadelista
          </button>
        </div>

        {!API_URL && !loading && (
           <div className="mb-6 bg-gray-900 border-l-2 border-elfsborg-yellow p-3">
             <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">
               Visar demo-data (API_URL ej konfigurerad)
             </p>
           </div>
        )}
        
        {renderContent()}
      </main>

      <footer className="border-t border-elfsborg-border mt-auto py-8 text-center px-4">
        <p className="text-gray-500 text-sm font-medium">
          Elfsborg Daily är en inofficiell supportersida och är inte associerad med IF Elfsborg.
        </p>
        <p className="text-gray-600 text-xs mt-2 uppercase tracking-wide">
          Data uppdateras löpande. Reservation för eventuella fel.
        </p>
      </footer>
    </div>
  );
};

export default App;