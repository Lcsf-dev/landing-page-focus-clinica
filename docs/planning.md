# Planejamento

## Situação operacional — 29/10/2026

Prazo de entrega: **14/11/2026**. Organização: **Issues do GitHub**, no fluxo A fazer → Em andamento → Em revisão → Concluído. Comunicação da equipe: **WhatsApp**.

| Frente | Situação | Referência |
| --- | --- | --- |
| Implementação | Oito partes institucionais, interações e integração pública do GitHub implementadas | [Requisitos](requirements.md) e [API](api.md) |
| Design | Protótipo com revisão histórica de 20/10/2026; composição/textos da implementação ainda diferem do Figma | [Design](design.md) |
| Validação técnica | 26 testes aprovados no CI com Node 22, build concluído e cenários de navegador registrados | [Testes](testing.md) |
| Produção | `8b8ba58` publicada em Pages e Netlify; correção de foco incluída | [Publicação](deployment.md) |
| Conferência da equipe | Revisão posterior dos PRs integrados, sem aprovação presumida | [Equipe](team.md) e [Tarefas](tasks.md) |

`develop` concentra integração e `main` produção. As decisões técnicas atuais e propostas superadas estão em [Refatoração](refactoring.md); o fluxo de contribuição está em [Git](git-workflow.md).

## Próximas atividades

- Conciliar a referência visual final entre site e Figma.
- Conferir zoom real de 200% e movimento reduzido no navegador; a lógica de movimento reduzido já possui testes controlados.
- Registrar a conferência efetivamente realizada por cada integrante, com versão, ambiente e resultado.
- Corrigir problemas confirmados, repetir apenas os cenários afetados e atualizar as Issues correspondentes.

As frentes e atribuições permanecem em [Equipe](team.md). Os prazos individuais de conferência ainda precisam ser combinados antes da entrega. Capturas internas adicionais são opcionais e exigem revisão de privacidade; a página atual usa as telas públicas de apresentação e acesso.

## Decisões históricas

| Data | Decisão |
| --- | --- |
| 19/10/2026 | Estrutura e responsabilidades iniciais; Netlify definido como hospedagem. |
| 20/10/2026 | `develop` para integração, `main` para produção e branches por tarefa. |
| 20/10/2026 | GitHub REST API adotada para os créditos da equipe; Figma concluído após o início da implementação. |
| 20/10/2026 | Logo original, Inter local e publicação em Pages e Netlify. |
| 29/10/2026 | Refatoração modular e finalização técnica integradas e publicadas. |

Resultados e commits estão no [histórico de alterações](changelog.md). Os registros datados não alteram aprovações ou autoria retroativamente.
