# Scripts para Exportação de Contatos

Este diretório contém scripts para facilitar a exportação de contatos do WhatsApp usando a Evolution API.

## Scripts Disponíveis

### 1. Exportar Contatos de Grupos

**Arquivo:** `export-group-contacts.js`

**Funções:**
- Exportar contatos de todos os grupos
- Exportar contatos de um grupo específico (pesquisa por nome)

**Uso:**
```bash
# Exportar todos os grupos (interativamente)
node scripts/export-group-contacts.js

# Exportar grupo específico diretamente
node scripts/export-group-contacts.js "Nome do Grupo"
```

### 2. Exportar Todos os Contatos

**Arquivo:** `export-all-contacts.js`

**Funções:**
- Exportar todos os contatos do WhatsApp (não apenas os que estão em grupos)

**Uso:**
```bash
# Exportar todos os contatos
node scripts/export-all-contacts.js
```

## Localização dos Arquivos Exportados

Todos os arquivos CSV e JSON gerados são salvos no diretório:
```
/Users/afv/Documents/sdk/midias/Planilha_csv/
```

## Formato dos Arquivos Exportados

### Contatos de Grupos (CSV)
- **Colunas:** Telefone, Nome, Grupo, ID do Grupo
- **Exemplo:** `contatos_todos_grupos_2025-05-12T20-15-30.csv`
- **Observação:** Contém apenas contatos de grupos, deduplica números repetidos

### Todos os Contatos (CSV)
- **Colunas:** Telefone, Nome, Tipo, Contato Salvo, Usuário WhatsApp, Grupo, Usuário
- **Exemplo:** `todos_contatos_ferraz_2025-05-12T20-15-30.csv`
- **Observação:** Inclui todos os contatos disponíveis no WhatsApp

## Arquivos JSON

Além dos CSVs, os scripts também geram arquivos JSON com os mesmos dados para maior flexibilidade ao processar os contatos programaticamente.

## Configuração

Os scripts usam as seguintes variáveis de ambiente (definidas no arquivo `.env`):

- `EVOLUTION_API_URL`: URL da API Evolution
- `EVOLUTION_API_KEY`: Chave de API para autenticação
- `EVOLUTION_API_INSTANCE`: Nome da instância do WhatsApp

## Requisitos

- Node.js v14 ou superior
- Evolution API configurada e em execução
- SDK compilado (diretório `dist` existente)