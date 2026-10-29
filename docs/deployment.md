# Publicação e verificação final

**Status:** publicado e verificado em 20/10/2026. Primeiro no GitHub Pages, depois no Netlify.

## Endereços da entrega

| Plataforma | Endereço | Publicação inicial |
| --- | --- | --- |
| GitHub Pages | <https://lcsf-dev.github.io/landing-page-focus-clinica/> | Commit `a5569fe`; [execução aprovada](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/runs/39421037690) |
| Netlify | <https://landing-page-focus-clinica-lcsf.netlify.app/> | Commit `a5569fe`; [deploy publicado](https://app.netlify.com/projects/landing-page-focus-clinica-lcsf/deploys/6ad75c448744501e4d0ddb7a) |

Responsável pela publicação: Lucas Fernandes (`Lcsf-dev`). Data: 20/10/2026, fuso de São Paulo. Atualizações posteriores de documentação mantêm os mesmos arquivos públicos; o histórico de cada plataforma identifica o commit mais recente.

O endereço <https://focus-clinica.netlify.app/> é o sistema de referência, não a publicação desta landing page.

## Publicação automática

- Produção acompanha `main`; tarefas passam por branches próprias e `develop`.
- GitHub Pages: `.github/workflows/ci-pages.yml`, Node 22. PRs destinados a `develop`/`main` e pushes nessas branches passam por `npm test`; o `pretest` prepara `dist` uma única vez. Ações fixadas por commit; leitura de conteúdo na validação e permissões de publicação somente no deploy.
- O upload e o deploy exigem `refs/heads/main`, evento diferente de PR e validação aprovada (`needs: validate`). PRs e branches de desenvolvimento não publicam no Pages. A concorrência cancela validações ultrapassadas do mesmo PR/branch de desenvolvimento e serializa execuções da `main`.
- Netlify: repositório conectado, branch `main`, `netlify.toml`, comando `npm run build`, pasta `dist`, Node 22. Não há função ou API própria.
- Somente arquivos públicos entram em `dist`; documentos, testes e histórico Git ficam fora.
- Os cabeçalhos definidos no `netlify.toml` são aplicados pelo Netlify. O GitHub Pages utiliza os cabeçalhos da própria plataforma.

Configuração revisada localmente em 29/10/2026. Foram executados `npm test` (22 aprovados) e `npm run build`; o workflow remoto e novos deploys não foram executados nesta tarefa. O Node local é 24.16.0; CI e Netlify continuam configurados com Node 22. A configuração da branch e dos previews do Netlify na plataforma foi preservada.

## Verificações executadas

| Verificação | Resultado em 20/10/2026 |
| --- | --- |
| HTTP dos dois endereços | `200 OK`, conteúdo HTML |
| Testes locais | Nove aprovados |
| GitHub Actions em Ubuntu / Node 22 | Testes, pacote e publicação aprovados |
| CSS e imagens | Estilos aplicados; capturas e avatares carregados |
| Demonstração nas duas origens | Aba de acesso selecionada, captura ampliada e diálogo fechado com Escape |
| API nas duas origens | Quatro perfis e quatro avatares; estado `sucesso`; sem erros/avisos no console capturado |
| Menu móvel nas duas origens | Abriu, navegou para Sobre e fechou; `aria-expanded` atualizado |
| Responsividade em 390 px | Conteúdo e área útil com 375 px, sem overflow horizontal nas duas origens |
| Cabeçalhos Netlify | CSP, X-Content-Type-Options, Referrer-Policy e X-Frame-Options presentes |

Evidências: [GitHub Pages](evidence/github-pages-deployment.png) e [Netlify](evidence/netlify-deployment.png). Roteiros e limites em [Testes](testing.md).

Os testes locais adicionais dos colegas continuam pendentes. A publicação e as verificações técnicas não representam execução desses testes por outros integrantes.
