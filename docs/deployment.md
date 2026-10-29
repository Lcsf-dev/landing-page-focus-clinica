# CI/CD e publicação

## Produção

| Plataforma | Endereço |
| --- | --- |
| GitHub Pages | <https://lcsf-dev.github.io/landing-page-focus-clinica/> |
| Netlify | <https://landing-page-focus-clinica-lcsf.netlify.app/> |

A versão validada em 29/10/2026 é `8b8ba58`, integrada pelos PRs #28 e #29. O [workflow de produção](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/runs/40945562687) passou com 26 testes em Node 22.23.4, gerou o pacote pelo `pretest` e publicou no Pages. Os dois endereços responderam HTTP 200 e serviram a versão atualizada, incluindo a correção do foco do link de salto.

O [sistema de referência](https://focus-clinica.netlify.app/) é uma aplicação externa, distinta desta landing page. A última versão de produção deve ser conferida no [workflow da main](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/workflows/ci-pages.yml?query=branch%3Amain) e no histórico do Netlify.

## GitHub Actions

O workflow `.github/workflows/ci-pages.yml` executa em PRs destinados a `develop` e `main`, pushes nessas branches e execuções manuais.

- Node.js 22, ações fixadas por commit e `contents: read` na validação.
- `npm test` gera `dist/` uma vez pelo `pretest`; o mesmo pacote é usado na publicação.
- Upload e deploy somente na referência `refs/heads/main`, fora de PRs e após sucesso de `validate`.
- `pages: write` e `id-token: write` restritos ao job de deploy.
- Validações ultrapassadas do mesmo PR/branch de desenvolvimento são canceladas; execuções da `main` são serializadas.

PRs e pushes em `develop` não publicam no GitHub Pages. Validações de push e PR têm grupos separados por verificarem o commit da branch e a integração do PR.

## Netlify e pacote público

`netlify.toml` define `npm run build`, publicação de `dist`, Node 22 e cabeçalhos CSP, X-Content-Type-Options, Referrer-Policy e X-Frame-Options. A CSP permite consultas ao GitHub e avatares no domínio esperado.

A produção acompanha `main`. O Netlify também gerou uma [prévia do PR #29](https://deploy-preview-29--landing-page-focus-clinica-lcsf.netlify.app/); previews são separados de produção e controlados pelas configurações da plataforma. Não presumir que estejam desabilitados.

O pacote contém HTML, CSS, JavaScript, imagens, fontes e a licença da Inter. Documentação, testes, configurações locais e histórico Git ficam fora. Caminhos relativos preservam a compatibilidade com o subdiretório do Pages. O Pages aplica os cabeçalhos da própria plataforma.

## Histórico de publicação

| Data | Versão | Registro |
| --- | --- | --- |
| 20/10/2026 | `a5569fe` | Publicação inicial no Pages e depois no Netlify; [workflow](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/runs/39421037690) e [deploy Netlify](https://app.netlify.com/projects/landing-page-focus-clinica-lcsf/deploys/6ad75c448744501e4d0ddb7a). |
| 29/10/2026 | `13edfc0` | Refatoração publicada com 22 testes no [workflow](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/runs/40937911844). |
| 29/10/2026 | `8b8ba58` | Finalização publicada com 26 testes e correção de foco; [workflow](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/runs/40945562687). |

Evidências iniciais: [Pages](evidence/github-pages-deployment.png) e [Netlify](evidence/netlify-deployment.png). Cenários e limites de verificação em [Testes](testing.md). A limpeza documental integrada apenas em `develop` não altera a produção.
