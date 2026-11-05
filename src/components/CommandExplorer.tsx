import React, { useState } from 'react';
import { Search, Play, ShieldAlert, Sparkles, Filter, Copy, Check, Briefcase, Coins, ShieldCheck } from 'lucide-react';
import { BOT_COMMANDS } from '../data/commands';
import { BotConfig, CommandCategory, CommandItem } from '../types/bot';

interface CommandExplorerProps {
  config: BotConfig;
  onRunCommand: (cmdUsage: string) => void;
}

export const CommandExplorer: React.FC<CommandExplorerProps> = ({
  config,
  onRunCommand,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Comandos' },
    { id: 'aluguel', label: '💼 Aluguel' },
    { id: 'adm', label: '🛡️ ADM Avançado' },
    { id: 'seguranca', label: '🔒 Segurança' },
    { id: 'economia', label: '💰 Economia & Jogos' },
    { id: 'dono', label: '👑 Dono' },
    { id: 'membros', label: '👤 Membros' },
    { id: 'brincadeiras', label: '🎭 Brincadeiras' },
    { id: 'figurinhas', label: '🎨 Figurinhas' },
    { id: 'downloads', label: '📥 Downloads' },
    { id: 'ia', label: '🤖 IA Alastor' },
  ];

  const filteredCommands = BOT_COMMANDS.filter((cmd) => {
    const matchesCategory =
      selectedCategory === 'all' || cmd.category === selectedCategory;
    const matchesSearch =
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.usage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(name);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const getCategoryColor = (cat: CommandCategory) => {
    switch (cat) {
      case 'aluguel':
        return 'text-amber-400 border-amber-800/40 bg-amber-950/30';
      case 'adm':
        return 'text-red-400 border-red-800/40 bg-red-950/30';
      case 'seguranca':
        return 'text-emerald-400 border-emerald-800/40 bg-emerald-950/30';
      case 'economia':
        return 'text-yellow-300 border-yellow-800/40 bg-yellow-950/30';
      case 'dono':
        return 'text-orange-400 border-orange-800/40 bg-orange-950/30';
      case 'brincadeiras':
        return 'text-purple-400 border-purple-800/40 bg-purple-950/30';
      case 'figurinhas':
        return 'text-pink-400 border-pink-800/40 bg-pink-950/30';
      case 'ia':
        return 'text-cyan-400 border-cyan-800/40 bg-cyan-950/30';
      default:
        return 'text-slate-300 border-slate-700/60 bg-slate-800/40';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="bg-[#111724] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Catálogo Completo de Comandos ({BOT_COMMANDS.length})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Aluguel comercial • Moderação avançada • Segurança • Economia & Cassino • Criador: {config.creator}
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar (ex: aluguel, warn, saldo, cassino)..."
              className="w-full bg-[#161f2e] border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCommands.map((cmd) => {
          const dynamicUsage = cmd.usage.replace(/^!/, config.prefix);

          return (
            <div
              key={cmd.name}
              className="bg-[#0e1420] border border-slate-800/80 hover:border-red-900/60 rounded-2xl p-4 shadow transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    {config.prefix}{cmd.name}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border uppercase font-mono font-semibold ${getCategoryColor(
                      cmd.category
                    )}`}
                  >
                    {cmd.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {cmd.description}
                </p>

                <div className="bg-[#141c2a] border border-slate-800 rounded-lg p-2 font-mono text-[11px] text-red-300 flex items-center justify-between">
                  <span className="truncate">{dynamicUsage}</span>
                  <button
                    onClick={() => handleCopy(dynamicUsage, cmd.name)}
                    title="Copiar comando"
                    className="text-slate-400 hover:text-white ml-1 cursor-pointer shrink-0"
                  >
                    {copiedCmd === cmd.name ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                {cmd.isOwnerOnly ? (
                  <span className="text-[11px] text-amber-400 font-medium">
                    👑 Somente Dono
                  </span>
                ) : cmd.isAdminOnly ? (
                  <span className="text-[11px] text-red-400 font-medium">
                    🛡️ Somente ADM
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500 font-medium">
                    👤 Todos os Membros
                  </span>
                )}

                <button
                  onClick={() => onRunCommand(dynamicUsage)}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 rounded-lg text-xs font-medium transition cursor-pointer"
                >
                  <Play className="w-3 h-3" />
                  <span>Testar no Chat</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCommands.length === 0 && (
        <div className="text-center py-12 bg-[#0e1420] border border-slate-800 rounded-2xl">
          <p className="text-slate-400 text-sm">
            Nenhum comando encontrado para "{searchQuery}".
          </p>
        </div>
      )}
    </div>
  );
};
