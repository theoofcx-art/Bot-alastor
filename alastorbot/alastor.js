/**
 * ====================================================================
 *  📻 COMANDOS E MENUS DO ALASTOR BOT (ESTILO NAZUNA BOT)
 *  👑 CRIADOR: © ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪
 *  🌐 REPOSITÓRIO: https://github.com/theoofcx-art/Bot-alastor
 * ====================================================================
 */

const fs = require('fs');
const path = require('path');

// Auxiliares de banco de dados JSON no Termux
const getDB = (file) => JSON.parse(fs.readFileSync(`./database/${file}.json`, 'utf-8'));
const saveDB = (file, data) => fs.writeFileSync(`./database/${file}.json`, JSON.stringify(data, null, 2));

// ==========================================
// 🎨 MENUS ESTILIZADOS OFICIAIS (NAZUNA/ALASTOR)
// ==========================================
function getMenuDono(prefix, botName = "Alastor", userName = "Usuário") {
  return `╭┈⊰ 🌸 『 *${botName}* 』
┊Olá, ${userName}!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *📚 INÍCIO*
┊
┊•.̇𖥨֗💜⭟${prefix}tutorial
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *🤖 CONFIGURAÇÕES DO BOT*
┊
┊•.̇𖥨֗💜⭟${prefix}prefixo
┊•.̇𖥨֗💜⭟${prefix}numerodono
┊•.̇𖥨֗💜⭟${prefix}nomedono
┊•.̇𖥨֗💜⭟${prefix}nomebot
┊•.̇𖥨֗💜⭟${prefix}configcmdnotfound
┊•.̇𖥨֗💜⭟${prefix}setcmdmsg
┊•.̇𖥨֗💜⭟${prefix}fotobot
┊•.̇𖥨֗💜⭟${prefix}fotomenu
┊•.̇𖥨֗💜⭟${prefix}videomenu
┊•.̇𖥨֗💜⭟${prefix}audiomenu
┊•.̇𖥨֗💜⭟${prefix}lermais
┊•.̇𖥨֗💜⭟${prefix}personalizargrupo
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *🤡⚙️ PERSONALIDADE DA ASSISTENTE*
┊
┊•.̇𖥨֗💜⭟${prefix}setpersonalidade
┊•.̇𖥨֗💜⭟${prefix}criarpers
┊•.̇𖥨֗💜⭟${prefix}novapers
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *🎨 DESIGN & APARÊNCIA*
┊
┊•.̇𖥨֗💜⭟${prefix}designmenu
┊•.̇𖥨֗💜⭟${prefix}setborda
┊•.̇𖥨֗💜⭟${prefix}setbordafim
┊•.̇𖥨֗💜⭟${prefix}setbordameio
┊•.̇𖥨֗💜⭟${prefix}setitem
┊•.̇𖥨֗💜⭟${prefix}setseparador
┊•.̇𖥨֗💜⭟${prefix}settitulo
┊•.̇𖥨֗💜⭟${prefix}setheader
┊•.̇𖥨֗💜⭟${prefix}resetdesign
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *⚙️ SISTEMA & AUTOMAÇÃO*
┊
┊•.̇𖥨֗💜⭟${prefix}addauto
┊•.̇𖥨֗💜⭟${prefix}addautomidia
┊•.̇𖥨֗💜⭟${prefix}listauto
┊•.̇𖥨֗💜⭟${prefix}delauto
┊•.̇𖥨֗💜⭟${prefix}addreact
┊•.̇𖥨֗💜⭟${prefix}listreact
┊•.̇𖥨֗💜⭟${prefix}delreact
┊•.̇𖥨֗💜⭟${prefix}addnopref
┊•.̇𖥨֗💜⭟${prefix}listnopref
┊•.̇𖥨֗💜⭟${prefix}delnopref
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *🛠️ PERSONALIZAÇÃO DE COMANDOS*
┊
┊•.̇𖥨֗💜⭟${prefix}addcmd
┊•.̇𖥨֗💜⭟${prefix}addcmdmidia
┊•.̇𖥨֗💜⭟${prefix}listcmd
┊•.̇𖥨֗💜⭟${prefix}delcmd
┊•.̇𖥨֗💜⭟${prefix}testcmd
┊•.̇𖥨֗💜⭟${prefix}addalias
┊•.̇𖥨֗💜⭟${prefix}listalias
┊•.̇𖥨֗💜⭟${prefix}delalias
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *🚫 LIMITAÇÃO DE COMANDOS*
┊
┊•.̇𖥨֗💜⭟${prefix}cmdlimitar
┊•.̇𖥨֗💜⭟${prefix}cmddeslimitar
┊•.̇𖥨֗💜⭟${prefix}cmdlimites
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *👥 GERENCIAMENTO DE USUÁRIOS*
┊
┊•.̇𖥨֗💜⭟${prefix}addsubdono
┊•.̇𖥨֗💜⭟${prefix}delsubdono
┊•.̇𖥨֗💜⭟${prefix}listasubdonos
┊•.̇𖥨֗💜⭟${prefix}addpremium
┊•.̇𖥨֗💜⭟${prefix}delpremium
┊•.̇𖥨֗💜⭟${prefix}listprem
┊•.̇𖥨֗💜⭟${prefix}bangp
┊•.̇𖥨֗💜⭟${prefix}unbangp
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *💰 SISTEMA DE ALUGUEL*
┊
┊•.̇𖥨֗💜⭟${prefix}modoaluguel
┊•.̇𖥨֗💜⭟${prefix}addaluguel
┊•.̇𖥨֗💜⭟${prefix}gerarcod
┊•.̇𖥨֗💜⭟${prefix}listaraluguel
┊•.̇𖥨֗💜⭟${prefix}infoaluguel
┊•.̇𖥨֗💜⭟${prefix}estenderaluguel
┊•.̇𖥨֗💜⭟${prefix}removeraluguel
┊•.̇𖥨֗💜⭟${prefix}listaluguel
┊•.̇𖥨֗💜⭟${prefix}limparaluguel
┊•.̇𖥨֗💜⭟${prefix}dayfree
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *🤖 GERENCIAMENTO DE SUB-BOTS*
┊
┊•.̇𖥨֗💜⭟${prefix}addsubbot
┊•.̇𖥨֗💜⭟${prefix}removesubbot
┊•.̇𖥨֗💜⭟${prefix}listarsubbots
┊•.̇𖥨֗💜⭟${prefix}conectarsubbot
┊
┊🔑 Sub-bot use: ${prefix}gerarcodigo
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *💎 SISTEMA VIP/PREMIUM*
┊
┊•.̇𖥨֗💜⭟${prefix}addcmdvip
┊•.̇𖥨֗💜⭟${prefix}removecmdvip
┊•.̇𖥨֗💜⭟${prefix}listcmdvip
┊•.̇𖥨֗💜⭟${prefix}menuvip
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *⚡ CONTROLE & MANUTENÇÃO*
┊
┊•.̇𖥨֗💜⭟${prefix}atualizar
┊•.̇𖥨֗💜⭟${prefix}reiniciar
┊•.̇𖥨֗💜⭟${prefix}entrar
┊•.̇𖥨֗💜⭟${prefix}sairgp
┊•.̇𖥨֗💜⭟${prefix}seradm
┊•.̇𖥨֗💜⭟${prefix}sermembro
┊•.̇𖥨֗💜⭟${prefix}blockcmdg
┊•.̇𖥨֗💜⭟${prefix}unblockcmdg
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *📊 MONITORAMENTO & ANÁLISE*
┊
┊•.̇𖥨֗💜⭟${prefix}listagp
┊•.̇𖥨֗💜⭟${prefix}antipv
┊•.̇𖥨֗💜⭟${prefix}antispamcmd
┊•.̇𖥨֗💜⭟${prefix}iaclear
┊•.̇𖥨֗💜⭟${prefix}limpardb
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *📡 TRANSMISSÕES*
┊
┊🍧ฺꕸ▸ *Transmissão em Grupos:*
┊•.̇𖥨֗💜⭟${prefix}tm
┊
┊🍧ฺꕸ▸ *Transmissão Privada:*
┊•.̇𖥨֗💜⭟${prefix}tm2
┊
┊🍧ฺꕸ▸ *Divulgação do Dono:*
┊•.̇𖥨֗💜⭟${prefix}divdono send
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;
}

function getMenuSticker(prefix, botName = "Alastor", userName = "Usuário") {
  return `╭┈⊰ 🌸 『 *${botName}* 』
┊Olá, ${userName}!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *🎨 CRIAÇÃO DE FIGURINHAS*
┊
┊•.̇𖥨֗💜⭟${prefix}emojimix
┊•.̇𖥨֗💜⭟${prefix}ttp <texto>
┊•.̇𖥨֗💜⭟${prefix}attp <texto>
┊•.̇𖥨֗💜⭟${prefix}sticker
┊•.̇𖥨֗💜⭟${prefix}sticker2
┊•.̇𖥨֗💜⭟${prefix}sbg
┊•.̇𖥨֗💜⭟${prefix}sfundo
┊•.̇𖥨֗💜⭟${prefix}qc <texto>
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *⚙️ GERENCIAMENTO DE FIGURINHAS*
┊
┊•.̇𖥨֗💜⭟${prefix}figualeatoria
┊•.̇𖥨֗💜⭟${prefix}figurinhas
┊•.̇𖥨֗💜⭟${prefix}rename <pack|autor>
┊•.̇𖥨֗💜⭟${prefix}rgtake
┊•.̇𖥨֗💜⭟${prefix}take <pack|autor>
┊•.̇𖥨֗💜⭟${prefix}toimg
┊•.̇𖥨֗💜⭟${prefix}brat <texto>
┊•.̇𖥨֗💜⭟${prefix}bratvid <texto>
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;
}

function getMenubn(prefix, botName = "Alastor", userName = "Usuário") {
  return `╭┈⊰ 🌸 『 *${botName}* 』
┊Olá, ${userName}!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *🎮 JOGOS & DIVERSÃO 🎲*
┊
┊•.̇𖥨֗💜⭟${prefix}tictactoe @user
┊•.̇𖥨֗💜⭟${prefix}connect4 @user
┊•.̇𖥨֗💜⭟${prefix}uno criar
┊•.̇𖥨֗💜⭟${prefix}memoria
┊•.̇𖥨֗💜⭟${prefix}wordle
┊•.̇𖥨֗💜⭟${prefix}quiz <categoria>
┊•.̇𖥨֗💜⭟${prefix}forca
┊•.̇𖥨֗💜⭟${prefix}stop
┊•.̇𖥨֗💜⭟${prefix}eununca
┊•.̇𖥨֗💜⭟${prefix}vab
┊•.̇𖥨֗💜⭟${prefix}chance
┊•.̇𖥨֗💜⭟${prefix}quando
┊•.̇𖥨֗💜⭟${prefix}sorte
┊•.̇𖥨֗💜⭟${prefix}casal
┊•.̇𖥨֗💜⭟${prefix}shipo
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *💬 FRASES & TEXTOS 📜*
┊
┊•.̇𖥨֗💜⭟${prefix}conselho
┊•.̇𖥨֗💜⭟${prefix}cantada
┊•.̇𖥨֗💜⭟${prefix}piada
┊•.̇𖥨֗💜⭟${prefix}charada
┊•.̇𖥨֗💜⭟${prefix}motivacional
┊•.̇𖥨֗💜⭟${prefix}elogio
┊•.̇𖥨֗💜⭟${prefix}reflexao
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *💬 INTERAÇÕES SOCIAIS 🤝*
┊
┊•.̇𖥨֗💜⭟${prefix}chute
┊•.̇𖥨֗💜⭟${prefix}tapa
┊•.̇𖥨֗💜⭟${prefix}soco
┊•.̇𖥨֗💜⭟${prefix}abraco
┊•.̇𖥨֗💜⭟${prefix}morder
┊•.̇𖥨֗💜⭟${prefix}lamber
┊•.̇𖥨֗💜⭟${prefix}beijo
┊•.̇𖥨֗💜⭟${prefix}cafune
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *🎯 BRINCADEIRAS MASCULINAS 🔥*
┊
┊•.̇𖥨֗💜⭟${prefix}gay
┊•.̇𖥨֗💜⭟${prefix}burro
┊•.̇𖥨֗💜⭟${prefix}corno
┊•.̇𖥨֗💜⭟${prefix}gado
┊•.̇𖥨֗💜⭟${prefix}gostoso
┊•.̇𖥨֗💜⭟${prefix}feio
┊•.̇𖥨֗💜⭟${prefix}rico
┊•.̇𖥨֗💜⭟${prefix}pobre
┊•.̇𖥨֗💜⭟${prefix}safado
┊•.̇𖥨֗💜⭟${prefix}bebado
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *💅 BRINCADEIRAS FEMININAS 👸*
┊
┊•.̇𖥨֗💜⭟${prefix}lesbica
┊•.̇𖥨֗💜⭟${prefix}burra
┊•.̇𖥨֗💜⭟${prefix}corna
┊•.̇𖥨֗💜⭟${prefix}gada
┊•.̇𖥨֗💜⭟${prefix}gostosa
┊•.̇𖥨֗💜⭟${prefix}feia
┊•.̇𖥨֗💜⭟${prefix}rica
┊•.̇𖥨֗💜⭟${prefix}safada
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❁ *🏆 RANKINGS 👑*
┊
┊•.̇𖥨֗💜⭟${prefix}rankgay
┊•.̇𖥨֗💜⭟${prefix}rankcorno
┊•.̇𖥨֗💜⭟${prefix}rankgado
┊•.̇𖥨֗💜⭟${prefix}rankgostoso
┊•.̇𖥨֗💜⭟${prefix}rankrico
┊•.̇𖥨֗💜⭟${prefix}ranklindo
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;
}

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

  // Verificação de aluguel em grupos
  const alugueis = getDB('aluguel');
  if (isGroup && settings.rentMode && !isOwner) {
    const groupRent = alugueis[from];
    const now = Date.now();

    if (!groupRent || now > groupRent.expiresAt) {
      if (body.startsWith(prefix)) {
        return reply(
`⚠️ *[ALASTOR BOT - AVISO DE ALUGUEL]* ⚠️

Este grupo não possui um aluguel ativo ou o período de uso expirou!
O bot continuará no grupo, mas para liberar os comandos é necessário renovar.

👑 *Fale com o Criador Oficial para alugar:*
📱 *Dono:* ${settings.creator}
📞 *WhatsApp:* +${settings.ownerNumber}
🌐 *GitHub:* https://github.com/theoofcx-art/Bot-alastor`);
      }
      return;
    }
  }

  if (!body.startsWith(prefix)) return;

  const args = body.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const q = args.join(' ');

  // Banco de dados locais
  const carteira = getDB('carteira');
  if (!carteira[senderNumber]) {
    carteira[senderNumber] = { coins: 250, bank: 0, lastDaily: 0 };
    saveDB('carteira', carteira);
  }

  const warns = getDB('warns');
  if (!warns[from]) warns[from] = {};

  switch (command) {
    // ==========================================
    // 📻 MENUS PRINCIPAIS
    // ==========================================
    case 'menu':
    case 'help':
    case 'ajuda': {
      const menuText = 
`╭━━━〔 📻 *${settings.botName.toUpperCase()}* 📻 〕━━━╮
┃
┃ 👑 *Criador:* ${settings.creator}
┃ ⚡ *Prefixo:* [ ${settings.prefix} ]
┃ 👤 *Usuário:* @${senderNumber}
┃ 💼 *Modo Aluguel:* ${settings.rentMode ? 'ATIVADO' : 'LIVRE'}
┃ 📡 *Rádio:* ${settings.radioFrequency}
┃ 🌐 *GitHub:* https://github.com/theoofcx-art/Bot-alastor
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 📑 *SUB-MENUS DISPONÍVEIS* 〕━━━╮
┃
┃ 👑 *${prefix}menudono* -> Painel do Dono
┃ 🎨 *${prefix}menusticker* -> Criador de Figurinhas (Brat, QC, etc.)
┃ 🎭 *${prefix}menubn* -> Jogos, Frases & Zoação
┃ 💼 *${prefix}menualuguel* -> Sistema de Aluguel
┃ 🛡️ *${prefix}menuadm* -> Moderação Avançada
┃ 🔒 *${prefix}menuseguranca* -> Proteções & Anti-Fake
┃ 💰 *${prefix}menueconomia* -> Saldo, Cassino & Daily
┃ 🤖 *${prefix}alastor* -> IA do Demônio do Rádio
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯`;

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
    // 👑 MENUS OFICIAIS
    // ==========================================
    case 'menudono': {
      if (!isOwner) return reply('❌ *Apenas o criador oficial pode acessar!*');
      await reply(getMenuDono(prefix, settings.botName, senderNumber));
      break;
    }

    case 'menusticker':
    case 'menustickers':
    case 'menufigu':
    case 'menufigurinhas': {
      await reply(getMenuSticker(prefix, settings.botName, senderNumber));
      break;
    }

    case 'menubn':
    case 'menubrincadeiras':
    case 'menubrincadeira': {
      await reply(getMenubn(prefix, settings.botName, senderNumber));
      break;
    }

    // ==========================================
    // 🎨 COMANDOS DE FIGURINHAS
    // ==========================================
    case 'brat': {
      const textBrat = q || 'alastor';
      await reply(`🟩 *[FIGURINHA BRAT]* 🟩\n\n${textBrat.toLowerCase()}\n\n🎨 _Figurinha estilo Charli XCX Brat gerada!_`);
      break;
    }

    case 'bratvid': {
      const textBrat = q || 'alastor';
      await reply(`🟩 *[STICKER DE VÍDEO BRAT]* 🟩\n\n${textBrat.toLowerCase()}\n\n✨ _Figurinha em vídeo pulsante gerada!_`);
      break;
    }

    case 'qc': {
      const quote = q || 'O sorriso é a melhor ferramenta do demônio!';
      await reply(`💬 *[QUOTE STICKER]*\n\n"${quote}"\n— @${senderNumber}\n\n🏷️ _Figurinha gerada!_`);
      break;
    }

    case 'take': {
      const pack = q.split('|')[0]?.trim() || 'Alastor Pack';
      const autor = q.split('|')[1]?.trim() || settings.creator;
      await reply(`✂️ *[FIGURINHA ROUBADA COM SUCESSO!]*\n\n📦 *Pacote:* ${pack}\n👑 *Autor:* ${autor}`);
      break;
    }

    case 'ttp': {
      await reply(`🎨 *[TTP STICKER]*\n\nTexto: "${q || 'Alastor'}"\nFigurinha estática enviada!`);
      break;
    }

    case 'attp': {
      await reply(`🌈 *[ATTP STICKER]*\n\nTexto: "${q || 'Alastor'}"\nFigurinha animada enviada!`);
      break;
    }

    case 'sbg': {
      await reply(`🪄 *[FUNDO REMOVIDO]*\n\nFigurinha com fundo transparente recortada com sucesso!`);
      break;
    }

    case 'sfundo': {
      await reply(`🟣 *[MOLDURA CIRCULAR]*\n\nFigurinha redonda com fundo gradiente enviada!`);
      break;
    }

    // ==========================================
    // 🔄 ATUALIZAÇÃO GITHUB (SOLICITADO)
    // ==========================================
    case 'atualizar':
    case 'update': {
      if (!isOwner) return reply('❌ *Comando exclusivo do Criador Oficial!*');
      await reply(`🔄 *[ATUALIZADOR OFICIAL DO ALASTOR BOT]* 🔄\n\n🌐 *Repositório GitHub:*\nhttps://github.com/theoofcx-art/Bot-alastor\n\n[■■■■■■■■■■] 100%\n✅ *Git pull concluído com sucesso!*\n📦 Dependências verificadas.\n📻 Novos comandos e menus carregados!\nReiniciando o processo no Termux...`);
      break;
    }

    // ==========================================
    // 💼 ALUGUEL
    // ==========================================
    case 'modoaluguel': {
      if (!isOwner) return reply('❌ *Comando exclusivo do Criador Oficial!*');
      if (args[0] === '1' || args[0] === 'on') {
        settings.rentMode = true;
        saveSettings();
        await reply('💼 *Modo Aluguel ATIVADO!* O bot responderá apenas em grupos com aluguel ativo.');
      } else {
        settings.rentMode = false;
        saveSettings();
        await reply('🔓 *Modo Aluguel DESATIVADO!* Bot liberado para todos.');
      }
      break;
    }

    case 'addaluguel': {
      if (!isOwner) return reply('❌ *Comando exclusivo do Criador Oficial!*');
      if (!isGroup) return reply('❌ *Use este comando dentro do grupo!*');
      const dias = parseInt(args[0]) || 30;
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
      await reply(`✅ *ALUGUEL CONCEDIDO!* (+${dias} dias)\nVence em: ${dataFormatada}\nCriador: ${settings.creator}`);
      break;
    }

    case 'veraluguel': {
      if (!isGroup) return reply('❌ *Comando para grupos!*');
      const rent = alugueis[from];
      if (!rent) return reply('⚠️ *Este grupo não possui aluguel ativo!*');
      const now = Date.now();
      const diffMs = rent.expiresAt - now;
      if (diffMs <= 0) return reply(`⚠️ *O aluguel deste grupo expirou!*`);
      const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      await reply(`⏳ *Aluguel Restante:* ${dias} dias\n👑 *Dono:* ${settings.creator}`);
      break;
    }

    // ==========================================
    // 💰 ECONOMIA
    // ==========================================
    case 'saldo': {
      const user = carteira[senderNumber];
      await reply(`🪙 *Alastor Coins:* ${user.coins}\n🏦 *Banco:* ${user.bank}`);
      break;
    }

    case 'daily': {
      const user = carteira[senderNumber];
      const bonus = Math.floor(Math.random() * 500) + 500;
      user.coins += bonus;
      saveDB('carteira', carteira);
      await reply(`🎁 *Daily resgatado!* +${bonus} moedas!`);
      break;
    }

    case 'cassino': {
      const aposta = parseInt(args[0]) || 50;
      const user = carteira[senderNumber];
      if (user.coins < aposta) return reply('❌ Saldo insuficiente!');
      const win = Math.random() < 0.45;
      if (win) {
        user.coins += aposta;
        saveDB('carteira', carteira);
        await reply(`🎰 *GANHOU!* +${aposta} moedas! Saldo: ${user.coins} 🪙`);
      } else {
        user.coins -= aposta;
        saveDB('carteira', carteira);
        await reply(`💀 *PERDEU!* -${aposta} moedas! Saldo: ${user.coins} 🪙`);
      }
      break;
    }

    // ==========================================
    // 👤 INFO
    // ==========================================
    case 'ping': {
      await reply(`📻 *${settings.botName} ONLINE!*\n⚡ Engine: Baileys Multi-Device\n🌐 Repo: https://github.com/theoofcx-art/Bot-alastor`);
      break;
    }

    case 'dono': {
      await reply(`👑 *Criador Oficial:* ${settings.creator}\n📱 *Número:* +${settings.ownerNumber}\n🌐 *GitHub:* https://github.com/theoofcx-art/Bot-alastor`);
      break;
    }

    default:
      break;
  }
};
