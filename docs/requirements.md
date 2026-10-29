# Requisitos e critérios de conclusão

## Fontes e interpretação

1. **Responsabilidades:** design, HTML/CSS, JavaScript, API/testes e revisão compartilhada.
2. **Escopo:** landing page institucional com oito partes, responsividade e integração de API.
3. **Decisões da equipe:** início dos arquivos e do GitHub em 19/10/2026; frentes e integrantes registrados em team.md e cenários distribuídos em testing.md.

Os documentos descrevem o escopo. Eles não constituem evidência de aprovação do Figma, participação individual, execução de testes ou publicação. Essas evidências serão registradas quando existirem.

## Objetivo

Apresentar profissionalmente o Focus Clínica, um sistema de gestão clínica, destacar suas funcionalidades e incentivar clínicas, gestores e profissionais da saúde a conhecer ou acessar a plataforma.

## Seções obrigatórias

| ID | Seção | Conteúdo / conclusão |
| --- | --- | --- |
| RF01 | Cabeçalho | Logotipo, navegação e acesso ao sistema |
| RF02 | Hero | Título, descrição, ação principal e imagem real da interface |
| RF03 | Sobre | Apresentação e finalidade do Focus Clínica |
| RF04 | Funcionalidades | Calendário, agendamentos, notificações e especialidades |
| RF05 | Benefícios | Organização, praticidade e facilidade de acesso às informações |
| RF06 | Demonstração | Capturas reais da interface, fornecidas ou verificadas |
| RF07 | Chamada para ação | Convite para conhecer ou acessar a plataforma |
| RF08 | Rodapé | Identificação do projeto e links relevantes |

## Design e qualidade

- RD01: identidade visual do Focus Clínica, com verde, azul-petróleo e branco.
- RD02: tipografia moderna e legível; apresentação minimalista, elegante e profissional.
- RD03: wireframes de todas as seções e protótipo navegável no Figma.
- RD04: considerar computador, tablet e celular. A implementação precedeu a conclusão do Figma; o alinhamento e a aprovação do protótipo continuam necessários antes de concluir a entrega.
- RQ01: HTML semântico, CSS organizado e classes reutilizáveis.
- RQ02: Flexbox/Grid e media queries conforme necessário, sem rolagem horizontal indevida.
- RQ03: legibilidade, acessibilidade e desempenho; interações por mouse, toque e teclado quando aplicável.
- RQ04: menu responsivo, rolagem suave, animações discretas e efeitos nos botões.
- RQ05: considerar preferência por movimento reduzido nos efeitos e na rolagem.

## API

- RA01: escolher API, registrar documentação, endpoints, formato de resposta e finalidade.
- RA02: consultar com `fetch()` e apresentar os dados definidos pela equipe.
- RA03: tratar carregamento, erro de rede/HTTP e dados ausentes.
- RA04: nunca publicar credenciais privadas no navegador ou repositório.
- RA05: manter registro dos cenários testados e problemas corrigidos.

API existente escolhida em 20/10/2026: GitHub REST API, com perfis públicos da equipe no rodapé. Contrato e documentação oficial em api.md. As funcionalidades da Focus são conteúdo estático. O material não informa uma API clínica obrigatória.

## Processo e entrega

- RP01: quadro A fazer → Em andamento → Em revisão → Concluído.
- RP02: uma branch por tarefa, commits claros, Pull Requests e revisão antes da integração.
- RP03: informar impedimentos e alterações de escopo.
- RP04: README com instruções de execução e documentação atualizada.
- RP05: verificar links, navegação, responsividade, animações e API.
- RP06: publicar, registrar plataforma/endereço/data e testar o endereço final.

## Limites do escopo

A entrega é a landing page institucional. Não foram solicitados módulos completos de gestão clínica, autenticação, banco de pacientes, processamento de pagamentos ou agendamento real dentro desta página.

Sem inventar depoimentos, métricas, clientes, capturas do produto ou funcionalidades não confirmadas.
