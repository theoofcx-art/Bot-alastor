/**
 * Funções de Menu estilizadas fornecidas pelo criador:
 * © ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪
 */

export function menuDono(
  prefix: string,
  botName = "Alastor",
  userName = "Usuário",
  options: {
    header?: string;
    menuTopBorder?: string;
    bottomBorder?: string;
    menuTitleIcon?: string;
    menuItemIcon?: string;
    separatorIcon?: string;
    middleBorder?: string;
    botConfigMenuTitle?: string;
    menuDesignMenuTitle?: string;
    automationMenuTitle?: string;
    menuAssistenteMenuTitle?: string;
    commandCustomMenuTitle?: string;
    commandLimitingMenuTitle?: string;
    userManagementMenuTitle?: string;
    rentalSystemMenuTitle?: string;
    subBotsMenuTitle?: string;
    vipSystemMenuTitle?: string;
    botControlMenuTitle?: string;
    monitoringMenuTitle?: string;
    broadcastMenuTitle?: string;
  } = {}
) {
  const {
    header = `╭┈⊰ 🌸 『 *${botName}* 』\n┊Olá, #user#!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
    menuTopBorder = "╭┈",
    bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯",
    menuTitleIcon = "🍧ฺꕸ▸",
    menuItemIcon = "•.̇𖥨֗💜⭟",
    separatorIcon = "❁",
    middleBorder = "┊",
    botConfigMenuTitle = "🤖 CONFIGURAÇÕES DO BOT",
    menuDesignMenuTitle = "🎨 DESIGN & APARÊNCIA",
    automationMenuTitle = "⚙️ SISTEMA & AUTOMAÇÃO",
    menuAssistenteMenuTitle = "🤡⚙️ PERSONALIDADE DA ASSISTENTE",
    commandCustomMenuTitle = "🛠️ PERSONALIZAÇÃO DE COMANDOS",
    commandLimitingMenuTitle = "🚫 LIMITAÇÃO DE COMANDOS",
    userManagementMenuTitle = "👥 GERENCIAMENTO DE USUÁRIOS",
    rentalSystemMenuTitle = "💰 SISTEMA DE ALUGUEL",
    subBotsMenuTitle = "🤖 GERENCIAMENTO DE SUB-BOTS",
    vipSystemMenuTitle = "💎 SISTEMA VIP/PREMIUM",
    botControlMenuTitle = "⚡ CONTROLE & MANUTENÇÃO",
    monitoringMenuTitle = "📊 MONITORAMENTO & ANÁLISE",
    broadcastMenuTitle = "📡 TRANSMISSÕES",
  } = options;

  const formattedHeader = header.replace(/#user#/g, userName);
  return `${formattedHeader}

${menuTopBorder}${separatorIcon} *📚 INÍCIO*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}tutorial
${bottomBorder}

${menuTopBorder}${separatorIcon} *${botConfigMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}prefixo
${middleBorder}${menuItemIcon}${prefix}numerodono
${middleBorder}${menuItemIcon}${prefix}nomedono
${middleBorder}${menuItemIcon}${prefix}nomebot
${middleBorder}${menuItemIcon}${prefix}configcmdnotfound
${middleBorder}${menuItemIcon}${prefix}setcmdmsg
${middleBorder}${menuItemIcon}${prefix}fotobot
${middleBorder}${menuItemIcon}${prefix}fotomenu
${middleBorder}${menuItemIcon}${prefix}videomenu
${middleBorder}${menuItemIcon}${prefix}audiomenu
${middleBorder}${menuItemIcon}${prefix}lermais
${middleBorder}${menuItemIcon}${prefix}personalizargrupo
${bottomBorder}

${menuTopBorder}${separatorIcon} *${menuAssistenteMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}setpersonalidade
${middleBorder}${menuItemIcon}${prefix}criarpers
${middleBorder}${menuItemIcon}${prefix}novapers
${bottomBorder}

${menuTopBorder}${separatorIcon} *${menuDesignMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}designmenu
${middleBorder}${menuItemIcon}${prefix}setborda
${middleBorder}${menuItemIcon}${prefix}setbordafim
${middleBorder}${menuItemIcon}${prefix}setbordameio
${middleBorder}${menuItemIcon}${prefix}setitem
${middleBorder}${menuItemIcon}${prefix}setseparador
${middleBorder}${menuItemIcon}${prefix}settitulo
${middleBorder}${menuItemIcon}${prefix}setheader
${middleBorder}${menuItemIcon}${prefix}resetdesign
${bottomBorder}

${menuTopBorder}${separatorIcon} *${automationMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}addauto
${middleBorder}${menuItemIcon}${prefix}addautomidia
${middleBorder}${menuItemIcon}${prefix}listauto
${middleBorder}${menuItemIcon}${prefix}delauto
${middleBorder}${menuItemIcon}${prefix}addreact
${middleBorder}${menuItemIcon}${prefix}listreact
${middleBorder}${menuItemIcon}${prefix}delreact
${middleBorder}${menuItemIcon}${prefix}addnopref
${middleBorder}${menuItemIcon}${prefix}listnopref
${middleBorder}${menuItemIcon}${prefix}delnopref
${bottomBorder}

${menuTopBorder}${separatorIcon} *${commandCustomMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}addcmd
${middleBorder}${menuItemIcon}${prefix}addcmdmidia
${middleBorder}${menuItemIcon}${prefix}listcmd
${middleBorder}${menuItemIcon}${prefix}delcmd
${middleBorder}${menuItemIcon}${prefix}testcmd
${middleBorder}${menuItemIcon}${prefix}addcmd-subdono
${middleBorder}${menuItemIcon}${prefix}removecmd-subdono
${middleBorder}${menuItemIcon}${prefix}listcmd-subdono
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}addalias
${middleBorder}${menuItemIcon}${prefix}listalias
${middleBorder}${menuItemIcon}${prefix}delalias
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}addblackglobal
${middleBorder}${menuItemIcon}${prefix}listblackglobal
${middleBorder}${menuItemIcon}${prefix}rmblackglobal
${bottomBorder}

${menuTopBorder}${separatorIcon} *${commandLimitingMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}cmdlimitar
${middleBorder}${menuItemIcon}${prefix}cmddeslimitar
${middleBorder}${menuItemIcon}${prefix}cmdlimites
${bottomBorder}

${menuTopBorder}${separatorIcon} *${userManagementMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}addsubdono
${middleBorder}${menuItemIcon}${prefix}delsubdono
${middleBorder}${menuItemIcon}${prefix}listasubdonos
${middleBorder}${menuItemIcon}${prefix}addpremium
${middleBorder}${menuItemIcon}${prefix}delpremium
${middleBorder}${menuItemIcon}${prefix}listprem
${middleBorder}${menuItemIcon}${prefix}resetgold
${middleBorder}
${middleBorder}${menuTitleIcon} *INDICAÇÕES* ${menuTitleIcon}
${middleBorder}${menuItemIcon}${prefix}addindicacao
${middleBorder}${menuItemIcon}${prefix}topindica
${middleBorder}${menuItemIcon}${prefix}delindicacao
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}bangp
${middleBorder}${menuItemIcon}${prefix}unbangp
${middleBorder}${menuItemIcon}${prefix}listbangp
${bottomBorder}

${menuTopBorder}${separatorIcon} *${rentalSystemMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}modoaluguel
${middleBorder}${menuItemIcon}${prefix}addaluguel
${middleBorder}${menuItemIcon}${prefix}gerarcod
${middleBorder}${menuItemIcon}${prefix}listaraluguel
${middleBorder}${menuItemIcon}${prefix}infoaluguel
${middleBorder}${menuItemIcon}${prefix}estenderaluguel
${middleBorder}${menuItemIcon}${prefix}removeraluguel
${middleBorder}${menuItemIcon}${prefix}listaluguel
${middleBorder}${menuItemIcon}${prefix}limparaluguel
${middleBorder}${menuItemIcon}${prefix}dayfree
${middleBorder}${menuItemIcon}${prefix}setdiv
${middleBorder}${menuItemIcon}${prefix}divulgar
${bottomBorder}

${menuTopBorder}${separatorIcon} *${subBotsMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}addsubbot
${middleBorder}${menuItemIcon}${prefix}removesubbot
${middleBorder}${menuItemIcon}${prefix}listarsubbots
${middleBorder}${menuItemIcon}${prefix}conectarsubbot
${middleBorder}
${middleBorder}🔑 Sub-bot use: ${prefix}gerarcodigo
${bottomBorder}

${menuTopBorder}${separatorIcon} *${vipSystemMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}addcmdvip
${middleBorder}${menuItemIcon}${prefix}removecmdvip
${middleBorder}${menuItemIcon}${prefix}listcmdvip
${middleBorder}${menuItemIcon}${prefix}togglecmdvip
${middleBorder}${menuItemIcon}${prefix}statsvip
${middleBorder}${menuItemIcon}${prefix}menuvip
${middleBorder}${menuItemIcon}${prefix}infovip
${bottomBorder}

${menuTopBorder}${separatorIcon} *${botControlMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}atualizar
${middleBorder}${menuItemIcon}${prefix}reiniciar
${middleBorder}${menuItemIcon}${prefix}entrar
${middleBorder}${menuItemIcon}${prefix}sairgp
${middleBorder}${menuItemIcon}${prefix}seradm
${middleBorder}${menuItemIcon}${prefix}sermembro
${middleBorder}${menuItemIcon}${prefix}blockcmdg
${middleBorder}${menuItemIcon}${prefix}unblockcmdg
${middleBorder}${menuItemIcon}${prefix}blockuserg
${middleBorder}${menuItemIcon}${prefix}unblockuserg
${middleBorder}${menuItemIcon}${prefix}listblocks
${middleBorder}${menuItemIcon}${prefix}antibanmarcar
${bottomBorder}

${menuTopBorder}${separatorIcon} *${monitoringMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}listagp
${middleBorder}${menuItemIcon}${prefix}antipv
${middleBorder}${menuItemIcon}${prefix}antipv2
${middleBorder}${menuItemIcon}${prefix}antipv3
${middleBorder}${menuItemIcon}${prefix}antipv4
${middleBorder}${menuItemIcon}${prefix}antipvmsg
${middleBorder}${menuItemIcon}${prefix}antispamcmd
${middleBorder}${menuItemIcon}${prefix}viewmsg
${middleBorder}${menuItemIcon}${prefix}cases
${middleBorder}${menuItemIcon}${prefix}getcase
${middleBorder}${menuItemIcon}${prefix}modoliteglobal
${middleBorder}${menuItemIcon}${prefix}iaclear
${middleBorder}${menuItemIcon}${prefix}limpardb
${middleBorder}${menuItemIcon}${prefix}limparrankg
${middleBorder}${menuItemIcon}${prefix}reviverqr
${middleBorder}${menuItemIcon}${prefix}nuke
${middleBorder}${menuItemIcon}${prefix}msgprefix
${bottomBorder}

${menuTopBorder}${separatorIcon} *${broadcastMenuTitle}*
${middleBorder}
${middleBorder}${menuTitleIcon} *Transmissão em Grupos:*
${middleBorder}${menuItemIcon}${prefix}tm
${middleBorder}
${middleBorder}${menuTitleIcon} *Transmissão Privada:*
${middleBorder}${menuItemIcon}${prefix}tm2
${middleBorder}${menuItemIcon}${prefix}statustm
${middleBorder}
${middleBorder}📝 Usuários inscrevem com:
${middleBorder}   ${prefix}inscrevertm (no PV)
${middleBorder}
${middleBorder}${menuTitleIcon} *Divulgação do Dono:*
${middleBorder}${menuItemIcon}${prefix}divdono add
${middleBorder}${menuItemIcon}${prefix}divdono rem
${middleBorder}${menuItemIcon}${prefix}divdono list
${middleBorder}${menuItemIcon}${prefix}divdono msg
${middleBorder}${menuItemIcon}${prefix}divdono send
${middleBorder}${menuItemIcon}${prefix}divdono time
${middleBorder}${menuItemIcon}${prefix}divdono status
${bottomBorder}
`;
}

export function menubn(
  prefix: string,
  botName = "Alastor",
  userName = "Usuário",
  isLiteMode = false,
  options: {
    header?: string;
    menuTopBorder?: string;
    bottomBorder?: string;
    menuTitleIcon?: string;
    menuItemIcon?: string;
    separatorIcon?: string;
    middleBorder?: string;
    gamesMenuTitle?: string;
    phrasesMenuTitle?: string;
    interactionsMenuTitle?: string;
    relationshipMenuTitle?: string;
    hotInteractionsMenuTitle?: string;
    maleFunMenuTitle?: string;
    femaleFunMenuTitle?: string;
    maleRanksMenuTitle?: string;
    femaleRanksMenuTitle?: string;
  } = {}
) {
  const {
    header = `╭┈⊰ 🌸 『 *${botName}* 』\n┊Olá, #user#!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
    menuTopBorder = "╭┈",
    bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯",
    menuTitleIcon = "🍧ฺꕸ▸",
    menuItemIcon = "•.̇𖥨֗💜⭟",
    separatorIcon = "❁",
    middleBorder = "┊",
    gamesMenuTitle = "🎮 JOGOS & DIVERSÃO 🎲",
    phrasesMenuTitle = "💬 FRASES & TEXTOS 📜",
    interactionsMenuTitle = "💬 INTERAÇÕES SOCIAIS 🤝",
    relationshipMenuTitle = "💞 RELACIONAMENTOS ❤️",
    hotInteractionsMenuTitle = '🔥 INTERAÇÕES "PICANTES" 😏',
    maleFunMenuTitle = "🎯 BRINCADEIRAS MASCULINAS 🔥",
    femaleFunMenuTitle = "💅 BRINCADEIRAS FEMININAS 👸",
    maleRanksMenuTitle = "🏆 RANKINGS MASCULINOS 👑",
    femaleRanksMenuTitle = "👸 RANKINGS FEMININOS 💎",
  } = options;

  const formattedHeader = header.replace(/#user#/g, userName);
  let menuContent = `${formattedHeader}

${menuTopBorder}${separatorIcon} *${gamesMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}tictactoe @user
${middleBorder}${menuItemIcon}${prefix}connect4 @user
${middleBorder}${menuItemIcon}${prefix}uno criar
${middleBorder}${menuItemIcon}${prefix}uno entrar
${middleBorder}${menuItemIcon}${prefix}uno jogar <n°>
${middleBorder}${menuItemIcon}${prefix}uno cancelar
${middleBorder}${menuItemIcon}${prefix}memoria
${middleBorder}${menuItemIcon}${prefix}memoria ranking
${middleBorder}${menuItemIcon}${prefix}wordle
${middleBorder}${menuItemIcon}${prefix}quiz <categoria>
${middleBorder}${menuItemIcon}${prefix}forca
${middleBorder}${menuItemIcon}${prefix}digitar @usuario
${middleBorder}${menuItemIcon}${prefix}batalhanaval @usuario
${middleBorder}${menuItemIcon}${prefix}stop
${middleBorder}${menuItemIcon}${prefix}anagrama
${middleBorder}${menuItemIcon}${prefix}dueloquiz @usuario [número]
${middleBorder}${menuItemIcon}${prefix}cacapalavras [dificuldade]
${middleBorder}${menuItemIcon}${prefix}jogodavelha
${middleBorder}${menuItemIcon}${prefix}eununca
${middleBorder}${menuItemIcon}${prefix}vab
${middleBorder}${menuItemIcon}${prefix}chance
${middleBorder}${menuItemIcon}${prefix}quando
${middleBorder}${menuItemIcon}${prefix}sorte
${middleBorder}${menuItemIcon}${prefix}casal
${middleBorder}${menuItemIcon}${prefix}shipo
${middleBorder}${menuItemIcon}${prefix}sn
${middleBorder}${menuItemIcon}${prefix}ppt
${bottomBorder}

${menuTopBorder}${separatorIcon} *${phrasesMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}conselho
${middleBorder}${menuItemIcon}${prefix}conselhobiblico
${middleBorder}${menuItemIcon}${prefix}cantada
${middleBorder}${menuItemIcon}${prefix}piada
${middleBorder}${menuItemIcon}${prefix}charada
${middleBorder}${menuItemIcon}${prefix}motivacional
${middleBorder}${menuItemIcon}${prefix}elogio
${middleBorder}${menuItemIcon}${prefix}reflexao
${middleBorder}${menuItemIcon}${prefix}fato
${bottomBorder}

${menuTopBorder}${separatorIcon} *${interactionsMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}chute
${middleBorder}${menuItemIcon}${prefix}chutar
${middleBorder}${menuItemIcon}${prefix}tapa
${middleBorder}${menuItemIcon}${prefix}soco
${middleBorder}${menuItemIcon}${prefix}socar
${middleBorder}${menuItemIcon}${prefix}explodir
${middleBorder}${menuItemIcon}${prefix}tomate
${middleBorder}${menuItemIcon}${prefix}abraco
${middleBorder}${menuItemIcon}${prefix}abracar
${middleBorder}${menuItemIcon}${prefix}morder
${middleBorder}${menuItemIcon}${prefix}mordida
${middleBorder}${menuItemIcon}${prefix}lamber
${middleBorder}${menuItemIcon}${prefix}lambida
${middleBorder}${menuItemIcon}${prefix}beijo
${middleBorder}${menuItemIcon}${prefix}beijar
${middleBorder}${menuItemIcon}${prefix}mata
${middleBorder}${menuItemIcon}${prefix}matar
${middleBorder}${menuItemIcon}${prefix}cafune
${bottomBorder}
`;

  if (!isLiteMode) {
    menuContent += `
${menuTopBorder}${separatorIcon} *${hotInteractionsMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}surubao
${middleBorder}${menuItemIcon}${prefix}sexo
${middleBorder}${menuItemIcon}${prefix}beijob
${middleBorder}${menuItemIcon}${prefix}beijarb
${middleBorder}${menuItemIcon}${prefix}tapar
${middleBorder}${menuItemIcon}${prefix}goza
${middleBorder}${menuItemIcon}${prefix}gozar
${middleBorder}${menuItemIcon}${prefix}mamar
${middleBorder}${menuItemIcon}${prefix}mamada
${bottomBorder}
`;
  }

  menuContent += `
${menuTopBorder}${separatorIcon} *${maleFunMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}gay
${middleBorder}${menuItemIcon}${prefix}burro
${middleBorder}${menuItemIcon}${prefix}inteligente
${middleBorder}${menuItemIcon}${prefix}otaku
${middleBorder}${menuItemIcon}${prefix}fiel
${middleBorder}${menuItemIcon}${prefix}infiel
${middleBorder}${menuItemIcon}${prefix}corno
${middleBorder}${menuItemIcon}${prefix}gado
${middleBorder}${menuItemIcon}${prefix}gostoso
${middleBorder}${menuItemIcon}${prefix}feio
${middleBorder}${menuItemIcon}${prefix}rico
${middleBorder}${menuItemIcon}${prefix}pobre
${middleBorder}${menuItemIcon}${prefix}safado
${middleBorder}${menuItemIcon}${prefix}vesgo
${middleBorder}${menuItemIcon}${prefix}bebado
${middleBorder}${menuItemIcon}${prefix}chato
${middleBorder}${menuItemIcon}${prefix}sortudo
${middleBorder}${menuItemIcon}${prefix}forte
${middleBorder}${menuItemIcon}${prefix}pegador
${middleBorder}${menuItemIcon}${prefix}lindo
${middleBorder}${menuItemIcon}${prefix}engracado
${middleBorder}${menuItemIcon}${prefix}misterioso
${middleBorder}${menuItemIcon}${prefix}talarico
${middleBorder}${menuItemIcon}${prefix}mito
${bottomBorder}

${menuTopBorder}${separatorIcon} *${relationshipMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}brincadeira
${middleBorder}${menuItemIcon}${prefix}namoro
${middleBorder}${menuItemIcon}${prefix}casamento
${middleBorder}${menuItemIcon}${prefix}relacionamento
${middleBorder}${menuItemIcon}${prefix}terminar
${middleBorder}${menuItemIcon}${prefix}trair
${middleBorder}${menuItemIcon}${prefix}historicotraicao
${bottomBorder}

${menuTopBorder}${separatorIcon} *${femaleFunMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}lesbica
${middleBorder}${menuItemIcon}${prefix}burra
${middleBorder}${menuItemIcon}${prefix}inteligente
${middleBorder}${menuItemIcon}${prefix}otaku
${middleBorder}${menuItemIcon}${prefix}fiel
${middleBorder}${menuItemIcon}${prefix}infiel
${middleBorder}${menuItemIcon}${prefix}corna
${middleBorder}${menuItemIcon}${prefix}gada
${middleBorder}${menuItemIcon}${prefix}gostosa
${middleBorder}${menuItemIcon}${prefix}feia
${middleBorder}${menuItemIcon}${prefix}rica
${middleBorder}${menuItemIcon}${prefix}pobre
${middleBorder}${menuItemIcon}${prefix}safada
${middleBorder}${menuItemIcon}${prefix}vesga
${middleBorder}${menuItemIcon}${prefix}bebada
${middleBorder}${menuItemIcon}${prefix}chata
${middleBorder}${menuItemIcon}${prefix}linda
${middleBorder}${menuItemIcon}${prefix}charmosa
${middleBorder}${menuItemIcon}${prefix}talarica
${middleBorder}${menuItemIcon}${prefix}patricinha
${bottomBorder}

${menuTopBorder}${separatorIcon} *${maleRanksMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}rankgay
${middleBorder}${menuItemIcon}${prefix}rankburro
${middleBorder}${menuItemIcon}${prefix}rankinteligente
${middleBorder}${menuItemIcon}${prefix}rankcorno
${middleBorder}${menuItemIcon}${prefix}rankgado
${middleBorder}${menuItemIcon}${prefix}rankgostoso
${middleBorder}${menuItemIcon}${prefix}rankrico
${middleBorder}${menuItemIcon}${prefix}rankforte
${middleBorder}${menuItemIcon}${prefix}rankpegador
${middleBorder}${menuItemIcon}${prefix}ranklindo
${middleBorder}${menuItemIcon}${prefix}rankengracado
${bottomBorder}

${menuTopBorder}${separatorIcon} *${femaleRanksMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}ranklesbica
${middleBorder}${menuItemIcon}${prefix}rankburra
${middleBorder}${menuItemIcon}${prefix}rankcorna
${middleBorder}${menuItemIcon}${prefix}rankgada
${middleBorder}${menuItemIcon}${prefix}rankgostosa
${middleBorder}${menuItemIcon}${prefix}rankrica
${middleBorder}${menuItemIcon}${prefix}rankforte
${middleBorder}${menuItemIcon}${prefix}ranklinda
${middleBorder}${menuItemIcon}${prefix}rankengracada
${bottomBorder}
`;

  return menuContent;
}

export function menuSticker(
  prefix: string,
  botName = "Alastor",
  userName = "Usuário",
  options: {
    header?: string;
    menuTopBorder?: string;
    bottomBorder?: string;
    menuTitleIcon?: string;
    menuItemIcon?: string;
    separatorIcon?: string;
    middleBorder?: string;
    createStickerMenuTitle?: string;
    managementMenuTitle?: string;
  } = {}
) {
  const {
    header = `╭┈⊰ 🌸 『 *${botName}* 』\n┊Olá, #user#!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
    menuTopBorder = "╭┈",
    bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯",
    menuTitleIcon = "🍧ฺꕸ▸",
    menuItemIcon = "•.̇𖥨֗💜⭟",
    separatorIcon = "❁",
    middleBorder = "┊",
    createStickerMenuTitle = "🎨 CRIAÇÃO DE FIGURINHAS",
    managementMenuTitle = "⚙️ GERENCIAMENTO DE FIGURINHAS",
  } = options;

  const formattedHeader = header.replace(/#user#/g, userName);
  return `${formattedHeader}

${menuTopBorder}${separatorIcon} *${createStickerMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}emojimix
${middleBorder}${menuItemIcon}${prefix}ttp <texto>
${middleBorder}${menuItemIcon}${prefix}attp <texto>
${middleBorder}${menuItemIcon}${prefix}sticker
${middleBorder}${menuItemIcon}${prefix}sticker2
${middleBorder}${menuItemIcon}${prefix}sbg (remover fundo)
${middleBorder}${menuItemIcon}${prefix}sfundo
${middleBorder}${menuItemIcon}${prefix}qc <texto ou respondendo>
${bottomBorder}

${menuTopBorder}${separatorIcon} *${managementMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}figualeatoria
${middleBorder}${menuItemIcon}${prefix}figurinhas
${middleBorder}${menuItemIcon}${prefix}rename <pack | autor>
${middleBorder}${menuItemIcon}${prefix}rgtake
${middleBorder}${menuItemIcon}${prefix}take <pack | autor>
${middleBorder}${menuItemIcon}${prefix}toimg (respondendo sticker)
${middleBorder}${menuItemIcon}${prefix}brat <texto>
${middleBorder}${menuItemIcon}${prefix}bratvid <texto>
${bottomBorder}
`;
}
