# Testar a API no Insomnia

## Preparar

1. Instalar Node.js 22 ou superior, caso ainda não esteja disponível.
2. Na pasta do projeto, executar `npm run dev`. Não é necessário instalar dependências.
3. Manter o terminal aberto e abrir o Insomnia já instalado.
4. Usar **Import → File** e selecionar `docs/api.openapi.json`. Conferir e concluir a importação. Os nomes dos menus podem variar conforme a versão.

A especificação inclui GET, HEAD e uma requisição POST para verificar sua rejeição. Nenhum token ou credencial é necessário.

## Requisições necessárias

| Requisição | Resultado esperado |
| --- | --- |
| `GET http://127.0.0.1:5500/api/funcionalidades` | HTTP 200; JSON com `versao` e as quatro `funcionalidades` |
| `HEAD http://127.0.0.1:5500/api/funcionalidades` | HTTP 200 e cabeçalhos, sem corpo |
| `POST http://127.0.0.1:5500/api/funcionalidades` | HTTP 405 e cabeçalho `Allow: GET, HEAD` |

Se não quiser importar, criar uma requisição HTTP, selecionar o método e informar o endereço acima.

## Simular falhas localmente

Encerrar o servidor com `Ctrl+C`. No PowerShell, executar um cenário por vez:

```powershell
$env:CENARIO_API = 'erro'
npm run dev
```

Valores disponíveis: `erro` (HTTP 500), `vazio` (lista vazia), `invalido` (campos ausentes) e `lento` (atraso de dois segundos). Eles pertencem somente ao servidor local e não alteram a função publicada no Netlify.

Depois de testar, encerrar o servidor, limpar a variável e iniciar normalmente:

```powershell
Remove-Item Env:CENARIO_API -ErrorAction SilentlyContinue
npm run dev
```

O Insomnia confere o contrato HTTP. Conferir também no navegador a mensagem, o estado de carregamento e a recuperação pelo botão **Tentar novamente**.

## Registrar

Gabriel Enzo revisará a integração e fará os testes complementares. Registrar ambiente, commit, data, resultado observado e evidência em `docs/testes.md` ou na Issue da frente. A importação da especificação não significa que as requisições já foram executadas no Insomnia.

Na publicação, substituir o servidor local pelo endereço efetivo do Netlify. A URL de produção ainda não está definida.

Referência: [importação e exportação no Insomnia](https://developer.konghq.com/insomnia/import-export/).
