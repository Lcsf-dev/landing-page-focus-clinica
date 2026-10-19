# Integração com API

**Status:** decisão pendente. Frente reservada ao colega interessado em API e testes. Nenhuma API foi criada ou integrada.

## O que o material pede

Consultar dados com `fetch()`, apresentá-los na página e verificar carregamento e tratamento de erros. O material não exige explicitamente construir um serviço de backend próprio.

## Decisão a tomar em equipe

Definir primeiro qual dado melhora a apresentação do Focus Clínica e em que seção aparecerá. Não adicionar uma funcionalidade sem relação com a landing page apenas para usar uma API.

Preferência inicial para avaliação: consumir API existente, com documentação e acesso apropriado ao navegador. Uma API do próprio sistema só será usada se houver endpoint adequado e acesso autorizado.

## Contrato a preencher pelo responsável

| Campo | Valor |
| --- | --- |
| Responsável / GitHub | Pendente |
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
