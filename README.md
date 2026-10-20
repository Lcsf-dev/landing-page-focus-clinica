# 🩺 Focus Clínica — Landing Page

Landing page institucional para apresentar o **Focus Clínica**, suas funcionalidades e benefícios a clínicas, gestores e profissionais da saúde.

## 📍 Situação do projeto

| Entrega | Situação |
| --- | --- |
| 📄 Oito seções da landing page | Implementadas; revisão da equipe pendente |
| 📱 Layout responsivo e interações | Implementados; registros em [Testes](docs/testes.md) |
| 🔌 API existente | GitHub REST API integrada aos créditos da equipe |
| 🎨 Figma | Wireframes, três layouts e protótipo navegável |
| 🧪 Testes automatizados | Nove testes aprovados: sete da API e dois de publicação |
| 👀 Revisão dos colegas | Pendente; não substituída pelos testes do autor |
| 🚀 Publicação | GitHub Pages e Netlify publicados e verificados |

O projeto reúne planejamento, design, implementação, integração e evidências de teste. O Figma foi concluído após o início da programação, conforme a sequência de trabalho adotada. Datas e commits registram essa evolução.

## ▶️ Executar localmente

Pré-requisito: **Node.js 22 ou superior**, com npm. O projeto não possui dependências externas a instalar.

```powershell
npm run dev
```

Abra **<http://127.0.0.1:5500>**. Para encerrar o servidor, pressione `Ctrl+C`. Abra pelo servidor HTTP, não diretamente como arquivo.

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Servir a página localmente |
| `npm test` | Preparar o pacote público e executar os nove testes, sem consumir a cota do GitHub |
| `npm run build` | Preparar somente os arquivos públicos em `dist/` |

## 🔌 API utilizada

Consumimos a **API REST do GitHub**, com `fetch()` em `GET https://api.github.com/users/{username}`. A página atualiza nome público, avatar e link dos quatro integrantes no rodapé. Não utiliza token nem dados clínicos.

Os créditos básicos e as funcionalidades da Focus permanecem disponíveis se a API falhar. O cliente trata carregamento, falhas parciais, perfil ausente, resposta inválida e tempo limite. A tentativa manual repete somente perfis pendentes.

- 📚 [Documentação oficial do GitHub](https://docs.github.com/en/rest/users/users#get-a-user).
- 📝 [Contrato, finalidade e limites usados no projeto](docs/api.md).
- 🧪 [Roteiro para o Insomnia](docs/insomnia.md) e [arquivo de importação dos endpoints no Insomnia](docs/api.openapi.json).

## 👥 Equipe e frentes

| Integrante | Frente |
| --- | --- |
| [Lucas Fernandes](https://github.com/Lcsf-dev) | Desenvolvimento e integração |
| [Thamires](https://github.com/thaamiresffranca) | Revisão visual e validação do Figma |
| [Gabriel Enzo](https://github.com/genzo-dev) | Revisão da integração da API e testes adicionais |
| [DumbRyder](https://github.com/DumbRyder) | Interface e responsividade |

As frentes indicam atribuições. Autoria, testes executados e aprovações são registrados conforme a participação real. Veja [Equipe](docs/equipe.md), [Tarefas](docs/tarefas.md) e [divisão dos testes](docs/testes.md).

## 🎨 Design

[Abrir Focus Clínica — Landing Page no Figma](https://www.figma.com/design/P7K5fBiCqhBsehhrR5BNqp/).

Ver [telas e identidade visual](docs/design.md). As capturas e o logo foram obtidos do sistema de referência. A fonte Inter é hospedada junto ao projeto.

## 🗂️ Estrutura

```text
.
├── .github/             # Modelos de tarefas, problemas e Pull Requests
├── css/                 # Estilos e responsividade
├── docs/                # Requisitos, decisões, testes e evidências
├── img/                 # Capturas reais e recursos visuais
├── js/                  # Menu, demonstração e cliente da API externa
├── pages/               # Reservada conforme o enunciado; entrega de página única
├── scripts/             # Servidor estático local e preparação de publicação
├── testes/              # Cliente da API e pacote de publicação
├── index.html
├── netlify.toml
├── package.json
└── README.md
```

## 🌿 Versionamento

**Issue → branch da tarefa → commits → PR → revisão → develop → revisão integrada → main → GitHub Pages / Netlify.**

`develop` reúne as entregas para integração; `main` recebe a versão revisada. Correções têm commits próprios, com reteste do comportamento afetado. Veja [Fluxo Git](docs/fluxo-git.md) e [Registro de alterações](docs/alteracoes.md).

## 🚀 Publicação

Publicado em **20/10/2026**, primeiro no GitHub Pages e depois no Netlify:

- 🌐 [GitHub Pages](https://lcsf-dev.github.io/landing-page-focus-clinica/).
- 🚀 [Netlify](https://landing-page-focus-clinica-lcsf.netlify.app/).

Cada envio à `main` publica automaticamente. O GitHub Actions executa os nove testes antes do deploy no Pages. O Netlify usa `netlify.toml`: `npm run build`, pasta `dist`, Node 22.
