# Plano e registro de testes

**Responsável:** colega de API e testes, identificação pendente.

**Situação inicial:** testes funcionais e de publicação ainda não executados. A estrutura inicial não implementa as funcionalidades abaixo. Não confundir planejamento de teste com teste aprovado.

## Execução por outro integrante

Quem testa pode ser diferente de quem programou. Clonar/atualizar a branch, executar pelo README, seguir o cenário e registrar o comportamento observado. Informar navegador, dispositivo ou viewport e commit avaliado.

## Cenários planejados

| ID | Cenário | Procedimento | Resultado esperado | Estado |
| --- | --- | --- | --- | --- |
| CT01 | Links e navegação | Acionar cada link do menu e chamadas para ação | Destino correto, sem links quebrados | Não executado |
| CT02 | Menu móvel | Abrir, fechar e escolher seção em tela pequena | Menu e estado do botão consistentes | Não executado |
| CT03 | Teclado | Navegar com Tab, Shift+Tab, Enter e Escape quando aplicável | Foco visível, ordem lógica e controles acessíveis | Não executado |
| CT04 | Celular | Conferir 360 e 390 px de largura | Texto legível e sem rolagem horizontal indevida | Não executado |
| CT05 | Tablet | Conferir 768 px de largura | Layout e navegação utilizáveis | Não executado |
| CT06 | Computador | Conferir 1280 e 1440 px de largura | Seções e imagens consistentes com Figma | Não executado |
| CT07 | Zoom | Aumentar zoom para 200% | Conteúdo e controles continuam utilizáveis | Não executado |
| CT08 | Animações | Acionar efeitos e preferência por movimento reduzido | Efeitos discretos, sem impedir navegação | Não executado |
| CT09 | API: sucesso | Consultar endpoint válido | Dados corretos apresentados | Não executado |
| CT10 | API: carregamento | Simular conexão lenta | Estado de carregamento perceptível e finalizado | Não executado |
| CT11 | API: rede indisponível | Simular offline antes da consulta | Erro tratado sem quebrar a página | Não executado |
| CT12 | API: erro HTTP | Simular resposta 4xx/5xx em ambiente controlado | Falha identificada mesmo com fetch resolvido | Não executado |
| CT13 | API: dados ausentes | Simular resposta vazia ou campo ausente | Estado vazio/erro adequado, sem exceção não tratada | Não executado |
| CT14 | API: resposta inválida | Simular corpo inesperado | Mensagem adequada e interface recuperável | Não executado |
| CT15 | Imagens reais | Conferir origem, legenda e texto alternativo | Capturas corretas e acessíveis | Não executado |
| CT16 | Publicação | Abrir URL final e repetir verificações essenciais | Recursos, navegação e API funcionam na origem publicada | Não executado |

As larguras são referências de teste, não aprovação antecipada dos breakpoints do design. Simular falhas de forma controlada, sem depender de que a API pública apresente erros reais.

## Modelo de resultado executado

Copiar para cada execução efetiva:

```text
Cenário:
Data e hora:
Responsável:
Branch e commit:
Navegador / versão:
Dispositivo / viewport:
Passos executados:
Resultado observado:
Situação: Aprovado / Reprovado / Bloqueado
Evidência:
Issue de problema, se houver:
```

## Problemas corrigidos

Nenhum problema funcional corrigido registrado nesta etapa. Quando ocorrer:

| Problema / Issue | Como reproduzir | Correção / PR / commit | Reteste e evidência |
| --- | --- | --- | --- |
| A preencher após ocorrência | — | — | — |

## Verificações da estrutura inicial

Executado em 19/10/2026 durante a preparação local:

- Ambiente: Windows, PowerShell, Python 3.13.13 e Node.js 24.16.0.
- Base verificada: commit `de49835`, branch `testes/cenarios-manuais`.
- Execução HTTP: 19/10/2026 às 17:48:50, fuso de São Paulo (UTC-03:00).
- Execução: sessão de Lucas com auxílio do Codex. Não atribuída ao colega de API/testes.

| Verificação | Resultado | Limite |
| --- | --- | --- |
| `git diff --check` | Aprovado | Verifica problemas de whitespace no diff |
| `node --check js/principal.js` | Aprovado | Arquivo ainda contém somente a indicação da etapa futura |
| Existência de 16 caminhos de estrutura/documentação | Aprovado | Não verifica funcionalidades |
| Resolução de 10 links locais Markdown no README | Aprovado | Não verifica disponibilidade de URLs externas |
| HTML inicial com `lang="pt-BR"` e um `main` | Aprovado | Não é auditoria completa de acessibilidade ou HTML |
| Servir `/` por HTTP local | Aprovado: HTTP 200, `text/html`, 569 bytes | Confere somente o HTML inicial |
| Servir `/css/estilos.css` por HTTP local | Aprovado: HTTP 200, `text/css`, 77 bytes | Arquivo ainda sem estilos de implementação |
| Servir `/js/principal.js` por HTTP local | Aprovado: HTTP 200, `text/javascript`, 84 bytes | Arquivo ainda sem interações |

Servidor HTTP temporário encerrado após a verificação. Nenhuma dependência ou suíte de testes foi instalada.

Não foram executados testes de navegador, responsividade, integração com API ou publicação. O validador YAML via Python não estava disponível; os modelos de Issues receberam apenas conferência manual de estrutura.
