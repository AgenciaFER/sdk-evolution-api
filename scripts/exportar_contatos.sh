#!/bin/bash

# Script de atalho para exportação de contatos
# Modo de uso: ./exportar_contatos.sh [grupo|todos] [nome-do-grupo]

# Diretório base do SDK
SDK_DIR="/Users/afv/Documents/sdk"

# Função para mostrar ajuda
show_help() {
  echo "Exportação de Contatos do WhatsApp"
  echo "==================================="
  echo ""
  echo "Uso:"
  echo "  ./exportar_contatos.sh grupos           # Exporta todos os grupos"
  echo "  ./exportar_contatos.sh grupo \"Nome\"     # Exporta um grupo específico"
  echo "  ./exportar_contatos.sh todos            # Exporta todos os contatos"
  echo "  ./exportar_contatos.sh ajuda            # Mostra esta mensagem"
  echo ""
  echo "Todos os arquivos são salvos em: ${SDK_DIR}/midias/Planilha_csv/"
  echo ""
}

# Se não houver argumentos, mostrar ajuda
if [ "$#" -lt 1 ]; then
  show_help
  exit 0
fi

# Navegar para o diretório do SDK
cd "$SDK_DIR" || { echo "Erro: Diretório SDK não encontrado!"; exit 1; }

# Verificar se a pasta de saída existe e criar se necessário
mkdir -p "${SDK_DIR}/midias/Planilha_csv"

# Processar argumentos
case "$1" in
  grupos)
    echo "Exportando contatos de todos os grupos..."
    node scripts/export-group-contacts.js
    ;;
  grupo)
    if [ "$#" -lt 2 ]; then
      echo "Erro: É necessário especificar o nome do grupo!"
      show_help
      exit 1
    fi
    echo "Exportando contatos do grupo \"$2\"..."
    node scripts/export-group-contacts.js "$2"
    ;;
  todos)
    echo "Exportando todos os contatos do WhatsApp..."
    node scripts/export-all-contacts.js
    ;;
  ajuda|help|-h|--help)
    show_help
    ;;
  *)
    echo "Comando desconhecido: $1"
    show_help
    exit 1
    ;;
esac

# Se chegou aqui, mostrar lista de arquivos gerados
echo ""
echo "Arquivos disponíveis em ${SDK_DIR}/midias/Planilha_csv/:"
ls -lt "${SDK_DIR}/midias/Planilha_csv/" | grep -v README | head -n 5

exit 0