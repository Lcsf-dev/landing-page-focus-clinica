# Publicação e verificação final

**Status:** não publicada. Este documento é um checklist para a etapa futura.

## Configuração preparada

`netlify.toml`: comando `npm run build`, pasta `dist`, Node 22. Não há backend próprio. A CSP permite consultas à API do GitHub e seus avatares. O build local passou; isso não comprova publicação nem aplicação dos cabeçalhos no Netlify.

Após a revisão, conectar o repositório ao Netlify usando `main` como produção. `develop` é a base de integração. Registrar URL, data, commit e testes somente após publicação efetiva.

## Dados da entrega

| Campo | Valor |
| --- | --- |
| Plataforma | Netlify, confirmado pelo solicitante em 19/10/2026 |
| Endereço da landing page | Pendente |
| Data de publicação | Pendente |
| Commit publicado | Pendente |
| Responsável | Pendente |

O endereço <https://focus-clinica.netlify.app/> foi fornecido como referência do sistema. Não registrar como publicação desta landing page sem verificar que é a entrega correspondente.

## Antes de publicar

- [ ] Protótipo aprovado e link registrado.
- [ ] Todas as seções implementadas conforme Figma.
- [ ] Capturas reais e identidade visual conferidas.
- [ ] Celular, tablet e computador testados.
- [ ] Interações e navegação por teclado verificadas.
- [ ] API documentada e tratada em sucesso, carregamento, vazio e falha.
- [ ] Problemas relevantes corrigidos e retestados.
- [ ] Pull Requests revisados e integrados.
- [ ] README atualizado.
- [ ] Nenhuma credencial privada nos arquivos ou histórico.

## Depois de publicar

- [ ] Registrar URL, data e commit efetivos.
- [ ] Conferir links, caminhos de imagens, CSS e JavaScript no endereço final.
- [ ] Verificar a API na origem publicada, inclusive CORS.
- [ ] Testar navegação e menu em celular e computador.
- [ ] Registrar resultados e problemas em testes.md.
