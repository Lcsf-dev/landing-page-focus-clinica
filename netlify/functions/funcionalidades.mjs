import { funcionalidades } from "../../dados/funcionalidades.mjs";

export default function responderFuncionalidades(requisicao) {
  if (!["GET", "HEAD"].includes(requisicao.method)) {
    return Response.json({ erro: "Método não permitido." }, {
      status: 405,
      headers: { Allow: "GET, HEAD", "Cache-Control": "no-store" }
    });
  }

  const corpo = JSON.stringify({ versao: "1.0", funcionalidades });
  return new Response(requisicao.method === "HEAD" ? null : corpo, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

export const config = { path: "/api/funcionalidades" };
