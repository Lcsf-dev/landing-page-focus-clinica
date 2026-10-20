# Fluxo de Git e GitHub

Repositório: <https://github.com/Lcsf-dev/landing-page-focus-clinica> (público desde 20/10/2026).

## Fluxo adotado

Foi criada `develop` para integrar as tarefas antes da versão de produção:

**Issue → branch da tarefa → commits → Pull Request → revisão → develop → testes integrados → Pull Request → revisão → main → Netlify.**

- `main`: versão revisada destinada à publicação.
- `develop`: base de integração, sem representar aprovação para produção.
- Branch por tarefa: não é uma branch permanente por pessoa.
- Correções: `correcao/<problema>`, com commit `fix:` e reteste do caso afetado.
- Preservar commits com merge commit quando a revisão estiver aprovada; não retroagir datas, trocar autoria ou criar commits vazios para aparentar progresso.

## Branches e dependências

| Branch | Conteúdo |
| --- | --- |
| `documentacao/planejamento` | Requisitos, equipe e documentação inicial; PR #10 para develop |
| `testes/cenarios-manuais` | Verificações da estrutura inicial; PR #11 para develop |
| `funcionalidade/estrutura-responsiva` | HTML, estilos e capturas públicas |
| `funcionalidade/menu-demonstracao` | Menu acessível, abas, ampliação e animações |
| `integracao/catalogo-funcionalidades` | Experimento anterior de API própria; não é a solução final |
| `integracao/api-github` | Integração escolhida, retirada do backend, testes e documentação atualizados |
| `design/prototipo-figma` | Branch reservada anteriormente; link e evidências do Figma podem ser entregues em PR documental |
| `integracao/api` | Reserva anterior, sem implementação específica |

As branches de estrutura, interações e API foram construídas sequencialmente: estrutura depende do planejamento, interações dependem da estrutura, e a integração final depende de ambas. Enquanto não houver merge das anteriores, o PR seguinte pode exibir também seus commits. Conferir as dependências antes de integrar; não apresentar os mesmos commits como trabalho independente.

A API própria permanece no histórico como decisão substituída; o estado final remove a função e consome o GitHub. Não publicar o estado intermediário como entrega final.

## Rotina por tarefa

1. Conferir Issue, responsável, critério de conclusão e base atualizada em `develop`.
2. Criar branch da tarefa, implementar uma alteração delimitada e conferir `git diff`.
3. Executar apenas as verificações afetadas.
4. Adicionar explicitamente os arquivos da entrega e criar commit descritivo: `feat:`, `fix:`, `docs:` ou `test:`.
5. Enviar a branch e abrir PR para `develop`, com Issue, contexto, resultados e pendências. Manter rascunho enquanto incompleto.
6. Outro integrante revisa; corrigir com novos commits e registrar o reteste quando necessário.
7. Integrar após aprovação, atualizar o quadro de tarefas e preparar a revisão integrada.
8. Abrir PR de `develop` para `main` quando a entrega estiver validada; publicar pelo Netlify e testar a URL final.

Os PRs #10 e #11 já têm base `develop`. A versão atual local não equivale à versão da `main`. As aprovações de código, do Figma e do site publicado são registros diferentes.

## Participação e acesso

Colaboradores que aceitaram o convite podem enviar branches, commits e PRs. O aceite do convite do GitHub é separado do acesso ao Figma. Testar e revisar são contribuições válidas, mas não alteram a autoria do código.

Não integrar alterações em nome de uma revisão de terceiros que ainda não ocorreu. Vários commits na mesma data são normais; o que demonstra o desenvolvimento é o conteúdo das entregas e seus registros reais.
