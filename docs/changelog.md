# Registro de alterações

## Finalização técnica local — 29/10/2026

- Auditoria em `chore/technical-finalization`, base `13edfc0`; Notion, PDF, Figma e documentação local consultados.
- A API própria já havia sido retirada em `13081b8`; removidos somente diretórios locais vazios remanescentes, sem excluir cliente GitHub ou OpenAPI.
- Link de salto corrigido com `tabindex="-1"` no `main`, com foco e continuidade por teclado retestados.
- Quatro testes adicionais para avatar, inserção textual e animações/fallback: 26 aprovados; build concluído. Falha parcial e recuperação também conferidas no navegador.
- Referências documentais e contagens operacionais corrigidas, histórico preservado e [relatório técnico](technical-review.md) consolidado com limites de design, zoom e movimento real.
- Sem commit, push, merge ou publicação desta etapa. Conferência humana posterior não equivale a aprovação concedida.

## Publicação da refatoração — 29/10/2026

Na etapa anterior desta sessão, os commits `1912cf9` e `13edfc0` foram criados/enviados à `main` com autorização. O workflow `40937911844` passou com 22 testes em Node 22.23.4 e publicou no Pages; o Netlify também passou a servir a nova versão. Os registros de ausência de publicação na etapa de refatoração abaixo referem-se ao momento anterior a essa autorização.

## Refatoração local — 29/10/2026

- Nomes técnicos, arquivos, diretórios, CSS BEM e seletores padronizados em inglês; interface, acessibilidade e documentação da equipe preservadas em português.
- Entrada JavaScript reduzida à inicialização; módulos específicos para interações, apresentação da equipe, controle do carregamento, cliente HTTP e validação/normalização da API com JSDoc.
- CSS formatado sem alterar valores, ordem da cascata ou breakpoints; removidas somente regras sem uso e uma duplicação real, conforme README.
- CI para PRs e pushes em `develop`/`main`, com deploy do Pages restrito à `main` após validação.
- 22 testes locais aprovados, build concluído e verificações no Chrome registradas em [Testes](testing.md). Ambiente local Node 24.16.0; CI permanece Node 22.
- Sem push, merge ou publicação. Os marcos abaixo registram versões anteriores.

Datas reais no fuso de São Paulo. Este registro resume marcos e complementa os commits; não substitui o histórico Git nem evidencia aprovações ainda não ocorridas.

| Data | Alteração realizada | Situação |
| --- | --- | --- |
| 19/10/2026 | Criação da estrutura inicial HTML, CSS, JavaScript, imagens e páginas; README e configuração de arquivos | Commit inicial enviado à main |
| 19/10/2026 | Criação do repositório privado na conta Lcsf-dev | Concluído |
| 19/10/2026 | Preparação dos requisitos, planejamento, briefing de design, responsabilidades, fluxo Git, plano de testes e checklist de publicação | Em revisão na branch de planejamento |
| 19/10/2026 | Registro da reserva de API e testes para o colega interessado | Identificação pendente |
| 19/10/2026 | Cadastro de nove Issues e quatro rótulos de status no GitHub | Concluído; tarefas funcionais ainda não iniciadas |
| 19/10/2026 | Conferência de estrutura, links locais, HTML inicial e sintaxe JavaScript | Verificações da estrutura aprovadas; testes funcionais pendentes |
| 19/10/2026 | Confirmação do aceite dos três colaboradores e atualização da organização por frente, testes e dependências dos PRs | Responsabilidades nominais aguardando confirmação |
| 19/10/2026 | Confirmação de genzo-dev como responsável por API/testes e da ausência de protótipo Figma | Responsabilidade confirmada; prototipação pendente |
| 19/10/2026 | Escolha do Netlify para hospedagem da landing page | Plataforma confirmada; publicação pendente |
| 19/10/2026 | Definição de Lucas como autor do Figma e thaamiresffranca como revisora visual | Criação, revisão e aprovação ainda pendentes |
| 19/10/2026 | Organização da equipe por frentes de trabalho e distribuição das verificações de interface, responsividade e API | Responsabilidades e roteiros registrados em team.md e testing.md |
| 19/10/2026 | Criação das tarefas de Revisão visual e de Validação de layout; conferência das atribuições | Convite de Thamires pendente de aceite; demais atribuições confirmadas |

| 20/10/2026 | Implementação das oito seções e responsividade, menu acessível, abas e ampliação de capturas reais | Entregas em commits e branches específicos |
| 20/10/2026 | Criação de develop conforme fluxo solicitado pela equipe | PRs de tarefas direcionados à integração |
| 20/10/2026 | Integração de perfis públicos no rodapé; documentação oficial, contrato e roteiro de Insomnia | Fetch, validação e estados de falha implementados |
| 20/10/2026 | Verificação da API real no Chrome e do rodapé em celular/computador | Quatro perfis carregados, sem overflow; evidências em testing.md |
| 20/10/2026 | Arquivo Figma com wireframes, três layouts, estilos, capturas reais e protótipo; revisão visual de Thamires | Aprovado |
| 20/10/2026 | README atualizado com emojis e instruções; nove testes atuais aprovados | Sete casos de API e dois de publicação |
| 20/10/2026 | Repositório alterado para público com autorização expressa | Consulta e avaliação públicas; GitHub Pages autorizado |
| 20/10/2026 | Envio das branches e abertura dos PRs #14, #15 e #16 | Histórico organizado por entregas reais |
| 20/10/2026 | Integração das entregas em develop e main, PRs #16 e #17; fechamento do PR #11 substituído | Histórico preservado |
| 20/10/2026 | Workflow de testes e publicação automática, PRs #18 e #19 | Nove testes aprovados localmente e no GitHub Actions / Node 22 |
| 20/10/2026 | Publicação primeiro no GitHub Pages e depois no Netlify, versão inicial a5569fe | HTTP 200; imagens, demonstração, menu móvel e quatro perfis da API verificados |
| 20/10/2026 | README com links publicados e simplificação das referências e atribuições conforme solicitado | Evidências e detalhes preservados na documentação específica |

Dados da publicação e verificações do endereço final ficam em deployment.md. Testes adicionais dos integrantes são registrados após sua execução.

## Acabamento da identidade e planejamento — 20/10/2026

- Logo original obtido do sistema de referência, aplicado no site e nos três layouts do Figma; origem documentada em img/README.md.
- Fonte Inter variável hospedada no projeto com licença; build e servidor local preparados para WOFF2.
- Nove testes aprovados, com conferência dos recursos CSS e da licença no pacote; layout e menu retestados em celular e computador.
- Planejamento atualizado com Figma concluído, links publicados, prazo de entrega em 14/11/2026 e somente as revisões adicionais reais em aberto.
