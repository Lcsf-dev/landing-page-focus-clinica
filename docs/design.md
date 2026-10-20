# Design e protótipo — Focus Clínica

**Revisão visual: Thamires (`thaamiresffranca`) — aprovado em 20/10/2026.**

Design: Lucas Fernandes (`Lcsf-dev`). A aprovação visual é distinta dos testes locais adicionais da equipe.

## Arquivo e apresentação

- [Arquivo editável no Figma Design](https://www.figma.com/design/P7K5fBiCqhBsehhrR5BNqp/).
- [Protótipo — computador](https://www.figma.com/proto/P7K5fBiCqhBsehhrR5BNqp/?node-id=2-12730&starting-point-node-id=2%3A12730&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1).

| Página | Conteúdo |
| --- | --- |
| 01 — Wireframes | Estrutura das oito seções em computador 1440 px, tablet 768 px e celular 390 px |
| 02 — Layouts e protótipo | Três layouts com Auto Layout, textos editáveis, capturas reais e fluxos de apresentação |
| 03 — Estilos e revisão | Paleta, tipografia, componentes reutilizáveis, estados e registro visual |

## Telas e navegação

Cada layout contempla cabeçalho, hero, sobre, funcionalidades, benefícios, demonstração, chamada para ação e rodapé. Existem estados separados para acesso do cliente e captura ampliada.

Foram configurados três fluxos com rolagem vertical. No computador, o menu navega para as quatro seções; o botão de acesso abre o sistema de referência. A demonstração tem conexão para a tela de acesso e ampliação da captura, com fechamento da sobreposição.

O protótipo apresenta o visual e os fluxos principais. A execução de fetch, a navegação completa por teclado e a responsividade efetiva são verificadas na implementação HTML/CSS/JavaScript, não deduzidas das telas do Figma.

## Identidade e recursos

| Recurso | Definição |
| --- | --- |
| Petróleo | `#123F40`, `#102F32` |
| Verde | `#16765C` |
| Menta | `#B9F2D5` |
| Branco / fundo claro | `#FFFFFF`, `#F8FBF9` |
| Tipografia | Inter no protótipo e no site; fonte variável WOFF2 hospedada em css/fontes, com licença SIL Open Font License |
| Organização | Auto Layout, camadas em português, cartões e botões reutilizáveis |
| Capturas reais | Apresentação pública e acesso do Focus Clínica; origem registrada em img/README.md |
| Marca | Logo original usado pelo sistema de referência, preservado em img/logo-focus-clinica.png; origem em img/README.md |

Os créditos contemplam os quatro perfis públicos da equipe, com estados de carregamento, sucesso e falha no material de estilos. Não foram criadas imagens fictícias de agendas, pacientes ou telas internas.

Em 20/10/2026, o logo original da referência foi aplicado aos cabeçalhos e rodapés dos três layouts do Figma e ao site. A Inter foi incluída localmente a partir do [repositório oficial](https://github.com/rsms/inter), com sua licença em css/fontes/LICENCA-Inter.txt. [Evidência do Figma atualizado](evidencias/figma-logo-original.png).

## Registro da revisão

| Campo | Registro |
| --- | --- |
| Versão | Layouts e protótipo de 20/10/2026 |
| Responsável pelo design | Lucas Fernandes |
| Revisora visual | Thamires (`thaamiresffranca`) |
| Estado | Aprovado |
| Data | 20/10/2026 |

A programação precedeu a conclusão do Figma. Ajustes futuros no conteúdo, marca ou layout devem ser registrados e conferidos sem alterar retroativamente esta versão.
