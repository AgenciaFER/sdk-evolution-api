# Diretório de Planilhas CSV de Contatos

Este diretório contém os arquivos CSV e JSON exportados pelos scripts de exportação de contatos.

## Arquivos Disponíveis

### Contatos de Grupos
- `contatos_todos_grupos_[data].csv` - Contatos de todos os grupos
- `contatos_grupo_[nome-grupo]_[data].csv` - Contatos de um grupo específico

### Todos os Contatos do WhatsApp
- `todos_contatos_[instância]_[data].csv` - Todos os contatos do WhatsApp

## Como Gerar Novos Arquivos

Para gerar novos arquivos CSV, utilize os scripts disponíveis:

```bash
# Para exportar contatos de grupos
node scripts/export-group-contacts.js

# Para exportar todos os contatos
node scripts/export-all-contacts.js
```

## Formato dos Arquivos

### Contatos de Grupos (CSV)
- **Colunas:** Telefone, Nome, Grupo, ID do Grupo

### Todos os Contatos (CSV)
- **Colunas:** Telefone, Nome, Tipo, Contato Salvo, Usuário WhatsApp, Grupo, Usuário

## Arquivos JSON

Cada arquivo CSV possui uma versão correspondente em formato JSON para processamento programático avançado.