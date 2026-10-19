# Fluxo de Git e GitHub

## Repositório

<https://github.com/Lcsf-dev/landing-page-focus-clinica>

Visibilidade inicial: privado. O proprietário é `Lcsf-dev`. Não há colaboradores confirmados até o aceite dos convites.

## Branches por tarefa

- `main`: base revisada.
- `documentacao/planejamento`: requisitos e organização.
- `design/prototipo-figma`: registro do Figma e aprovação.
- `funcionalidade/cabecalho-hero`: exemplo de tarefa futura.
- `funcionalidade/secoes-responsivas`: exemplo de tarefa futura.
- `funcionalidade/menu-mobile`: exemplo de tarefa futura.
- `integracao/api`: frente reservada ao colega responsável.
- `testes/cenarios-manuais`: execução e registro dos testes.
- `correcao/<problema>`: correção delimitada após uma entrega.

Uma branch não representa uma pessoa. Branches futuras só devem receber alterações quando a tarefa começar. Branches reservadas sem commits próprios não contam como entrega.

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
