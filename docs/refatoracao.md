# Refatoração, limpeza e sustentabilidade — Focus Clínica

## 1. Contexto

A landing page está funcional, publicada e com testes automatizados, mas acumulou problemas típicos de evolução rápida:

- JavaScript concentrado em `js/principal.js`;
- cliente de API genérico e pouco expressivo;
- build e servidor local artesanais;
- testes sem separação clara entre unidade e integração;
- documentação duplicada, desatualizada e com referências cruzadas;
- ausência de ferramentas básicas de manutenção: lint, formatação, lockfile, link checker e E2E;
- arquivos e pastas que já cumpriram seu papel.

## 2. Objetivo

Deixar o projeto mais simples de entender, testar, publicar e evoluir, sem alterar o comportamento visual ou o escopo funcional da landing page.

## 3. Fora de escopo

- Adicionar FAQ e formulário de contato.
- Integrar Resend, Formspree ou APIs de animação sem requisito real.
- Readpatar o design adicionando animações ou o conteúdo da landing page.

## 4. Diagnóstico

| Área | Problema |
| --- | --- |
| JavaScript | `principal.js` inicializa menu, abas, diálogo, animações e créditos da equipe. |
| API | `api.js` tem nome genérico, função pouco específica e validações misturadas com transporte. |
| Build | `scripts/preparar-publicacao.mjs` e `scripts/servidor-local.mjs` reimplementam responsabilidades de uma ferramenta especializada. |
| Testes | Testes nativos do Node, sem pastas de unidade/integração e acoplados a caminhos fixos do build. |
| Documentação | `alteracoes.md`, `testes.md`, `publicacao.md`, `tarefas.md` e `fluxo-git.md` se sobrepõem. |
| Manutenção | Sem `.gitignore`, lockfile, lint, formatação, typecheck, link checker ou CI de qualidade. |
| Estrutura | `pages/` vazia, `.gitkeep` desnecessários e documentos obsoletos. |
| Navegador | Comportamentos de menu, abas, diálogo e API não têm cobertura E2E. |

# 5. Remover

| Item | Ação | Condição ou destino |
| --- | --- | --- |
| `docs/.gitkeep` | Remover | A pasta já tem conteúdo. |
| `img/.gitkeep` | Remover | A pasta já tem imagens. |
| `/pages` | Remover | Somente após a migração para Vite, quando build e dev server não dependerem mais dela. |
| `docs/insomnia.md` | Remover | O projeto não usa Insomnia; atualizar `api.md`, `README.md` e o plano de testes. |
| `docs/api.openapi.json` | Remover | Não há ferramenta consumindo o contrato; a documentação oficial do GitHub já é referenciada. |
| `docs/publicacao.md` | Remover | Mover apenas endereços e automação para o README; descartar a tabela de verificações, coberta pelo plano de testes. |
| `docs/tarefas.md` | Remover | Somente após confirmar que as Issues do GitHub contêm T01–T12, status e referências aos PRs. |
| `img/README.md` | Remover | Após migrar origem, licença e cuidados para `docs/design.md`. |
| `scripts/preparar-publicacao.mjs` | Remover | Após o Vite assumir o build. |
| `scripts/servidor-local.mjs` | Remover | Após o Vite assumir o servidor local. |
| `testes/api.test.mjs` | Remover | Substituir pela versão em `testes/unit/`. |
| `testes/publicacao.test.mjs` | Remover | Renomear e adaptar para teste de integração do build. |
| Branches mortas | Remover | Após auditoria de commits não integrados e PRs abertos. |
| Lista nominal de PRs em `fluxo-git.md` | Remover | O histórico de PRs fica no GitHub e no registro de alterações. |
| Seção “Acabamento da identidade” em `alteracoes.md` | Remover | Converter em linhas do changelog. |
| Contagens fixas de testes | Remover | Usar “suíte aprovada” ou o comando executado, evitando números que envelhecem. |

# 6. Adaptar

| Documento/arquivo | Adaptação |
| --- | --- |
| `README.md` | Adicionar “Endereços da entrega”; atualizar comandos, estrutura, pré-requisitos, testes, equipe e publicação. Remover referências a `pages`, `tarefas.md`, `publicacao.md`, Insomnia e contagens fixas. |
| `docs/alteracoes.md` | Reformatar como changelog: `Data | Tipo | Alteração | Evidência | Situação`. Corrigir a tabela quebrada, padronizar status e remover textos que misturam descrição com situação. |
| `docs/api.md` | Atualizar arquivo/função, remover Insomnia/OpenAPI e registrar as APIs avaliadas e descartadas: Resend exige função severless; Formspree só com formulário real; animações devem usar CSS/Web Animations API. |
| `docs/equipe.md` | Remover “Acesso ao GitHub” e detalhar responsabilidades, entregas e critérios de cada membro, com base em Issues, commits e PRs reais. |
| `docs/fluxo-git.md` | Auditar branches, listar apenas `main`, `develop` e branches ativas com dependência real e manter uma rotina enxuta de revisão. Remover a lista nominal de PRs. |
| `docs/planejamento.md` | Manter o prazo de 14/11/2026; consolidar como relatório final somente após a conclusão. |
| `docs/design.md` | Absorver o conteúdo útil de `img/README.md` em uma seção “Recursos visuais”, com origem, dimensões, finalidade, licença e cuidados. Melhorar o texto, deixando-o mais direto. |
| `docs/testes.md` | Renomear para `docs/plano-de-testes.md`; adotar estrutura de plano de testes com escopo, níveis, ferramentas, ambientes, critérios de entrada/saída, riscos, rastreabilidade e registro de execução. |
| `netlify.toml` | Revisar CSP após o Vite e adicionar cache para assets com hash. Manter `form-action 'none'` enquanto não houver formulário. |
| `package.json` | Adicionar scripts de dev, build, preview, test, test:unit, test:integration, test:e2e, coverage e lint. Fixar Node 22. |
| CI/CD | Atualizar workflows para `npm ci`, build, testes e E2E; validar deploy no GitHub Pages e no Netlify. |

# 7. Modificar e refatorar

## 7.1 Build e servidor local

Migrar para **Vite**:

- `vite.config.js` com `base: "./"`, `publicDir: "public"` e `outDir: "dist"`;
- mover `img/` para `public/img/`;
- manter a licença da fonte em local público adequado;
- substituir `dev`, `build` e adicionar `preview`;
- remover os scripts artesanais;
- atualizar README, Netlify e GitHub Actions;
- validar o build tanto na raiz do Netlify quanto no subdiretório do GitHub Pages.

## 7.2 JavaScript

Separar responsabilidades:

```text
js/
├── principal.js          # somente bootstrap
├── api/
│   └── github.js         # buscarPerfilGitHub
├── ui/
│   ├── menu.js           # inicializarMenu
│   ├── abas.js           # inicializarAbas
│   ├── dialogo-captura.js
│   └── revelacoes.js
└── equipe.js             # inicializarCreditosEquipe / carregarCreditosEquipe
```

Melhorias:

- `principal.js` apenas importa e inicializa;
- nomes descritivos e consistentes: `inicializarMenu`, `inicializarAbas`, `renderizarIntegrante`, `carregarCreditosEquipe`;
- `carregarCreditosEquipe` deve distinguir falha total de falha parcial;
- simplificar o `try/catch` externo, já que `Promise.allSettled` não rejeita;
- proteger inicializações contra elementos ausentes no HTML;
- manter `aria-busy`, `role="status"`, `aria-live` e o uso de `textContent`;
- opcionalmente, extrair funções puras para estado do menu e cálculo da próxima aba, facilitando testes.

## 7.3 API

- Mover `js/api.js` para `js/api/github.js`.
- Renomear `consultarPerfil` para `buscarPerfilGitHub`.
- Manter:
  - timeout com `AbortController`;
  - verificação de `resposta.ok`;
  - validação de origem de `html_url` e `avatar_url`;
  - tratamento de `name: null`.
- Remover apenas validações redundantes:
  - comparação de `login`;
  - checagem excessiva do tipo de `name`;
  - regex de usuário, caso a entrada continue vindo apenas do HTML estático.
- Adicionar mensagens de erro mais claras para resposta inválida.
- Documentar no `api.md` que a API é externa e que a validação no cliente não é fronteira de segurança.

## 7.4 Testes

Migrar para **Vitest**:

```text
testes/
├── unit/
│   ├── api-github.unit.spec.js
│   └── equipe.unit.spec.js
├── integration/
│   └── publicacao.integration.spec.js
└── e2e/
    └── navegacao.e2e.spec.js
```

Diretrizes:

- `describe` por módulo e comportamento;
- `it.each` para 403, 404, 429 e 500;
- `vi.stubGlobal` para `fetch`;
- `afterEach` para restaurar mocks;
- testes de integração leem o HTML gerado pelo Vite, sem depender de caminhos fixos;
- não chamar a API real do GitHub no CI;
- cobertura inicial realista: pelo menos 80% em `js/api` e `js/equipe`, sem exigir 100% de UI.

Adicionar **Playwright** para E2E, apenas com Chromium:

- menu móvel e desktop;
- abas por clique e teclado;
- diálogo por botão, backdrop e Escape;
- créditos da equipe com sucesso, falha parcial e retry;
- responsividade em 390, 768 e 1440 px;
- opcionalmente, varredura com `axe-core`.

## 7.5 Qualidade e manutenibilidade

Adicionar:

- `.gitignore` com `node_modules`, `dist`, `coverage`, relatórios do Playwright e `.env`;
- `package-lock.json`;
- `.nvmrc` com Node 22;
- `.editorconfig`;
- ESLint + Prettier ou Biome;
- typecheck via JSDoc + `tsc --noEmit` ou migração futura para TypeScript;
- link checker para Markdown;
- Lighthouse CI e/ou axe;
- Dependabot ou Renovate;
- cache de assets no Netlify;
- otimização das capturas para WebP/AVIF e `srcset`;
- `docs/README.md` como índice da documentação;
- templates de Issue e Pull Request;
- ADRs curtos para Vite, Vitest, Playwright e remoções relevantes.

# 8. Lacunas técnicas e funcionalidades faltantes

Não há funcionalidade de produto faltando dentro do escopo atual. As lacunas são técnicas:

| Lacuna | Ação | Prioridade |
| --- | --- | --- |
| Padronização de código | Lint e formatação | Alta |
| Reprodutibilidade | Lockfile e `npm ci` | Alta |
| Cobertura de comportamento no navegador | Playwright E2E | Alta |
| Verificação de links | Link checker no CI | Média |
| Acessibilidade e performance | axe/Lighthouse | Média |
| Documentação navegável | Índice em `docs/README.md` | Média |
| Tipagem estática | JSDoc + `checkJs` | Baixa |
| SEO social | Open Graph, canonical, sitemap | Baixa, opcional |

Formspree, Resend e APIs de animação ficam explicitamente fora do escopo até existir requisito funcional.

# 9. Critérios de aceite

- `npm ci` funciona em ambiente limpo.
- `npm run dev`, `npm run build` e `npm run preview` funcionam.
- `npm run test`, `npm run test:unit`, `npm run test:integration` e `npm run test:e2e` passam.
- `npm run lint` passa.
- Nenhum link Markdown quebrado.
- `dist/` não contém `docs`, `testes`, `node_modules` ou arquivos de configuração.
- GitHub Pages e Netlify publicam a mesma versão.
- CSP do Netlify continua válida.
- Nenhuma chamada real ao GitHub no CI.
- Documentação sem referências a arquivos removidos.
- `docs/planejamento.md` e `docs/alteracoes.md` atualizados ao final.

# 10. Riscos e dependências

| Risco | Mitigação |
| --- | --- |
| `base` do Vite quebrar o GitHub Pages | Validar `base: "./"` nos dois destinos. |
| Assets com hash quebrarem testes antigos | Reescrever testes para ler o HTML final. |
| CSP bloquear script ou estilo | Testar o build no deploy preview do Netlify. |
| Remoção de branch com commit não integrado | Auditar antes com `git branch -r --no-merged`. |
| E2E instável | Mockar API, usar Chromium apenas e traces em falha. |
| Escopo crescer para novas APIs | Manter a seção “Fora de escopo” como critério de revisão. |

# 11. Tarefas em ordem lógica

| Ordem | Tarefa | Depende de |
| ---: | --- | --- |
| 1 | Higiene do repositório: `.gitignore`, `.nvmrc`, `.editorconfig` e lockfile | — |
| 2 | Migrar build e dev server para Vite | 1 |
| 3 | Remover `/pages` e scripts legados | 2 |
| 4 | Migrar testes para Vitest e separar unit/integration | 2 |
| 5 | Adicionar E2E com Playwright | 2, 4 |
| 6 | Refatorar API do GitHub e testes unitários | 4 |
| 7 | Separar `principal.js` em módulos e testar comportamentos | 4, 5, 6 |
| 8 | Adicionar lint, formatação, typecheck e quality gates no CI | 3–7 |
| 9 | Revisar README, design, equipe, fluxo Git, alterações e plano de testes | 3–8 |
| 10 | Remover documentos obsoletos e atualizar referências finais | 9 |
| 11 | Consolidar planejamento e registro final após 14/11/2026 | 1–10 |

# 12. Estrutura para issues no GitHub

> Este documento é apenas uma referência de organização. As issues serão criadas manualmente pela equipe.

## 12.1 Issue épica

```markdown
## Objetivo
Refatorar e limpar o projeto sem alterar o comportamento da landing page.

## Resultado esperado
- Build e dev server com Vite
- Testes com Vitest e Playwright
- JavaScript modular
- Documentação sem duplicidades
- CI com quality gates

## Checklist
- [ ] #...
- [ ] #...

## Critérios de conclusão
- [ ] Build, testes e lint passam
- [ ] Deploys validados
- [ ] Documentação atualizada
```

## 12.2 Template de issue de tarefa

```markdown
## Contexto
Explique o problema atual e por que ele importa.

## Objetivo
Descreva o resultado observável esperado.

## Escopo
- [ ] ...
- [ ] ...

## Fora de escopo
- ...

## Critérios de aceite
- [ ] ...
- [ ] ...

## Validação
<!-- bloco de código -->
npm ci
npm run test
npm run build
<!-- bloco de código -->

## Dependências
- Depende de #...
- Bloqueia #...

## Riscos
- ...

## Evidências
- PR:
- Commit:
- Resultado:
```

## 12.3 Convenções de commit

- Título: `tipo(escopo): descrição curta`.
- Exemplos:
  - `build(vite): migrar build e servidor local`
  - `refactor(js): separar principal.js em módulos`
  - `refactor(api): renomear cliente GitHub e simplificar validações`
  - `test(e2e): cobrir menu, abas, diálogo e estados da equipe`
  - `docs: remover documentos obsoletos e atualizar referências`
- Labels:
  - `type: refactor`, `type: docs`, `type: test`, `type: build`, `type: chore`
  - `area: js`, `area: docs`, `area: tests`, `area: ci`
  
- Definition of Ready: contexto, escopo, critérios de aceite, dependências e validação definidos.
- Definition of Done: código/documentação alterados, testes e build verdes, links válidos, PR revisado e evidência registrada.
