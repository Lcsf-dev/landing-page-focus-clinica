# Histórico de alterações

Datas no fuso de São Paulo. Os registros descrevem entregas e verificações efetivas; a revisão dos colegas é registrada separadamente.

| Data | Alteração | Evidência / resultado |
| --- | --- | --- |
| 19/10/2026 | Estrutura inicial, requisitos, planejamento, frentes de trabalho e modelos de contribuição | Repositório iniciado e tarefas organizadas no GitHub. Verificações de estrutura, sintaxe inicial e links; testes funcionais ainda não executados. |
| 20/10/2026 | Oito partes da landing page, responsividade, menu, abas e ampliação | PRs #14 e #15; prévias em [Testes](testing.md). |
| 20/10/2026 | API própria substituída por perfis públicos do GitHub | `13081b8`; cliente, estados de erro, contrato e roteiro do Insomnia. |
| 20/10/2026 | Wireframes, layouts e protótipo | Revisão visual de Thamires registrada para essa versão; detalhes em [Design](design.md). |
| 20/10/2026 | Integração da implementação e adoção de `develop` | PRs #16 e #17; configuração de publicação por #18 e #19. |
| 20/10/2026 | Publicação inicial em GitHub Pages e Netlify | `a5569fe`; nove testes aprovados e endereços conferidos. [Publicação](deployment.md). |
| 20/10/2026 | Logo original e fonte Inter local com licença | `e4c47bb`; nove testes aprovados e layouts em 390/1440 px sem overflow. |
| 29/10/2026 | Modularização e padronização dos nomes técnicos em inglês | `1912cf9` e `13edfc0`; 22 testes aprovados, visual preservado e CI ampliado para PRs/pushes em `develop` e `main`. |
| 29/10/2026 | Finalização técnica e correção do foco do link de salto | `ba05925` e `cbaa579`; quatro testes adicionais, 26 aprovados, build e cenários de navegador registrados em [Testes](testing.md). Diretórios vazios da API descontinuada removidos. |
| 29/10/2026 | Finalização integrada e publicada | PRs #28 e #29; `8b8ba58`, [workflow aprovado](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/runs/40945562687) com Node 22.23.4; Pages e Netlify atualizados. |
| 30/10/2026 | Alinhamento visual das oito partes aos layouts do Figma | Hero reto, cabeçalho, cores, textos, cartões, demonstração e rodapé ajustados; conferência em 390/768/1440 px, ausência de overflow em 360 px, build e três testes de empacotamento aprovados. Detalhes em [Testes](testing.md). |

As propostas antigas foram conciliadas com a implementação em [Decisões de refatoração](refactoring.md). Limitações de acessibilidade, zoom e comparação com Figma permanecem documentadas em [Testes](testing.md) e [Design](design.md).
