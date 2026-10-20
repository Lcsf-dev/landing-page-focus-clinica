# API REST do GitHub — créditos da equipe

**Decisão de 20/10/2026:** consumir uma API existente. A API própria de funcionalidades foi retirada da versão atual; seus commits continuam no histórico para documentar a evolução real.

## Finalidade e correspondência com o enunciado

Os requisitos incluem estudar uma API, identificar sua documentação, consultar dados com `fetch()`, exibi-los e tratar falhas. Não exigem desenvolver um backend nem informam uma API clínica obrigatória.

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
| Cliente | `js/api.js`, função `consultarPerfil()` |
| Interface | `js/principal.js`, créditos em `#lista-equipe` |
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

O site passou a ser estático. Não há Netlify Function ou rota `/api/funcionalidades` nesta versão. Não é necessário servidor de API próprio para executar ou publicar.

## Testes e Insomnia

O comando `npm test` verifica o cliente com respostas controladas, sem consumir a cota pública. A execução real no navegador e a revisão de Gabriel são registros separados em [testes.md](testes.md).

O [arquivo de importação](api.openapi.json) contém somente o recorte que usamos da API externa. **Foi preparado pela equipe para o Insomnia e não substitui a documentação oficial do GitHub.** Veja o [roteiro do Insomnia](insomnia.md).
