#!/bin/bash
# ====================================================================
#  INSTALADOR E ATUALIZADOR OFICIAL DO ALASTOR BOT NO TERMUX (ANDROID)
#  REPOSITÓRIO: https://github.com/theoofcx-art/Bot-alastor
#  CRIADOR: © ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪
# ====================================================================

echo "=================================================="
echo "  📻 INSTALANDO / ATUALIZANDO ALASTOR BOT..."
echo "  👑 CRIADOR: © ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪"
echo "  🌐 GITHUB: https://github.com/theoofcx-art/Bot-alastor"
echo "=================================================="

# 1. Atualizar pacotes do sistema
pkg update -y && pkg upgrade -y
pkg install nodejs git ffmpeg -y

# 2. Clonar ou atualizar repositório oficial na pasta alastorbot
if [ -d "$HOME/alastorbot/.git" ]; then
  echo "[+] Repositório encontrado! Atualizando com git pull..."
  cd ~/alastorbot
  git pull origin main || git pull
else
  echo "[+] Clonando repositório para a pasta ~/alastorbot..."
  cd ~
  git clone https://github.com/theoofcx-art/Bot-alastor alastorbot
  cd ~/alastorbot
fi

# 3. Criar pastas de banco caso não existam
mkdir -p ~/alastorbot/database

echo "[+] Instalando dependências npm (Baileys)..."
npm install

echo "=================================================="
echo "  ✅ PRONTO! ALASTOR BOT ATUALIZADO COM SUCESSO!"
echo "  👉 Para iniciar o bot, digite:"
echo "     cd ~/alastorbot && npm start"
echo "=================================================="
