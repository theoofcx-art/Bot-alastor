/**
 * ============================================================================
 *  📻 ALASTOR BOT - MULTI-DEVICE (Inspirado no Nazuna Bot de DevTokyoVx/nazuna)
 *  👑 CRIADOR OFICIAL: © ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪
 *  🌐 REPOSITÓRIO: https://github.com/theoofcx-art/Bot-alastor
 * ============================================================================
 */

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  Browsers,
  delay
} = require('@whiskeysockets/baileys');
const P = require('pino');
const cfonts = require('cfonts');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { Boom } = require('@hapi/boom');

// Carregar configurações
const settingsPath = path.resolve(__dirname, 'settings.json');
let settings = {
  botName: 'Alastor',
  creator: '© ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪',
  ownerNumber: '5511999999999',
  prefix: '!',
  menuThumb: 'https://i.ibb.co/68v88Qc/alastor-menu.jpg',
  welcomeMessage: true
};

if (fs.existsSync(settingsPath)) {
  try {
    settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  } catch (e) {
    console.error('Erro ao ler settings.json:', e);
  }
}

// Handler de comandos do bot
const alastorHandler = require('./alastor.js');

// Interface de linha de comando para pareamento (Padrão Nazuna Bot)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startAlastor() {
  console.clear();

  // Banner no estilo Nazuna Bot (DevTokyoVx/nazuna)
  cfonts.say('ALASTOR', {
    font: 'block',
    align: 'center',
    colors: ['red', 'white']
  });

  cfonts.say(`Criador: ${settings.creator}\nBot 100% Editavel e Descriptografado`, {
    font: 'console',
    align: 'center',
    colors: ['magenta']
  });

  console.log(chalk.red.bold('═'.repeat(60)));
  console.log(chalk.cyan.bold(`  [+] Nome do Bot: `) + chalk.white.bold(settings.botName));
  console.log(chalk.cyan.bold(`  [+] Prefixo:     `) + chalk.yellow.bold(settings.prefix));
  console.log(chalk.cyan.bold(`  [+] Criador:     `) + chalk.white.bold(settings.creator));
  console.log(chalk.cyan.bold(`  [+] GitHub:      `) + chalk.underline.cyan('https://github.com/theoofcx-art/Bot-alastor'));
  console.log(chalk.red.bold('═'.repeat(60)) + '\n');

  // Diretório de sessão estilo Nazuna
  const sessionDir = path.resolve(__dirname, 'session');
  if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
  }

  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
  const { version, isLatest } = await fetchLatestBaileysVersion();

  console.log(chalk.gray(`[INFO] Usando Baileys v${version.join('.')} (Última versão: ${isLatest})`));

  let usePairingCode = false;
  let phoneNumber = '';

  // Se já tem credenciais salvas, conecta direto sem perguntar
  const credsFile = path.join(sessionDir, 'creds.json');
  const hasExistingSession = fs.existsSync(credsFile);

  if (!hasExistingSession) {
    console.log(chalk.yellow.bold('\nSelecione o método de conexão (Padrão Nazuna Bot):'));
    console.log(chalk.white(' [01] ') + chalk.cyan('Conectar via QR Code (Requer 2 aparelhos)'));
    console.log(chalk.white(' [02] ') + chalk.green.bold('Conectar via Código de Pareamento (Recomendado - 8 dígitos)\n'));

    const choice = (await question(chalk.magenta('Digite sua opção [01 ou 02]: '))).trim();

    if (choice === '02' || choice === '2') {
      usePairingCode = true;
      phoneNumber = (await question(chalk.yellow('\nDigite seu número com DDD (ex: 5511999998888): '))).replace(/[^0-9]/g, '');
      if (!phoneNumber) {
        console.log(chalk.red('Número inválido! Usando número do dono em settings.json...'));
        phoneNumber = settings.ownerNumber.replace(/[^0-9]/g, '');
      }
    }
  }

  const sock = makeWASocket({
    version,
    logger: P({ level: 'silent' }),
    printQRInTerminal: !usePairingCode && !hasExistingSession,
    auth: state,
    browser: Browsers.ubuntu('Chrome'),
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 60000,
    keepAliveIntervalMs: 10000,
    generateHighQualityLinkPreview: true,
    syncFullHistory: false
  });

  // Salvar credenciais automaticamente
  sock.ev.on('creds.update', saveCreds);

  // Solicitar código de pareamento estilo Nazuna se escolhido
  if (usePairingCode && !hasExistingSession && !sock.authState.creds.registered) {
    setTimeout(async () => {
      try {
        console.log(chalk.cyan(`\n[+] Solicitando Código de Pareamento para +${phoneNumber}...`));
        const code = await sock.requestPairingCode(phoneNumber);
        const formattedCode = code?.match(/.{1,4}/g)?.join('-') || code;

        console.log('\n' + chalk.bgRed.white.bold('   CÓDIGO DE PAREAMENTO DO ALASTOR BOT   '));
        console.log(chalk.red.bold('╔════════════════════════════════════════╗'));
        console.log(chalk.red.bold('║  SEU CÓDIGO: ') + chalk.greenBright.bold(formattedCode.padEnd(25)) + chalk.red.bold('║'));
        console.log(chalk.red.bold('╚════════════════════════════════════════╝'));
        console.log(chalk.white('👉 No WhatsApp: ') + chalk.yellow('Aparelhos Conectados > Conectar com código de número de telefone\n'));
      } catch (err) {
        console.error(chalk.red('[!] Erro ao gerar código de pareamento:'), err.message || err);
      }
    }, 3000);
  }

  // Monitorar conexão
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr && !usePairingCode) {
      console.log(chalk.cyan('[QR] Escaneie o QR Code acima para conectar.'));
    }

    if (connection === 'open') {
      console.log('\n' + chalk.bgGreen.black.bold('   ALASTOR BOT CONECTADO COM SUCESSO!   \n'));
      console.log(chalk.green(`[✔] Conectado como: ${sock.user?.name || settings.botName} (${sock.user?.id.split(':')[0]})`));
      console.log(chalk.cyan(`[✔] Criador: ${settings.creator}`));
      console.log(chalk.yellow(`[✔] Digite ${settings.prefix}menu no WhatsApp para ver os comandos!\n`));
    }

    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
      console.log(chalk.red(`[-] Conexão encerrada. Motivo: ${reason}`));

      if (reason === DisconnectReason.loggedOut) {
        console.log(chalk.red.bold('[!] Desconectado do WhatsApp. Apagando sessão antiga...'));
        try {
          fs.rmSync(sessionDir, { recursive: true, force: true });
        } catch (_) {}
        startAlastor();
      } else {
        console.log(chalk.yellow('[⟳] Reconectando ao WhatsApp em 3 segundos...'));
        setTimeout(startAlastor, 3000);
      }
    }
  });

  // Mensagens recebidas
  sock.ev.on('messages.upsert', async (chatUpdate) => {
    try {
      if (!chatUpdate.messages) return;
      for (const msg of chatUpdate.messages) {
        if (!msg.message) continue;
        await alastorHandler(sock, msg, settings);
      }
    } catch (err) {
      console.error(chalk.red('[ERRO NO HANDLER]:'), err);
    }
  });

  // Boas-vindas / Saída em grupos
  sock.ev.on('group-participants.update', async (event) => {
    try {
      const { id, participants, action } = event;
      if (!settings.welcomeMessage) return;

      const groupMetadata = await sock.groupMetadata(id).catch(() => null);
      const groupName = groupMetadata?.subject || 'Grupo';

      for (const num of participants) {
        const userTag = `@${num.split('@')[0]}`;

        if (action === 'add') {
          const welcome = `╭┈⊰ 🌸 『 *${settings.botName}* 』\n` +
            `┊ ✨ Seja bem-vindo(a) ${userTag}!\n` +
            `┊ 🏷️ Grupo: *${groupName}*\n` +
            `┊ 📜 Leia as regras e divirta-se!\n` +
            `┊ 👑 Criador: *${settings.creator}*\n` +
            `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;

          await sock.sendMessage(id, {
            text: welcome,
            mentions: [num]
          });
        } else if (action === 'remove') {
          const bye = `╭┈⊰ 🌸 『 *${settings.botName}* 』\n` +
            `┊ 👋 ${userTag} saiu do grupo *${groupName}*.\n` +
            `┊ Menos uma alma na nossa frequência!\n` +
            `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;

          await sock.sendMessage(id, {
            text: bye,
            mentions: [num]
          });
        }
      }
    } catch (e) {
      // Ignora erro de envio de boas-vindas
    }
  });

  return sock;
}

startAlastor().catch((err) => {
  console.error(chalk.red('Erro fatal ao iniciar Alastor Bot:'), err);
});
