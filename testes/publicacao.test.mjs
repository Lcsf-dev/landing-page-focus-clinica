import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const pastaPublica = resolve("dist");
const pagina = readFileSync(resolve(pastaPublica, "index.html"), "utf8");

test("links, imagens, fontes e scripts locais resolvem também no subdiretório do GitHub Pages", () => {
  const base = new URL("https://lcsf-dev.github.io/landing-page-focus-clinica/");
  const identificadores = [...pagina.matchAll(/\bid="([^"]+)"/g)].map((item) => item[1]);
  assert.equal(new Set(identificadores).size, identificadores.length, "IDs devem ser únicos.");
  for (const [, referencia] of pagina.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const endereco = new URL(referencia, base);
    if (endereco.origin !== base.origin) continue;
    assert.ok(endereco.pathname.startsWith(base.pathname), `Caminho fora do projeto: ${referencia}`);
    if (referencia.startsWith("#")) {
      assert.ok(identificadores.includes(referencia.slice(1)), `Âncora inexistente: ${referencia}`);
      continue;
    }
    const arquivo = resolve(pastaPublica, decodeURIComponent(endereco.pathname.slice(base.pathname.length)));
    assert.ok(existsSync(arquivo) && statSync(arquivo).isFile(), `Recurso ausente: ${referencia}`);
  }
  for (const [, referencia] of pagina.matchAll(/\b(?:aria-controls|aria-labelledby)="([^"]+)"/g)) {
    for (const identificador of referencia.split(/\s+/)) {
      assert.ok(identificadores.includes(identificador), `Referência acessível inexistente: ${identificador}`);
    }
  }
  const enderecoEstilos = new URL("css/estilos.css", base);
  const estilos = readFileSync(resolve(pastaPublica, "css/estilos.css"), "utf8");
  for (const [, referencia] of estilos.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    const endereco = new URL(referencia, enderecoEstilos);
    if (endereco.origin !== base.origin) continue;
    assert.ok(endereco.pathname.startsWith(base.pathname), `Recurso CSS fora do projeto: ${referencia}`);
    const arquivo = resolve(pastaPublica, decodeURIComponent(endereco.pathname.slice(base.pathname.length)));
    assert.ok(existsSync(arquivo) && statSync(arquivo).isFile(), `Recurso CSS ausente: ${referencia}`);
  }
  assert.ok(existsSync(resolve(pastaPublica, "css/fontes/LICENCA-Inter.txt")), "Licença da fonte deve acompanhar a publicação.");
});

test("pacote público não inclui histórico, documentos de trabalho ou credenciais locais", () => {
  for (const nome of [".git", ".env", ".github", "docs", "testes", "tmp", "README.md", "package.json", "netlify"]) {
    assert.equal(existsSync(resolve(pastaPublica, nome)), false, `Arquivo de trabalho publicado: ${nome}`);
  }
});
