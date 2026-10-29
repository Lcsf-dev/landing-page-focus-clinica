# 🩺 Focus Clínica — Landing Page

Landing page institucional para apresentar o **Focus Clínica**, suas funcionalidades e benefícios a clínicas, gestores e profissionais da saúde.

## 📍 Situação do projeto

| Entrega | Situação |
| --- | --- |
| 📄 Oito partes da landing page | Implementadas e conferidas tecnicamente; conferência humana posterior |
| 📱 Layout responsivo e interações | Implementados; registros em [Testes](docs/testing.md) |
| 🔌 API existente | GitHub REST API integrada aos créditos da equipe |
| 🎨 Figma | Arquivo consultado; há diferenças visuais para a implementação atual, registradas na auditoria |
| 🧪 Testes automatizados | 26 testes locais aprovados em 29/10/2026; validação remota pelo workflow com Node 22 |
| 👀 Revisão dos colegas | Pendente; não substituída pelos testes do autor |
| 🚀 Publicação | GitHub Pages e Netlify; atualização da refatoração pelo fluxo de publicação da `main` |

A finalização técnica foi preparada na branch `chore/technical-finalization`, baseada em `13edfc0`. O envio e a publicação foram autorizados após a auditoria. Veja o [relatório de finalização](docs/technical-review.md), com checklist, fontes consultadas, auditoria da API antiga, resultados, limites e campos do Notion. Esse relatório registra a etapa anterior ao envio; a versão publicada acompanha a última execução bem-sucedida do [workflow da main](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/workflows/ci-pages.yml?query=branch%3Amain).

O projeto reúne planejamento, design, implementação, integração e evidências de teste. O Figma foi concluído após o início da programação, conforme a sequência de trabalho adotada. Datas e commits registram essa evolução.

## ▶️ Executar localmente

Pré-requisito: **Node.js 22 ou superior**, com npm. O projeto não possui dependências externas a instalar.

```powershell
npm run dev
```

Abra **<http://127.0.0.1:5500>**. Para encerrar o servidor, pressione `Ctrl+C`. Abra pelo servidor HTTP, não diretamente como arquivo.

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Servir a página localmente |
| `npm test` | Preparar o pacote público via `pretest` e executar a suíte, sem consumir a cota do GitHub |
| `npm run build` | Preparar somente os arquivos públicos em `dist/` |

## 🔌 API utilizada

Consumimos a **API REST do GitHub**, com `fetch()` em `GET https://api.github.com/users/{username}`. A página atualiza nome público, avatar e link dos quatro integrantes no rodapé. Não utiliza token nem dados clínicos.

Os créditos básicos e as funcionalidades da Focus permanecem disponíveis se a API falhar. O cliente trata carregamento, falhas parciais, perfil ausente, resposta inválida e tempo limite. A tentativa manual repete somente perfis pendentes.

- 📚 [Documentação oficial do GitHub](https://docs.github.com/en/rest/users/users#get-a-user).
- 📝 [Contrato, finalidade e limites usados no projeto](docs/api.md).
- 🧪 [Roteiro para o Insomnia](docs/insomnia.md) e [arquivo de importação dos endpoints no Insomnia](docs/api.openapi.json).

## 👥 Equipe e frentes

| Integrante | Frente |
| --- | --- |
| [Lucas Fernandes](https://github.com/Lcsf-dev) | Desenvolvimento e integração |
| [Thamires](https://github.com/thaamiresffranca) | Revisão visual e validação do Figma |
| [Gabriel Enzo](https://github.com/genzo-dev) | Revisão da integração da API e testes adicionais |
| [DumbRyder](https://github.com/DumbRyder) | Interface e responsividade |

As frentes indicam atribuições. Autoria, testes executados e aprovações são registrados conforme a participação real. Veja [Equipe](docs/team.md), [Tarefas](docs/tasks.md) e [divisão dos testes](docs/testing.md).

## 🎨 Design

[Abrir Focus Clínica — Landing Page no Figma](https://www.figma.com/design/P7K5fBiCqhBsehhrR5BNqp/).

Ver [telas e identidade visual](docs/design.md). As capturas e o logo foram obtidos do sistema de referência. A fonte Inter é hospedada junto ao projeto.

## 🗂️ Estrutura

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/{bug,task}.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/ci-pages.yml
├── css/
│   ├── fonts/{inter-variable.woff2,LICENSE-Inter.txt}
│   └── styles.css
├── docs/
│   ├── evidence/
│   ├── api.md
│   ├── api.openapi.json
│   ├── changelog.md
│   ├── deployment.md
│   ├── design.md
│   ├── git-workflow.md
│   ├── insomnia.md
│   ├── planning.md
│   ├── requirements.md
│   ├── tasks.md
│   ├── team.md
│   ├── technical-review.md
│   └── testing.md
├── img/
│   ├── icons.svg
│   ├── login-focus-clinica.jpg
│   ├── logo-focus-clinica.png
│   ├── presentation-focus-clinica.jpg
│   └── README.md
├── js/
│   ├── github/
│   │   ├── github-client.js
│   │   └── github-profile.js
│   ├── team/
│   │   ├── team-profiles.js
│   │   └── team-view.js
│   ├── demo-tabs.js
│   ├── image-viewer.js
│   ├── main.js
│   ├── menu.js
│   └── reveal-animations.js
├── pages/
├── scripts/{build,dev-server}.mjs
├── tests/
│   ├── api.test.mjs
│   ├── deployment.test.mjs
│   ├── reveal-animations.test.mjs
│   ├── team-profiles.test.mjs
│   └── team-view.test.mjs
├── index.html
├── netlify.toml
├── package.json
└── README.md
```

`dist/` é gerado e ignorado pelo Git. `pages/` permanece reservado para a estrutura da entrega. Os arquivos de documentação e evidências também receberam nomes em inglês; seu conteúdo continua em português.

## Convenções e responsabilidades

Identificadores técnicos usam inglês: `camelCase` para funções, parâmetros e variáveis; `PascalCase` para tipos JSDoc; `UPPER_SNAKE_CASE` para configurações fixas; `kebab-case` para arquivos e diretórios compostos. O CSS mantém BEM (`header__inner`, `button--small`), com variáveis como `--color-teal` e estados como `data-state="loading"`. Nomes booleanos indicam condições (`isLoading`, `hasErrors`).

Textos da interface, erros exibidos, acessibilidade e documentação da equipe permanecem em português. Comentários técnicos, JSDoc e descrições dos testes usam inglês. Contratos externos (`html_url`, `avatar_url`), nomes próprios e nomes exigidos pelas ferramentas são preservados.

`main.js` apenas habilita os estilos com JavaScript e inicializa os módulos. Menu, abas, imagens e animações têm módulos próprios. `team-profiles.js` coordena carregamento e tentativas; `team-view.js` apresenta os dados no DOM. `github-client.js` cuida da rede, HTTP e timeout; `github-profile.js` valida e normaliza o JSON sem acessar o DOM ou a rede. Não foram adicionadas dependências.

O CSS permanece em um arquivo, formatado por declaração e organizado por seções, preservando cascata e breakpoints. Foram removidas as duas regras de `.cartao-recurso__icone`, sem uso no HTML/JavaScript, o estado `vazio`, nunca produzido para perfis individuais, e a duplicação da regra que ocultava o indicador em erro. Foco visível e movimento reduzido foram mantidos.

Principais renomeações: `principal.js` → `main.js`, `estilos.css` → `styles.css`, `fontes/` → `fonts/`, `testes/` → `tests/`, `consultarPerfil` → `fetchGithubProfile`, `tempoLimite` → `timeoutMs`. Os campos internos agora são `username`, `name`, `profileUrl` e `avatarUrl`.

## 🌿 Versionamento

**Issue → branch da tarefa → commits → PR → revisão → develop → revisão integrada → main → GitHub Pages / Netlify.**

`develop` reúne as entregas para integração; `main` recebe a versão revisada. Correções têm commits próprios, com reteste do comportamento afetado. Veja [Fluxo Git](docs/git-workflow.md) e [Registro de alterações](docs/changelog.md).

## 🚀 Publicação

Publicado em **20/10/2026**, primeiro no GitHub Pages e depois no Netlify:

- 🌐 [GitHub Pages](https://lcsf-dev.github.io/landing-page-focus-clinica/).
- 🚀 [Netlify](https://landing-page-focus-clinica-lcsf.netlify.app/).

O workflow único `.github/workflows/ci-pages.yml` valida PRs destinados a `develop` e `main`, pushes nessas duas branches e execuções manuais. Usa Node.js 22, ações fixadas por commit e `contents: read`. `npm test` executa o build uma vez no `pretest`; o workflow reaproveita `dist/`, sem repetir o build.

Execuções ultrapassadas da mesma branch de desenvolvimento ou PR são canceladas por concorrência. Eventos de push e PR têm grupos separados porque validam, respectivamente, o commit da branch e o resultado de integração do PR. Execuções da `main` são serializadas para preservar um deploy em andamento.

Somente uma execução bem-sucedida na referência `refs/heads/main`, fora de PRs, envia o artefato e libera o job de deploy (`needs: validate`). As permissões `pages: write` e `id-token: write` ficam restritas ao deploy. PRs e `develop` não publicam no Pages.

O Netlify mantém `netlify.toml`: `npm run build`, pasta `dist`, Node 22 e CSP existente. A branch de produção e as opções de previews do Netlify são configurações da plataforma, não alteradas nesta tarefa. Os recursos e imports usam caminhos relativos para funcionar também no subdiretório do GitHub Pages.

## Verificação da refatoração — 29/10/2026

Registro da etapa anterior, com 22 testes. O resultado atual é de 26 testes e está na finalização técnica abaixo.

- `npm test`: 22 testes aprovados; respostas controladas para HTTP, rede, timeout, JSON inválido, dados opcionais, URLs inesperadas, concorrência e tentativas apenas dos perfis pendentes.
- `npm run build`: concluído; caminhos relativos, imports ES, símbolos SVG e licença da fonte verificados pela suíte.
- Chrome local: abas por clique e teclado, diálogo com Escape, menu móvel com retorno do foco e navegação, quatro perfis reais e quatro avatares carregados; sem erros/avisos no console capturado.
- Sem overflow horizontal em 360, 390, 768, 1280 e 1440 px. Em 1440 px, dimensões das seções, textos e rótulos acessíveis coincidiram com a referência anterior à refatoração.

Ambiente local: Node.js 24.16.0 / npm 11.13.0. O workflow mantém Node 22. Na etapa local da refatoração, o workflow remoto não foi executado e não houve push, merge ou publicação; o envio e o deploy foram autorizados na etapa seguinte. Movimento reduzido foi preservado no código, sem emulação da preferência no navegador; não foi feita auditoria completa de acessibilidade, comparação visual com Figma ou teste em outros navegadores. Detalhes em [Testes](docs/testing.md).

## Finalização técnica — 29/10/2026

- `npm test`: 26 aprovados; `npm run build`: concluído. Os quatro casos adicionais verificam falha de avatar, inserção textual segura e animações/fallback.
- Corrigido o foco de “Pular para o conteúdo” com `tabindex="-1"` no `main`; Enter e continuidade por Tab retestados no Chrome.
- Conferidos menu, abas, diálogo e layouts em 360/390/768/1440 px. Falha parcial e recuperação da equipe verificadas no navegador com respostas controladas; novas tentativas somente dos pendentes.
- A API própria já tinha sido removida em `13081b8`; removidos apenas diretórios locais vazios remanescentes. Cliente GitHub, OpenAPI e Insomnia preservados. Não foram encontradas credenciais na árvore inspecionada.
- Notion e PDF consultados; campos para atualização manual consolidados no relatório, sem edição do Notion.
- Pages e Netlify responderam HTTP 200 para a versão anterior `13edfc0`; esta branch não foi publicada. O workflow dessa base passou com 22 testes em Node 22.23.4 na etapa anterior.

Limites: diferenças visuais para o Figma registradas, zoom real de 200% e emulação real de movimento reduzido não comprovados; sem auditoria completa de acessibilidade ou aprovação final humana. Os testes atuais foram executados pelo Codex nesta sessão, a pedido do solicitante, sem atribuição aos colegas. A conferência posterior da equipe não impediu a conclusão das atividades técnicas disponíveis.
