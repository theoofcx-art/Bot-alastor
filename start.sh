#!/bin/bash
# ==============================================================
# Script de Inicialização Alastor Bot (Estilo Nazuna Bot)
# Criador: © ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪
# ==============================================================

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}====================================================${NC}"
echo -e "${GREEN}    INICIANDO ALASTOR BOT (NAZUNA ENGINE)          ${NC}"
echo -e "${GREEN}    CRIADOR: © ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪                 ${NC}"
echo -e "${GREEN}====================================================${NC}"

# Configuração para evitar qualquer erro de permissão no Termux
if [ ! -f ".npmrc" ]; then
  echo "legacy-peer-deps=true" > .npmrc
  echo "bin-links=false" >> .npmrc
fi

# Instala dependências se ainda não existirem
if [ ! -d "node_modules" ]; then
  echo -e "${GREEN}[+] Instalando dependências pela primeira vez...${NC}"
  npm install --no-bin-links --legacy-peer-deps
fi

# Loop de reinicialização automática (anti-queda)
while :
do
  echo -e "${GREEN}[+] Conectando Alastor Bot...${NC}"
  node index.js
  echo -e "${RED}[-] Bot caiu ou reiniciou. Reconectando em 2 segundos...${NC}"
  sleep 2
done
