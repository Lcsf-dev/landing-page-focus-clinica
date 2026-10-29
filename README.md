# Focus Clínica — Landing Page

Landing page institucional para apresentar o Focus Clínica a clínicas, gestores e profissionais da saúde. Reúne informações sobre calendário, agendamentos, notificações e especialidades, com capturas reais e acesso à plataforma.

## Links

- [GitHub Pages](https://lcsf-dev.github.io/landing-page-focus-clinica/)
- [Netlify](https://landing-page-focus-clinica-lcsf.netlify.app/)
- [Repositório](https://github.com/Lcsf-dev/landing-page-focus-clinica)
- [Figma](https://www.figma.com/design/P7K5fBiCqhBsehhrR5BNqp/)
- [Sistema de referência](https://focus-clinica.netlify.app/)

## Funcionalidades

- Cabeçalho, hero, sobre, funcionalidades, benefícios, demonstração, chamada para ação e rodapé.
- Menu responsivo, navegação por âncoras, abas por clique/teclado e ampliação das capturas.
- Perfis públicos da equipe no rodapé, com nomes e links estáticos preservados se a API falhar.
- Layout responsivo, foco visível e tratamento de preferência por movimento reduzido.

## Executar localmente

Pré-requisitos: Node.js 22 ou superior e npm. Não há dependências de aplicação a instalar.

```powershell
npm run dev
```

Abra <http://127.0.0.1:5500>. Encerre com `Ctrl+C`. A página deve ser aberta por HTTP, para carregar os módulos ES.

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Servir a página localmente |
| `npm test` | Gerar `dist/` pelo `pretest` e executar a suíte com respostas controladas |
| `npm run build` | Gerar o pacote público em `dist/` |

## Estrutura

```text
.
├── .github/       # Workflows and contribution templates
├── css/           # styles.css and fonts/
├── docs/          # Project documentation and evidence/
├── img/           # Real screenshots, logo and SVG icons
├── js/
│   ├── github/    # HTTP client and profile validation
│   ├── team/      # Profile loading and DOM presentation
│   ├── main.js
│   ├── menu.js
│   ├── demo-tabs.js
│   ├── image-viewer.js
│   └── reveal-animations.js
├── pages/         # Reserved for additional pages
├── scripts/       # build.mjs and dev-server.mjs
├── tests/         # Node.js test suite
├── index.html
├── netlify.toml
├── package.json
└── README.md
```

`dist/` é gerado e ignorado pelo Git. Nomes técnicos usam inglês; interface e documentação da equipe usam português. Convenções e decisões estão em [Refatoração](docs/refactoring.md).

## Integração com o GitHub

O rodapé consulta `GET https://api.github.com/users/{username}` para atualizar nome público, avatar e link dos quatro integrantes. As consultas começam perto do rodapé, não utilizam token e não envolvem dados clínicos. Falhas mantêm os créditos estáticos; a nova tentativa consulta somente perfis pendentes e bloqueia carregamentos simultâneos.

Veja o [contrato e tratamento de falhas](docs/api.md), o [roteiro do Insomnia](docs/insomnia.md) e a [descrição OpenAPI](docs/api.openapi.json).

## Equipe

| Integrante | Frente |
| --- | --- |
| [Lucas Fernandes](https://github.com/Lcsf-dev) | Desenvolvimento e integração |
| [Thamires](https://github.com/thaamiresffranca) | Revisão visual |
| [Gabriel Enzo](https://github.com/genzo-dev) | API e testes |
| [DumbRyder](https://github.com/DumbRyder) | Interface e responsividade |

As frentes indicam responsabilidades; registros de execução e aprovação são separados. Detalhes em [Equipe](docs/team.md).

## Documentação técnica

- [Requisitos e escopo](docs/requirements.md), [planejamento](docs/planning.md) e [tarefas](docs/tasks.md).
- [Design e diferenças para o Figma](docs/design.md); [origem dos recursos visuais](img/README.md).
- [Testes e limitações conhecidas](docs/testing.md).
- [Fluxo Git](docs/git-workflow.md), [CI/CD e publicação](docs/deployment.md) e [histórico de alterações](docs/changelog.md).
