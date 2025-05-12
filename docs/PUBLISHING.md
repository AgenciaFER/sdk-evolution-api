# Publicação no NPM

Este documento descreve os passos para publicar o SDK Evolution API no NPM.

## Pré-requisitos

1. Tenha uma conta no [npm](https://www.npmjs.com/)
2. Esteja logado na sua conta via CLI (`npm login`)
3. Tenha permissões para publicar no escopo/organização (se aplicável)

## Processo de Publicação

### 1. Preparação

Antes de publicar, verifique:

- Se todos os testes passam: `npm test`
- Se a documentação está atualizada
- Se a versão no `package.json` é correta (siga o [versionamento semântico](https://semver.org/))

### 2. Atualizando a Versão

Use os comandos do npm para atualizar a versão conforme necessário:

```bash
# Para correções de bugs
npm version patch

# Para novas funcionalidades que mantêm compatibilidade
npm version minor

# Para mudanças que quebram compatibilidade
npm version major
```

Isto irá atualizar o package.json e criar uma tag git automaticamente.

### 3. Publicação Automatizada

Use o script de publicação para automatizar o processo:

```bash
npm run publish:npm
```

Este script irá:
- Limpar builds anteriores
- Instalar dependências
- Executar os testes
- Fazer o build do projeto
- Verificar seu login no NPM
- Publicar o pacote

### 4. Publicação Manual

Se preferir o processo manual:

```bash
# Limpar e reinstalar dependências
rm -rf node_modules
rm -rf dist
npm install

# Executar testes
npm test

# Build do projeto
npm run build

# Publicar
npm publish
```

## Notas Importantes

- Certifique-se de que o campo `"private": false` está no package.json
- Se estiver usando um escopo, certifique-se de que a configuração está correta em package.json
- Verifique as configurações de acesso se estiver usando um escopo privado
