import { test, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import responderFuncionalidades from "../netlify/functions/funcionalidades.mjs";
import { consultarFuncionalidades } from "../js/api.js";

const endereco = "http://localhost:5500/api/funcionalidades";
afterEach(() => mock.restoreAll());

test("GET fornece as quatro funcionalidades exigidas em JSON", async () => {
  const resposta = responderFuncionalidades(new Request(endereco));
  assert.equal(resposta.status, 200);
  assert.match(resposta.headers.get("content-type"), /application\/json/);
  const dados = await resposta.json();
  assert.deepEqual(dados.funcionalidades.map((item) => item.id), ["calendario", "agendamentos", "notificacoes", "especialidades"]);
  assert.ok(dados.funcionalidades.every((item) => item.titulo && item.descricao));
});

test("HEAD retorna cabeçalhos sem corpo", async () => {
  const resposta = responderFuncionalidades(new Request(endereco, { method: "HEAD" }));
  assert.equal(resposta.status, 200);
  assert.equal(await resposta.text(), "");
});

test("POST é rejeitado e informa os métodos permitidos", () => {
  const resposta = responderFuncionalidades(new Request(endereco, { method: "POST" }));
  assert.equal(resposta.status, 405);
  assert.equal(resposta.headers.get("allow"), "GET, HEAD");
});

test("cliente interpreta a resposta real da função", async () => {
  mock.method(globalThis, "fetch", () => Promise.resolve(responderFuncionalidades(new Request(endereco))));
  assert.equal((await consultarFuncionalidades(endereco)).length, 4);
});

test("cliente rejeita falha HTTP mesmo quando fetch resolve", async () => {
  mock.method(globalThis, "fetch", () => Promise.resolve(new Response("Falha", { status: 500 })));
  await assert.rejects(consultarFuncionalidades(endereco), /HTTP 500/);
});

test("cliente permite lista vazia para a interface apresentar estado vazio", async () => {
  mock.method(globalThis, "fetch", () => Promise.resolve(Response.json({ funcionalidades: [] })));
  assert.deepEqual(await consultarFuncionalidades(endereco), []);
});

test("cliente rejeita campos ausentes e resposta inesperada", async () => {
  for (const dados of [{}, { funcionalidades: [{ id: "calendario" }] }]) {
    mock.method(globalThis, "fetch", () => Promise.resolve(Response.json(dados)));
    await assert.rejects(consultarFuncionalidades(endereco), /inválido|incompleta/);
    mock.restoreAll();
  }
});

test("cliente propaga erro de rede para o tratamento da interface", async () => {
  mock.method(globalThis, "fetch", () => Promise.reject(new TypeError("Conexão indisponível")));
  await assert.rejects(consultarFuncionalidades(endereco), /Conexão indisponível/);
});

test("cliente cancela uma consulta que ultrapassa o tempo limite", async () => {
  mock.method(globalThis, "fetch", (_endereco, opcoes) => new Promise((_concluir, rejeitar) => {
    opcoes.signal.addEventListener("abort", () => rejeitar(new DOMException("Tempo excedido", "AbortError")), { once: true });
  }));
  await assert.rejects(consultarFuncionalidades(endereco, { tempoLimite: 10 }), { name: "AbortError" });
});
