import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, FolderArchive, Terminal, Sparkles, FileText } from 'lucide-react';
import { BotConfig } from '../types/bot';
import {
  generateIndexJs,
  generateAlastorJs,
  generateSettingsJson,
  generatePackageJson,
  generateIniciarSh,
  generateTermuxScript,
  generateTutorialMd,
} from '../data/botTemplates';

interface CodeViewerProps {
  config: BotConfig;
  onDownloadZip: () => void;
  isDownloading?: boolean;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  config,
  onDownloadZip,
  isDownloading,
}) => {
  const [selectedFile, setSelectedFile] = useState<
    'index.js' | 'alastor.js' | 'settings.json' | 'package.json' | 'start.sh' | '.npmrc' | 'TUTORIAL.md' | 'database/aluguel.json'
  >('index.js');
  const [copied, setCopied] = useState(false);

  // Sample database structure
  const sampleAluguelJson = JSON.stringify(
    {
      '1203630248@g.us': {
        name: 'Grupo VIP Alastor',
        expiresAt: Date.now() + 28 * 86400000,
        addedBy: config.ownerNumber,
        createdAt: Date.now(),
      },
    },
    null,
    2
  );

  // Generate file content based on active configuration
  const fileContents: Record<string, string> = {
    'index.js': generateIndexJs(config),
    'alastor.js': generateAlastorJs(config),
    'settings.json': generateSettingsJson(config),
    'package.json': generatePackageJson(config),
    'start.sh': generateIniciarSh(config),
    '.npmrc': 'legacy-peer-deps=true\nbin-links=false\n',
    'TUTORIAL.md': generateTutorialMd(config),
    'database/aluguel.json': sampleAluguelJson,
  };

  const currentContent = fileContents[selectedFile] || '';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingleFile = () => {
    const blob = new Blob([currentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.replace('database/', '');
    link.click();
    URL.revokeObjectURL(url);
  };

  const filesList = [
    { name: 'index.js', icon: '⚡', desc: 'Conexão Baileys + Pairing Code' },
    { name: 'alastor.js', icon: '📻', desc: 'Comandos, Aluguel e Menus Florais' },
    { name: 'settings.json', icon: '⚙️', desc: 'Configurações e Dono Oficial' },
    { name: 'start.sh', icon: '🚀', desc: 'Inicializador Anti-Queda Nazuna' },
    { name: '.npmrc', icon: '🛡️', desc: 'Blindagem Anti-Erro Termux' },
    { name: 'package.json', icon: '📦', desc: 'Dependências Oficiais Baileys' },
    { name: 'database/aluguel.json', icon: '💼', desc: 'Banco de Dados de Aluguel' },
    { name: 'TUTORIAL.md', icon: '📖', desc: 'Manual de Instalação' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-[#111724] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-tight">
                Arquivos Prontos para Termux
              </span>
              <span className="text-xs px-2 py-0.5 bg-red-950 text-red-300 border border-red-800/40 rounded font-mono">
                100% Funcional
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Código fonte completo estruturado no padrão Nazuna Bot com Baileys Multi-Device e pareamento por código.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : `Copiar ${selectedFile}`}</span>
            </button>

            <button
              onClick={onDownloadZip}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-xl shadow transition cursor-pointer disabled:opacity-50"
            >
              <FolderArchive className="w-4 h-4" />
              <span>{isDownloading ? 'Empacotando...' : 'Baixar Tudo (.ZIP)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Files List */}
        <div className="lg:col-span-4 bg-[#0e1420] border border-slate-800 rounded-2xl p-3 shadow-lg space-y-1.5">
          <span className="text-xs font-semibold text-slate-400 px-3 py-2 block uppercase tracking-wider">
            Arquivos do Projeto
          </span>

          {filesList.map((file) => {
            const isSelected = selectedFile === file.name;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file.name as any)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-red-600/15 border border-red-500/40 text-white'
                    : 'hover:bg-slate-800/50 text-slate-300 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{file.icon}</span>
                  <div>
                    <span className="font-mono text-xs font-bold block">
                      {file.name}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      {file.desc}
                    </span>
                  </div>
                </div>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
              </button>
            );
          })}

          <div className="pt-3 mt-3 border-t border-slate-800/60 p-2">
            <button
              onClick={handleDownloadSingleFile}
              className="w-full py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar apenas {selectedFile}</span>
            </button>
          </div>
        </div>

        {/* Main Code Editor / Preview */}
        <div className="lg:col-span-8 bg-[#0b0f17] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* File Tab Header */}
          <div className="bg-[#141b27] px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
              <FileCode className="w-4 h-4 text-red-400" />
              <span className="font-semibold text-white">{selectedFile}</span>
              <span className="text-slate-500 text-[11px]">
                ({currentContent.split('\n').length} linhas)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded hover:bg-slate-800 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          {/* Code Viewer with Line Numbers */}
          <div className="p-4 overflow-x-auto max-h-[580px] overflow-y-auto font-mono text-xs leading-relaxed text-slate-200">
            <pre className="select-text whitespace-pre">
              {currentContent.split('\n').map((line, idx) => (
                <div key={idx} className="flex hover:bg-slate-800/30 px-2 py-0.5 rounded">
                  <span className="w-10 text-slate-600 select-none shrink-0 text-right pr-4 font-mono">
                    {idx + 1}
                  </span>
                  <span className="flex-1 font-mono">{line || ' '}</span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>

      {/* Guide: Where and How to Save in Termux & GitHub */}
      <div className="bg-[#0e1420] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-red-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              📁 Onde Salvar e Como Organizar no GitHub (Sem Arquivos Soltos)
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800/40 rounded-full font-mono">
            pasta: ~/alastorbot
          </span>
        </div>

        {/* Folder Hierarchy Preview */}
        <div className="bg-[#111724] border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold text-slate-300 block mb-2">
            📂 Estrutura Fixa da Pasta (Já dentro do ZIP e do Bot):
          </span>
          <pre className="font-mono text-xs text-slate-300 leading-relaxed bg-black/60 p-3 rounded-lg border border-slate-800/80">
{`alastorbot/
├── ⚡ index.js          (Conexão Baileys + Código de Pareamento)
├── 📻 alastor.js        (Todos os 70+ comandos, menus florais, aluguel)
├── ⚙️ settings.json     (Configurações: Dono, prefixo, nome e criador)
├── 📦 package.json      (Dependências @whiskeysockets/baileys, axios, etc.)
├── 📱 termux.sh         (Instalador e atualizador 1-clique)
├── 📖 TUTORIAL.md       (Manual oficial passo a passo)
├── 📄 README.md         (Documentação)
├── 🔒 .gitignore        (Ignora senhas, credenciais e node_modules)
└── 📁 database/
    ├── 💼 aluguel.json  (Controle de dias e validade dos grupos)
    ├── 💰 carteira.json (Economia e cassino)
    └── ⚠️ warns.json    (Advertências de moderação)`}
          </pre>
        </div>

        {/* Explicação do Print do GitHub */}
        <div className="bg-amber-950/30 border border-amber-600/40 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
            <span>⚠️</span>
            <span>Por que os arquivos do print no seu GitHub ficaram soltos?</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            No print do seu repositório <strong className="text-white">theoofcx-art/Bot-alastor</strong>, foram enviados os arquivos do simulador web (como <code className="text-amber-300">vite.config.ts</code>, <code className="text-amber-300">index.html</code> e pasta <code className="text-amber-300">src/</code>).
            Para que no seu GitHub fique <strong>somente a pasta organizada do bot (alastorbot)</strong> ou os arquivos limpos do bot:
          </p>
          <div className="bg-black/60 border border-amber-500/20 p-2.5 rounded font-mono text-[11px] text-amber-200">
            git clone https://github.com/theoofcx-art/Bot-alastor<br />
            # Basta descompactar o alastorbot.zip e dar git push!
          </div>
        </div>

        {/* GitHub Clone / Update Banner */}
        <div className="bg-[#141b27] border border-red-500/40 rounded-xl p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">⭐</span>
              Comando Oficial para Instalar ou Atualizar via GitHub
            </span>
            <span className="text-[11px] font-mono text-red-400 truncate">
              https://github.com/theoofcx-art/Bot-alastor
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-black/60 border border-slate-800 rounded-lg p-2.5 space-y-1 text-xs">
              <span className="text-slate-400 font-semibold block text-[11px]">
                🚀 Instalação Nova (Clonar Repositório):
              </span>
              <p className="font-mono text-[11px] text-red-300 break-all select-all">
                git clone https://github.com/theoofcx-art/Bot-alastor alastorbot && cd alastorbot && npm install && npm start
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    'pkg update -y && pkg install nodejs git ffmpeg -y && git clone https://github.com/theoofcx-art/Bot-alastor alastorbot && cd alastorbot && npm install && npm start'
                  );
                  alert('Comando de instalação do GitHub copiado!');
                }}
                className="mt-2 w-full py-1 bg-red-600/30 hover:bg-red-600/50 text-red-200 border border-red-500/40 rounded text-[11px] cursor-pointer"
              >
                Copiar Comando de Instalação (Git Clone)
              </button>
            </div>

            <div className="bg-black/60 border border-slate-800 rounded-lg p-2.5 space-y-1 text-xs">
              <span className="text-slate-400 font-semibold block text-[11px]">
                🔄 Atualizar para Novos Comandos (Git Pull):
              </span>
              <p className="font-mono text-[11px] text-emerald-300 break-all select-all">
                cd ~/alastorbot && git pull && npm install && npm start
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('cd ~/alastorbot && git pull && npm install && npm start');
                  alert('Comando de atualização (Git Pull) copiado!');
                }}
                className="mt-2 w-full py-1 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 rounded text-[11px] cursor-pointer"
              >
                Copiar Comando de Atualização (Git Pull)
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Method 1: Downloaded ZIP */}
          <div className="bg-[#141b27] border border-slate-700/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">1</span>
                Método Via Arquivo .ZIP (Pasta alastorbot inclusa)
              </span>
              <span className="text-[10px] text-emerald-400 font-medium">Não deixa arquivos soltos</span>
            </div>
            <p className="text-[11px] text-slate-400">
              1. Clique em <strong>"Baixar Tudo (.ZIP)"</strong> no topo.<br />
              2. O arquivo <code className="text-slate-300 font-mono">alastorbot.zip</code> será baixado na pasta Download.<br />
              3. No Termux, copie o zip e extraia (ele criará a pasta <code className="text-red-300">alastorbot/</code> automaticamente):
            </p>
            <div className="bg-black/60 border border-slate-800 rounded-lg p-2.5 font-mono text-[11px] text-slate-200 space-y-1">
              <p className="text-slate-500"># Dar permissão e copiar o zip:</p>
              <p className="text-red-300">termux-setup-storage</p>
              <p className="text-red-300">cp /sdcard/Download/alastorbot.zip ~/</p>
              <p className="text-slate-500"># Descompactar a pasta alastorbot:</p>
              <p className="text-red-300">cd ~ && unzip -o alastorbot.zip</p>
              <p className="text-slate-500"># Entrar na pasta e iniciar:</p>
              <p className="text-emerald-300">cd ~/alastorbot && npm install && npm start</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  'termux-setup-storage && cp /sdcard/Download/alastorbot.zip ~/ && cd ~ && unzip -o alastorbot.zip && cd ~/alastorbot && npm install && npm start'
                );
                alert('Comando copiado! Cole no seu Termux.');
              }}
              className="w-full py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 rounded-lg text-xs font-medium transition cursor-pointer text-center"
            >
              Copiar Linha de Comando do ZIP (Termux)
            </button>
          </div>

          {/* Method 2: In-chat updater */}
          <div className="bg-[#141b27] border border-slate-700/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px]">2</span>
                Atualização Automática no WhatsApp
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Com o bot já rodando no seu Termux, você pode atualizar a qualquer momento enviando o comando de dono no WhatsApp:
            </p>
            <div className="bg-black/60 border border-slate-800 rounded-lg p-2.5 font-mono text-[11px] text-slate-200 space-y-1">
              <p className="text-red-300 font-bold">{config.prefix}atualizar</p>
              <p className="text-slate-400 text-[10px]">
                O bot puxa as alterações do repositório <span className="text-red-300">Bot-alastor</span>, atualiza os arquivos da pasta e reinicia o rádio!
              </p>
            </div>
            <div className="p-2 bg-slate-900/60 rounded border border-slate-800 text-[11px] text-slate-400">
              💡 <em>Com a pasta <strong>alastorbot</strong> criada dentro do ZIP, nenhum arquivo fica solto na raiz do Termux!</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
