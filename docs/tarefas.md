# Quadro inicial de tarefas

Fluxo: **A fazer → Em andamento → Em revisão → Concluído**.

Usar Issues do GitHub como ferramenta inicial. Este quadro resume o planejamento. Prazos dependem do acordo da equipe. Os rótulos `status: a fazer`, `status: em andamento`, `status: em revisao` e `status: concluido` representam o fluxo no GitHub.

| ID | Tarefa | Responsável | Prazo | Status | Critério de conclusão |
| --- | --- | --- | --- | --- | --- |
| T01 | Iniciar repositório e estrutura | Lucas | Sem prazo acordado | Concluído | Estrutura inicial enviada à main |
| [T02 / #1](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/1) | Revisar planejamento e escopo | Lucas / equipe | A combinar | Em revisão | Requisitos, responsáveis e decisões revisados |
| [T03 / #2](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/2) | Criar e aprovar Figma | Lucas cria; `thaamiresffranca` revisa | A combinar | A fazer | Link e aprovação registrados em design.md |
| [T04 / #3](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/3) | Definir API e contrato | Desenvolvimento e integração / API e testes | A combinar | A fazer | API, finalidade, endpoint e resposta documentados |
| [T05 / #4](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/4) | Cabeçalho e hero | Interface e responsividade / Desenvolvimento e integração | A combinar | A fazer | Figma aprovado, navegação e imagens corretas |
| [T06 / #5](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/5) | Seções e responsividade | Interface e responsividade / Desenvolvimento e integração | A combinar | A fazer | Oito seções, sem quebra nos dispositivos testados |
| [T07 / #6](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/6) | Menu e interações | Lucas; revisão de Thamires | A combinar | A fazer | Mouse, toque e teclado verificados |
| [T08 / #7](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/7) | Integração da API e estados | Desenvolvimento e integração / API e testes | A combinar | A fazer | Sucesso, carregamento, vazio e falha tratados |
| [T09 / #8](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/8) | Validação da API e consolidação dos testes | Gabriel Enzo (`genzo-dev`) | A combinar | A fazer | CT09–CT14 e resultados integrados com evidências |
| [T10 / #9](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/9) | Publicar e testar endereço final | Lucas; validação da equipe | A combinar | A fazer | URL, data e verificação final registradas |
| [T11 / #12](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/12) | Revisão visual do Figma e testes de interface | Thamires (`thaamiresffranca`) | A combinar | A fazer | Revisão do protótipo e CT01–CT03, CT08 e CT15 registrados |
| [T12 / #13](https://github.com/Lcsf-dev/landing-page-focus-clinica/issues/13) | Validação de layout e responsividade | `DumbRyder` | A combinar | A fazer | CT04–CT07 registrados com ambiente e resultados |

## Reservas de branches

- `documentacao/planejamento`: documentação inicial em revisão.
- `design/prototipo-figma`: reservada para links, decisões e evidências do protótipo.
- `integracao/api`: desenvolvimento e validação da integração.
- `testes/cenarios-manuais`: reservada ao responsável pelos testes; testes funcionais ainda não executados.

As branches reservadas partem da documentação atual e podem apontar para o mesmo commit. Isso não representa trabalho realizado por outro integrante. Antes de começar, sincronizar com a main após a aprovação do planejamento. Criar branches adicionais conforme cada tarefa de implementação começar.
