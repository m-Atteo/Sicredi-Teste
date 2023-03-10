# Sicredi-Teste

Este é o projeto automatizado em cypress feito para suprir os cenários do projeto teste.

##  Requisitos
 * Node.js deve estar instalado
 * Cypress deve estar instalado no diretorio do projeto
 * A biblioteca 'cypress-plugin-api' deve estar instalada no diretorio do arquivo
 * O reporter 'mochawesome' deve estar instalado para que relatorios HTML sejam formados durante as execuções remotas

## Como executar a aplicação 

Na raiz do projeto, através de seu Prompt de Commando/Terminal/Console execute os seguintes comandos 

```bash
npm install
```
### para testes locais:
```bash
npx cypress open
```
 * selecione o modo teste e2e
 * escolha um browser para rodar o teste
 * selecione o cenário a ser rodado
 * aguarde até os testes terminarem

### para testes remotos:
```bash
npx cypress run --reporter mochawesome
```
 * ./cypress/videos -> deve mostrar um video .mp4 gravado do teste
 * ./cypress/screenshots -> deve mostrar screenshots de cada etapa do teste
 * ./mochawesome-reports -> deve ter um json e um arquivo html, abra o arquivo html no navegador para ver o report gerado

## ATENÇÃO! Lembre-se de reiniciar a aplicação antes de rodar os testes novamente!