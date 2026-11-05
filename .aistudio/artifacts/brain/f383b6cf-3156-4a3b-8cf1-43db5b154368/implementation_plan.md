# Sistema de Aluguel, Administração Avançada, Segurança e Economia - Alastor Bot

Plano abrangente para integrar ao Alastor Bot o sistema de aluguel por dias (`!modoaluguel`, `!addaluguel <dias>`), novas ferramentas avançadas de administração de grupos, módulo de segurança (antifake, antispam, antitrava e boas-vindas customizadas) e sistema de economia/cassino com carteira e apostas.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Com base nas escolhas confirmadas na fase de alinhamento:
> - **Expiração do Aluguel**: Quando o período de dias concedido com `!addaluguel <dias>` expirar, o bot continuará no grupo, disparando um aviso formal de cobrança para renovação (sem bloquear a permanência do bot).
> - **Categorias de Comandos Adicionadas**:
>   1. **Aluguel de Grupos**: `!modoaluguel <on/off>`, `!addaluguel <dias>`, `!delaluguel`, `!veraluguel` / `!temporestante`, `!listalugueis`.
>   2. **Administração Avançada**: `!tempban <@membro> <tempo>`, `!antispam <1/0>`, `!limpar <qtd>`, `!warn / !advertir`, `!unwarn`, `!marcardesativados`, `!fechar_tempo <min>`.
>   3. **Segurança do Grupo**: `!antifake <1/0>` (barrar DDI estrangeiro fake), `!antitrava <1/0>`, `!bemvindo <1/0>`, `!setbemvindo <texto>`, `!setadeus <texto>`.
>   4. **Economia & Cassino**: `!saldo`, `!daily / !diario`, `!apostar <valor>`, `!roubar <@membro>`, `!pagar <@membro> <valor>`, `!cassino / !slots`, `!topcoins`.

---

## 1. Overview & Core Concept

- **O que faz**: Adiciona um ecossistema completo de gestão comercial e comunitária ao bot: o dono pode ativar o modo aluguel global ou por grupo, conceder dias específicos para grupos (`!addaluguel 30`), verificar relatórios de expiração, enquanto os administradores recebem ferramentas de moderação cirúrgica e os membros contam com um jogo dinâmico de economia com moedas do inferno (*Alastor Coins*).
- **Público-alvo**: Criador oficial (`© ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪`), donos de grupos do WhatsApp e usuários do bot no Termux.
- **Valor agregado**: Transforma o Alastor em um bot rentabilizável (estilo Nazuna VIP), com proteção ativa contra invasões/spam e alta retenção com minigames de economia.

---

## 2. User Experience & Visual Design

- **Simulador do WhatsApp**:
  - Respostas instantâneas para todos os novos comandos no chat com layout formatado.
  - Testes do ciclo de aluguel: adicionar dias, verificar dias restantes com barra de progresso visual, simular expiração com mensagem de cobrança.
  - Novos botões de atalho rápido na barra do chat (`!addaluguel 15`, `!veraluguel`, `!saldo`, `!cassino 100`, `!warn @membro`).
- **Painel do Dono**:
  - Nova seção **"Gestão de Grupos & Aluguéis"**: tabela/cards dos grupos ativos, dias restantes, status do aluguel, botão para adicionar dias direto pela interface gráfica.
  - Controles visuais para alternar modo aluguel global (`ON / OFF`).
- **Catálogo de Comandos**:
  - Novas abas de filtro: `💼 Aluguel`, `🛡️ ADM Avançado`, `🔒 Segurança`, `💰 Economia & Jogos`.
- **Arquivos do Bot (Código Termux)**:
  - `alastor.js`: Implementação real das lógicas de expiração de dias por timestamp (`Date.now() + dias * 86400000`), verificação do banco de dados de grupos (`aluguel.json`), advertências (`warns.json`) e carteiras (`carteira.json`).
  - Atualização do `settings.json`, `index.js` e do arquivo para download `.zip`.

---

## 3. Key Product Decisions & Trade-Offs

- **Decisão 1: Armazenamento Local em JSON para o Bot Real no Termux**:
  - *Abordagem*: No código real Baileys, utilizaremos persistência em arquivos JSON locais (`./database/aluguel.json`, `./database/carteira.json`) sem dependência de bancos pesados como MongoDB ou MySQL.
  - *Por quê*: No Termux, arquivos JSON são 100% nativos do Node.js, não consomem memória adicional e não exigem que o usuário configure bancos de dados complexos no celular.
- **Decisão 2: Aluguel Não-Destrutivo ao Expirar**:
  - *Abordagem*: Ao expirar o tempo, o bot emite um aviso personalizado solicitando renovação com o contato do criador `© ˒˓ 𝘵𝘩ҽ͜𝘰𝘹  ݁ 🤿⃝ 𓈒 ᘡ ࣪`, permitindo que os administradores renovem sem perder o histórico do grupo.
  - *Por quê*: Alinhado com a escolha confirmada na etapa de perguntas.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   ALASTOR BOT STUDIO                   │
├──────────────────────────┬─────────────────────────────┤
│   Painel de Controle     │     WhatsApp Simulator      │
│  - Gestão de Aluguéis    │  - Execução de !addaluguel  │
│  - Moderação e Antispam  │  - Mini-game !cassino / !slot│
│  - Ajustes de Segurança  │  - Advertências e !tempban  │
└────────────┬─────────────┴──────────────┬──────────────┘
             │                            │
             ▼                            ▼
┌────────────────────────────────────────────────────────┐
│             GERADOR DE CÓDIGO TERMUX (BAILEYS)         │
│  - index.js (Verificação de aluguel por mensagem)       │
│  - alastor.js (Novos switches de comandos ADM/Aluguel) │
│  - settings.json & database schemas (aluguel, carteira)│
│  - zipExporter.ts (Exportação do pacote completo)      │
└────────────────────────────────────────────────────────┘
```

### Novos Comandos Mapeados:
- **Aluguel**: `!modoaluguel <1/0>`, `!addaluguel <dias>`, `!delaluguel`, `!veraluguel`, `!listalugueis`.
- **ADM Avançado**: `!tempban <@membro> <minutos>`, `!antispam <1/0>`, `!limpar <qtd>`, `!warn <@membro>`, `!unwarn <@membro>`, `!fechar_tempo <min>`.
- **Segurança**: `!antifake <1/0>`, `!antitrava <1/0>`, `!bemvindo <1/0>`, `!setbemvindo <texto>`.
- **Economia**: `!saldo`, `!daily`, `!cassino <aposta>`, `!roubar <@membro>`, `!doar <@membro> <valor>`, `!topcoins`.
