# Fluxo de Git e GitHub

Repositório: <https://github.com/Lcsf-dev/landing-page-focus-clinica>.

## Branches e integração

**Issue → branch da tarefa → commits → PR para develop → checks → integração → PR para main → checks → publicação.**

- `develop` reúne as entregas de integração.
- `main` contém a versão destinada à produção.
- Cada tarefa usa uma branch específica, com nomes técnicos em inglês, como `docs/final-cleanup` ou `fix/skip-navigation`.
- Commits usam títulos objetivos em inglês, como `docs: streamline project documentation`.
- Preservar histórico, autoria e trabalhos existentes; não usar force push ou alterar proteções para integrar.

## Rotina de uma tarefa

1. Atualizar referências e conferir a base, as alterações locais e o escopo da Issue.
2. Criar uma branch da tarefa a partir de `develop`.
3. Implementar a menor alteração necessária e executar verificações proporcionais.
4. Conferir o diff, adicionar os arquivos da entrega e criar o commit.
5. Enviar somente a branch da tarefa e abrir PR para `develop`; atualizar o existente se origem/destino já coincidirem.
6. Registrar resultados e limitações no PR, aguardar os checks e respeitar as proteções da branch.
7. Integrar por merge quando os requisitos estiverem satisfeitos. A conferência posterior dos colegas é registrada separadamente, sem presumir aprovação.
8. Promover para `main` apenas em uma entrega de publicação; acompanhar o workflow e conferir a produção.

Mudanças documentais exigem links locais, whitespace e revisão do diff, sem repetir testes funcionais localmente. O CI obrigatório continua sendo executado. Regras de deploy e permissões estão em [Publicação](deployment.md).

## Histórico relevante

`develop` foi adotada para integração em 20/10/2026. Os PRs #10, #14, #15 e #16 integraram planejamento, estrutura, interações e API; #17 levou a implementação para `main`. O PR #11 foi encerrado como substituído. A configuração de publicação entrou por #18 e #19.

Em 29/10/2026, #28 integrou a finalização em `develop` e #29 em `main`, resultando na produção `8b8ba58`. Esses merges comprovam integração técnica; não constituem aprovação visual ou revisão independente dos colegas. O [histórico de alterações](changelog.md) mantém os marcos datados.
