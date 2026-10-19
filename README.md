# Landing Page — Focus Clínica

Landing page institucional para apresentar o Focus Clínica, suas funcionalidades e benefícios a clínicas, gestores e profissionais da saúde.

## Estado atual

Projeto iniciado em **19/10/2026**. Estrutura técnica preparada; planejamento em elaboração. A implementação visual depende do protótipo no Figma revisado e aprovado. A API ainda será definida.

O HTML atual é somente um ponto de entrada de desenvolvimento. Não representa a landing page concluída.

## Tecnologias

- HTML semântico.
- CSS com Flexbox/Grid e media queries, na etapa de implementação.
- JavaScript para menu móvel, interações e consumo de API com `fetch()`.
- Git e GitHub para versionamento e revisão.
- Figma para wireframes e protótipo navegável.

## Executar localmente

Pré-requisito: Python 3 instalado. Na pasta do projeto, execute:

```powershell
python -m http.server 5500 --bind 127.0.0.1
```

Acesse <http://127.0.0.1:5500>. Para encerrar, pressione `Ctrl+C` no terminal.

Use um servidor HTTP durante o desenvolvimento: abrir `index.html` diretamente como arquivo pode impedir requisições com `fetch()`.

## Estrutura

```text
.
├── .github/             # Modelos de tarefas, problemas e Pull Requests
├── css/                 # Estilos da landing page
├── docs/                # Planejamento e evidências do projeto
├── img/                 # Identidade visual e capturas reais do sistema
├── js/                  # Interações e integração com API
├── pages/               # Reservada conforme a estrutura solicitada
├── index.html           # Ponto de entrada
└── README.md
```

## Documentação

A documentação será adicionada na branch de planejamento. Nenhuma entrega deve ser marcada como aprovada, testada ou publicada antes da respectiva verificação.

## Versionamento

- `main`: base revisada do projeto.
- Uma branch por tarefa, com commits pequenos e descritivos.
- Pull Request com contexto, forma de verificar e evidências.
- Integração após revisão e aprovação, conforme o material da atividade.
- Datas e autoria correspondem ao trabalho realizado. O início do projeto não representa sua conclusão.

## Publicação

Ainda não realizada. A plataforma e o endereço serão registrados após a entrega ser revisada.
