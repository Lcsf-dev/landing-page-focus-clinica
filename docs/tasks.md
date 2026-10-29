# Quadro de tarefas

## Consolidação técnica — 29/10/2026

Esta consolidação registra o encerramento da auditoria local. O envio e a publicação ocorreram em etapa posterior; as descrições de ausência de envio abaixo preservam o histórico da verificação.

Auditoria técnica: oito partes implementadas, 26 testes aprovados, build concluído, ajuste de foco retestado, falha parcial/recuperação e larguras de referência conferidas. Limites de design, zoom e movimento real documentados em [Finalização técnica](technical-review.md).

As alterações estão na branch local `chore/technical-finalization`, sem envio/publicação. A conferência da equipe permanece posterior à auditoria técnica. Não foram alterados estados das Issues nem concedidas aprovações em nome dos colegas.

## Quadro histórico — 20/10/2026

Registro de 20/10/2026. Entrega informada: **14/11/2026**. Fluxo: **A fazer → Em andamento → Em revisão → Concluído**. Usar Issues do GitHub como quadro operacional. Os números de testes abaixo são históricos; a suíte atual possui 26. Prazos individuais de revisão ainda não acordados; status Em revisão não significa aprovação.

| Tarefa / Issue | Frente | Estado | Evidência e critério restante |
| --- | --- | --- | --- |
| T01 — iniciar repositório | Lucas | Concluído | Estrutura inicial publicada no GitHub |
| [T02 / #1](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/1) — planejamento | Lucas / equipe | Em revisão | PR #10 e atualização no PR #16; equipe revisa decisões |
| [T03 / #2](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/2) — Figma | Lucas cria; Thamires valida | Concluído | Wireframes, layouts e protótipo; revisão visual aprovada em 20/10/2026 |
| [T04 / #3](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/3) — API e contrato | Lucas / Gabriel | Em revisão | GitHub REST API escolhida; api.md e PR #16; Gabriel revisa |
| [T05 / #4](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/4) — cabeçalho e hero | Interface / desenvolvimento | Em revisão | Implementados e publicados; logo do sistema de referência e fonte Inter aplicados; comparação adicional pela equipe |
| [T06 / #5](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/5) — seções responsivas | Interface / desenvolvimento | Em revisão | PR #14; DumbRyder valida layout e registra resultados |
| [T07 / #6](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/6) — interações | Lucas / revisão visual | Em revisão | PR #15; revisão independente das interações |
| [T08 / #7](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/7) — integração | Lucas / Gabriel | Em revisão | PR #16; sete testes e consulta real aprovados; revisão de Gabriel pendente |
| [T09 / #8](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/8) — testes adicionais | Gabriel Enzo | A fazer | Revisar integração, CT09–CT14 e consolidar resultados reais |
| [T10 / #9](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/9) — publicação | Lucas / equipe | Concluído | GitHub Pages e Netlify publicados; HTTP, menu, imagens e API verificados; detalhes em deployment.md |
| [T11 / #12](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/12) — revisão visual | Thamires | Em andamento | Figma aprovado; testes de interface CT01–CT03, CT08 e CT15 serão registrados após execução |
| [T12 / #13](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/13) — layout | DumbRyder | A fazer | CT04–CT07 com ambiente e evidências |

## Pull Requests para develop

- [#10 — Planejamento](https://github.com/Lcsf-dev/landing-page-focus-clinica/pull/10).
- [#11 — Verificações iniciais](https://github.com/Lcsf-dev/landing-page-focus-clinica/pull/11); fechado como substituído, sem integrar o estado inicial sobre a entrega atual.
- [#14 — Estrutura e estilos](https://github.com/Lcsf-dev/landing-page-focus-clinica/pull/14); depende do planejamento.
- [#15 — Menu e demonstração](https://github.com/Lcsf-dev/landing-page-focus-clinica/pull/15); depende da estrutura.
- [#16 — API existente e entrega documentada](https://github.com/Lcsf-dev/landing-page-focus-clinica/pull/16); depende das etapas anteriores e contém o estado final.

PRs #10, #14, #15 e #16 integrados; implementação enviada à main pelo [#17](https://github.com/Lcsf-dev/landing-page-focus-clinica/pull/17). Configuração de publicação integrada por [#18](https://github.com/Lcsf-dev/landing-page-focus-clinica/pull/18) e [#19](https://github.com/Lcsf-dev/landing-page-focus-clinica/pull/19). Entregas implementadas permanecem em revisão onde há validação independente da equipe pendente.

Branches reservadas ou sem commits próprios não contam como entregas. Datas e autoria devem corresponder ao trabalho real; cada colega registra sua revisão ou teste quando o executar.
