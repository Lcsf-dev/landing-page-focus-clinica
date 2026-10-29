# API REST do GitHub — créditos da equipe

Auditoria de 29/10/2026: integração atual preservada e validada; a API própria foi removida em `13081b8`. Nesta etapa foram removidos somente os diretórios locais vazios remanescentes. O OpenAPI e o roteiro do Insomnia descrevem o GitHub e permanecem necessários. A suíte atual tem 26 testes; detalhes em [Finalização técnica](technical-review.md).

O projeto consome a **API REST do GitHub**, um serviço existente com documentação pública.

## Finalidade e correspondência com o enunciado

O PDF e o texto do Notion pedem estudar uma API, identificar sua documentação, consultar dados com `fetch()`, exibi-los e tratar falhas. Não exigem desenvolver um backend nem informam uma API clínica obrigatória.

A integração enriquece a identificação do projeto no rodapé com nomes públicos, avatares e links dos quatro integrantes. Ela não consulta pacientes, não agenda consultas e não fornece as funcionalidades clínicas. Essas funcionalidades são conteúdo estático da landing page.

## Documentação e contrato

| Campo | Valor |
| --- | --- |
| Serviço existente | GitHub REST API — Users |
| Documentação oficial | <https://docs.github.com/en/rest/users/users#get-a-user> |
| URL base | `https://api.github.com` |
| Endpoint / método | `GET /users/{username}` |
| Usuários | `Lcsf-dev`, `thaamiresffranca`, `genzo-dev`, `DumbRyder` |
| Cabeçalho | `Accept: application/vnd.github+json` |
| Campos usados | `login`, `name`, `html_url`, `avatar_url` |
| Autenticação | Nenhuma para esses perfis públicos; sem token no frontend |
| Limite não autenticado | 60 requisições por hora por IP; compartilhado com outros acessos do mesmo IP |
| CORS | A API REST admite consultas entre origens; verificar também no endereço publicado |
| Cliente | `js/github/github-client.js`, função `fetchGithubProfile()` |
| Validação e normalização | `js/github/github-profile.js`, contrato JSDoc `GithubProfile` |
| Controle da equipe | `js/team/team-profiles.js`, carregamento sob demanda e novas tentativas |
| Interface | `js/team/team-view.js`, créditos em `#team-list` |
| Revisão e testes adicionais | Gabriel Enzo (`genzo-dev`) |

Referências: [limites](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api) e [CORS](https://docs.github.com/en/rest/using-the-rest-api/using-cors-and-jsonp-to-make-cross-origin-requests).

## Fluxo no site

1. Os quatro nomes e links já existem no HTML, inclusive sem JavaScript ou com API indisponível.
2. Ao chegar próximo ao rodapé, a página consulta cada perfil uma vez, em paralelo.
3. Nome e avatar são atualizados somente quando a resposta é válida. `name: null` mantém o nome já informado no HTML.
4. Falha parcial preserva os perfis bem-sucedidos e informa a indisponibilidade. O botão Tentar novamente consulta somente os perfis pendentes, sem repetição automática.
5. Erro HTTP, rede, resposta vazia/incompleta e tempo superior a oito segundos encerram o carregamento e preservam os créditos básicos. Falha na imagem mantém as iniciais.

Não há lista vazia neste endpoint: ele retorna um objeto por perfil; um objeto ausente ou inválido é tratado como falha. Não criar um teste de array vazio sem relação com esse contrato.

## Segurança e publicação

Conteúdo textual é inserido com `textContent`. Links e avatares retornados são limitados aos domínios esperados. A política CSP em `netlify.toml` permite consultas a `api.github.com` e imagens de `avatars.githubusercontent.com`. Não adicionar tokens para contornar o limite.

O site é estático e consulta diretamente a API REST do GitHub pelo navegador.

## Decisões da refatoração — 29/10/2026

O contrato externo preserva `login`, `name`, `html_url` e `avatar_url`. Depois da validação em tempo de execução, o contrato interno `GithubProfile` expõe `username`, `name`, `profileUrl` e `avatarUrl`. O JSDoc descreve os contratos; não substitui as verificações.

Nenhuma proteção de HTTP, rede, timeout, identidade ou origem das URLs foi removida. As condições foram extraídas para `isValidGithubUsername`, `isExpectedGithubUser` e `parseTrustedUrl`. O timeout cobre também a leitura do JSON e é limpo em `finally`, no sucesso e na falha. JSON inválido continua sendo tratado como falha pela interface.

O nome público aceita string ou `null`; espaços nas extremidades são removidos e nome vazio mantém o nome estático. Avatar ausente, `null` ou string vazia mantém as iniciais. Tipos incompatíveis, como `false` e `0`, agora são rejeitados em vez de confundidos com ausência. O usuário de entrada deve ser uma string; a comparação com `login` ignora maiúsculas e minúsculas.

A URL do perfil exige origem `https://github.com` e caminho correspondente ao usuário consultado. O avatar exige origem `https://avatars.githubusercontent.com`. URLs malformadas e valores que não são strings são rejeitados com mensagem controlada; credenciais embutidas também são rejeitadas, reforçando a validação anterior de origem e caminho.

`Promise.allSettled` preserva os resultados bem-sucedidos. A marca `data-loaded` só é aplicada após apresentar um perfil válido; novas tentativas selecionam apenas cartões pendentes. `isLoading` bloqueia chamadas concorrentes e é liberado em `finally`. A renderização usa `textContent`; falhas da API mantêm nomes e links estáticos e falhas do avatar mantêm as iniciais.

## Testes e Insomnia

O comando `npm test` verifica o cliente com respostas controladas, sem consumir a cota pública. A execução real no navegador e a revisão de Gabriel são registros separados em [testing.md](testing.md).

O [arquivo de importação](api.openapi.json) descreve o endpoint utilizado no formato **OpenAPI**, um padrão de descrição de APIs sem relação com a empresa OpenAI. **Foi preparado pela equipe para o Insomnia e não substitui a documentação oficial do GitHub.** Veja o [roteiro do Insomnia](insomnia.md).
