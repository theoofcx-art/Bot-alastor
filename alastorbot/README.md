# 📻 Alastor Bot - WhatsApp Multi-Device (Termux Android)

> **Criador:** `© ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪`  
> **Repositório Oficial:** [https://github.com/theoofcx-art/Bot-alastor](https://github.com/theoofcx-art/Bot-alastor)  
> **Conexão:** Código de Pareamento de 8 Dígitos (Sem precisar de QR Code e sem 2 celulares)

---

## 📁 Estrutura Organizada do Bot
Todos os arquivos do bot ficam estritamente organizados na pasta `alastorbot/`:

```
alastorbot/
├── index.js          # Conexão Baileys v6 com Código de Pareamento
├── alastor.js        # Todos os 70+ comandos, menus florais, aluguel e economia
├── settings.json     # Configuração de dono, prefixo, nome e criador
├── package.json      # Dependências oficiais (@whiskeysockets/baileys, axios, etc.)
├── termux.sh         # Script 1-clique para instalar e atualizar no Termux
├── TUTORIAL.md       # Passo a passo completo com fotos e instruções
├── .gitignore        # Ignora credenciais privadas de sessão e node_modules
└── database/
    ├── aluguel.json  # Sistema de aluguel por dias de grupo
    ├── carteira.json # Economia e cassino
    └── warns.json    # Advertências e moderação
```

---

## ⚡ Como Rodar no Termux (Comando Rápido)

Cole no Termux:
```bash
pkg update -y && pkg install nodejs git ffmpeg -y && git clone https://github.com/theoofcx-art/Bot-alastor alastorbot && cd alastorbot && npm install && npm start
```

---

## 🔄 Como Atualizar para os Novos Comandos

No Termux:
```bash
cd ~/alastorbot
git pull
npm install
npm start
```

Ou mande no WhatsApp:
```
!atualizar
```
*(Comando restrito ao criador/dono)*
