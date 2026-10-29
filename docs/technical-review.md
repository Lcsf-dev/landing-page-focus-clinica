# Finalização técnica — 29/10/2026

Este relatório preserva o estado observado ao concluir a auditoria, antes dos commits e do envio. A publicação foi autorizada pelo solicitante em uma etapa posterior. As referências abaixo a branch local, produção anterior e ausência de push/deploy descrevem aquele momento; o estado de publicação deve ser conferido em [deployment.md](deployment.md) e no workflow da `main`.

## Escopo, ambiente e autoria da verificação

Auditoria e verificações executadas pelo Codex nesta sessão, a pedido de Lucas, sem atribuir execução ou aprovação aos demais integrantes. Branch local: `chore/technical-finalization`, criada de `13edfc0`. A árvore estava limpa antes do trabalho. Nesta etapa não houve commit, push, merge, alteração do Notion/Figma ou publicação.

Ambiente: Windows, Chrome, Node.js 24.16.0 e npm 11.13.0. O projeto continua sem dependências de aplicação. A ferramenta pypdf foi instalada somente em `tmp/pdf-tools/`, ignorado pelo Git, para leitura das duas páginas do guia fornecido.

Fontes efetivamente consultadas:

- Guia de Responsabilidades — Projeto Front-End, PDF de duas páginas fornecido pelo solicitante. Descreve design, HTML/CSS, JavaScript, API/testes e responsabilidades compartilhadas; não exige uma API clínica.
- [Notion compartilhado](https://app.notion.com/p/DOCUMENTA-O-DO-PROJETO-FRONT-END-3feeed34bfcc8000b011c7579a7b824e), lido pelo navegador após falha no acesso web direto. Foram consultadas as seções 1 a 7, incluindo os placeholders.
- README, todos os documentos de `docs/`, recursos, módulos, scripts, testes, configurações e histórico pertinente do repositório local.
- [Figma](https://www.figma.com/design/P7K5fBiCqhBsehhrR5BNqp/), acessível pelo navegador: páginas de wireframes, layouts/protótipo e quadro desktop; evidência local `evidence/figma-original-logo.png` também inspecionada.
- [Documentação oficial de usuários do GitHub](https://docs.github.com/en/rest/users/users#get-a-user) e consulta real ao endpoint público.

As fontes de requisitos não constituem evidência de participação ou aprovação individual. O registro anterior de aprovação do Figma por Thamires em 20/10/2026 foi preservado; não foi produzida uma nova aprovação.

## Checklist de implementação

| Requisito | Situação nesta execução | Evidência e limite |
| --- | --- | --- |
| RF01 — Cabeçalho | Implementado e conferido | Logo, navegação e link externo em `index.html`; menu acessível em `js/menu.js`. |
| RF02 — Hero | Implementado e conferido | Um `h1`, descrição, duas ações e captura real com texto alternativo. |
| RF03 — Sobre | Implementado e conferido | Seção `#about`, finalidade institucional e acesso aos recursos. |
| RF04 — Funcionalidades | Implementado e conferido | Calendário, agendamentos, notificações e especialidades em conteúdo estático. |
| RF05 — Benefícios | Implementado e conferido | Organização, praticidade e acesso às informações em `#benefits`. |
| RF06 — Demonstração | Implementado e conferido | Capturas de apresentação/acesso, legendas, abas e ampliação. |
| RF07 — Chamada para ação | Implementado e conferido | Link para o sistema de referência; endereço respondeu HTTP 200. |
| RF08 — Rodapé | Implementado e conferido | Identificação, navegação, repositório e quatro perfis estáticos com enriquecimento pela API. |
| Estrutura-base e modularização | Preservadas | `index.html`, `pages/`, `css/`, `js/`, `img/`, README; entrada enxuta e módulos por responsabilidade. Nenhuma página extra foi criada. |
| Convenções técnicas | Conferidas | Inglês nos identificadores próprios, BEM, ES modules, constantes/unidades explícitas; português na interface e documentação. Referência antiga de ícones corrigida. |
| Identidade visual | Preservada | Logo e capturas reais, Inter, verde, petróleo e branco; nenhum redesenho nesta auditoria. |
| Responsividade | Conferida nas larguras de referência | Sem overflow em 360, 390, 768 e 1440 px; área útil de 345, 375, 753 e 1425 px, respectivamente. |
| Figma — correspondência visual | Parcial, requer conferência de design | Fonte, marca, paleta e estrutura reconhecíveis; composição e textos diferem do site atual. Não foi declarada equivalência visual completa. |
| Interações e teclado | Conferidos nos cenários abaixo | Abas, menu, diálogo, retorno de foco e link de salto retestado após correção. Não é auditoria completa de acessibilidade. |
| Movimento reduzido | Lógica validada com respostas controladas; CSS inspecionado | Testes de fallback sem observer e com preferência reduzida; regras CSS desativam animações/transições e rolagem suave. Preferência real não emulada no navegador. |
| Zoom de 200% | Não comprovado | Atalhos enviados não alteraram a escala efetiva (`devicePixelRatio` continuou 1). Não foi apresentado teste de reflow como se fosse zoom real. |
| API externa | Validada | HTTP, rede, timeout, JSON, tipos, URLs, dados opcionais, avatar e inserção segura na suíte; falha parcial/recuperação também no navegador. |
| Testes e build | Aprovados | 26 testes; `npm run build` concluído. |
| CI/CD | Configuração conferida, sem nova execução remota | Node 22; PRs para `develop`/`main`, pushes nessas branches, deploy do Pages somente na `main` após `validate`. |
| Produção | Versão anterior conferida, sem publicar a branch | Pages e Netlify responderam HTTP 200; conteúdo corresponde à base `13edfc0`, com inserções próprias do Netlify. O novo `tabindex` permanece somente local. |

## Auditoria da API abandonada

Inspecionados código, scripts, testes, dependências, variáveis de ambiente por nome, hospedagem, workflows, documentação e histórico dos caminhos antigos. A busca por padrões comuns de credenciais não encontrou ocorrências na árvore de aplicação/documentação inspecionada; valores de credenciais não foram exibidos. Não é uma varredura integral de segredos de todo o histórico Git.

| Ocorrência | Classificação | Providência e justificativa |
| --- | --- | --- |
| `dados/funcionalidades.mjs` e `netlify/functions/funcionalidades.mjs` no histórico | Implementação antiga já removida | O commit `13081b8` removeu ambos e substituiu a API própria pelo GitHub. Não existem na árvore atual; histórico preservado. |
| Diretórios locais vazios `dados/`, `netlify/functions/` e `netlify/` | Vestígios abandonados confirmados | Removidos após validar os caminhos e confirmar que estavam vazios. Diretórios vazios não geram exclusão versionável no Git. |
| `js/github/`, `js/team/` e testes da API | Integração atual | Preservados: cliente público, normalização, coordenação e apresentação dos perfis. |
| `docs/api.openapi.json` e roteiro do Insomnia | Integração atual documentada | Preservados: descrevem `https://api.github.com/users/{username}`, não um backend próprio. |
| `scripts/dev-server.mjs` e `127.0.0.1:5500` | Servidor estático atual de desenvolvimento | Preservados; servem recursos locais, sem rota de API de negócio. |
| Captura da tela de login e link do sistema externo | Conteúdo institucional atual | Preservados; a landing page não autentica usuários e não recebe dados clínicos. |
| Evidências anteriores à substituição e changelog | Registros históricos legítimos | Preservados e identificados como históricos. Não comprovam a API atual. |
| Banco, autenticação própria, dependências ou configuração de backend ativos | Não encontrados | `package.json` não declara dependências; Netlify publica `dist`; não há schema de banco ou `.env` de aplicação na árvore inspecionada. |

O servidor e as respostas sintéticas usados na verificação de falhas ficaram em `tmp/`, fora da aplicação e do pacote público, e foram encerrados após a verificação. Não foi criada uma nova API do produto.

## Correções e resultados efetivos

### Correção de foco

Antes: o link “Pular para o conteúdo” alterava `#content`, mas `document.activeElement` permanecia no `body` no Chrome. Correção mínima: `tabindex="-1"` no `main`. Depois: Enter focou `MAIN#content`; o próximo Tab alcançou “Conhecer funcionalidades” com foco visível. O atributo não cria uma parada adicional na sequência normal de Tab e não modifica o layout.

### Testes automatizados

`npm test`: **26 aprovados, zero falhas**. São 14 testes de API/normalização, três de pacote público, cinco de coordenação/apresentação da equipe, dois específicos de avatar/inserção textual e dois de animações/fallback. Foram acrescentados os arquivos `tests/team-view.test.mjs` e `tests/reveal-animations.test.mjs`; os 22 testes anteriores foram preservados.

A suíte cobre HTTP 403/404/429/500, rede, timeout na requisição e no corpo, limpeza do temporizador, JSON inválido, identidade, URLs e tipos inesperados, valores opcionais, concorrência, novas tentativas apenas dos pendentes, falha de avatar, nome inserido como texto e movimento reduzido. Respostas controladas não consomem a cota do GitHub.

`npm run build`: concluído. A suíte confere recursos/âncoras/referências acessíveis em subdiretório do Pages, fontes/licença, imports ES, símbolos SVG e exclusão de arquivos de trabalho do pacote.

Auditoria final adicional: 46 links locais Markdown resolvidos, sintaxe de 16 arquivos JavaScript conferida com `node --check` e `git diff --check` aprovado. HTML com um `h1`, sem salto na hierarquia de títulos, landmarks `header/main/footer`, seis seções no `main` (oito partes contando cabeçalho/rodapé), atributo `alt` nas seis imagens e `rel` seguro nos links em nova aba. Esses checks não substituem auditoria completa de acessibilidade.

### Navegador

- Responsividade nas quatro larguras acima, com os textos e recursos reais da página.
- Abas por teclado (ArrowRight, Home, End) e clique já coberto no fluxo; seleção e painel correspondentes conferidos. Diálogo aberto por Enter, texto alternativo preservado, Escape fechando e retornando ao link de ampliação.
- Menu móvel aberto por teclado/clique, estados `aria-expanded`/`aria-hidden`, Escape com retorno ao botão e navegação para `#features` com foco na seção conferidos. Com o menu aberto e estabilizado, Tab alcançou o link Sobre.
- Link de salto corrigido e retestado; foco visível observado. Não foi alegada cobertura de todas as combinações de teclas/tecnologias assistivas.
- Falhas controladas no navegador: quatro requisições mantidas pendentes exibiram carregamento, `aria-busy="true"` e botão desabilitado. Após liberar uma resposta válida e três HTTP 503, nomes e links estáticos permaneceram. “Tentar novamente” consultou somente os três pendentes: contagens finais `1, 2, 2, 2`; quatro cartões concluídos, estado `success`, botão oculto e `aria-busy="false"`.
- O endpoint real de um integrante respondeu HTTP 200; no navegador, os quatro perfis e quatro avatares reais também carregaram, com estado `success`, `aria-busy="false"` e console capturado sem erros/avisos. A validação de falhas não dependeu de indisponibilidade real do serviço.

### Design e limites da comparação

O Figma abriu no navegador e apresentou as páginas “01 — Wireframes”, “02 — Layouts e protótipo” e “03 — Estilos e revisão”; a página de layouts contém quadros desktop 1440, tablet 768, celular 390 e estados de demonstração/ampliação. O quadro desktop selecionado possui viewport 1440 × 1000 com recorte de conteúdo. A evidência local anterior também foi inspecionada.

Há diferenças de texto, composição do hero e aparência de seções entre a implementação publicada e a referência observada. A documentação passa a declarar essa diferença; a aprovação histórica não foi reinterpretada como aprovação do site atual. A auditoria preservou o visual publicado para não escolher unilateralmente entre duas versões de design. A equivalência visual integral e a atualização correspondente do protótipo/site ficam explicitamente não comprovadas; a conferência humana posterior define a referência final.

Outros limites: um navegador, sem dispositivos físicos ou leitor de tela; zoom real de 200% e emulação real de movimento reduzido não comprovados. Não houve execução manual no Insomnia nem avaliação quantitativa de desempenho. A suíte local de 26 casos não foi enviada ao CI nesta etapa.

## Produção, branches e CI

Base publicada anterior: `13edfc0`, com [workflow aprovado](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/runs/40937911844), 22 testes em Node 22.23.4 e deploy do Pages, verificados na etapa anterior desta sessão. Os endereços públicos foram novamente consultados nesta auditoria:

- [GitHub Pages](https://lcsf-dev.github.io/landing-page-focus-clinica/): HTTP 200.
- [Netlify](https://landing-page-focus-clinica-lcsf.netlify.app/): HTTP 200.
- [Sistema de referência](https://focus-clinica.netlify.app/): HTTP 200; não é a landing page entregue.

Os arquivos públicos usam caminhos relativos, inclusive imports, sprite e fontes. A configuração do Pages foi inspecionada: um workflow, `pretest` construindo `dist` uma vez, ações fixadas por commit, leitura de conteúdo e permissões de publicação restritas ao deploy; artefato/deploy somente para `refs/heads/main`, fora de PRs e após sucesso. Cancelamento de validações antigas é separado por branch/PR; execuções da `main` são serializadas.

`netlify.toml` mantém Node 22, build estático, `dist` e CSP para GitHub/avatares. Configurações externas de previews e branch deploys no painel do Netlify não foram inspecionadas; não se afirma que estejam desabilitadas. A restrição de publicação de PRs/branches está comprovada no workflow do Pages, não em toda configuração externa da hospedagem.

## Campos a atualizar manualmente no Notion

Nenhum campo da página foi alterado. Sugestões baseadas no que foi efetivamente lido:

| Campo/seção | Informação consolidada |
| --- | --- |
| API escolhida — `[Nome da API]` | GitHub REST API — perfis públicos da equipe. |
| Documentação — `[Link]` | `https://docs.github.com/en/rest/users/users#get-a-user`; contrato local em `docs/api.md`. |
| Finalidade | Atualizar nome público, avatar e link no rodapé; manter créditos estáticos quando houver falha. |
| Ferramenta de organização | Issues do GitHub, com A fazer → Em andamento → Em revisão → Concluído. |
| Canal de comunicação | WhatsApp, conforme planejamento registrado. |
| Git e revisão | Branch por tarefa, PR para `develop`, revisão e integração posterior em `main`; atual auditoria na branch local `chore/technical-finalization`. |
| Figma | Link registrado em `docs/design.md`; manter aprovação de 20/10/2026 como histórica e informar que fidelidade integral da implementação atual não foi comprovada. |
| Testes 6.1 | Registrar 26 testes locais e cenários do navegador desta auditoria; manter zoom/movimento real e equivalência visual como limites, sem marcar aprovação humana. |
| Plataforma | GitHub Pages e Netlify. |
| Link do site — `[Inserir link]` | Os dois endereços públicos acima; distinguir o sistema de referência da landing page. |
| Data — `[DD/MM/AAAA]` | Publicação inicial em 20/10/2026; refatoração publicada em 29/10/2026 na etapa anterior; esta branch não foi publicada. |
| Registro — `[Data]` / `[Descrição da alteração]` | 29/10/2026: auditoria, limpeza de diretórios vazios, correção do foco do link de salto, quatro testes adicionais e documentação técnica; aguardando revisão/publicação. |

## Encaminhamento

Implementação funcional e suíte local prontas para conferência técnica, com os limites acima explícitos. Isso não equivale à aprovação final da Focus ou da equipe. A conferência humana posterior não bloqueou testes, limpeza ou correções possíveis nesta execução.

As alterações permanecem locais, sem commit/push/merge/deploy. Após revisão, conferir também o plano documental existente em `origin/develop` (`1fea162`) ao preparar o PR, preservando esse trabalho. Não atualizar Issues como aprovadas nem atribuir testes aos colegas sem registro real.
