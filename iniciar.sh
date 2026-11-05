#!/bin/bash
# ==============================================================
# Script de Inicialização Automática do Alastor Bot (Estilo Nazuna)
# Criador: © ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪
# ==============================================================

echo "=================================================="
echo "  📻 INICIANDO ALASTOR BOT..."
echo "  👑 CRIADOR: © ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪"
echo "=================================================="

# Evitar erro de symlink no /sdcard do Android
if [ ! -f ".npmrc" ]; then
  echo "legacy-peer-deps=true" > .npmrc
  echo "bin-links=false" >> .npmrc
fi

# Se a pasta node_modules não existir, instala automaticamente
if [ ! -d "node_modules" ]; then
  echo "[+] Instalando dependências automaticamente..."
  npm install --no-bin-links --legacy-peer-deps
fi

# Loop anti-queda estilo Nazuna Bot
while :
do
  echo "[+] Ligando o Alastor Bot..."
  node index.js
  echo "[-] Bot parou ou desconectou. Reiniciando em 2 segundos..."
  sleep 2
done
