# Requisitos e critérios de conclusão

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
| RF06 | Demonstração | Capturas reais da interface com origem e textos alternativos |
| RF07 | Chamada para ação | Convite para conhecer ou acessar a plataforma |
| RF08 | Rodapé | Identificação do projeto e links relevantes |

## Design e qualidade

- RD01: identidade visual do Focus Clínica, com verde, azul-petróleo e branco.
- RD02: tipografia moderna e legível; apresentação minimalista, elegante e profissional.
- RD03: wireframes de todas as seções e protótipo navegável no Figma.
- RD04: considerar computador, tablet e celular; conferir a implementação com a referência visual e registrar divergências.
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

A integração consulta perfis públicos do GitHub e apresenta nome, avatar e link da equipe no rodapé. Contrato e documentação oficial em [api.md](api.md). As funcionalidades da Focus são conteúdo estático da landing page.

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

As oito partes institucionais estão implementadas. Resultados e limitações de verificação estão em [Testes](testing.md); a divergência visual para o Figma permanece em [Design](design.md). Integração técnica não equivale à aprovação final da equipe ou do produto.
