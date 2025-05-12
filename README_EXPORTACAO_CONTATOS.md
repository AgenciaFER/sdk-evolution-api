# Exportação de Contatos do WhatsApp

Este documento descreve como utilizar os scripts para exportação de contatos.

## Scripts Disponíveis

### Script de Linha de Comando (Mais Fácil)

Para facilitar o uso, criamos um script de linha de comando que pode ser executado diretamente:

```bash
# Navegar até o diretório de scripts
cd /Users/afv/Documents/sdk/scripts

# Exportar contatos de todos os grupos
./exportar_contatos.sh grupos

# Exportar contatos de um grupo específico
./exportar_contatos.sh grupo "Nome do Grupo"

# Exportar todos os contatos do WhatsApp
./exportar_contatos.sh todos

# Exibir ajuda
./exportar_contatos.sh ajuda
```

### Scripts Node.js (Avançado)

Caso precise de mais controle, é possível utilizar diretamente os scripts Node.js:

```bash
# Exportar contatos de grupos (interativo)
node scripts/export-group-contacts.js

# Exportar contatos de um grupo específico
node scripts/export-group-contacts.js "Nome do Grupo"

# Exportar todos os contatos
node scripts/export-all-contacts.js
```

## Localização dos Arquivos Exportados

Todos os arquivos CSV e JSON gerados são salvos no diretório:
```
/Users/afv/Documents/sdk/midias/Planilha_csv/
```

## Formato dos Arquivos CSV

### Contatos de Grupos
- **Arquivo:** `contatos_todos_grupos_[data].csv` ou `contatos_grupo_[nome]_[data].csv`
- **Colunas:** Telefone, Nome, Grupo, ID do Grupo

### Todos os Contatos
- **Arquivo:** `todos_contatos_[instância]_[data].csv`
- **Colunas:** Telefone, Nome, Tipo, Contato Salvo, Usuário WhatsApp, Grupo, Usuário

## Recomendações

1. **Arquivos grandes**: Para grupos com muitos contatos, a exportação pode levar algum tempo.
2. **Processamento**: Os arquivos CSV podem ser abertos com Excel, Google Sheets, etc.
3. **Organização**: Os arquivos são nomeados com data e hora para facilitar o controle de versões.
4. **Arquivos JSON**: Cada exportação também gera um arquivo JSON correspondente.