# Decisões Técnicas

## Migração do ambiente de desenvolvimento para Vite

**Decisão:** substituir os scripts personalizados de servidor local (`dev-server.mjs`) e geração de build (`build.mjs`) pelo Vite.

### Motivação

Anteriormente, o projeto utilizava scripts próprios em Node.js para disponibilizar os arquivos localmente e preparar a versão de produção. Embora funcionais, essas implementações exigiam manutenção de código responsável por tarefas que já possuem soluções consolidadas no ecossistema JavaScript.

### Melhorias obtidas

- **Desenvolvimento mais ágil:** servidor local com Hot Module Replacement (HMR), atualizando os módulos automaticamente durante o desenvolvimento.
- **Build otimizado:** geração automatizada de arquivos de produção, com processamento e otimização de CSS, JavaScript e recursos estáticos.
- **Menos código próprio:** redução da necessidade de manter implementações manuais de servidor HTTP, MIME types, cópia de arquivos e preparação de diretórios.
- **Padronização:** utilização de uma ferramenta amplamente adotada no ecossistema frontend, facilitando a manutenção e a integração com outras ferramentas.
- **Preview de produção:** possibilidade de testar localmente a versão compilada antes da publicação.

### Ferramentas e comandos

| Comando           | Responsabilidade                                              |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Inicia o ambiente de desenvolvimento.                         |
| `npm run build`   | Gera os arquivos otimizados em `dist/`.                       |
| `npm run preview` | Disponibiliza localmente a versão de produção para validação. |

### Considerações

A migração mantém a proposta de uma aplicação leve, construída com HTML, CSS e JavaScript, sem introduzir frameworks frontend desnecessários.

O Node.js continua sendo utilizado para execução de scripts e testes, enquanto o Vite assume as responsabilidades relacionadas ao desenvolvimento e à geração dos arquivos de produção.

**Resultado esperado:** uma estrutura mais simples, padronizada e fácil de manter, reduzindo código de infraestrutura próprio sem aumentar desnecessariamente a complexidade do projeto.
