import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, relative, extname } from "node:path";

const raiz = fileURLToPath(new URL("../", import.meta.url));
const porta = Number(process.env.PORT || 5500);
const tipos = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

const servidor = createServer(async (entrada, saida) => {
  try {
    const endereco = new URL(entrada.url, `http://127.0.0.1:${porta}`);
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
servidor.listen(porta, "127.0.0.1", () => console.log(`Focus Clínica: http://127.0.0.1:${porta}`));
