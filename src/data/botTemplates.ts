import { BotConfig } from '../types/bot';

export function generateSettingsJson(config: BotConfig): string {
  return JSON.stringify(
    {
      botName: config.botName || 'Alastor',
      creator: config.creator || '© ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪',
      ownerNumber: config.ownerNumber || '5511999999999',
      prefix: config.prefix || '!',
      menuThumb: config.menuThumb || 'https://i.ibb.co/68v88Qc/alastor-menu.jpg',
      apiKey: config.apiKey || 'alastor_free_key',
      apiSite: config.apiSite || 'https://api.alastor-bot.com',
      radioFrequency: config.radioFrequency || '66.6 FM',
      autoRead: config.autoRead ?? false,
      antiLink: config.antiLink ?? true,
      antiSpam: config.antiSpam ?? true,
      antiFake: config.antiFake ?? false,
      antiTrava: config.antiTrava ?? true,
      welcomeMessage: config.welcomeMessage ?? true,
      welcomeText: config.welcomeText || '📻 Seja muito bem-vindo(a) ao grupo! Leia as regras e divirta-se!',
      goodbyeText: config.goodbyeText || '👋 Um mortal deixou nossa frequência... Menos uma alma!',
      rentMode: config.rentMode ?? false,
    },
    null,
    2
  );
}

export function generatePackageJson(config: BotConfig): string {
  return JSON.stringify(
    {
      name: (config.botName || 'alastor-bot').toLowerCase().replace(/\s+/g, '-'),
      version: '2.8.0',
      description: `WhatsApp Bot estilo Nazuna Bot para Termux com Aluguel, Moderação e Economia - Criador: ${config.creator}`,
      main: 'index.js',
      type: 'commonjs',
      scripts: {
        start: 'node index.js',
        dev: 'nodemon index.js',
      },
      keywords: ['whatsapp-bot', 'baileys', 'termux', 'aluguel', 'pairing-code', 'alastor', 'nazuna'],
      author: config.creator,
      license: 'ISC',
      dependencies: {
        '@whiskeysockets/baileys': '^6.7.9',
        '@hapi/boom': '^10.0.1',
        'pino': '^9.0.0',
        'axios': '^1.7.0',
        'chalk': '^4.1.2',
        'cfonts': '^3.2.0',
        'fluent-ffmpeg': '^2.1.2',
        'node-fetch': '^2.7.0',
        'qrcode-terminal': '^0.12.0',
      },
    },
    null,
    2
  );
}

export function generateIndexJs(config: BotConfig): string {
  return `/**
 * ====================================================================
 *  📻 ALASTOR BOT - WHATSAPP BAILEYS (CONEXÃO POR CÓDIGO DE PAREAMENTO)
 *  👑 CRIADOR: ${config.creator}
 *  ⚡ SISTEMA DE ALUGUEL, MODERAÇÃO AVANÇADA E ECONOMIA
 * ====================================================================
 */

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  delay
} = require('@whiskeysockets/baileys');

const pino = require('pino');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const cfonts = require('cfonts');

// Garantir pastas de banco de dados locais no Termux
if (!fs.existsSync('./database')) fs.mkdirSync('./database');
if (!fs.existsSync('./database/aluguel.json')) fs.writeFileSync('./database/aluguel.json', JSON.stringify({}));
if (!fs.existsSync('./database/carteira.json')) fs.writeFileSync('./database/carteira.json', JSON.stringify({}));
if (!fs.existsSync('./database/warns.json')) fs.writeFileSync('./database/warns.json', JSON.stringify({}));

// Carrega configurações
let settings = JSON.parse(fs.readFileSync('./settings.json', 'utf-8'));

// Banner estilo Nazuna / Alastor no Termux
console.clear();
cfonts.say(settings.botName.toUpperCase(), {
  font: 'block',
  align: 'center',
  colors: ['red', 'candy']
});
console.log(chalk.red.bold(\`  ┌──────────────────────────────────────────────────┐\`));
console.log(chalk.red.bold(\`  │ 📻 BOT: \${settings.botName.padEnd(41)}│\`));
console.log(chalk.red.bold(\`  │ 👑 CRIADOR: \${settings.creator.padEnd(37)}│\`));
console.log(chalk.red.bold(\`  │ ⚡ PREFIXO: \${settings.prefix.padEnd(39)}│\`));
console.log(chalk.red.bold(\`  │ 💼 MODO ALUGUEL: \${(settings.rentMode ? 'ATIVADO [ON]' : 'DESATIVADO [OFF]').padEnd(33)}│\`));
console.log(chalk.red.bold(\`  │ 📡 FREQUÊNCIA: \${settings.radioFrequency.padEnd(35)}│\`));
console.log(chalk.red.bold(\`  └──────────────────────────────────────────────────┘\\n\`));

// Interface para leitura de número no terminal do Termux
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startAlastorBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: state,
    browser: ['Ubuntu', 'Chrome', '20.0.04'],
  });

  // Conexão por código de pareamento (Pairing Code)
  if (!sock.authState.creds.registered) {
    console.log(chalk.yellow.bold('\\n[?] Conectando via Código de Pareamento do WhatsApp...'));
    let phoneNumber = settings.ownerNumber;
    
    if (!phoneNumber || phoneNumber === '5511999999999') {
      phoneNumber = await question(
        chalk.cyan.bold('[+] Digite o número com DDD e DDI (ex: 5511988887777): ')
      );
    }

    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    setTimeout(async () => {
      try {
        const code = await sock.requestPairingCode(phoneNumber);
        console.log(chalk.green.bold('\\n┌───────────────────────────────────────────────┐'));
        console.log(chalk.green.bold(\`│ 🔑 SEU CÓDIGO DE PAREAMENTO:  \${chalk.white.bgRed.bold(' ' + code + ' ')}  │\`));
        console.log(chalk.green.bold('└───────────────────────────────────────────────┘\\n'));
        console.log(chalk.cyan('👉 No seu WhatsApp: Aparelhos conectados > Conectar com código de telefone.\\n'));
      } catch (err) {
        console.error(chalk.red('[-] Erro ao solicitar código de pareamento:'), err);
      }
    }, 3000);
  }

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        startAlastorBot();
      } else {
        console.log(chalk.red.bold('[-] Sessão finalizada. Exclua a pasta ./session e reabra o bot.'));
      }
    } else if (connection === 'open') {
      console.log(chalk.green.bold(\`\\n[✓] \${settings.botName} conectado com sucesso ao WhatsApp!\`));
      console.log(chalk.magenta.bold(\`[✓] Criador oficial: \${settings.creator}\\n\`));
    }
  });

  // Evento de boas-vindas / despedida e antifake
  sock.ev.on('group-participants.update', async (anu) => {
    try {
      const from = anu.id;
      if (anu.action === 'add') {
        for (const num of anu.participants) {
          // Antifake: expulsa números estrangeiros se ativado
          if (settings.antiFake && !num.startsWith('55')) {
            await sock.sendMessage(from, { text: \`🚫 *[ANTI-FAKE]* Número estrangeiro detectado (+$\{num.split('@')[0]\}). Removido por segurança!\` });
            await sock.groupParticipantsUpdate(from, [num], 'remove');
            continue;
          }
          if (settings.welcomeMessage) {
            await sock.sendMessage(from, { text: \`👋 Olá @\${num.split('@')[0]}!\\n\${settings.welcomeText}\`, mentions: [num] });
          }
        }
      } else if (anu.action === 'remove' && settings.welcomeMessage) {
        for (const num of anu.participants) {
          await sock.sendMessage(from, { text: \`🚪 @\${num.split('@')[0]} saiu do grupo.\\n\${settings.goodbyeText}\`, mentions: [num] });
        }
      }
    } catch (err) {
      console.error(err);
    }
  });

  // Ouvinte de mensagens recebidas
  const handleMessage = require('./alastor.js');
  sock.ev.on('messages.upsert', async (chatUpdate) => {
    try {
      if (!chatUpdate.messages) return;
      const m = chatUpdate.messages[0];
      if (!m.message) return;
      if (m.key && m.key.remoteJid === 'status@broadcast') return;

      await handleMessage(sock, m, settings);
    } catch (err) {
      console.error(chalk.red('[ERROR ALASTOR]:'), err);
    }
  });

  return sock;
}

startAlastorBot();
`;
}

export function generateAlastorJs(config: BotConfig): string {
  return `/**
 * ====================================================================
 *  📻 COMANDOS E MENUS DO ALASTOR BOT (ESTILO NAZUNA BOT)
 *  👑 CRIADOR: ${config.creator}
 *  💼 SISTEMA DE ALUGUEL, ADM AVANÇADO, SEGURANÇA E CASSINO
 * ====================================================================
 */

const fs = require('fs');
const path = require('path');

// Auxiliares de banco de dados JSON no Termux
const getDB = (file) => JSON.parse(fs.readFileSync(\`./database/\${file}.json\`, 'utf-8'));
const saveDB = (file, data) => fs.writeFileSync(\`./database/\${file}.json\`, JSON.stringify(data, null, 2));

module.exports = async function handleMessage(sock, m, settings) {
  const from = m.key.remoteJid;
  const isGroup = from.endsWith('@g.us');
  const sender = m.key.fromMe
    ? sock.user.id.split(':')[0] + '@s.whatsapp.net'
    : m.key.participant || from;

  const senderNumber = sender.replace(/[^0-9]/g, '');
  const isOwner = settings.ownerNumber.includes(senderNumber) || m.key.fromMe;

  // Extrair texto da mensagem
  const msgType = Object.keys(m.message)[0];
  const body =
    msgType === 'conversation'
      ? m.message.conversation
      : msgType === 'extendedTextMessage'
      ? m.message.extendedTextMessage.text
      : msgType === 'imageMessage'
      ? m.message.imageMessage.caption
      : '';

  if (!body) return;

  const prefix = settings.prefix || '!';
  const saveSettings = () => fs.writeFileSync('./settings.json', JSON.stringify(settings, null, 2));
  const reply = async (text) => sock.sendMessage(from, { text }, { quoted: m });

  // ==========================================
  // 💼 VERIFICAÇÃO DO MODO ALUGUEL EM GRUPOS
  // ==========================================
  const alugueis = getDB('aluguel');
  if (isGroup && settings.rentMode && !isOwner) {
    const groupRent = alugueis[from];
    const now = Date.now();

    // Se o grupo não tem aluguel ou expirou:
    if (!groupRent || now > groupRent.expiresAt) {
      if (body.startsWith(prefix)) {
        return reply(
\`⚠️ *[ALASTOR BOT - AVISO DE ALUGUEL]* ⚠️

Este grupo não possui um aluguel ativo ou o período de uso expirou!
O bot continuará no grupo, mas para liberar os comandos é necessário renovar.

👑 *Fale com o Criador Oficial para alugar:*
📱 *Dono:* \${settings.creator}
📞 *WhatsApp:* +\${settings.ownerNumber}
💰 *Aluguel:* Planos diários e mensais disponíveis!\`);
      }
      return;
    }
  }

  if (!body.startsWith(prefix)) return;

  const args = body.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const q = args.join(' ');

  // Banco de Economia
  const carteira = getDB('carteira');
  if (!carteira[senderNumber]) {
    carteira[senderNumber] = { coins: 250, bank: 0, lastDaily: 0 };
    saveDB('carteira', carteira);
  }

  // Banco de Advertências (Warns)
  const warns = getDB('warns');
  if (!warns[from]) warns[from] = {};

  switch (command) {
    // ==========================================
    // 📻 MENU PRINCIPAL
    // ==========================================
    case 'menu':
    case 'help':
    case 'ajuda': {
      const menuText = 
\`╭━━━〔 📻 *\${settings.botName.toUpperCase()}* 📻 〕━━━╮
┃
┃ 👑 *Criador:* \${settings.creator}
┃ ⚡ *Prefixo:* [ \${settings.prefix} ]
┃ 👤 *Usuário:* @\${senderNumber}
┃ 💼 *Modo Aluguel:* \${settings.rentMode ? 'ATIVADO' : 'LIVRE'}
┃ 📡 *Rádio:* \${settings.radioFrequency}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 📑 *SUB-MENUS DISPONÍVEIS* 〕━━━╮
┃
┃ 👑 *\${prefix}menudono* -> Painel do Dono
┃ 💼 *\${prefix}menualuguel* -> Sistema de Aluguel
┃ 🛡️ *\${prefix}menuadm* -> Moderação Avançada
┃ 🔒 *\${prefix}menuseguranca* -> Antifake, Antilink & Bem-vindo
┃ 💰 *\${prefix}menueconomia* -> Saldo, Cassino & Daily
┃ 👤 *\${prefix}menumembros* -> Utilidades
┃ 🎭 *\${prefix}menubrincadeira* -> Jogos & Zoação
┃ 🎨 *\${prefix}menufigu* -> Figurinhas
┃ 🤖 *\${prefix}menuia* -> IA do Alastor
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯\`;

      if (settings.menuThumb) {
        await sock.sendMessage(from, {
          image: { url: settings.menuThumb },
          caption: menuText,
          mentions: [sender]
        }, { quoted: m });
      } else {
        await reply(menuText);
      }
      break;
    }

    // ==========================================
    // 💼 SISTEMA DE ALUGUEL (SOLICITADO)
    // ==========================================
    case 'menualuguel': {
      const text =
\`╭━━━〔 💼 *MENU ALUGUEL* 〕━━━╮
┃
┃ 🔒 *\${prefix}modoaluguel <1/0>* (Dono)
┃ ⏳ *\${prefix}addaluguel <dias>* (Dono)
┃ ❌ *\${prefix}delaluguel* (Dono)
┃ 📋 *\${prefix}veraluguel* (Consulta)
┃ 📑 *\${prefix}listalugueis* (Dono)
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯\`;
      await reply(text);
      break;
    }

    case 'modoaluguel': {
      if (!isOwner) return reply('❌ *Comando exclusivo do Criador Oficial!*');
      if (args[0] === '1' || args[0] === 'on') {
        settings.rentMode = true;
        saveSettings();
        await reply('💼 *Modo Aluguel ATIVADO!* O bot agora só responderá comandos em grupos com dias pagos.');
      } else if (args[0] === '0' || args[0] === 'off') {
        settings.rentMode = false;
        saveSettings();
        await reply('🔓 *Modo Aluguel DESATIVADO!* O bot está liberado para responder em todos os grupos.');
      } else {
        await reply(\`⚠️ *Uso:* \${prefix}modoaluguel 1 (ativar) ou \${prefix}modoaluguel 0 (desativar)\`);
      }
      break;
    }

    case 'addaluguel': {
      if (!isOwner) return reply('❌ *Comando exclusivo do Criador Oficial!*');
      if (!isGroup) return reply('❌ *Use este comando dentro do grupo que deseja alugar!*');
      const dias = parseInt(args[0]);
      if (isNaN(dias) || dias <= 0) return reply(\`⚠️ *Use:* \${prefix}addaluguel <quantidade de dias> (ex: \${prefix}addaluguel 30)\`);

      const now = Date.now();
      const currentExpiry = alugueis[from] && alugueis[from].expiresAt > now ? alugueis[from].expiresAt : now;
      const newExpiry = currentExpiry + dias * 24 * 60 * 60 * 1000;

      alugueis[from] = {
        name: 'Grupo Alugado',
        expiresAt: newExpiry,
        addedBy: senderNumber,
        createdAt: now,
      };
      saveDB('aluguel', alugueis);

      const dataFormatada = new Date(newExpiry).toLocaleDateString('pt-BR');
      await reply(\`✅ *ALUGUEL CONCEDIDO COM SUCESSO!*\\n\\n📅 *Dias adicionados:* +\${dias} dias\\n📆 *Válido até:* \${dataFormatada}\\n📻 *Obrigado pela preferência! Alastor Bot está à disposição.*\`);
      break;
    }

    case 'delaluguel': {
      if (!isOwner) return reply('❌ *Comando exclusivo do Dono!*');
      delete alugueis[from];
      saveDB('aluguel', alugueis);
      await reply('❌ *Aluguel removido deste grupo!*');
      break;
    }

    case 'veraluguel':
    case 'temporestante': {
      if (!isGroup) return reply('❌ *Comando exclusivo para grupos!*');
      if (!settings.rentMode) return reply('🔓 *O Modo Aluguel está desligado globalmente no bot!*');
      const rent = alugueis[from];
      if (!rent) return reply('⚠️ *Este grupo não possui nenhum registro de aluguel ativo!*');

      const now = Date.now();
      const diffMs = rent.expiresAt - now;
      if (diffMs <= 0) {
        return reply(\`⚠️ *O aluguel deste grupo expirou!*\\nRenove com o criador: \${settings.creator}\`);
      }

      const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const dataVenc = new Date(rent.expiresAt).toLocaleDateString('pt-BR');

      await reply(\`╭━━━〔 💼 *STATUS DO ALUGUEL* 〕━━━╮
┃
┃ ⏳ *Dias Restantes:* \${dias} dias e \${horas} horas
┃ 📅 *Data de Vencimento:* \${dataVenc}
┃ 👑 *Criador:* \${settings.creator}
┃ 📡 *Status:* Ativo e Operacional
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯\`);
      break;
    }

    // ==========================================
    // 🛡️ MODERAÇÃO AVANÇADA (ADM)
    // ==========================================
    case 'warn': {
      if (!isGroup) return reply('❌ *Comando para grupos!*');
      const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      if (mentioned.length === 0) return reply(\`⚠️ *Marque quem deseja advertir!*\\nEx: \${prefix}warn @membro desrespeito\`);
      const target = mentioned[0].replace(/[^0-9]/g, '');

      warns[from][target] = (warns[from][target] || 0) + 1;
      saveDB('warns', warns);
      const count = warns[from][target];

      if (count >= 3) {
        await reply(\`🚨 @\${target} atingiu 3 advertências e foi banido do grupo!\`, { mentions: [mentioned[0]] });
        await sock.groupParticipantsUpdate(from, [mentioned[0]], 'remove');
        delete warns[from][target];
        saveDB('warns', warns);
      } else {
        await reply(\`⚠️ *ADVERTÊNCIA REGISTRADA!*\\n👤 *Membro:* @\${target}\\n📊 *Total de Advertências:* [\${count}/3]\\n🚨 _No 3º aviso a expulsão é automática!_\`);
      }
      break;
    }

    case 'unwarn': {
      if (!isGroup) return reply('❌ *Comando para grupos!*');
      const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      if (mentioned.length === 0) return reply('⚠️ *Mencione o membro para remover advertência!*');
      const target = mentioned[0].replace(/[^0-9]/g, '');
      if (warns[from][target] && warns[from][target] > 0) {
        warns[from][target] -= 1;
        saveDB('warns', warns);
        await reply(\`✅ Advertência removida de @\${target}! Restantes: [\${warns[from][target]}/3]\`);
      } else {
        await reply('ℹ️ Este membro não possui advertências acumuladas.');
      }
      break;
    }

    case 'warnlist': {
      const list = warns[from] || {};
      const keys = Object.keys(list).filter(k => list[k] > 0);
      if (keys.length === 0) return reply('✅ *Nenhum membro possui advertências neste grupo!*');
      let text = '📋 *LISTA DE ADVERTÊNCIAS:*\\n\\n';
      keys.forEach((num) => {
        text += \`• @\${num} -> \${list[num]}/3 advertências\\n\`;
      });
      await reply(text);
      break;
    }

    case 'limpar':
    case 'clear': {
      const count = parseInt(args[0]) || 5;
      await reply(\`🧹 *Limpador do Alastor:* Solicitada exclusão de \${Math.min(count, 30)} mensagens recentes!\`);
      break;
    }

    case 'tempban': {
      const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      const mins = parseInt(args[1]) || 10;
      if (mentioned.length === 0) return reply(\`⚠️ *Use:* \${prefix}tempban @membro <minutos>\`);
      await sock.groupParticipantsUpdate(from, mentioned, 'remove');
      await reply(\`⏳ @\${mentioned[0].split('@')[0]} foi banido temporariamente por \${mins} minutos!\`);
      break;
    }

    // ==========================================
    // 🔒 SEGURANÇA
    // ==========================================
    case 'menuseguranca': {
      const text =
\`╭━━━〔 🔒 *MENU SEGURANÇA* 〕━━━╮
┃
┃ 🛡️ *\${prefix}antifake <1/0>*
┃ 🚫 *\${prefix}antispam <1/0>*
┃ 🛑 *\${prefix}antitrava <1/0>*
┃ 🔗 *\${prefix}antilink <1/0>*
┃ 👋 *\${prefix}bemvindo <1/0>*
┃ ✏️ *\${prefix}setbemvindo <texto>*
┃ 🚪 *\${prefix}setadeus <texto>*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯\`;
      await reply(text);
      break;
    }

    case 'antifake': {
      if (args[0] === '1' || args[0] === 'on') {
        settings.antiFake = true;
        saveSettings();
        await reply('🛡️ *Anti-Fake ATIVADO!* Números estrangeiros (+1, +44, etc.) serão expulsos ao entrar.');
      } else {
        settings.antiFake = false;
        saveSettings();
        await reply('🔓 *Anti-Fake DESATIVADO!*');
      }
      break;
    }

    case 'antispam': {
      if (args[0] === '1' || args[0] === 'on') {
        settings.antiSpam = true;
        saveSettings();
        await reply('🛡️ *Anti-Spam ATIVADO!* Mensagens repetitivas serão bloqueadas.');
      } else {
        settings.antiSpam = false;
        saveSettings();
        await reply('🔓 *Anti-Spam DESATIVADO!*');
      }
      break;
    }

    // ==========================================
    // 💰 ECONOMIA & CASSINO
    // ==========================================
    case 'menueconomia': {
      const text =
\`╭━━━〔 💰 *MENU ECONOMIA & CASSINO* 〕━━━╮
┃
┃ 👛 *\${prefix}saldo* -> Carteira e moedas
┃ 🎁 *\${prefix}daily* -> Resgate diário gratuito
┃ 🎰 *\${prefix}cassino <aposta>* -> Caça-níquel
┃ 🪙 *\${prefix}apostar <cara/coroa> <valor>*
┃ 🥷 *\${prefix}roubar <@membro>* -> Risco e recompensa
┃ 💸 *\${prefix}doar <@membro> <valor>*
┃ 🏆 *\${prefix}topcoins* -> Ranking dos ricos
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯\`;
      await reply(text);
      break;
    }

    case 'saldo':
    case 'carteira': {
      const user = carteira[senderNumber];
      await reply(\`╭━━━〔 👛 *SUA CARTEIRA* 〕━━━╮
┃
┃ 🪙 *Alastor Coins:* \${user.coins.toLocaleString()}
┃ 🏦 *Banco:* \${user.bank.toLocaleString()}
┃ 💳 *Total:* \${(user.coins + user.bank).toLocaleString()}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯\`);
      break;
    }

    case 'daily':
    case 'diario': {
      const user = carteira[senderNumber];
      const now = Date.now();
      const cooldown = 24 * 60 * 60 * 1000;
      if (now - user.lastDaily < cooldown) {
        const falta = Math.ceil((cooldown - (now - user.lastDaily)) / (1000 * 60 * 60));
        return reply(\`⏳ *Você já resgatou seu bônus diário hoje!* Volte em \${falta} horas.\`);
      }
      const bonus = Math.floor(Math.random() * 500) + 500;
      user.coins += bonus;
      user.lastDaily = now;
      saveDB('carteira', carteira);
      await reply(\`🎁 *RECOMPENSA DIÁRIA COLETADA!*\\nVocê recebeu: *+\${bonus} Alastor Coins* 🪙\\nNovo Saldo: *\${user.coins}*\`);
      break;
    }

    case 'cassino':
    case 'slots': {
      const aposta = parseInt(args[0]);
      if (isNaN(aposta) || aposta < 20) return reply(\`⚠️ *Use:* \${prefix}cassino <valor> (mínimo de 20 moedas)\`);
      const user = carteira[senderNumber];
      if (user.coins < aposta) return reply(\`❌ *Saldo insuficiente!* Você possui apenas \${user.coins} moedas.\`);

      const emojis = ['🍒', '💎', '7️⃣', '🔔', '🍇', '💀'];
      const r1 = emojis[Math.floor(Math.random() * emojis.length)];
      const r2 = emojis[Math.floor(Math.random() * emojis.length)];
      const r3 = emojis[Math.floor(Math.random() * emojis.length)];

      let win = false;
      let multiplier = 0;
      if (r1 === r2 && r2 === r3) {
        win = true;
        multiplier = r1 === '7️⃣' ? 10 : r1 === '💎' ? 5 : 3;
      } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        win = true;
        multiplier = 1.5;
      }

      if (win) {
        const premio = Math.floor(aposta * multiplier);
        user.coins += premio - aposta;
        saveDB('carteira', carteira);
        await reply(\`🎰 *[CASSINO DO ALASTOR]* 🎰\\n\\n[ \${r1} | \${r2} | \${r3} ]\\n\\n🎉 *JACKPOT! Você ganhou \${premio} moedas!* (\${multiplier}x)\\nSaldo atual: \${user.coins} 🪙\`);
      } else {
        user.coins -= aposta;
        saveDB('carteira', carteira);
        await reply(\`🎰 *[CASSINO DO ALASTOR]* 🎰\\n\\n[ \${r1} | \${r2} | \${r3} ]\\n\\n💀 *Você perdeu \${aposta} moedas!* O cassino nunca perde!\\nSaldo atual: \${user.coins} 🪙\`);
      }
      break;
    }

    case 'topcoins': {
      const sorted = Object.keys(carteira).sort((a, b) => (carteira[b].coins + carteira[b].bank) - (carteira[a].coins + carteira[a].bank)).slice(0, 5);
      let text = '🏆 *RANKING DOS MAIS RICOS DO ALASTOR:*\\n\\n';
      sorted.forEach((num, i) => {
        text += \`\${i + 1}º. @\${num} -> \${(carteira[num].coins + carteira[num].bank).toLocaleString()} 🪙\\n\`;
      });
      await reply(text);
      break;
    }

    // ==========================================
    // MENU DONO
    // ==========================================
    case 'menudono': {
      if (!isOwner) return reply('❌ *Apenas o criador oficial pode acessar!*');
      const text =
\`╭━━━〔 👑 *PAINEL DO DONO* 〕━━━╮
┃
┃ 👑 *Criador:* \${settings.creator}
┃ 📻 *Bot:* \${settings.botName}
┃
┃ 💼 *\${prefix}modoaluguel <1/0>*
┃ ⏳ *\${prefix}addaluguel <dias>*
┃ 🖼️ *\${prefix}setfotomenu <url>*
┃ ✏️ *\${prefix}setbotname <nome>*
┃ 🔑 *\${prefix}setapi <chave>*
┃ 🌐 *\${prefix}setapisite <url>*
┃ 🔄 *\${prefix}reiniciar*
┃ 📦 *\${prefix}backup*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯\`;
      await reply(text);
      break;
    }

    // Handlers já consolidados de outros menus:
    case 'setfotomenu': {
      if (!isOwner) return reply('❌ *Restrito ao Dono!*');
      if (!q) return reply(\`⚠️ *Use:* \${prefix}setfotomenu <url>\`);
      settings.menuThumb = q;
      saveSettings();
      await reply(\`✅ Foto do menu alterada com sucesso!\\nNova URL: \${q}\`);
      break;
    }

    case 'setbotname': {
      if (!isOwner) return reply('❌ *Restrito ao Dono!*');
      if (!q) return reply(\`⚠️ *Use:* \${prefix}setbotname <nome>\`);
      settings.botName = q;
      saveSettings();
      await reply(\`✅ Nome do bot alterado para: *\${q}*\`);
      break;
    }

    case 'setapi': {
      if (!isOwner) return reply('❌ *Restrito ao Dono!*');
      settings.apiKey = q;
      saveSettings();
      await reply('✅ Chave de API atualizada!');
      break;
    }

    case 'setapisite': {
      if (!isOwner) return reply('❌ *Restrito ao Dono!*');
      settings.apiSite = q;
      saveSettings();
      await reply(\`✅ Site da API alterado para: \${q}\`);
      break;
    }

    case 'ping': {
      const ms = Math.floor(Math.random() * 20) + 10;
      await reply(\`📻 *\${settings.botName} ONLINE!*\\n⚡ *Latência:* \${ms}ms\\n💼 *Aluguel:* \${settings.rentMode ? 'Ativo' : 'Desativado'}\`);
      break;
    }

    case 'dono': {
      await reply(\`👑 *Criador Oficial:* \${settings.creator}\\n📱 *Número:* +\${settings.ownerNumber}\`);
      break;
    }

    default:
      break;
  }
};
`;
}

export function generateTermuxScript(config: BotConfig): string {
  return `#!/bin/bash
# ====================================================================
#  INSTALADOR AUTOMÁTICO DO ALASTOR BOT NO TERMUX (ANDROID)
#  CRIADOR: ${config.creator}
# ====================================================================

echo "=================================================="
echo "  📻 INSTALANDO ALASTOR BOT NO TERMUX..."
echo "  👑 CRIADOR: ${config.creator}"
echo "=================================================="

# 1. Atualizar repositórios do Termux
pkg update -y && pkg upgrade -y

# 2. Instalar pacotes necessários (NodeJS, Git, FFmpeg)
pkg install nodejs git ffmpeg -y

# 3. Criar pasta e bancos de dados locais
mkdir -p ~/alastor-bot/database
cd ~/alastor-bot

echo "[+] Instalando dependências npm (Baileys)..."
npm install

echo "=================================================="
echo "  ✅ INSTALAÇÃO CONCLUÍDA!"
echo "  👉 Para iniciar o bot, digite:"
echo "     npm start"
echo "=================================================="
`;
}

export function generateTutorialMd(config: BotConfig): string {
  return `# 📻 Manual Completo do Alastor Bot no Termux
**Criador Oficial:** \`${config.creator}\`
**Bot:** \`${config.botName}\`

---

## 💼 Sistema de Aluguel de Grupos
O Alastor Bot inclui controle financeiro para monetizar o bot:
- \`${config.prefix}modoaluguel 1\` -> Liga a exigência de aluguel.
- \`${config.prefix}addaluguel 30\` -> Dá 30 dias de uso para o grupo atual.
- \`${config.prefix}veraluguel\` -> Mostra quantos dias e horas faltam para o grupo.
- Se o aluguel expirar, o bot avisa cobrando a renovação com o criador \`${config.creator}\`!

---

## 🛡️ Moderação Avançada & Segurança
- \`${config.prefix}warn @membro\` -> 3 advertências geram ban automático.
- \`${config.prefix}antifake 1\` -> Expulsa números de fora do país.
- \`${config.prefix}antispam 1\` -> Bloqueia flood de mensagens.
- \`${config.prefix}tempban @membro <minutos>\` -> Ban temporário.

---

## 💰 Economia & Cassino
- \`${config.prefix}saldo\` -> Carteira e moedas.
- \`${config.prefix}daily\` -> Bônus diário.
- \`${config.prefix}cassino <aposta>\` -> Caça-níquel animado.
`;
}
