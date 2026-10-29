import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, relative, extname } from "node:path";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT || 5500);
const CONTENT_TYPES = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".woff2": "font/woff2", ".txt": "text/plain"
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://127.0.0.1:${port}`);
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD" });
      response.end();
      return;
    }
    const pathname = decodeURIComponent(url.pathname);
    const isAllowed = pathname === "/" || pathname === "/index.html" || /^\/(css|js|img|pages)\//.test(pathname);
    const filePath = resolve(projectRoot, `.${pathname === "/" ? "/index.html" : pathname}`);
    const relativePath = relative(projectRoot, filePath);
    if (!isAllowed || relativePath.startsWith("..") || !CONTENT_TYPES[extname(filePath)]) {
      response.writeHead(404);
      response.end("Arquivo não encontrado.");
      return;
    }
    const content = await readFile(filePath);
    const charset = /\.(html|css|js|svg)$/.test(filePath) ? "; charset=utf-8" : "";
    response.writeHead(200, {
      "Content-Type": `${CONTENT_TYPES[extname(filePath)]}${charset}`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" || error.code === "EISDIR" ? 404 : 400);
    response.end("Não foi possível atender esta solicitação.");
  }
});

server.on("error", (error) => {
  console.error(error.code === "EADDRINUSE" ? `A porta ${port} está em uso. Defina PORT ou encerre o servidor anterior.` : error.message);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () => console.log(`Focus Clínica: http://127.0.0.1:${port}`));
