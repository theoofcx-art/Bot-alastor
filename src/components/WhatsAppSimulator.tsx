import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Smile, MoreVertical, Search, CheckCheck, Sparkles, RefreshCw, Radio, Coins, ShieldAlert, Clock } from 'lucide-react';
import { BotConfig, ChatMessage } from '../types/bot';

interface WhatsAppSimulatorProps {
  config: BotConfig;
  onUpdateConfig: (newConfig: Partial<BotConfig>) => void;
  pendingCommand?: string | null;
  onClearPendingCommand?: () => void;
}

export const WhatsAppSimulator: React.FC<WhatsAppSimulatorProps> = ({
  config,
  onUpdateConfig,
  pendingCommand,
  onClearPendingCommand,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [userCoins, setUserCoins] = useState(750);
  const [userBank, setUserBank] = useState(1200);
  const [warnsCount, setWarnsCount] = useState<Record<string, number>>({ '@Membro1': 1 });
  const [groupRentDays, setGroupRentDays] = useState(30);
  const [lastDailyResgate, setLastDailyResgate] = useState(0);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-system',
      sender: 'system',
      senderName: 'WhatsApp',
      text: 'As mensagens e chamadas deste grupo são protegidas com criptografia de ponta a ponta.',
      timestamp: 'Hoje',
    },
    {
      id: 'bot-init',
      sender: 'bot',
      senderName: config.botName,
      image: config.menuThumb,
      text: `╭━━━〔 📻 *${config.botName.toUpperCase()}* 📻 〕━━━╮\n┃\n┃ 👑 *Criador:* ${config.creator}\n┃ ⚡ *Prefixo:* [ ${config.prefix} ]\n┃ 💼 *Modo Aluguel:* ${config.rentMode ? 'ATIVADO' : 'DESATIVADO'}\n┃ ⏳ *Dias de Aluguel:* 30 dias restantes\n┃ 📡 *Frequência:* ${config.radioFrequency}\n┃\n╰━━━━━━━━━━━━━━━━━━━━━━━╯\n\nOlá! Novos sistemas de *Aluguel*, *Moderação Avançada (Warns/Tempban)*, *Segurança* e *Cassino* já estão operando! Digite *${config.prefix}menu* ou use os botões rápidos! 🎙️✨`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  useEffect(() => {
    if (pendingCommand) {
      handleSendCommand(pendingCommand);
      onClearPendingCommand?.();
    }
  }, [pendingCommand]);

  const handleSendCommand = (textToSend?: string) => {
    const rawText = textToSend !== undefined ? textToSend : inputMessage;
    const text = rawText.trim();
    if (!text) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      senderName: 'Você',
      text,
      timestamp: userTime,
      isCommand: text.startsWith(config.prefix),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsBotTyping(true);

    setTimeout(() => {
      processBotResponse(text, userMsg);
      setIsBotTyping(false);
    }, 450);
  };

  const processBotResponse = (cmdText: string, userMsg: ChatMessage) => {
    const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const prefix = config.prefix;

    if (!cmdText.startsWith(prefix)) {
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        senderName: config.botName,
        text: `📻 *${config.botName}:* "Ha ha! Ouvi você perfeitamente! Utilize o prefixo *${prefix}* para me dar ordens. Digite *${prefix}menu* para sintonizar as atrações!"`,
        timestamp: botTime,
      };
      setMessages((prev) => [...prev, botMsg]);
      return;
    }

    const clean = cmdText.slice(prefix.length).trim();
    const parts = clean.split(/ +/);
    const command = parts[0]?.toLowerCase();
    const q = parts.slice(1).join(' ');

    let replyText = '';
    let replyImage: string | undefined = undefined;

    switch (command) {
      // ==========================================
      // MENU PRINCIPAL
      // ==========================================
      case 'menu':
      case 'help':
      case 'ajuda': {
        replyImage = config.menuThumb;
        replyText = `╭━━━〔 📻 *${config.botName.toUpperCase()}* 📻 〕━━━╮
┃
┃ 👑 *Criador:* ${config.creator}
┃ ⚡ *Prefixo:* [ ${config.prefix} ]
┃ 👤 *Usuário:* @Você
┃ 💼 *Modo Aluguel:* ${config.rentMode ? 'ATIVADO' : 'LIVRE'}
┃ ⏳ *Dias no Grupo:* ${groupRentDays > 0 ? `${groupRentDays} dias` : 'EXPIRADO'}
┃ 📡 *Frequência:* ${config.radioFrequency}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 📑 *SUB-MENUS DO ALASTOR* 〕━━━╮
┃
┃ 👑 *${prefix}menudono* -> Painel do Dono
┃ 💼 *${prefix}menualuguel* -> Sistema de Aluguel
┃ 🛡️ *${prefix}menuadm* -> Moderação Avançada
┃ 🔒 *${prefix}menuseguranca* -> Antifake, Antilink & Bem-vindo
┃ 💰 *${prefix}menueconomia* -> Saldo, Cassino & Daily
┃ 👤 *${prefix}menumembros* -> Utilidades
┃ 🎭 *${prefix}menubrincadeira* -> Jogos & Zoação
┃ 🎨 *${prefix}menufigu* -> Criador de Stickers
┃ 🤖 *${prefix}menuia* -> IA do Alastor
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯

📻 _"O sorriso é sua melhor ferramenta, meu caro espectador!"_`;
        break;
      }

      // ==========================================
      // SISTEMA DE ALUGUEL
      // ==========================================
      case 'menualuguel': {
        replyText = `╭━━━〔 💼 *MENU ALUGUEL* 〕━━━╮
┃
┃ 🔒 *${prefix}modoaluguel <1/0>* (Dono)
┃ ⏳ *${prefix}addaluguel <dias>* (Dono)
┃ ❌ *${prefix}delaluguel* (Dono)
┃ 📋 *${prefix}veraluguel* (Consulta de Dias)
┃ 📑 *${prefix}listalugueis* (Dono)
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯
💡 _Quando o aluguel expira, o bot emite um aviso amigável cobrando a renovação sem bloquear!_`;
        break;
      }

      case 'modoaluguel': {
        if (q === '1' || q === 'on' || q === 'ativar') {
          onUpdateConfig({ rentMode: true });
          replyText = `💼 *Modo Aluguel ATIVADO!* O bot agora passa a exigir que os grupos tenham dias válidos pagos ao dono oficial: *${config.creator}*`;
        } else if (q === '0' || q === 'off' || q === 'desativar') {
          onUpdateConfig({ rentMode: false });
          replyText = `🔓 *Modo Aluguel DESATIVADO!* O bot agora funciona livremente em todos os grupos.`;
        } else {
          replyText = `⚠️ *Uso:* ${prefix}modoaluguel 1 (ativar) ou ${prefix}modoaluguel 0 (desativar)\nEstado atual: *${config.rentMode ? 'ATIVADO' : 'DESATIVADO'}*`;
        }
        break;
      }

      case 'addaluguel': {
        const dias = parseInt(parts[1]) || 30;
        setGroupRentDays((prev) => prev + dias);
        const dataVenc = new Date(Date.now() + (groupRentDays + dias) * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR');
        replyText = `✅ *ALUGUEL CONCEDIDO COM SUCESSO!* 💼\n\n📅 *Dias adicionados:* +${dias} dias\n📆 *Novo total:* ${groupRentDays + dias} dias restantes\n🗓️ *Validade até:* ${dataVenc}\n👑 *Autorizado por:* ${config.creator}\n\n📻 _Obrigado pela preferência! Alastor Bot continua a todo vapor!_`;
        break;
      }

      case 'veraluguel':
      case 'temporestante': {
        if (groupRentDays <= 0) {
          replyText = `⚠️ *[ALUGUEL EXPIRADO]* ⚠️\n\nO período de aluguel deste grupo expirou!\nO bot continua aqui, mas é necessário renovar para garantir o funcionamento contínuo.\n\n👑 *Renovação Oficial:* ${config.creator}\n📱 *Contato:* +${config.ownerNumber}`;
        } else {
          const bar = '■'.repeat(Math.min(10, Math.ceil(groupRentDays / 3))) + '□'.repeat(Math.max(0, 10 - Math.ceil(groupRentDays / 3)));
          const dataVenc = new Date(Date.now() + groupRentDays * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR');
          replyText = `╭━━━〔 💼 *STATUS DO ALUGUEL* 〕━━━╮
┃
┃ ⏳ *Dias Restantes:* ${groupRentDays} dias
┃ 📊 *Barra:* [${bar}]
┃ 📅 *Vence em:* ${dataVenc}
┃ 👑 *Criador:* ${config.creator}
┃ 📡 *Status:* Ativo e Operacional
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯`;
        }
        break;
      }

      case 'delaluguel': {
        setGroupRentDays(0);
        replyText = `❌ *Aluguel deste grupo cancelado!* O grupo agora consta como expirado.`;
        break;
      }

      case 'listalugueis': {
        replyText = `📑 *LISTA DE GRUPOS ALUGADOS:*
        
1. 📍 *Grupo Principal VIP* -> ${groupRentDays} dias restantes
2. 📍 *Chat dos Criadores* -> 14 dias restantes
3. 📍 *Comunidade Termux BR* -> 45 dias restantes

👑 *Administrador Geral:* ${config.creator}`;
        break;
      }

      // ==========================================
      // MODERAÇÃO AVANÇADA (ADM)
      // ==========================================
      case 'menuadm': {
        replyText = `╭━━━〔 🛡️ *MENU ADMINISTRAÇÃO AVANÇADA* 〕━━━╮
┃
┃ ⚠️ *${prefix}warn <@membro>* (3 avisos = ban)
┃ 🔄 *${prefix}unwarn <@membro>*
┃ 📋 *${prefix}warnlist*
┃ ⏳ *${prefix}tempban <@membro> <minutos>*
┃ 🧹 *${prefix}limpar <quantidade>*
┃ 🚫 *${prefix}ban <@membro>*
┃ ⬆️ *${prefix}promover <@membro>*
┃ ⬇️ *${prefix}rebaixar <@membro>*
┃ 🔓 *${prefix}abrir* / 🔒 *${prefix}fechar*
┃ 📢 *${prefix}totag <aviso>* / 👻 *${prefix}hidetag*
┃ 🔇 *${prefix}mutar*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯`;
        break;
      }

      case 'warn': {
        const target = parts[1] || '@Membro1';
        const current = (warnsCount[target] || 0) + 1;
        setWarnsCount((prev) => ({ ...prev, [target]: current }));

        if (current >= 3) {
          replyText = `🚨 *BANIMENTO AUTOMÁTICO!* 🚨\n\nO participante ${target} acumulou *3/3 advertências* e foi expulso do grupo pelo Alastor Bot!`;
          setWarnsCount((prev) => {
            const next = { ...prev };
            delete next[target];
            return next;
          });
        } else {
          replyText = `⚠️ *ADVERTÊNCIA REGISTRADA!* ⚠️\n\n👤 *Membro:* ${target}\n📊 *Advertências:* [${current}/3]\nMotivo: ${parts.slice(2).join(' ') || 'Violação das regras do grupo'}\n\n🚨 _Atenção: Ao atingir 3 advertências a expulsão é imediata!_`;
        }
        break;
      }

      case 'unwarn': {
        const target = parts[1] || '@Membro1';
        if (warnsCount[target] && warnsCount[target] > 0) {
          const novo = warnsCount[target] - 1;
          setWarnsCount((prev) => ({ ...prev, [target]: novo }));
          replyText = `✅ *Advertência removida de ${target}!* Total agora: [${novo}/3]`;
        } else {
          replyText = `ℹ️ *${target}* não possui nenhuma advertência ativa no momento.`;
        }
        break;
      }

      case 'warnlist': {
        const entries = Object.entries(warnsCount).filter(([_, count]) => count > 0);
        if (entries.length === 0) {
          replyText = `✅ *Nenhum membro possui advertências neste grupo no momento!*`;
        } else {
          replyText = `📋 *MEMBROS COM ADVERTÊNCIAS:* \n\n` +
            entries.map(([user, count]) => `• ${user} ➜ [${count}/3 avisos]`).join('\n') +
            `\n\n⚠️ _Digite ${prefix}unwarn @membro para perdoar._`;
        }
        break;
      }

      case 'tempban': {
        const target = parts[1] || '@Membro1';
        const mins = parts[2] || '10';
        replyText = `⏳ *BANIMENTO TEMPORÁRIO!* \n\nO participante ${target} foi removido por *${mins} minutos*. Ele poderá retornar após cumprir o castigo!`;
        break;
      }

      case 'limpar':
      case 'clear': {
        const qtd = parseInt(parts[1]) || 10;
        replyText = `🧹 *Limpando mensagens recentes...*\n\n[✓] Solicitada a exclusão de *${qtd} mensagens* do chat com sucesso!`;
        break;
      }

      // ==========================================
      // SEGURANÇA
      // ==========================================
      case 'menuseguranca': {
        replyText = `╭━━━〔 🔒 *MENU SEGURANÇA* 〕━━━╮
┃
┃ 🛡️ *${prefix}antifake <1/0>* [${config.antiFake ? 'ON' : 'OFF'}]
┃ 🚫 *${prefix}antispam <1/0>* [${config.antiSpam ? 'ON' : 'OFF'}]
┃ 🛑 *${prefix}antitrava <1/0>* [${config.antiTrava ? 'ON' : 'OFF'}]
┃ 🔗 *${prefix}antilink <1/0>* [${config.antiLink ? 'ON' : 'OFF'}]
┃ 👋 *${prefix}bemvindo <1/0>* [${config.welcomeMessage ? 'ON' : 'OFF'}]
┃ ✏️ *${prefix}setbemvindo <texto>*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯`;
        break;
      }

      case 'antifake': {
        if (q === '1' || q === 'on') {
          onUpdateConfig({ antiFake: true });
          replyText = `🛡️ *Anti-Fake ATIVADO!* Números estrangeiros com DDI estranho (+1, +44, etc.) serão expulsos imediatamente ao entrarem!`;
        } else {
          onUpdateConfig({ antiFake: false });
          replyText = `🔓 *Anti-Fake DESATIVADO!* Números de qualquer país podem participar.`;
        }
        break;
      }

      case 'antispam': {
        if (q === '1' || q === 'on') {
          onUpdateConfig({ antiSpam: true });
          replyText = `🛡️ *Anti-Spam ATIVADO!* Mensagens repetitivas e flood de texto serão bloqueados pelo bot!`;
        } else {
          onUpdateConfig({ antiSpam: false });
          replyText = `🔓 *Anti-Spam DESATIVADO!*`;
        }
        break;
      }

      case 'antitrava': {
        if (q === '1' || q === 'on') {
          onUpdateConfig({ antiTrava: true });
          replyText = `🛑 *Anti-Trava ATIVADO!* Mensagens com mais de 5.000 caracteres ou caracteres maliciosos serão apagadas na hora!`;
        } else {
          onUpdateConfig({ antiTrava: false });
          replyText = `🔓 *Anti-Trava DESATIVADO!*`;
        }
        break;
      }

      case 'bemvindo': {
        if (q === '1' || q === 'on') {
          onUpdateConfig({ welcomeMessage: true });
          replyText = `👋 *Boas-Vindas ATIVADAS!* O bot recepcionará cada novo membro com a mensagem cadastrada.`;
        } else {
          onUpdateConfig({ welcomeMessage: false });
          replyText = `👋 *Boas-Vindas DESATIVADAS!*`;
        }
        break;
      }

      // ==========================================
      // ECONOMIA & CASSINO
      // ==========================================
      case 'menueconomia': {
        replyText = `╭━━━〔 💰 *MENU ECONOMIA & CASSINO* 〕━━━╮
┃
┃ 👛 *${prefix}saldo* -> Carteira e moedas
┃ 🎁 *${prefix}daily* -> Resgate diário gratuito
┃ 🎰 *${prefix}cassino <aposta>* -> Caça-níquel
┃ 🪙 *${prefix}apostar <cara/coroa> <valor>*
┃ 🥷 *${prefix}roubar <@membro>* -> Risco e adrenalina
┃ 💸 *${prefix}doar <@membro> <valor>*
┃ 🏆 *${prefix}topcoins* -> Ranking dos magnatas
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯`;
        break;
      }

      case 'saldo':
      case 'carteira': {
        replyText = `╭━━━〔 👛 *SUA CARTEIRA* 〕━━━╮
┃
┃ 👤 *Titular:* Você
┃ 🪙 *Alastor Coins:* ${userCoins.toLocaleString()} moedas
┃ 🏦 *Banco do Submundo:* ${userBank.toLocaleString()} moedas
┃ 💳 *Patrimônio Total:* ${(userCoins + userBank).toLocaleString()} moedas
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯
💡 _Use ${prefix}cassino ou ${prefix}daily para ganhar mais moedas!_`;
        break;
      }

      case 'daily':
      case 'diario': {
        const bonus = Math.floor(Math.random() * 400) + 600;
        setUserCoins((prev) => prev + bonus);
        replyText = `🎁 *BÔNUS DIÁRIO COLETADO!* 🎁\n\nVocê recebeu: *+${bonus} Alastor Coins* 🪙\nNovo saldo em carteira: *${userCoins + bonus} moedas*!\n\nVolte amanhã para resgatar novamente!`;
        break;
      }

      case 'cassino':
      case 'slots': {
        const aposta = parseInt(parts[1]) || 100;
        if (userCoins < aposta) {
          replyText = `❌ *Saldo insuficiente!* Você apostou ${aposta} moedas, mas possui apenas ${userCoins} em carteira. Digite *${prefix}daily* para pegar moedas!`;
        } else {
          const emojis = ['🍒', '💎', '7️⃣', '🔔', '🍇', '💀'];
          const r1 = emojis[Math.floor(Math.random() * emojis.length)];
          const r2 = emojis[Math.floor(Math.random() * emojis.length)];
          const r3 = emojis[Math.floor(Math.random() * emojis.length)];

          if (r1 === r2 && r2 === r3) {
            const multi = r1 === '7️⃣' ? 10 : r1 === '💎' ? 5 : 3;
            const premio = aposta * multi;
            setUserCoins((prev) => prev + (premio - aposta));
            replyText = `🎰 *[CASSINO DO ALASTOR]* 🎰\n\n╔═════════════╗\n║  ${r1}  │  ${r2}  │  ${r3}  ║\n╚═════════════╝\n\n🎉 *JACKPOT SUPREMO! Você ganhou ${premio} moedas (${multi}x)!*\nNovo saldo: *${userCoins + premio - aposta} 🪙*`;
          } else if (r1 === r2 || r2 === r3 || r1 === r3) {
            const premio = Math.floor(aposta * 1.5);
            setUserCoins((prev) => prev + (premio - aposta));
            replyText = `🎰 *[CASSINO DO ALASTOR]* 🎰\n\n╔═════════════╗\n║  ${r1}  │  ${r2}  │  ${r3}  ║\n╚═════════════╝\n\n✨ *DOIS IGUAIS! Você lucrou ${premio} moedas!*\nNovo saldo: *${userCoins + premio - aposta} 🪙*`;
          } else {
            setUserCoins((prev) => Math.max(0, prev - aposta));
            replyText = `🎰 *[CASSINO DO ALASTOR]* 🎰\n\n╔═════════════╗\n║  ${r1}  │  ${r2}  │  ${r3}  ║\n╚═════════════╝\n\n💀 *Você perdeu ${aposta} moedas!* "O demônio do rádio agradece sua generosa doação!" Ha ha ha!\nNovo saldo: *${Math.max(0, userCoins - aposta)} 🪙*`;
          }
        }
        break;
      }

      case 'topcoins': {
        replyText = `🏆 *RANKING DOS MAIS RICOS DO ALASTOR:* 🏆

1º. 👑 @Você -> ${(userCoins + userBank).toLocaleString()} 🪙
2º. 🥈 @MembroVIP -> 18.450 🪙
3º. 🥉 @RadioDemonFan -> 9.800 🪙
4º. 🎖️ @ShadowLord -> 6.200 🪙
5º. 🎖️ @BaileysPro -> 3.100 🪙

_Consiga mais moedas jogando no cassino e resgatando o daily!_`;
        break;
      }

      // ==========================================
      // COMANDOS DE DONO
      // ==========================================
      case 'menudono': {
        replyText = `╭━━━〔 👑 *PAINEL DO DONO* 〕━━━╮
┃
┃ 👑 *Criador:* ${config.creator}
┃ 📻 *Bot:* ${config.botName}
┃
┃ 💼 *${prefix}modoaluguel <1/0>*
┃ ⏳ *${prefix}addaluguel <dias>*
┃ 🖼️ *${prefix}setfotomenu <url>*
┃ ✏️ *${prefix}setbotname <nome>*
┃ 🔑 *${prefix}setapi <chave>*
┃ 🌐 *${prefix}setapisite <url>*
┃ 🔄 *${prefix}reiniciar*
┃ 📦 *${prefix}backup*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯`;
        break;
      }

      case 'setfotomenu': {
        if (!q) {
          replyText = `⚠️ *Uso:* ${prefix}setfotomenu <url da imagem>`;
        } else {
          onUpdateConfig({ menuThumb: q });
          replyImage = q;
          replyText = `✅ *Foto do menu alterada com sucesso!*`;
        }
        break;
      }

      case 'setbotname': {
        if (!q) {
          replyText = `⚠️ *Uso:* ${prefix}setbotname <novo nome>`;
        } else {
          onUpdateConfig({ botName: q });
          replyText = `✅ *Nome do bot alterado para:* ${q}`;
        }
        break;
      }

      case 'ping': {
        const ms = Math.floor(Math.random() * 20) + 12;
        replyText = `📻 *${config.botName} ONLINE!* \n⚡ *Latência:* ${ms}ms\n💾 *RAM Termux:* 41.2 MB\n💼 *Modo Aluguel:* ${config.rentMode ? 'ATIVADO' : 'LIVRE'}`;
        break;
      }

      case 'dono': {
        replyText = `👑 *CRIADOR OFICIAL DO BOT:*\n\n${config.creator}\n\n📱 *Número cadastrado:* +${config.ownerNumber}\n📻 *Versão:* Alastor v2.8 (Aluguel, Moderação e Economia)`;
        break;
      }

      default: {
        replyText = `⚠️ *Comando não reconhecido:* "${command}"\n\nDigite *${prefix}menu* para ver a lista de todos os comandos do ${config.botName}!`;
        break;
      }
    }

    const botMsg: ChatMessage = {
      id: 'bot-' + Date.now(),
      sender: 'bot',
      senderName: config.botName,
      text: replyText,
      image: replyImage,
      timestamp: botTime,
      quoted: {
        sender: 'Você',
        text: userMsg.text,
      },
    };

    setMessages((prev) => [...prev, botMsg]);
  };

  const quickActions = [
    `${config.prefix}menu`,
    `${config.prefix}addaluguel 30`,
    `${config.prefix}veraluguel`,
    `${config.prefix}saldo`,
    `${config.prefix}daily`,
    `${config.prefix}cassino 100`,
    `${config.prefix}warn @Membro1 Flood`,
    `${config.prefix}antifake 1`,
    `${config.prefix}topcoins`,
  ];

  return (
    <div className="flex flex-col h-[740px] max-w-4xl mx-auto bg-[#0b1019] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* WhatsApp Chat Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#131b26] border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={config.menuThumb}
              alt={config.botName}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-red-500/40 shadow-sm"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#131b26] rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-white text-sm tracking-tight">
                {config.botName}
              </span>
              <span className="text-[11px] px-1.5 py-0.2 bg-red-950/80 text-red-300 border border-red-800/40 rounded text-xs font-mono">
                BOT
              </span>
              {config.rentMode && (
                <span className="text-[10px] px-1.5 py-0.2 bg-amber-950 text-amber-300 border border-amber-800/40 rounded font-mono">
                  ALUGUEL ON
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Online • Baileys Multi-Device (Termux)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/40 border border-amber-800/40 rounded-lg text-xs text-amber-300">
            <Coins className="w-3.5 h-3.5" />
            <span className="font-mono font-bold">{userCoins} moedas</span>
          </div>
          <button
            onClick={() => {
              setMessages([
                {
                  id: 'cleared-system',
                  sender: 'system',
                  senderName: 'WhatsApp',
                  text: 'Chat reiniciado. Digite !menu para começar.',
                  timestamp: 'Agora',
                },
              ]);
            }}
            title="Limpar Chat"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Creator Trust Banner */}
      <div className="bg-[#101722] px-4 py-1.5 border-b border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Criador Oficial:</span>
          <span className="text-red-400 font-medium">{config.creator}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span>Aluguel: <strong className="text-emerald-400 font-mono">{groupRentDays} dias</strong></span>
          <span>·</span>
          <span>Anti-fake: <strong className={config.antiFake ? 'text-emerald-400' : 'text-slate-400'}>{config.antiFake ? 'ON' : 'OFF'}</strong></span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0e17]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.03) 0%, transparent 80%)',
        }}
      >
        {messages.map((msg) => {
          if (msg.sender === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <span className="px-3 py-1 bg-slate-900/90 border border-slate-800 rounded-lg text-xs text-slate-400 text-center max-w-md shadow-sm">
                  🔒 {msg.text}
                </span>
              </div>
            );
          }

          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-3 shadow-md relative ${
                  isUser
                    ? 'bg-[#005c4b] text-white rounded-tr-none'
                    : 'bg-[#18222d] text-slate-100 rounded-tl-none border border-slate-700/40'
                }`}
              >
                {msg.quoted && (
                  <div className="mb-2 p-2 bg-black/25 rounded border-l-2 border-red-500 text-xs text-slate-300">
                    <span className="font-semibold text-red-300 block">
                      {msg.quoted.sender}
                    </span>
                    <span className="truncate block opacity-80">{msg.quoted.text}</span>
                  </div>
                )}

                {msg.image && (
                  <div className="mb-2.5 rounded-lg overflow-hidden border border-red-950/60 shadow">
                    <img
                      src={msg.image}
                      alt="Menu Thumbnail"
                      referrerPolicy="no-referrer"
                      className="w-full max-h-56 object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <div className="text-xs md:text-sm whitespace-pre-wrap leading-relaxed font-sans select-text">
                  {msg.text.split('\n').map((line, idx) => {
                    const formatted = line.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
                    return (
                      <span
                        key={idx}
                        className="block"
                        dangerouslySetInnerHTML={{ __html: formatted }}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  {isUser && <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
              </div>
            </div>
          );
        })}

        {isBotTyping && (
          <div className="flex justify-start">
            <div className="bg-[#18222d] rounded-2xl rounded-tl-none px-4 py-2 text-xs text-red-300 flex items-center gap-2 border border-slate-700/40">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span>{config.botName} está transmitindo resposta...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Buttons */}
      <div className="px-3 py-2 bg-[#101722] border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[11px] text-slate-400 shrink-0 font-medium mr-1">
          Atalhos:
        </span>
        {quickActions.map((cmd, i) => (
          <button
            key={i}
            onClick={() => handleSendCommand(cmd)}
            className="px-2.5 py-1 text-xs bg-slate-800/80 hover:bg-red-900/40 text-slate-200 hover:text-red-200 border border-slate-700/60 rounded-md transition-colors shrink-0 whitespace-nowrap cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Message Input Field */}
      <div className="px-3 py-2.5 bg-[#131b26] border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendCommand();
            }
          }}
          placeholder={`Digite um comando (ex: ${config.prefix}addaluguel 30, ${config.prefix}cassino 100)...`}
          className="flex-1 bg-[#1e293b] border border-slate-700 text-slate-100 placeholder-slate-400 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
        />
        <button
          onClick={() => handleSendCommand()}
          disabled={!inputMessage.trim()}
          className="p-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
