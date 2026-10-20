import { cp, mkdir, rm, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, relative, dirname, extname } from "node:path";

const raiz = fileURLToPath(new URL("../", import.meta.url));
const destino = resolve(raiz, "dist");
// Remover somente a pasta gerada, após conferir o destino absoluto no projeto.
if (relative(raiz, destino) !== "dist" || resolve(dirname(destino)) !== resolve(raiz)) {
  throw new Error("Destino de publicação fora da pasta esperada.");
}
await rm(destino, { recursive: true, force: true });
await mkdir(destino, { recursive: true });
await cp(resolve(raiz, "index.html"), resolve(destino, "index.html"));
const extensoes = new Set([".html", ".css", ".js", ".svg", ".jpg", ".jpeg", ".png", ".webp", ".avif", ".ico", ".woff2"]);
const licencaFonte = resolve(raiz, "css/fontes/LICENCA-Inter.txt");
for (const pasta of ["css", "js", "img", "pages"]) {
  await cp(resolve(raiz, pasta), resolve(destino, pasta), {
    recursive: true,
    filter: async (origem) => (await stat(origem)).isDirectory() || extensoes.has(extname(origem)) || origem === licencaFonte
  });
}
console.log("Publicação preparada em dist/. Documentação, testes e arquivos locais não foram copiados.");
