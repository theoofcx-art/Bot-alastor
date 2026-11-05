import React, { useState } from 'react';
import { ShieldCheck, Image as ImageIcon, Key, Globe, Radio, Sparkles, Check, Copy, Briefcase, Plus, Trash2, Calendar, ShieldAlert } from 'lucide-react';
import { BotConfig, GroupRent } from '../types/bot';

interface OwnerPanelProps {
  config: BotConfig;
  onUpdateConfig: (newConfig: Partial<BotConfig>) => void;
  onTestCommand: (cmd: string) => void;
}

export const OwnerPanel: React.FC<OwnerPanelProps> = ({
  config,
  onUpdateConfig,
  onTestCommand,
}) => {
  const [successToast, setSuccessToast] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDays, setNewGroupDays] = useState('30');

  // Local sample list of rented groups
  const [groups, setGroups] = useState<GroupRent[]>([
    {
      id: '1203630248@g.us',
      name: 'Grupo VIP Alastor',
      daysRemaining: 28,
      expiresAt: new Date(Date.now() + 28 * 86400000).toLocaleDateString('pt-BR'),
      active: true,
      ownerOnly: false,
    },
    {
      id: '1203630999@g.us',
      name: 'Comunidade Termux Bots',
      daysRemaining: 12,
      expiresAt: new Date(Date.now() + 12 * 86400000).toLocaleDateString('pt-BR'),
      active: true,
      ownerOnly: false,
    },
    {
      id: '1203630111@g.us',
      name: 'Resenha dos Criadores',
      daysRemaining: 0,
      expiresAt: 'Expirado',
      active: false,
      ownerOnly: false,
    },
  ]);

  const handleAddDaysToGroup = (id: string, additionalDays: number) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const newTotal = (g.daysRemaining > 0 ? g.daysRemaining : 0) + additionalDays;
          return {
            ...g,
            daysRemaining: newTotal,
            expiresAt: new Date(Date.now() + newTotal * 86400000).toLocaleDateString('pt-BR'),
            active: true,
          };
        }
        return g;
      })
    );
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 2500);
  };

  const handleRemoveGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const handleCreateNewRent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    const days = parseInt(newGroupDays) || 30;
    const newRent: GroupRent = {
      id: `group-${Date.now()}@g.us`,
      name: newGroupName.trim(),
      daysRemaining: days,
      expiresAt: new Date(Date.now() + days * 86400000).toLocaleDateString('pt-BR'),
      active: true,
      ownerOnly: false,
    };
    setGroups((prev) => [...prev, newRent]);
    setNewGroupName('');
    setNewGroupDays('30');
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-[#111724] border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-tight">
                Painel do Dono Oficial
              </span>
              <span className="text-xs px-2 py-0.5 bg-red-950/80 text-red-300 border border-red-800/40 rounded font-semibold">
                SOMENTE DONO
              </span>
              {config.rentMode && (
                <span className="text-xs px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800/40 rounded font-mono">
                  SISTEMA DE ALUGUEL ATIVO
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400">
              Gerencie a monetização de aluguel por dias, foto do menu, nome do bot, chaves de API e regras de moderação.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 font-bold">
              👑
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block uppercase font-medium">
                Criador Autêntico
              </span>
              <span className="text-sm font-semibold text-slate-100 font-mono">
                {config.creator}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RENT SYSTEM MANAGEMENT SECTION */}
      <div className="bg-[#0e1420] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                Sistema Comercial de Aluguel de Grupos
              </h3>
              <p className="text-xs text-slate-400">
                Cobrança de aluguel por dias com expiração não-destrutiva (aviso amigável sem banir o bot).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300 font-medium">
              Modo Aluguel Obrigatório:
            </span>
            <button
              type="button"
              onClick={() => onUpdateConfig({ rentMode: !config.rentMode })}
              className={`w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                config.rentMode ? 'bg-amber-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  config.rentMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-xs font-mono font-bold text-amber-400">
              {config.rentMode ? 'ATIVADO [ON]' : 'DESATIVADO [OFF]'}
            </span>
          </div>
        </div>

        {/* Groups table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Grupos Cadastrados ({groups.length})
            </span>
            <button
              onClick={() => onTestCommand(`!listalugueis`)}
              className="text-xs text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              Testar no Chat: !listalugueis
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#141b27] text-slate-400 border-b border-slate-800 font-mono">
                <tr>
                  <th className="p-3">Nome do Grupo</th>
                  <th className="p-3">Dias Restantes</th>
                  <th className="p-3">Data de Vencimento</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Ações Rápidas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-[#0e1420]">
                {groups.map((group) => (
                  <tr key={group.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-3 font-medium text-white flex items-center gap-2">
                      <span>💬</span>
                      <span>{group.name}</span>
                    </td>
                    <td className="p-3 font-mono">
                      <span className={group.daysRemaining > 5 ? 'text-emerald-400' : 'text-red-400 font-bold'}>
                        {group.daysRemaining} dias
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{group.expiresAt}</td>
                    <td className="p-3">
                      {group.daysRemaining > 0 ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                          Ativo
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-red-950 text-red-300 border border-red-800/40">
                          Expirado (Cobrança)
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleAddDaysToGroup(group.id, 15)}
                        className="px-2 py-1 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 rounded text-[11px] cursor-pointer"
                      >
                        +15d
                      </button>
                      <button
                        onClick={() => handleAddDaysToGroup(group.id, 30)}
                        className="px-2 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded text-[11px] cursor-pointer"
                      >
                        +30d
                      </button>
                      <button
                        onClick={() => handleRemoveGroup(group.id)}
                        className="p-1 text-slate-500 hover:text-red-400 rounded cursor-pointer"
                        title="Remover grupo"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add rent form */}
          <form onSubmit={handleCreateNewRent} className="flex flex-col sm:flex-row items-center gap-2 pt-2">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Cadastrar novo grupo (ex: Grupo dos Amigos)..."
              className="flex-1 bg-[#161f2e] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="number"
              value={newGroupDays}
              onChange={(e) => setNewGroupDays(e.target.value)}
              placeholder="Dias"
              className="w-24 bg-[#161f2e] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white text-center font-mono focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Aluguel</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Grid: Form Controls on Left, Live Menu Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Controls */}
        <div className="lg:col-span-7 bg-[#0e1420] border border-slate-800 rounded-2xl p-6 space-y-5 shadow-lg">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>Configurações Gerais & Identidade</span>
          </h3>

          <div className="space-y-4">
            {/* Bot Name */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Nome do Bot
                </label>
                <button
                  type="button"
                  onClick={() => onTestCommand(`!setbotname ${config.botName}`)}
                  className="text-[11px] text-red-400 hover:text-red-300 cursor-pointer"
                >
                  Comando: !setbotname
                </button>
              </div>
              <input
                type="text"
                value={config.botName}
                onChange={(e) => onUpdateConfig({ botName: e.target.value })}
                placeholder="Alastor"
                className="w-full bg-[#161f2e] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Menu Photo URL */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>Foto do Menu (URL da Capa)</span>
                </label>
                <button
                  type="button"
                  onClick={() => onTestCommand(`!setfotomenu ${config.menuThumb}`)}
                  className="text-[11px] text-red-400 hover:text-red-300 cursor-pointer"
                >
                  Comando: !setfotomenu
                </button>
              </div>
              <input
                type="text"
                value={config.menuThumb}
                onChange={(e) => onUpdateConfig({ menuThumb: e.target.value })}
                className="w-full bg-[#161f2e] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-red-500 font-mono text-xs"
              />
            </div>

            {/* API Key & API Site */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  Chave de API
                </label>
                <input
                  type="text"
                  value={config.apiKey}
                  onChange={(e) => onUpdateConfig({ apiKey: e.target.value })}
                  className="w-full bg-[#161f2e] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  Site / Endpoint da API
                </label>
                <input
                  type="text"
                  value={config.apiSite}
                  onChange={(e) => onUpdateConfig({ apiSite: e.target.value })}
                  className="w-full bg-[#161f2e] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Security Toggles */}
            <div className="pt-3 border-t border-slate-800 space-y-2.5">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Módulos de Proteção dos Grupos
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-300">Anti-Fake (+1, DDI)</span>
                  <button
                    type="button"
                    onClick={() => onUpdateConfig({ antiFake: !config.antiFake })}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      config.antiFake ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {config.antiFake ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-300">Anti-Spam / Flood</span>
                  <button
                    type="button"
                    onClick={() => onUpdateConfig({ antiSpam: !config.antiSpam })}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      config.antiSpam ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {config.antiSpam ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-300">Anti-Link de Grupos</span>
                  <button
                    type="button"
                    onClick={() => onUpdateConfig({ antiLink: !config.antiLink })}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      config.antiLink ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {config.antiLink ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-300">Anti-Trava de Texto</span>
                  <button
                    type="button"
                    onClick={() => onUpdateConfig({ antiTrava: !config.antiTrava })}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      config.antiTrava ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {config.antiTrava ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>

            {successToast && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Configurações e aluguéis salvos com sucesso!</span>
              </div>
            )}
          </div>
        </div>

        {/* Live Menu Preview Card */}
        <div className="lg:col-span-5 bg-[#0e1420] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Preview do Menu no WhatsApp
            </span>
            <span className="text-[11px] text-slate-400">Tempo Real</span>
          </div>

          <div className="bg-[#18222d] border border-slate-700/50 rounded-xl p-3.5 space-y-3">
            <div className="rounded-lg overflow-hidden border border-red-950 relative aspect-video bg-black/40">
              <img
                src={config.menuThumb}
                alt="Banner do Menu"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/alastor_bot_avatar_1793898128553.jpg';
                }}
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur rounded text-[10px] text-red-300 font-mono">
                {config.radioFrequency}
              </div>
            </div>

            <div className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed bg-[#111923] p-3 rounded-lg border border-slate-800">
              {`╭━━━〔 📻 ${config.botName.toUpperCase()} 📻 〕━━━╮
┃
┃ 👑 Criador: ${config.creator}
┃ ⚡ Prefixo: [ ${config.prefix} ]
┃ 💼 Modo Aluguel: ${config.rentMode ? 'ATIVADO' : 'LIVRE'}
┃ ⏳ Dias Restantes: 30 dias
┃ 📡 Rádio: ${config.radioFrequency}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 📑 SUB-MENUS 〕━━━╮
┃ 👑 ${config.prefix}menudono -> Dono
┃ 💼 ${config.prefix}menualuguel -> Aluguel
┃ 🛡️ ${config.prefix}menuadm -> ADM
┃ 🔒 ${config.prefix}menuseguranca -> Segurança
┃ 💰 ${config.prefix}menueconomia -> Cassino
╰━━━━━━━━━━━━━━━━━━━━━━━╯`}
            </div>

            <button
              onClick={() => onTestCommand(`${config.prefix}menu`)}
              className="w-full py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 rounded-lg text-xs font-medium transition cursor-pointer text-center"
            >
              Testar este Menu no Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
