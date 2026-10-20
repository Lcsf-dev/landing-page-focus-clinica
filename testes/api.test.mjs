import { test, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import { consultarPerfil } from "../js/api.js";

const perfilExemplo = { login: "pessoa-equipe", name: "Pessoa da Equipe", html_url: "https://github.com/pessoa-equipe", avatar_url: "https://avatars.githubusercontent.com/u/1?v=4" };
afterEach(() => mock.restoreAll());

test("consulta o endpoint público e interpreta somente os campos usados", async () => {
  const consulta = mock.method(globalThis, "fetch", () => Promise.resolve(Response.json(perfilExemplo)));
  const perfil = await consultarPerfil("pessoa-equipe");
  assert.equal(consulta.mock.calls[0].arguments[0], "https://api.github.com/users/pessoa-equipe");
  assert.equal(perfil.nome, "Pessoa da Equipe");
  assert.equal(perfil.endereco, perfilExemplo.html_url);
  assert.equal(perfil.avatar, perfilExemplo.avatar_url);
});

test("nome público nulo preserva a possibilidade de usar o nome estático", async () => {
  mock.method(globalThis, "fetch", () => Promise.resolve(Response.json({ ...perfilExemplo, name: null, avatar_url: null })));
  const perfil = await consultarPerfil("pessoa-equipe");
  assert.equal(perfil.nome, null);
  assert.equal(perfil.avatar, null);
});

test("rejeita perfil ausente, limite de uso e falha do serviço", async () => {
  for (const status of [404, 403, 429, 500]) {
    mock.method(globalThis, "fetch", () => Promise.resolve(new Response("Falha", { status })));
    await assert.rejects(consultarPerfil("pessoa-equipe"), new RegExp(`HTTP ${status}`));
    mock.restoreAll();
  }
});

test("rejeita resposta vazia, incompleta ou referente a outro usuário", async () => {
  for (const dados of [null, {}, [], { ...perfilExemplo, login: "outra-pessoa" }]) {
    mock.method(globalThis, "fetch", () => Promise.resolve(Response.json(dados)));
    await assert.rejects(consultarPerfil("pessoa-equipe"), /inválida/);
    mock.restoreAll();
  }
});

test("não aceita endereços externos inesperados retornados pela API", async () => {
  for (const campo of ["html_url", "avatar_url"]) {
    mock.method(globalThis, "fetch", () => Promise.resolve(Response.json({ ...perfilExemplo, [campo]: "https://exemplo.invalid/perfil" })));
    await assert.rejects(consultarPerfil("pessoa-equipe"), /inválido/);
    mock.restoreAll();
  }
});

test("propaga falha de rede para o tratamento da interface", async () => {
  mock.method(globalThis, "fetch", () => Promise.reject(new TypeError("Conexão indisponível")));
  await assert.rejects(consultarPerfil("pessoa-equipe"), /Conexão indisponível/);
});

test("cancela uma consulta que ultrapassa o tempo limite", async () => {
  mock.method(globalThis, "fetch", (_endereco, opcoes) => new Promise((_concluir, rejeitar) => {
    opcoes.signal.addEventListener("abort", () => rejeitar(new DOMException("Tempo excedido", "AbortError")), { once: true });
  }));
  await assert.rejects(consultarPerfil("pessoa-equipe", { tempoLimite: 10 }), { name: "AbortError" });
});
