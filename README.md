# Landing Page — Focus Clínica

Landing page institucional para apresentar o Focus Clínica, suas funcionalidades e benefícios a clínicas, gestores e profissionais da saúde.

## Estado atual

Projeto iniciado em **19/10/2026**. Estrutura técnica preparada e planejamento documentado para revisão. A implementação visual depende do protótipo no Figma revisado e aprovado. A definição da API é acompanhada pelas frentes de Desenvolvimento e integração e de API e testes.

O HTML atual é somente um ponto de entrada de desenvolvimento. Não representa a landing page concluída.

## Equipe

| Integrante | Frente |
| --- | --- |
| Lucas Fernandes — `Lcsf-dev` | Desenvolvimento e integração |
| Thamires — `thaamiresffranca` | Revisão visual |
| Gabriel Enzo — `genzo-dev` | API e testes |
| `DumbRyder` | Interface e responsividade |

Ver [entregas das frentes](docs/equipe.md) e [divisão dos testes](docs/testes.md).

## Tecnologias

- HTML semântico.
- CSS com Flexbox/Grid e media queries, na etapa de implementação.
- JavaScript para menu móvel, interações e consumo de API com `fetch()`.
- Git e GitHub para versionamento e revisão.
- Figma para wireframes e protótipo navegável.

## Executar localmente

Pré-requisito: Python 3 instalado. Na pasta do projeto, execute:

```powershell
python -m http.server 5500 --bind 127.0.0.1
```

Acesse <http://127.0.0.1:5500>. Para encerrar, pressione `Ctrl+C` no terminal.

Use um servidor HTTP durante o desenvolvimento: abrir `index.html` diretamente como arquivo pode impedir requisições com `fetch()`.

## Estrutura

```text
.
├── .github/             # Modelos de tarefas, problemas e Pull Requests
├── css/                 # Estilos da landing page
├── docs/                # Planejamento e evidências do projeto
├── img/                 # Identidade visual e capturas reais do sistema
├── js/                  # Interações e integração com API
├── pages/               # Reservada conforme a estrutura solicitada
├── index.html           # Ponto de entrada
└── README.md
```

## Documentação

| Documento | Conteúdo |
| --- | --- |
| [Requisitos](docs/requisitos.md) | Escopo e critérios de entrega |
| [Planejamento](docs/planejamento.md) | Ordem das entregas, dependências e decisões |
| [Design](docs/design.md) | Briefing para wireframes e protótipo no Figma |
| [Equipe](docs/equipe.md) | Responsabilidades e participação real |
| [Tarefas](docs/tarefas.md) | Quadro inicial e critérios de conclusão |
| [Fluxo Git](docs/fluxo-git.md) | Branches, commits, revisão e integração |
| [API](docs/api.md) | Decisões e contrato a preencher pelo responsável |
| [Testes](docs/testes.md) | Cenários manuais, resultados e evidências |
| [Alterações](docs/alteracoes.md) | Registro datado das entregas |
| [Publicação](docs/publicacao.md) | Checklist para publicar e verificar o site |

Nenhuma entrega deve ser marcada como aprovada, testada ou publicada antes da respectiva verificação.

## Versionamento

- `main`: base revisada do projeto.
- Uma branch por tarefa, com commits pequenos e descritivos.
- Pull Request com contexto, forma de verificar e evidências.
- Integração após revisão e aprovação, conforme o material da atividade.
- Datas e autoria correspondem ao trabalho realizado. O início do projeto não representa sua conclusão.

## Publicação

Plataforma escolhida: **Netlify**, confirmada em 19/10/2026. Publicação ainda não realizada; endereço e data serão registrados após a entrega ser revisada.

## Referências

- Sistema de referência informado: <https://focus-clinica.netlify.app/>. Não confundir esse endereço com uma publicação desta landing page.
