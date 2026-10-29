# Planejamento

## Situação atual — 29/10/2026

Quadro consolidado ao concluir a auditoria local, antes da autorização posterior de envio/publicação. As referências a alterações somente locais preservam esse momento; o estado operacional de publicação é acompanhado em [deployment.md](deployment.md).

Prazo de entrega informado: **14/11/2026**. Canal de comunicação da equipe: **WhatsApp**. Organização das tarefas: **Issues do GitHub**, no fluxo A fazer → Em andamento → Em revisão → Concluído.

| Etapa | Situação | Evidência |
| --- | --- | --- |
| Planejamento e divisão das frentes | Registrados; revisões adicionais da equipe em aberto | [Requisitos](requirements.md), [Equipe](team.md) e [Tarefas](tasks.md) |
| Figma | Wireframes, três layouts e protótipo concluídos; revisão visual aprovada por Thamires | [Design](design.md) |
| Implementação | Oito seções, responsividade, menu, abas e ampliação concluídos | HTML, CSS e JavaScript integrados à main |
| Identidade visual | Logo original obtido do sistema de referência; Inter hospedada localmente | [Recursos visuais](../img/README.md) e css/fonts |
| API | GitHub REST API integrada aos créditos, com tratamento de falhas; sem backend próprio ativo | [Contrato](api.md), 14 testes do cliente e cenários de apresentação/coordenação |
| Testes técnicos | 26 testes locais aprovados, build concluído e cenários do navegador executados pelo Codex nesta sessão | [Finalização técnica](technical-review.md) e [Testes](testing.md) |
| Publicação | Base `13edfc0` publicada em Pages e Netlify; ajuste de foco e novos testes somente na branch local | [Publicação](deployment.md) |
| Conferência posterior da equipe | Ainda não executada; não bloqueou a validação técnica disponível | Responsabilidades preservadas em team.md |

Branch desta etapa: `chore/technical-finalization`, sem push, merge ou publicação. As fontes foram relidas, incluindo Notion e PDF. O design atual difere do Figma em composição/textos; não há declaração de equivalência visual ou de nova aprovação humana.

## Endereços publicados

- GitHub Pages: <https://lcsf-dev.github.io/landing-page-focus-clinica/>.
- Netlify: <https://landing-page-focus-clinica-lcsf.netlify.app/>.
- Repositório público: <https://github.com/Lcsf-dev/landing-page-focus-clinica>.
- Figma: <https://www.figma.com/design/P7K5fBiCqhBsehhrR5BNqp/>.

## Frentes e próximas atividades

| Integrante | Frente | Próxima atividade |
| --- | --- | --- |
| Lucas Fernandes (`Lcsf-dev`) | Desenvolvimento e integração | Acompanhar revisões e corrigir problemas efetivamente encontrados |
| Thamires (`thaamiresffranca`) | Revisão visual | Conferir a interface implementada e registrar CT01–CT03, CT08 e CT15 |
| Gabriel Enzo (`genzo-dev`) | API e testes | Revisar o contrato e a integração; registrar CT09–CT14 e consolidar resultados |
| `DumbRyder` | Interface e responsividade | Comparar as telas com o Figma e registrar CT04–CT07 |

Todos participam da conferência da versão publicada (CT16). Os prazos individuais de revisão ainda precisam ser combinados antes da entrega em 14/11/2026. Os resultados devem identificar o ambiente, o commit e quem executou a atividade.

## Pendências reais

- Conferência humana posterior e definição da referência visual final, pois implementação e Figma apresentam diferenças de composição/textos. A aprovação histórica do protótipo foi preservada.
- Zoom real de 200% e emulação real de movimento reduzido ainda não comprovados; lógica de movimento reduzido, teclado e estados visuais de falha parcial/recuperação já foram verificados nesta auditoria conforme technical-review.md.
- Registro e correção de problemas que surgirem nessas verificações, com reteste dos comportamentos afetados.
- Consolidação final dos resultados e atualização das Issues antes da entrega.

Capturas internas adicionais são opcionais e dependem de material fornecido pela equipe, sem dados pessoais. A entrega atual utiliza capturas reais das telas públicas de apresentação e acesso.

## Histórico das decisões

| Data | Decisão |
| --- | --- |
| 19/10/2026 | Iniciar o projeto local, organizar responsabilidades e criar o repositório, inicialmente privado |
| 19/10/2026 | Definir Netlify como hospedagem e reservar a frente de API/testes ao colega interessado |
| 20/10/2026 | Adotar branches por tarefa, PRs, develop para integração e main para produção |
| 20/10/2026 | Consumir a API existente do GitHub e registrar sua documentação |
| 20/10/2026 | Concluir o Figma após o início da implementação, conforme sequência autorizada; revisão visual aprovada por Thamires |
| 20/10/2026 | Tornar o repositório público e publicar primeiro no GitHub Pages e depois no Netlify |
| 20/10/2026 | Conferir o logo no sistema de referência e alinhar a tipografia do site à Inter do Figma |

Os modelos de Issues e Pull Requests já estão disponíveis na branch principal. Tarefas concluídas foram integradas; a presença de um merge não substitui uma revisão independente ainda pendente. Datas, autoria e resultados permanecem vinculados ao trabalho real.
