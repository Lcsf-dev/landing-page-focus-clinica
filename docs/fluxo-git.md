# Fluxo de Git e GitHub

## Repositório

<https://github.com/Lcsf-dev/landing-page-focus-clinica>

Visibilidade inicial: privado. O proprietário é `Lcsf-dev`. Gabriel Enzo e DumbRyder têm acesso de escrita; o convite de Thamires aguarda aceite na consulta mais recente de 19/10/2026.

## Branches por tarefa

- `main`: base revisada.
- `documentacao/planejamento`: requisitos e organização.
- `design/prototipo-figma`: registro do Figma e aprovação.
- `funcionalidade/cabecalho-hero`: exemplo de tarefa futura.
- `funcionalidade/secoes-responsivas`: exemplo de tarefa futura.
- `funcionalidade/menu-mobile`: exemplo de tarefa futura.
- `integracao/api`: implementação acompanhada pelas frentes Desenvolvimento e integração e API e testes.
- `testes/cenarios-manuais`: execução e registro dos testes.
- `correcao/<problema>`: correção delimitada após uma entrega.

Uma branch não representa uma pessoa. Branches futuras só devem receber alterações quando a tarefa começar. Branches reservadas sem commits próprios não contam como entrega.

## Estado inicial e dependências dos Pull Requests

- Commit inicial na `main`: `0fd0670`.
- PR #10: `documentacao/planejamento` → `main`, documentação em rascunho.
- PR #11: `testes/cenarios-manuais` → `documentacao/planejamento`, registro de verificações iniciais em rascunho; depende do planejamento.
- `design/prototipo-figma` e `integracao/api`: branches reservadas, sem implementação específica.

Revisar o PR #10 antes de integrar o registro de testes. Após a integração do planejamento, conferir/ajustar a base do PR #11 para `main`. Antes de começar uma branch reservada, incorporar a `main` revisada; não descartar trabalho de colegas nem usar push forçado para sincronizar.

Não criar uma branch permanente por pessoa nem uma camada `develop` nesta etapa. O fluxo simples é suficiente: **Issue → branch da tarefa → commits → PR → revisão → main**. Criar as branches de HTML/CSS e interações quando as respectivas tarefas começarem, após o design aprovado.

## Commits e revisão por entrega

Usar mensagem descritiva: `docs:` para documentação, `feat:` para funcionalidade, `style:` para apresentação e `fix:` para correção. Cada commit deve reunir uma mudança compreensível, sem quantidade mínima artificial.

No PR, vincular a Issue, informar os arquivos/trechos alterados, como verificar e o resultado. O autor faz a conferência básica; outro integrante revisa. As correções devem mencionar o problema e receber reteste. Não repetir toda a bateria manual após uma alteração somente documental.

## Passo a passo por tarefa

1. Abrir ou assumir a Issue e definir critério de conclusão.
2. Atualizar a base local e criar a branch a partir da main revisada.
3. Fazer mudanças pequenas e conferir o resultado.
4. Revisar `git diff` e adicionar somente os arquivos da tarefa.
5. Criar commit descritivo com a própria identidade Git.
6. Enviar a branch e abrir Pull Request; usar rascunho enquanto incompleto.
7. Informar alterações, forma de testar, resultados e pendências.
8. Solicitar revisão de outro integrante.
9. Integrar após aprovação. Para preservar os commits individuais exigidos na atividade, preferir merge commit.
10. Atualizar tarefa e registros. Branches concluídas podem ser removidas após a integração; o PR preserva o histórico.

## Exemplo de comandos para uma tarefa futura

Executar cada comando somente após conferir o resultado do anterior:

```powershell
git switch main
git pull --ff-only
git switch -c funcionalidade/cabecalho-hero
git status
git diff
git add index.html css/estilos.css
git diff --cached
git commit -m "feat: adicionar cabecalho e secao principal"
git push -u origin funcionalidade/cabecalho-hero
```

O comando de commit pressupõe que as alterações já foram feitas e verificadas. Não criar commits vazios para simular progresso.

## Correções

Durante a tarefa, corrigir na mesma branch e adicionar um commit, por exemplo `fix: fechar menu ao selecionar uma secao`. Depois de integrada, abrir uma branch específica para o problema, vinculada à Issue correspondente.

## Datas, autoria e aprovação

- Usar as datas reais do ambiente de trabalho; não retroagir datas.
- Vários commits no mesmo dia são normais.
- Não modificar identidade Git para aparentar contribuição de outra pessoa.
- Aprovação de protótipo e revisão de PR são registros diferentes.
- README não precisa repetir cada commit. Resumir marcos e vincular PRs e testes relevantes.
- Não integrar automaticamente a documentação em revisão como se já tivesse sido aprovada pela equipe.
