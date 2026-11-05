import React, { useState } from 'react';
import { Terminal as TerminalIcon, Smartphone, Key, Check, Copy, RefreshCw, Play, ShieldAlert } from 'lucide-react';
import { BotConfig } from '../types/bot';

interface TermuxTerminalProps {
  config: BotConfig;
  onUpdateConfig: (newConfig: Partial<BotConfig>) => void;
}

export const TermuxTerminal: React.FC<TermuxTerminalProps> = ({
  config,
  onUpdateConfig,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(config.ownerNumber || '5511999999999');
  const [step, setStep] = useState<'idle' | 'generating' | 'code_ready' | 'connected'>('code_ready');
  const [pairingCode, setPairingCode] = useState('ALAS-7894');
  const [copied, setCopied] = useState(false);

  const generateNewCode = () => {
    setStep('generating');
    setTimeout(() => {
      // 8-character pairing code format in Baileys: XXXX-XXXX
      const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
      let codePart1 = '';
      let codePart2 = '';
      for (let i = 0; i < 4; i++) {
        codePart1 += chars.charAt(Math.floor(Math.random() * chars.length));
        codePart2 += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setPairingCode(`${codePart1}-${codePart2}`);
      setStep('code_ready');
    }, 1200);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pairingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateConnection = () => {
    setStep('connected');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Intro Header */}
      <div className="bg-[#111724] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-tight">
                Conexão Termux via Código de Pareamento
              </span>
              <span className="text-xs px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800/40 rounded font-mono">
                Sem QR Code
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Conecte o {config.botName} no WhatsApp utilizando apenas o código de 8 dígitos gerado pelo Baileys no Termux do Android.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={generateNewCode}
              disabled={step === 'generating'}
              className="flex items-center gap-2 px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${step === 'generating' ? 'animate-spin' : ''}`} />
              <span>Gerar Novo Código</span>
            </button>
          </div>
        </div>
      </div>

      {/* Terminal View + Phone Step Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Terminal Window (Left) */}
        <div className="lg:col-span-7 bg-[#0b0f17] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
          {/* Terminal Titlebar */}
          <div className="bg-[#141b27] px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-slate-400 font-semibold ml-2 text-[11px]">
                Termux — node index.js
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-sans">
              Android Linux Environment
            </span>
          </div>

          {/* Terminal Content */}
          <div className="p-4 space-y-2.5 text-slate-300 min-h-[380px] leading-relaxed">
            <p className="text-slate-500">
              u0_a284@localhost:~/alastor-bot$ node index.js
            </p>
            <div className="text-red-500 font-bold whitespace-pre">
{`   █████╗ ██╗      █████╗ ███████╗████████╗ ██████╗ ██████╗ 
  ██╔══██╗██║     ██╔══██╗██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗
  ███████║██║     ███████║███████╗   ██║   ██║   ██║██████╔╝
  ██╔══██║██║     ██╔══██║╚════██║   ██║   ██║   ██║██╔══██╗
  ██║  ██║███████╗██║  ██║███████║   ██║   ╚██████╔╝██║  ██║
  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝`}
            </div>

            <div className="border border-red-900/40 bg-red-950/20 rounded-lg p-2.5 text-red-300 space-y-0.5">
              <p>┌─ 📻 BOT: <span className="text-white font-bold">{config.botName.toUpperCase()}</span></p>
              <p>├─ 👑 CRIADOR: <span className="text-white">{config.creator}</span></p>
              <p>├─ ⚡ PREFIXO: <span className="text-white">[{config.prefix}]</span></p>
              <p>└─ 📡 FREQUÊNCIA: <span className="text-white">{config.radioFrequency}</span></p>
            </div>

            <p className="text-yellow-400">
              [?] Solicitando conexão via WhatsApp Pairing Code...
            </p>
            <p className="text-cyan-400">
              [+] Número informado: +{phoneNumber}
            </p>

            {step === 'generating' && (
              <p className="text-slate-400 animate-pulse">
                [•] Negociando handshake criptográfico com os servidores do WhatsApp...
              </p>
            )}

            {(step === 'code_ready' || step === 'connected') && (
              <div className="bg-slate-900 border border-emerald-500/40 rounded-xl p-3.5 my-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">
                    [✓] CÓDIGO DE PAREAMENTO GERADO:
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[11px] transition cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <div className="text-center py-2 bg-black/60 rounded-lg border border-red-900/60">
                  <span className="text-2xl font-bold tracking-widest text-white font-mono bg-gradient-to-r from-red-400 to-amber-300 bg-clip-text text-transparent">
                    {pairingCode}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  👉 Insira este código no seu WhatsApp dentro de 120 segundos.
                </p>
              </div>
            )}

            {step === 'connected' ? (
              <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded text-emerald-300 space-y-1">
                <p className="font-bold">[✓] WhatsApp Conectado com Sucesso!</p>
                <p>[✓] Sessão Multi-Device salva em ./session</p>
                <p>[✓] Alastor Bot respondendo a comandos no prefixo [{config.prefix}].</p>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  onClick={handleSimulateConnection}
                  className="px-3 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs transition cursor-pointer"
                >
                  Simular WhatsApp Conectando...
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Step-by-Step Instructions (Right) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0e1420] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-red-400" />
              <span>Como Conectar no seu Celular</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </div>
                <div>
                  <span className="font-semibold text-white block mb-0.5">
                    Abra o WhatsApp
                  </span>
                  <p className="text-slate-400">
                    Toque nos três pontinhos verticais (<strong>⋮</strong>) no canto superior direito e selecione <strong>Aparelhos Conectados</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </div>
                <div>
                  <span className="font-semibold text-white block mb-0.5">
                    Conectar um Aparelho
                  </span>
                  <p className="text-slate-400">
                    Toque em <strong>Conectar um aparelho</strong> e na parte inferior toque em <strong>"Conectar com código de número de telefone"</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </div>
                <div>
                  <span className="font-semibold text-white block mb-0.5">
                    Digite o Código de 8 Dígitos
                  </span>
                  <p className="text-slate-400">
                    Digite o código <strong className="text-red-400 font-mono">{pairingCode}</strong> exibido no Termux. O login ocorrerá imediatamente!
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Número do WhatsApp para Pareamento:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    onUpdateConfig({ ownerNumber: e.target.value });
                  }}
                  placeholder="5511999999999"
                  className="flex-1 bg-[#161f2e] border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                />
                <button
                  onClick={generateNewCode}
                  className="px-3 py-1.5 bg-red-600/30 hover:bg-red-600/50 text-red-200 border border-red-500/40 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Atualizar
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Inclua o código do país (55 para Brasil) + DDD + número.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting card for npm error ERESOLVE / esbuild */}
      <div className="bg-red-950/30 border border-red-600/50 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-red-400 shrink-0" />
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              ⚠️ Deu erro "npm error ERESOLVE / esbuild / vite"? Veja o motivo e como resolver:
            </h3>
            <p className="text-xs text-red-200 mt-0.5">
              Identificamos exatamente o erro do seu print no Termux!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="bg-[#10141f] border border-red-900/40 rounded-xl p-3.5 space-y-2">
            <span className="font-bold text-red-300 block text-xs">
              1. Por que deu esse erro?
            </span>
            <p className="text-[11px] leading-relaxed text-slate-300">
              • Você tentou dar <code className="text-red-300 font-mono">npm install</code> dentro de <code className="text-yellow-300 font-mono">/sdcard/Bot-alastor</code>.<br />
              • Essa pasta continha o <strong>site/simulador web em Vite</strong> (por isso reclamou do Vite e esbuild), e a memória interna <code className="text-yellow-300 font-mono">/sdcard/</code> do Android não permite links simbólicos do Linux!<br />
              • O <strong>bot real do WhatsApp</strong> NÃO usa Vite e nem esbuild! Ele usa apenas o Baileys e roda na pasta <code className="text-emerald-300 font-mono">~/alastorbot</code>.
            </p>
          </div>

          <div className="bg-[#10141f] border border-emerald-900/40 rounded-xl p-3.5 space-y-2">
            <span className="font-bold text-emerald-300 block text-xs">
              2. Como resolver agora no Termux (Copie e Cole):
            </span>
            <div className="bg-black/70 p-2.5 rounded font-mono text-[11px] text-emerald-200 select-all space-y-1">
              <p className="text-slate-500"># 1. Vá para a raiz do Termux:</p>
              <p className="text-emerald-300">cd ~</p>
              <p className="text-slate-500"># 2. Copie e extraia o bot do zip:</p>
              <p className="text-emerald-300">cp /sdcard/Download/alastorbot.zip ~/ && unzip -o alastorbot.zip</p>
              <p className="text-slate-500"># 3. Entre na pasta alastorbot e instale:</p>
              <p className="text-emerald-300">cd ~/alastorbot && npm install && npm start</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText('cd ~ && termux-setup-storage && cp /sdcard/Download/alastorbot.zip ~/ && unzip -o alastorbot.zip && cd ~/alastorbot && npm install && npm start');
                alert('Comando copiado! Cole no seu Termux.');
              }}
              className="w-full py-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 rounded text-[11px] font-semibold transition cursor-pointer"
            >
              Copiar Solução Rápida do Termux
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
