import React, { useState } from 'react';
import { Header } from './components/Header';
import { WhatsAppSimulator } from './components/WhatsAppSimulator';
import { OwnerPanel } from './components/OwnerPanel';
import { CommandExplorer } from './components/CommandExplorer';
import { TermuxTerminal } from './components/TermuxTerminal';
import { CodeViewer } from './components/CodeViewer';
import { BotConfig } from './types/bot';
import { exportBotZip } from './utils/zipExporter';
import { Sparkles, Terminal, Download, ShieldCheck, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'commands' | 'owner' | 'termux' | 'code'>('chat');
  const [pendingCommand, setPendingCommand] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadToast, setDownloadToast] = useState(false);

  // Central Bot Configuration State
  const [config, setConfig] = useState<BotConfig>({
    botName: 'Alastor',
    creator: '© ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪',
    ownerNumber: '5511999999999',
    prefix: '!',
    menuThumb: '/src/assets/images/alastor_bot_avatar_1793898128553.jpg',
    apiKey: 'alastor_secret_token_99',
    apiSite: 'https://api.alastor-bot.com',
    autoRead: false,
    antiLink: true,
    antiSpam: true,
    antiFake: false,
    antiTrava: true,
    welcomeMessage: true,
    welcomeText: '📻 Seja muito bem-vindo(a) ao grupo! Leia as regras e divirta-se!',
    goodbyeText: '👋 Um mortal deixou nossa frequência... Menos uma alma!',
    radioFrequency: '66.6 FM',
    rentMode: true,
    groupsRent: [
      {
        id: '1203630248@g.us',
        name: 'Grupo VIP Alastor',
        daysRemaining: 28,
        expiresAt: '03/12/2026',
        active: true,
        ownerOnly: false,
      },
    ],
  });

  const handleUpdateConfig = (newValues: Partial<BotConfig>) => {
    setConfig((prev) => ({ ...prev, ...newValues }));
  };

  const handleExecuteCommandInChat = (cmd: string) => {
    setPendingCommand(cmd);
    setActiveTab('chat');
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      await exportBotZip(config);
      setDownloadToast(true);
      setTimeout(() => setDownloadToast(false), 3500);
    } catch (err) {
      console.error('Erro ao gerar ZIP:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090c13] text-slate-100 flex flex-col font-sans selection:bg-red-900 selection:text-white">
      {/* Top Bar Contract compliant Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadZip={handleDownloadZip}
        isDownloading={isDownloading}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0f1422] border border-slate-800 rounded-2xl p-4">
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Simulador Oficial do WhatsApp</span>
                  <span className="text-xs px-2 py-0.5 bg-red-950 text-red-300 border border-red-800/40 rounded font-mono font-medium">
                    Nazuna Style
                  </span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Teste o menu interativo, comandos de ADM, brincadeiras e alterações do dono diretamente no chat.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('termux')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-700/60 transition cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5 text-red-400" />
                  <span>Ver Terminal Termux</span>
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs rounded-lg border border-red-500/30 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Obter Arquivos .JS</span>
                </button>
              </div>
            </div>

            <WhatsAppSimulator
              config={config}
              onUpdateConfig={handleUpdateConfig}
              pendingCommand={pendingCommand}
              onClearPendingCommand={() => setPendingCommand(null)}
            />
          </div>
        )}

        {activeTab === 'commands' && (
          <CommandExplorer
            config={config}
            onRunCommand={handleExecuteCommandInChat}
          />
        )}

        {activeTab === 'owner' && (
          <OwnerPanel
            config={config}
            onUpdateConfig={handleUpdateConfig}
            onTestCommand={handleExecuteCommandInChat}
          />
        )}

        {activeTab === 'termux' && (
          <TermuxTerminal
            config={config}
            onUpdateConfig={handleUpdateConfig}
          />
        )}

        {activeTab === 'code' && (
          <CodeViewer
            config={config}
            onDownloadZip={handleDownloadZip}
            isDownloading={isDownloading}
          />
        )}
      </main>

      {/* Download Success Toast */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-700/80 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="w-7 h-7 rounded-full bg-emerald-800 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-emerald-100" />
          </div>
          <div>
            <p className="text-xs font-semibold">Download Concluído!</p>
            <p className="text-[11px] text-emerald-300">
              O arquivo <strong>alastor-termux-bot.zip</strong> está pronto para descompactar no Termux.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#07090f] py-5 px-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>Alastor Bot Studio</span>
            <span>·</span>
            <span>WhatsApp Baileys Multi-Device</span>
            <span>·</span>
            <span>Conexão Termux Pairing Code</span>
          </div>
          <div className="text-slate-400">
            Criador Oficial:{' '}
            <strong className="text-red-400 font-mono">{config.creator}</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
