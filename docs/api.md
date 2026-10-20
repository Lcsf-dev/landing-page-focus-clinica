# Integração com API

**Status:** escolha da API pendente. Responsável confirmado: `genzo-dev`, para API e testes. Nenhuma API foi criada ou integrada.

## O que o material pede

Consultar dados com `fetch()`, apresentá-los na página e verificar carregamento e tratamento de erros. O material não exige explicitamente construir um serviço de backend próprio.

## Decisão a tomar em equipe

Definir primeiro qual dado melhora a apresentação do Focus Clínica e em que seção aparecerá. Não adicionar uma funcionalidade sem relação com a landing page apenas para usar uma API.

Preferência inicial para avaliação: consumir API existente, com documentação e acesso apropriado ao navegador. Uma API do próprio sistema só será usada se houver endpoint adequado e acesso autorizado.

## Proposta após análise do escopo em 19/10/2026

**Proposta para avaliar com o colega responsável:** uma pequena API própria de leitura para fornecer o catálogo público de funcionalidades da landing page. Não foi implementada, escolhida definitivamente nem aprovada como substituta de eventual exigência de API externa.

A preferência inicial por uma API pronta dependia de encontrar dados pertinentes ao projeto. As fontes fornecidas não documentam um endpoint disponível do Focus Clínica. Usar consulta de CEP, clima ou conteúdo aleatório acrescentaria um comportamento que não está previsto na página.

### Finalidade

A seção Funcionalidades consultaria um endpoint e renderizaria os quatro itens já previstos no material: calendário, agendamentos, notificações e especialidades. A resposta conteria somente identificador, título e descrição pública de cada item. Isso exercita a requisição e os estados de carregamento/erro com conteúdo do próprio projeto.

O serviço seria apenas um catálogo público de apresentação. Não depende de banco de dados nem de acesso aos dados internos do sistema clínico.

### Contrato proposto, ainda não disponível

- Método: `GET`.
- Caminho sugerido: `/api/funcionalidades`.
- Resposta: objeto JSON com uma lista `funcionalidades`; cada item com `id`, `titulo` e `descricao`.
- Uso na interface: montar os blocos da seção Funcionalidades a partir da resposta.
- Casos a tratar: carregamento, sucesso, lista vazia, falha HTTP/rede e resposta inesperada.

### Possível hospedagem

Se a equipe escolher Netlify, uma Netlify Function pode responder ao endpoint e ser versionada/publicada junto ao site. Isso é uma opção de implementação, não uma hospedagem já configurada.

Documentação oficial consultada: <https://docs.netlify.com/build/functions/overview/> e <https://docs.netlify.com/build/functions/get-started/>.

O servidor Python do README serve arquivos estáticos e não executa uma Netlify Function. Caso essa opção seja escolhida, atualizar as instruções locais para a ferramenta que executa a função; não apresentar a verificação HTTP atual como teste da futura API.

### Decisão final pendente

O colega de API/testes e a equipe devem confirmar a adequação ao enunciado e escolher a hospedagem. Se houver requisito adicional de consumir API externa, ou endpoint apropriado já disponível no Focus Clínica, reavaliar a proposta antes de implementar. As fontes atuais exigem integração, sem restringir explicitamente a origem da API.

## Contrato a preencher pelo responsável

| Campo | Valor |
| --- | --- |
| Responsável / GitHub | `genzo-dev`, confirmado pelo solicitante |
| Nome da API | Pendente |
| Documentação oficial | Pendente |
| Finalidade e seção da página | Pendente |
| URL base e endpoint | Pendente |
| Método e parâmetros | Pendente |
| Campos esperados da resposta | Pendente |
| Exemplo de resposta anonimizado | Pendente |
| Autenticação e restrições | Pendente |
| Limites de uso | Pendente |
| Compatibilidade CORS com a origem publicada | Pendente |
| Confirmação de adequação à atividade | Pendente |

## Contrato com a interface

Após a aprovação do design, combinar com quem implementa HTML/JS:

- Elemento onde os dados serão apresentados.
- Quando a consulta acontece.
- Mensagem ou indicador de carregamento.
- Resultado de sucesso e resultado vazio.
- Mensagem de erro e possibilidade de tentar novamente.
- Timeout e cancelamento, se necessários.
- Apresentação acessível de mudanças de estado.

## Regras de implementação

- Verificar `response.ok`, além de tratar falha de rede.
- Validar a estrutura antes de acessar os campos retornados.
- Finalizar o estado de carregamento em sucesso ou falha.
- Inserir conteúdo textual sem interpretar dados externos como HTML.
- Não colocar credenciais privadas em arquivos JavaScript, histórico Git ou exemplos.
- Dados fictícios de desenvolvimento devem estar identificados e não substituem a validação da API real.

## Critério de conclusão

API documentada, dados úteis apresentados, estados de carregamento/vazio/erro tratados, testes com evidências e PR revisado. Não marcar a frente como concluída apenas por existir um `fetch()`.
