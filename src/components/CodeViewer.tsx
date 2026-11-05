import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, FolderArchive, Terminal, Sparkles, FileText } from 'lucide-react';
import { BotConfig } from '../types/bot';
import {
  generateIndexJs,
  generateAlastorJs,
  generateSettingsJson,
  generatePackageJson,
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
    'index.js' | 'alastor.js' | 'settings.json' | 'package.json' | 'termux.sh' | 'TUTORIAL.md' | 'database/aluguel.json'
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
    'termux.sh': generateTermuxScript(config),
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
    { name: 'alastor.js', icon: '📻', desc: 'Comandos, Aluguel e Menus' },
    { name: 'settings.json', icon: '⚙️', desc: 'Configurações e Dono Oficial' },
    { name: 'database/aluguel.json', icon: '💼', desc: 'Banco de Dados de Aluguel' },
    { name: 'package.json', icon: '📦', desc: 'Dependências do Node.js' },
    { name: 'termux.sh', icon: '📱', desc: 'Script Instalador Termux' },
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

      {/* Guide: Where and How to Save in Termux */}
      <div className="bg-[#0e1420] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-red-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            📁 Onde e Como Salvar os Arquivos no Celular (Termux)?
          </h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Os arquivos do bot devem ficar dentro da memória interna do aplicativo <strong>Termux</strong>, especificamente na pasta <code className="bg-slate-900 text-red-300 px-1.5 py-0.5 rounded font-mono">~/alastor-bot</code>. Siga uma das opções abaixo:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Method 1: Downloaded ZIP */}
          <div className="bg-[#141b27] border border-slate-700/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">1</span>
                Método Mais Rápido (Baixar .ZIP)
              </span>
              <span className="text-[10px] text-emerald-400 font-medium">Recomendado</span>
            </div>
            <p className="text-[11px] text-slate-400">
              1. Clique em <strong>"Baixar Tudo (.ZIP)"</strong> no topo.<br />
              2. O arquivo <code className="text-slate-300 font-mono">alastor-termux-bot.zip</code> vai para a sua pasta <strong>Download</strong> do celular.<br />
              3. Abra o Termux e cole os comandos abaixo:
            </p>
            <div className="bg-black/60 border border-slate-800 rounded-lg p-2.5 font-mono text-[11px] text-slate-200 space-y-1">
              <p className="text-slate-500"># Dar permissão de armazenamento:</p>
              <p className="text-red-300">termux-setup-storage</p>
              <p className="text-slate-500"># Criar pasta e descompactar:</p>
              <p className="text-red-300">mkdir -p ~/alastor-bot</p>
              <p className="text-red-300">cp /sdcard/Download/alastor-termux-bot.zip ~/alastor-bot/</p>
              <p className="text-red-300">cd ~/alastor-bot && unzip alastor-termux-bot.zip</p>
              <p className="text-slate-500"># Instalar dependências e ligar o bot:</p>
              <p className="text-emerald-300">npm install && npm start</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  'termux-setup-storage && mkdir -p ~/alastor-bot && cp /sdcard/Download/alastor-termux-bot.zip ~/alastor-bot/ && cd ~/alastor-bot && unzip -o alastor-termux-bot.zip && npm install && npm start'
                );
                alert('Comando copiado! Cole no seu Termux.');
              }}
              className="w-full py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 rounded-lg text-xs font-medium transition cursor-pointer text-center"
            >
              Copiar Linha de Comando Completa do Termux
            </button>
          </div>

          {/* Method 2: Manual creation via nano */}
          <div className="bg-[#141b27] border border-slate-700/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px]">2</span>
                Método Manual (Copiar e Colar)
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Se preferir criar os arquivos um a um sem baixar o zip:
            </p>
            <div className="bg-black/60 border border-slate-800 rounded-lg p-2.5 font-mono text-[11px] text-slate-200 space-y-1">
              <p className="text-slate-500"># 1. Crie a pasta:</p>
              <p className="text-red-300">mkdir -p ~/alastor-bot && cd ~/alastor-bot</p>
              <p className="text-slate-500"># 2. Crie os 4 arquivos principais com nano:</p>
              <p className="text-red-300">nano index.js</p>
              <p className="text-red-300">nano alastor.js</p>
              <p className="text-red-300">nano settings.json</p>
              <p className="text-red-300">nano package.json</p>
              <p className="text-slate-500"># (Cole o código de cada aba e salve com Ctrl+O e Ctrl+X)</p>
            </div>
            <div className="p-2 bg-slate-900/60 rounded border border-slate-800 text-[11px] text-slate-400">
              💡 <em>Dica: O Método 1 com o arquivo <strong>.ZIP</strong> é 10x mais fácil e evita erros de digitação!</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
