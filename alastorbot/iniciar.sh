#!/bin/bash
# ==============================================================
# Script de Inicialização Automática do Alastor Bot
# Criador: © ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪
# ==============================================================

echo "=================================================="
echo "  📻 INICIANDO ALASTOR BOT..."
echo "  👑 CRIADOR: © ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪"
echo "=================================================="

# Se a pasta node_modules não existir, instala automaticamente!
if [ ! -d "node_modules" ]; then
  echo "[+] Instalando dependências automaticamente (apenas na 1ª vez)..."
  npm install
fi

echo "[+] Ligando o bot..."
node index.js
