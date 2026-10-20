export async function consultarFuncionalidades(endereco, { tempoLimite = 8000 } = {}) {
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), tempoLimite);

  try {
    const resposta = await fetch(endereco, {
      signal: controlador.signal,
      headers: { Accept: "application/json" }
    });
    if (!resposta.ok) throw new Error(`Falha HTTP ${resposta.status}`);

    const dados = await resposta.json();
    if (!dados || !Array.isArray(dados.funcionalidades)) {
      throw new Error("Formato de resposta inválido.");
    }
    const identificadores = new Set();
    for (const item of dados.funcionalidades) {
      if (!item || ["id", "titulo", "descricao"].some((campo) => typeof item[campo] !== "string" || !item[campo].trim())) {
        throw new Error("Funcionalidade incompleta.");
      }
      if (identificadores.has(item.id)) throw new Error("Identificador duplicado.");
      identificadores.add(item.id);
    }
    return dados.funcionalidades;
  } finally {
    clearTimeout(temporizador);
  }
}
