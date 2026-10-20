import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, relative, extname } from "node:path";
import responderFuncionalidades from "../netlify/functions/funcionalidades.mjs";

const raiz = fileURLToPath(new URL("../", import.meta.url));
const porta = Number(process.env.PORT || 5500);
const tipos = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

// Cenários de desenvolvimento: nunca são usados pela função publicada no Netlify.
async function consultarApiLocal(requisicao) {
  const cenario = process.env.CENARIO_API || "sucesso";
  if (cenario === "lento") await new Promise((concluir) => setTimeout(concluir, 2000));
  if (["GET", "HEAD"].includes(requisicao.method)) {
    if (cenario === "erro") return Response.json({ erro: "Falha simulada localmente." }, { status: 500 });
    if (cenario === "vazio") return Response.json({ funcionalidades: [] });
    if (cenario === "invalido") return Response.json({ funcionalidades: [{ titulo: "Resposta incompleta" }] });
  }
  return responderFuncionalidades(requisicao);
}

const servidor = createServer(async (entrada, saida) => {
  try {
    const endereco = new URL(entrada.url, `http://127.0.0.1:${porta}`);
    if (["/api/funcionalidades", "/api/funcionalidades/"].includes(endereco.pathname)) {
      const resposta = await consultarApiLocal(new Request(endereco, { method: entrada.method }));
      saida.writeHead(resposta.status, { ...Object.fromEntries(resposta.headers), "Cache-Control": "no-store" });
      saida.end(entrada.method === "HEAD" ? undefined : Buffer.from(await resposta.arrayBuffer()));
      return;
    }
    if (!["GET", "HEAD"].includes(entrada.method)) {
      saida.writeHead(405, { Allow: "GET, HEAD" });
      saida.end();
      return;
    }
    const caminho = decodeURIComponent(endereco.pathname);
    const permitido = caminho === "/" || caminho === "/index.html" || /^\/(css|js|img|pages)\//.test(caminho);
    const arquivo = resolve(raiz, `.${caminho === "/" ? "/index.html" : caminho}`);
    const relativo = relative(raiz, arquivo);
    if (!permitido || relativo.startsWith("..") || !tipos[extname(arquivo)]) {
      saida.writeHead(404);
      saida.end("Arquivo não encontrado.");
      return;
    }
    const conteudo = await readFile(arquivo);
    saida.writeHead(200, { "Content-Type": `${tipos[extname(arquivo)]}${/\.(html|css|js|svg)$/.test(arquivo) ? "; charset=utf-8" : ""}`, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
    saida.end(entrada.method === "HEAD" ? undefined : conteudo);
  } catch (erro) {
    saida.writeHead(erro.code === "ENOENT" || erro.code === "EISDIR" ? 404 : 400);
    saida.end("Não foi possível atender esta solicitação.");
  }
});

servidor.on("error", (erro) => {
  console.error(erro.code === "EADDRINUSE" ? `A porta ${porta} está em uso. Defina PORT ou encerre o servidor anterior.` : erro.message);
  process.exitCode = 1;
});
servidor.listen(porta, "127.0.0.1", () => console.log(`Focus Clínica: http://127.0.0.1:${porta} — API: /api/funcionalidades`));
