# Quadro inicial de tarefas

Fluxo: **A fazer → Em andamento → Em revisão → Concluído**.

Usar Issues do GitHub como ferramenta inicial. Este quadro resume o planejamento. Prazos dependem do acordo da equipe. Os rótulos `status: a fazer`, `status: em andamento`, `status: em revisao` e `status: concluido` representam o fluxo no GitHub.

| ID | Tarefa | Responsável | Prazo | Status | Critério de conclusão |
| --- | --- | --- | --- | --- | --- |
| T01 | Iniciar repositório e estrutura | Lucas | Sem prazo acordado | Concluído | Estrutura inicial enviada à main |
| [T02 / #1](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/1) | Revisar planejamento e escopo | Lucas / equipe | A combinar | Em revisão | Requisitos, responsáveis e decisões revisados |
| [T03 / #2](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/2) | Criar e aprovar Figma | Lucas cria; `thaamiresffranca` revisa | A combinar | A fazer | Link e aprovação registrados em design.md |
| [T04 / #3](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/3) | Definir API e contrato | `genzo-dev` | A combinar | A fazer | API, finalidade, endpoint e resposta documentados |
| [T05 / #4](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/4) | Implementar cabeçalho e hero | Lucas, sujeito ao acordo | A combinar | A fazer | Figma aprovado, navegação e imagens corretas |
| [T06 / #5](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/5) | Implementar demais seções e responsividade | Lucas, sujeito ao acordo | A combinar | A fazer | Oito seções, sem quebra nos dispositivos testados |
| [T07 / #6](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/6) | Implementar menu e interações | A definir | A combinar | A fazer | Mouse, toque e teclado verificados |
| [T08 / #7](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/7) | Integrar API e estados | `genzo-dev` | A combinar | A fazer | Sucesso, carregamento, vazio e falha tratados |
| [T09 / #8](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/8) | Executar testes e corrigir problemas | `genzo-dev` / equipe | A combinar | A fazer | Resultados e correções com evidências |
| [T10 / #9](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/9) | Publicar e testar endereço final | A definir | A combinar | A fazer | URL, data e verificação final registradas |

## Reservas de branches

- `documentacao/planejamento`: documentação inicial em revisão.
- `design/prototipo-figma`: reservada para links, decisões e evidências do protótipo.
- `integracao/api`: reservada ao responsável pela API; integração não iniciada.
- `testes/cenarios-manuais`: reservada ao responsável pelos testes; testes funcionais ainda não executados.

As branches reservadas partem da documentação atual e podem apontar para o mesmo commit. Isso não representa trabalho realizado por outro integrante. Antes de começar, sincronizar com a main após a aprovação do planejamento. Criar branches adicionais conforme cada tarefa de implementação começar.
