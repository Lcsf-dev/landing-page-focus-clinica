import { cp, mkdir, rm, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, relative, dirname, extname } from "node:path";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const outputDirectory = resolve(projectRoot, "dist");
// Verify the absolute target before removing only the generated directory.
if (relative(projectRoot, outputDirectory) !== "dist" || resolve(dirname(outputDirectory)) !== resolve(projectRoot)) {
  throw new Error("Destino de publicação fora da pasta esperada.");
}
await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(resolve(projectRoot, "index.html"), resolve(outputDirectory, "index.html"));
const PUBLIC_EXTENSIONS = new Set([".html", ".css", ".js", ".svg", ".jpg", ".jpeg", ".png", ".webp", ".avif", ".ico", ".woff2"]);
const fontLicensePath = resolve(projectRoot, "css/fonts/LICENSE-Inter.txt");
for (const directory of ["css", "js", "img", "pages"]) {
  await cp(resolve(projectRoot, directory), resolve(outputDirectory, directory), {
    recursive: true,
    filter: async (source) => (await stat(source)).isDirectory() || PUBLIC_EXTENSIONS.has(extname(source)) || source === fontLicensePath
  });
}
console.log("Publicação preparada em dist/. Documentação, testes e arquivos locais não foram copiados.");
