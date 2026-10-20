# Plano e registro de testes

**Responsável pela coordenação dos testes:** `genzo-dev`.

**Situação em 20/10/2026:** nove testes automatizados aprovados: sete do cliente da API externa e dois do pacote de publicação. Revisão visual do Figma aprovada por Thamires. Testes locais adicionais do grupo e verificações da publicação são registros separados.

## Execuções técnicas em 20/10/2026

Verificações registradas sem atribuir execução aos colegas. Cliente da API avaliado no commit `13081b8`; os commits documentais seguintes não alteram esse cliente.

| Verificação | Resultado | Evidência e limite |
| --- | --- | --- |
| Cliente da API no `npm test` | 7 testes aprovados: sucesso, nome nulo, HTTP 404/403/429/500, resposta ausente/inválida, endereço inesperado, rede e timeout | `testes/api.test.mjs`; respostas simuladas, sem consumir a cota pública |
| `npm run build` | Arquivos públicos preparados em dist | Documentação e testes não são publicados; não é um deploy |
| Pacote estático — `testes/publicacao.test.mjs` | Dois testes aprovados: recursos/âncoras/referências acessíveis resolvem também no subdiretório do Pages; pacote exclui documentos de trabalho e credenciais locais | Executados pelo npm test após preparação automática do build |
| API real no Chrome, Windows | Quatro perfis e avatares carregaram; estado sucesso e aria-busy false; sem erros/avisos no console capturado | [Computador](evidencias/api-github-computador.jpg) |
| Créditos em 390 e 1440 px | Sem overflow: conteúdo/área útil 375/375 e 1425/1425 px; quatro perfis preservados | [Celular](evidencias/api-github-celular.jpg); área útil exclui a barra de rolagem |
| `node --check js/principal.js` e `git diff --check` | Aprovados | Sintaxe e whitespace, sem auditar toda a interface |
| Interface antes da substituição da API | Menu móvel abriu/fechou ao navegar; abas funcionaram por clique/teclado; Escape fechou diálogo e devolveu foco; layouts em 360, 390, 768 e 1440 px sem overflow | [Prévia desktop](evidencias/previa-computador.jpg) e [celular](evidencias/previa-celular.jpg). Não comprovam a API atual nem aderência ao Figma aprovado |

O total atual é de nove testes: sete casos do cliente da API REST do GitHub e dois do pacote de publicação.

Validações adicionais do grupo: comparação com Figma, zoom 200%, navegação completa por teclado, preferência por movimento reduzido e falha/recuperação visual da API externa. O roteiro do Insomnia está em insomnia.md; não há execução manual registrada como realizada.

## Verificação das publicações em 20/10/2026

Versão inicial publicada: `a5569fe`. Conferência registrada sem atribuir execução aos demais integrantes. Primeiro GitHub Pages, depois Netlify. Ambos responderam HTTP 200. Os nove testes passaram localmente e no GitHub Actions em Ubuntu / Node 22.

Nas duas origens, foram conferidos CSS, capturas, aba Acesso do cliente, ampliação e fechamento com Escape, quatro perfis e avatares da API com estado sucesso e console sem erros/avisos capturados. Em 390 px, o menu abriu, navegou para Sobre e fechou; conteúdo e área útil com 375 px, sem overflow. Cabeçalhos configurados do Netlify presentes na resposta HTTP.

Links, execução e evidências em [Publicação](publicacao.md). Essas verificações técnicas não alteram a coluna de testes dos colegas, que serão registrados após a execução efetiva.

## Reteste da identidade visual — 20/10/2026

Alteração técnica: `e4c47bb`. Conferência técnica registrada. Logo original da referência e fonte Inter local aplicados.

- Nove testes aprovados; o caso do pacote público passou a conferir também os recursos apontados pelo CSS e a presença da licença da fonte.
- Fonte local respondeu HTTP 200 com tipo `font/woff2`; estilo calculado da página utiliza Inter.
- Chrome em 390 e 1440 px: conteúdo/área útil de 375/375 e 1425/1425 px, respectivamente, sem overflow horizontal.
- Logos do cabeçalho e rodapé carregados. Menu móvel abriu, navegou para Sobre e fechou com `aria-expanded` atualizado.
- Evidências: [computador](evidencias/identidade-computador.png) e [celular](evidencias/identidade-celular.png).

Essas verificações não representam execução dos testes adicionais atribuídos aos colegas.

## Execução por outro integrante

Quem testa pode ser diferente de quem programou. Clonar/atualizar a branch, executar pelo README, seguir o cenário e registrar o comportamento observado. Informar navegador, dispositivo ou viewport e commit avaliado.

## Divisão e momento dos testes

O plano atribui API/testes a um integrante e revisão/teste final a todos. O plano distribui as validações adicionais; a suíte existente cobre somente os cenários necessários do cliente da API.

| Etapa | Responsável | Cenários | Quando executar |
| --- | --- | --- | --- |
| Conferência da tarefa | Autor de cada PR | Somente os cenários afetados pela alteração | Antes de pedir revisão |
| Layout e responsividade | `DumbRyder` — Interface e responsividade | CT04–CT07 | Após as seções existirem e quando o layout mudar |
| Revisão visual e interface | Thamires (`thaamiresffranca`) | Revisão do Figma; CT01–CT03, CT08 e CT15 | Após o protótipo e após implementar as interações |
| Conferência JavaScript | Lucas (`Lcsf-dev`) | Comportamentos alterados de CT01–CT03 e CT08 | Antes de pedir revisão das interações |
| Integração da API | Gabriel Enzo (`genzo-dev`) — API e testes | CT09–CT14 | Após integrar e quando mudar o contrato/tratamento |
| Revisão integrada | Gabriel Enzo coordena; equipe participa | Cenários aplicáveis ainda pendentes e reteste das correções | Antes da publicação |
| Site publicado | Equipe, coordenada pelo responsável dos testes | CT16 e verificações essenciais de links/menu/API | Após a publicação |

As quatro frentes estão identificadas em equipe.md. A responsabilidade por uma verificação não depende de ter escrito o código. Não repetir casos não afetados por uma alteração documental; repetir quando houver mudança, falha ou risco concreto de regressão.

### Roteiro de participação nas validações

1. Abrir o protótipo ou a versão indicada na tarefa.
2. Executar os cenários da própria frente conforme a tabela abaixo.
3. Anotar o resultado observado e anexar captura ou evidência curta quando necessário.
4. Abrir uma Issue se encontrar falha; depois da correção, repetir o cenário afetado.
5. Enviar o registro em uma branch da tarefa e abrir PR, ou registrar a evidência na Issue correspondente. As aprovações do Figma ficam vinculadas à versão revisada.

Não é necessário criar uma branch permanente por integrante. Exemplos para tarefas futuras: `testes/layout-responsivo`, `testes/interface-navegacao` e `testes/integracao-api`.

O responsável registra ambiente, commit, resultado observado e evidência curta. Se houver falha, abrir Issue e vincular o PR de correção; registrar o reteste antes de dar o problema por resolvido.

## Cenários planejados

| ID | Cenário | Procedimento | Resultado esperado | Validação dos colegas |
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

| Verificação | Resultado | Limite |
| --- | --- | --- |
| `git diff --check` | Aprovado | Verifica problemas de whitespace no diff |
| `node --check js/principal.js` | Aprovado | Arquivo ainda contém somente a indicação da etapa futura |
| Existência de 16 caminhos de estrutura/documentação | Aprovado | Não verifica funcionalidades |
| Resolução de 10 links locais Markdown no README | Aprovado | Não verifica disponibilidade de URLs externas |
| HTML inicial com `lang="pt-BR"` e um `main` | Aprovado | Não é auditoria completa de acessibilidade ou HTML |

Na conferência inicial de 19/10/2026 não haviam sido executados testes de navegador, responsividade, API ou publicação. As verificações posteriores estão no início deste documento. O validador YAML via Python não estava disponível; os modelos de Issues receberam apenas conferência manual de estrutura.
