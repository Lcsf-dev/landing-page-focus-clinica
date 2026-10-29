# Testar a API existente no Insomnia

O serviço testado é a **API REST do GitHub**, não uma API criada pela equipe. Não é necessário iniciar o servidor local para consultar o GitHub no Insomnia.

## Importar e consultar

1. No Insomnia, use a opção de importar arquivo e selecione `docs/api.openapi.json`.
2. Abra a requisição GET de perfil público, com servidor `https://api.github.com`.
3. Preencha `username` com `Lcsf-dev`, `thaamiresffranca`, `genzo-dev` ou `DumbRyder`.
4. Se necessário, adicione `Accept: application/vnd.github+json`. Deixe a autenticação como nenhuma.
5. Envie a consulta e confira HTTP 200 e os campos `login`, `name`, `html_url`, `avatar_url`. `name: null` é permitido.
6. Registre resultado, data e responsável. Anexe somente uma evidência útil, sem credenciais.

Documentação oficial: <https://docs.github.com/en/rest/users/users#get-a-user>.

O arquivo utiliza o padrão OpenAPI para descrever a requisição. OpenAPI não é OpenAI e não adiciona inteligência artificial à integração.

## Verificações necessárias

| Verificação | Onde | Resultado esperado |
| --- | --- | --- |
| Perfis da equipe | Insomnia e navegador | 200, perfil correspondente e atualização dos créditos |
| Perfil inexistente | Insomnia, usando um login de teste previamente conferido como inexistente | 404; registrar o status real, sem presumir que um nome está disponível |
| Nome público ausente | Teste automatizado e perfil real quando aplicável | O nome básico do HTML permanece |
| Sem conexão | Navegador, DevTools → Network → Offline, antes da primeira consulta do rodapé | Mensagem acessível de falha, nomes e links preservados |
| Recuperação | Voltar a Online e usar Tentar novamente | Perfis pendentes carregados, sem duplicações |
| Falha parcial e tempo limite | Testes controlados do cliente; inspeção da interface quando necessário | Sem carregamento permanente; créditos preservados |

Não esgotar a cota do GitHub para provocar 403/429: esses estados são simulados em `npm test`. O Insomnia verifica o endpoint; ele não comprova comportamento visual, acessibilidade ou CORS no navegador.

## Registro

Gabriel Enzo (`genzo-dev`) revisa a integração e registra os testes adicionais em [testing.md](testing.md). A presença deste roteiro **não significa que o teste manual no Insomnia foi executado**.
