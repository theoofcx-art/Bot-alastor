import React from 'react';
import { Download, Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: 'chat' | 'commands' | 'owner' | 'termux' | 'code';
  setActiveTab: (tab: 'chat' | 'commands' | 'owner' | 'termux' | 'code') => void;
  onDownloadZip: () => void;
  isDownloading?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onDownloadZip,
  isDownloading,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-[#0e111a] border-b border-slate-800/80 sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-950 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-red-950/40 border border-red-500/30">
          📻
        </div>
        <button
          onClick={() => setActiveTab('chat')}
          className="text-base font-bold tracking-tight text-white hover:text-red-400 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          Alastor Bot Studio
        </button>
      </div>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => setActiveTab('chat')}
          className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            activeTab === 'chat'
              ? 'text-red-400 border-b-2 border-red-500 font-semibold'
              : 'hover:text-white'
          }`}
        >
          Simulador WhatsApp
        </button>
        <button
          onClick={() => setActiveTab('commands')}
          className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            activeTab === 'commands'
              ? 'text-red-400 border-b-2 border-red-500 font-semibold'
              : 'hover:text-white'
          }`}
        >
          Comandos
        </button>
        <button
          onClick={() => setActiveTab('owner')}
          className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            activeTab === 'owner'
              ? 'text-red-400 border-b-2 border-red-500 font-semibold'
              : 'hover:text-white'
          }`}
        >
          Painel do Dono
        </button>
        <button
          onClick={() => setActiveTab('termux')}
          className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            activeTab === 'termux'
              ? 'text-red-400 border-b-2 border-red-500 font-semibold'
              : 'hover:text-white'
          }`}
        >
          Conexão Termux
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 cursor-pointer ${
            activeTab === 'code'
              ? 'text-red-400 border-b-2 border-red-500 font-semibold'
              : 'hover:text-white'
          }`}
        >
          Arquivos do Bot
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onDownloadZip}
          disabled={isDownloading}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isDownloading ? 'Gerando ZIP...' : 'Baixar Bot .ZIP'}</span>
        </button>
      </div>
    </header>
  );
};
