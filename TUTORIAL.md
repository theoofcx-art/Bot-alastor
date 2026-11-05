# 📻 Manual Oficial Alastor Bot (Baseado no Nazuna Bot de DevTokyoVx/nazuna)

**Criador Oficial:** `© ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪`  
**Bot:** `Alastor`  
**Base Arquitetural:** `DevTokyoVx/nazuna (100% Descriptografado e Modular)`  
**Repositório Oficial:** [https://github.com/theoofcx-art/Bot-alastor](https://github.com/theoofcx-art/Bot-alastor)

---

## ⚡ Como Rodar no Termux do Zero (Sem Erros)

### Passo 1: Baixar os arquivos
Se você baixou o **`alastorbot.zip`** aqui no estúdio:
```bash
termux-setup-storage
cd ~
cp /sdcard/Download/alastorbot.zip .
unzip -o alastorbot.zip
cd alastorbot
```

Ou se você clonar direto do GitHub:
```bash
cd ~
git clone https://github.com/theoofcx-art/Bot-alastor alastorbot
cd alastorbot
```

---

### Passo 2: Iniciar o Bot (Estilo Nazuna)
```bash
npm start
```
*(Ou se preferir o modo anti-queda: `bash start.sh`)*

---

### Passo 3: Escolher o Método de Conexão no Terminal
Assim que iniciar, o terminal exibirá a interface idêntica à do **Nazuna Bot**:

```text
[01] Conectar via QR Code (Requer 2 aparelhos)
[02] Conectar via Código de Pareamento (Recomendado - 8 dígitos)
```

1. Digite **`02`** e aperte Enter.
2. Digite seu número de telefone com DDD (ex: `5511999998888`).
3. O bot exibirá o código de 8 dígitos no terminal:
   ```text
   ╔════════════════════════════════════════╗
   ║  SEU CÓDIGO: ALAS-8942                 ║
   ╚════════════════════════════════════════╝
   ```
4. Abra o WhatsApp > **Aparelhos Conectados** > **Conectar com código de número de telefone** e digite o código!

---

## 🛡️ Por que esta versão não dá nenhum erro no Termux?
- **Zero Vite / Zero Autoprefixer / Zero Esbuild:** O `package.json` possui exclusivamente as dependências de backend da Baileys (idêntico ao Nazuna Bot).
- **Proteção Anti-Symlink:** O arquivo `.npmrc` já vem com `bin-links=false` e `legacy-peer-deps=true`.
- **Loop Anti-Queda:** O arquivo `start.sh` reinicia o bot automaticamente caso a conexão caia.
