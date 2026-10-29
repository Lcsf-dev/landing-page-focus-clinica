# Testes e verificações

## Referência validada — 29/10/2026

Versão publicada: `8b8ba58`, integrada pelos PRs [#28](https://github.com/Lcsf-dev/landing-page-focus-clinica/pull/28) e [#29](https://github.com/Lcsf-dev/landing-page-focus-clinica/pull/29). O [workflow de produção](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/runs/40945562687) concluiu com 26 testes aprovados, zero falhas e Node.js 22.23.4. O build foi executado pelo `pretest`.

As verificações locais de 29/10/2026 usaram Windows, Chrome, Node.js 24.16.0 e npm 11.13.0. Os resultados abaixo não representam testes executados pelos demais integrantes nem aprovação final de acessibilidade ou design.

## Suíte automatizada

```powershell
npm test
```

| Arquivo | Casos | Cobertura |
| --- | ---: | --- |
| `tests/api.test.mjs` | 14 | CT09–CT14: HTTP 403/404/429/500, rede (CT11), timeout da requisição e do corpo, limpeza do temporizador, JSON inválido (CT14), identidade, URLs, tipos e campos opcionais (CT13) |
| `tests/deployment.test.mjs` | 3 | Recursos e âncoras em subdiretório do Pages, referências acessíveis, fontes/licença, imports ES, símbolos SVG e exclusão de arquivos de trabalho |
| `tests/team-profiles.test.mjs` | 5 | Falha parcial, preservação dos cartões, tentativas só dos pendentes, concorrência e estados da apresentação |
| `tests/team-view.test.mjs` | 2 | Falha do avatar, iniciais e inserção do nome como texto |
| `tests/reveal-animations.test.mjs` | 2 | Movimento reduzido, ausência de observer e revelação dos elementos |

Os testes usam respostas controladas e não consomem a cota pública do GitHub. `npm run build` também foi executado separadamente em 29/10/2026 e concluiu com sucesso.

## Verificações no Chrome — 29/10/2026

| ID | Cenário | Resultado registrado |
| --- | --- | --- |
| CT01 / CT03 | Link de salto e teclado | Antes da correção, a âncora mudava, mas o foco permanecia no `body`. Com `tabindex="-1"` no `main`, Enter focou `MAIN#content` e o próximo Tab alcançou a ação do conteúdo com foco visível. |
| CT02 / CT03 | Menu móvel | Abertura por clique/teclado, estados `aria-expanded`/`aria-hidden`, Tab até Sobre, Escape com retorno ao botão e navegação com foco em `#features`. |
| CT03 | Abas | Clique, ArrowLeft/ArrowRight, Home e End alteraram seleção, painel e foco. |
| CT15 / CT03 | Imagens e ampliação | Capturas reais com texto alternativo; clique/Enter abriram o diálogo; botão e Escape fecharam, devolvendo foco ao link. |
| CT04–CT06 | Celular, tablet e computador | Sem overflow horizontal em 360, 390, 768 e 1440 px; áreas úteis de 345, 375, 753 e 1425 px. |
| CT10 | Carregamento da equipe | Quatro respostas pendentes exibiram mensagem, `aria-busy="true"` e botão de nova tentativa desabilitado. |
| CT12 | Falha parcial e recuperação | Uma resposta válida e três HTTP 503 preservaram nomes/links. A nova tentativa repetiu só os três pendentes; contagens finais `1, 2, 2, 2`, quatro cartões concluídos e estado `success`. |
| CT09 | API real | Quatro perfis e quatro avatares carregados; `aria-busy="false"` e console capturado sem erros/avisos. |
| CT16 | Publicação | Pages e Netlify responderam HTTP 200 e passaram a servir o conteúdo de `8b8ba58`, incluindo o destino de foco no `main`. |

As falhas foram provocadas com respostas controladas, sem depender de indisponibilidade do serviço público. O roteiro de consulta manual está em [Insomnia](insomnia.md); não há execução manual registrada nessa ferramenta.

## Verificações estruturais registradas

Na finalização de 29/10/2026, 46 links locais Markdown resolveram, 16 arquivos JavaScript passaram em `node --check` e `git diff --check` passou. O HTML apresentou um `h1`, sem salto de nível nos títulos, landmarks `header/main/footer`, seis seções no `main`, atributo `alt` nas seis imagens e `rel` seguro nos links em nova aba. Esses números descrevem aquela versão, não a quantidade atual de referências documentais.

## Limitações e conferência posterior

- CT07: zoom real de 200% não foi comprovado.
- CT08: a lógica de movimento reduzido passou com respostas controladas e as regras CSS foram inspecionadas; a preferência real não foi emulada no navegador.
- As verificações usaram um navegador, sem dispositivos físicos, leitor de tela ou auditoria completa de acessibilidade.
- Existem diferenças de composição e texto entre site e Figma, descritas em [Design](design.md); equivalência visual integral não foi comprovada.
- Não houve avaliação quantitativa de desempenho ou execução manual no Insomnia.

A equipe fará a conferência posterior dos PRs integrados. Registrar somente cenários efetivamente executados e aprovações comprovadas.

## Histórico de verificações

| Data | Versão/etapa | Resultado e evidência |
| --- | --- | --- |
| 19/10/2026 | Estrutura inicial | Whitespace, sintaxe inicial, estrutura e links conferidos; testes funcionais ainda não executados. |
| 20/10/2026 | Integração GitHub e pacote | Nove testes: sete de API e dois de publicação. API real e layouts em [computador](evidence/github-api-desktop.jpg) e [celular](evidence/github-api-mobile.jpg). |
| 20/10/2026 | Publicação inicial `a5569fe` | Pages e Netlify com HTTP 200; demonstração, menu, perfis e responsividade conferidos. [Pages](evidence/github-pages-deployment.png), [Netlify](evidence/netlify-deployment.png). |
| 20/10/2026 | Identidade `e4c47bb` | Logo e Inter locais; nove testes aprovados. Layouts de 390 e 1440 px sem overflow: [celular](evidence/identity-mobile.png), [computador](evidence/identity-desktop.png). |
| 29/10/2026 | Refatoração `13edfc0` | 22 testes no [workflow](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/runs/40937911844); dimensões/textos/rótulos preservados na comparação a 1440 px; 14 recursos binários sem alteração de conteúdo. |
| 29/10/2026 | Finalização `8b8ba58` | 26 testes no CI; correção do foco e verificações descritas acima. |

As [prévias desktop](evidence/preview-desktop.jpg) e [celular](evidence/preview-mobile.jpg) anteriores à substituição da API são registros históricos de interface; não comprovam a integração atual ou aderência ao Figma.

## Como registrar um novo resultado

Informar data, responsável pela execução, branch/commit, navegador/viewport, passos, resultado, evidência e Issue relacionada quando houver falha. Após corrigir um problema, repetir o cenário afetado.

Para alterações exclusivamente documentais, conferir links afetados, `git diff --check`, diff e termos removidos. Para alterações funcionais, executar os testes afetados. Os checks obrigatórios do GitHub continuam valendo, mesmo quando executam a suíte completa.
