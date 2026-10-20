# 🩺 Focus Clínica — Landing Page

Landing page institucional para apresentar o **Focus Clínica**, suas funcionalidades e benefícios a clínicas, gestores e profissionais da saúde.

## 📍 Situação do projeto

Início: **19/10/2026**. Atualização: **20/10/2026**.

| Entrega | Situação |
| --- | --- |
| 📄 Oito seções da landing page | Implementadas; revisão da equipe pendente |
| 📱 Layout responsivo e interações | Implementados; registros em [Testes](docs/testes.md) |
| 🔌 API existente | GitHub REST API integrada aos créditos da equipe |
| 🎨 Figma | Arquivo criado; montagem e conferência em andamento; aprovação pendente |
| 🧪 Testes automatizados | Sete cenários do cliente da API aprovados em 20/10/2026 |
| 👀 Revisão dos colegas | Pendente; não substituída pelos testes do autor |
| 🚀 Publicação no Netlify | Configuração preparada; publicação pendente |

A programação precedeu a conclusão do Figma. O visual é provisório até a revisão de Thamires e o ajuste entre protótipo e código. Datas, commits e aprovações representam o trabalho efetivamente realizado.

## ▶️ Executar localmente

Pré-requisito: **Node.js 22 ou superior**, com npm. O projeto não possui dependências externas a instalar.

```powershell
npm run dev
```

Abra **<http://127.0.0.1:5500>**. Para encerrar o servidor, pressione `Ctrl+C`. Abra pelo servidor HTTP, não diretamente como arquivo.

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Servir a página localmente |
| `npm test` | Executar os sete testes do cliente da API, sem consumir a cota do GitHub |
| `npm run build` | Preparar somente os arquivos públicos em `dist/` |

## 🔌 API utilizada

Consumimos a **API REST do GitHub**, com `fetch()` em `GET https://api.github.com/users/{username}`. A página atualiza nome público, avatar e link dos quatro integrantes no rodapé. Não utiliza token nem dados clínicos.

Os créditos básicos e as funcionalidades da Focus permanecem disponíveis se a API falhar. O cliente trata carregamento, falhas parciais, perfil ausente, resposta inválida e tempo limite. A tentativa manual repete somente perfis pendentes.

- 📚 [Documentação oficial do GitHub](https://docs.github.com/en/rest/users/users#get-a-user).
- 📝 [Contrato, finalidade e limites usados no projeto](docs/api.md).
- 🧪 [Roteiro para o Insomnia](docs/insomnia.md) e [recorte OpenAPI para importar](docs/api.openapi.json).

A API própria anterior foi retirada desta versão e preservada no histórico Git.

## 👥 Equipe e frentes

| Integrante | Frente |
| --- | --- |
| [Lucas Fernandes](https://github.com/Lcsf-dev) | Desenvolvimento e integração; criação do Figma |
| [Thamires](https://github.com/thaamiresffranca) | Revisão visual e validação do Figma |
| [Gabriel Enzo](https://github.com/genzo-dev) | Revisão da integração da API e testes adicionais |
| [DumbRyder](https://github.com/DumbRyder) | Interface e responsividade |

As frentes indicam atribuições. Autoria, testes executados e aprovações são registrados conforme a participação real. Veja [Equipe](docs/equipe.md), [Tarefas](docs/tarefas.md) e [divisão dos testes](docs/testes.md).

## 🎨 Design

[Abrir Focus Clínica — Landing Page no Figma](https://www.figma.com/design/P7K5fBiCqhBsehhrR5BNqp/).

Ver [telas, identidade visual e registro da revisão](docs/design.md). Thamires fará a validação; **ainda não há aprovação registrada**. As capturas atuais mostram as telas públicas de apresentação e acesso. A marca usada é provisória.

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
├── testes/              # Testes necessários do cliente da API
├── index.html
├── netlify.toml
├── package.json
└── README.md
```

## 🌿 Versionamento

**Issue → branch da tarefa → commits → PR → revisão → develop → revisão integrada → main → Netlify.**

`develop` reúne as entregas para integração; `main` recebe a versão revisada. Correções têm commits próprios, com reteste do comportamento afetado. Veja [Fluxo Git](docs/fluxo-git.md) e [Registro de alterações](docs/alteracoes.md).

## 🚀 Publicação

Hospedagem escolhida: **Netlify**. Configuração versionada em `netlify.toml`: comando `npm run build`, pasta `dist`, Node 22. O site não depende de API própria ou Netlify Functions.

Endereço, data e commit publicados serão registrados em [Publicação](docs/publicacao.md) após a revisão. **<https://focus-clinica.netlify.app/> é o sistema de referência, não a publicação desta entrega.**

## 📚 Documentação e referências

- [Requisitos](docs/requisitos.md) · [Planejamento](docs/planejamento.md) · [Testes e evidências](docs/testes.md).
