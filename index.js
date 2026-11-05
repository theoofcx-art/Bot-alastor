/**
 * ====================================================================
 *  📻 ALASTOR BOT - WHATSAPP BAILEYS (CONEXÃO POR CÓDIGO DE PAREAMENTO)
 *  👑 CRIADOR: © ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪
 *  🌐 REPOSITÓRIO: https://github.com/theoofcx-art/Bot-alastor
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
console.log(chalk.red.bold(`  ┌──────────────────────────────────────────────────┐`));
console.log(chalk.red.bold(`  │ 📻 BOT: ${settings.botName.padEnd(41)}│`));
console.log(chalk.red.bold(`  │ 👑 CRIADOR: ${settings.creator.padEnd(37)}│`));
console.log(chalk.red.bold(`  │ ⚡ PREFIXO: ${settings.prefix.padEnd(39)}│`));
console.log(chalk.red.bold(`  │ 💼 MODO ALUGUEL: ${(settings.rentMode ? 'ATIVADO [ON]' : 'DESATIVADO [OFF]').padEnd(33)}│`));
console.log(chalk.red.bold(`  │ 📡 FREQUÊNCIA: ${settings.radioFrequency.padEnd(35)}│`));
console.log(chalk.red.bold(`  │ 🌐 GITHUB: https://github.com/theoofcx-art/Bot-alastor │`));
console.log(chalk.red.bold(`  └──────────────────────────────────────────────────┘\n`));

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
    console.log(chalk.yellow.bold('\n[?] Conectando via Código de Pareamento do WhatsApp...'));
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
        console.log(chalk.green.bold('\n┌───────────────────────────────────────────────┐'));
        console.log(chalk.green.bold(`│ 🔑 SEU CÓDIGO DE PAREAMENTO:  ${chalk.white.bgRed.bold(' ' + code + ' ')}  │`));
        console.log(chalk.green.bold('└───────────────────────────────────────────────┘\n'));
        console.log(chalk.cyan('👉 No seu WhatsApp: Aparelhos conectados > Conectar com código de telefone.\n'));
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
      console.log(chalk.green.bold(`\n[✓] ${settings.botName} conectado com sucesso ao WhatsApp!`));
      console.log(chalk.magenta.bold(`[✓] Criador oficial: ${settings.creator}\n`));
    }
  });

  // Evento de boas-vindas / despedida e antifake
  sock.ev.on('group-participants.update', async (anu) => {
    try {
      const from = anu.id;
      if (anu.action === 'add') {
        for (const num of anu.participants) {
          if (settings.antiFake && !num.startsWith('55')) {
            await sock.sendMessage(from, { text: `🚫 *[ANTI-FAKE]* Número estrangeiro detectado (+${num.split('@')[0]}). Removido por segurança!` });
            await sock.groupParticipantsUpdate(from, [num], 'remove');
            continue;
          }
          if (settings.welcomeMessage) {
            await sock.sendMessage(from, { text: `👋 Olá @${num.split('@')[0]}!\n${settings.welcomeText}`, mentions: [num] });
          }
        }
      } else if (anu.action === 'remove' && settings.welcomeMessage) {
        for (const num of anu.participants) {
          await sock.sendMessage(from, { text: `🚪 @${num.split('@')[0]} saiu do grupo.\n${settings.goodbyeText}`, mentions: [num] });
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
