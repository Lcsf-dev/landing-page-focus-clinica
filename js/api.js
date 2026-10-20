// Somente perfis públicos: nenhuma credencial é necessária no navegador.
export async function consultarPerfil(usuario, { tempoLimite = 8000 } = {}) {
  if (!/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(usuario)) {
    throw new Error("Usuário do GitHub inválido.");
  }
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), tempoLimite);

  try {
    const resposta = await fetch(`https://api.github.com/users/${encodeURIComponent(usuario)}`, {
      signal: controlador.signal,
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!resposta.ok) throw new Error(`Falha HTTP ${resposta.status}`);

    const dados = await resposta.json();
    if (!dados || typeof dados.login !== "string" || dados.login.toLowerCase() !== usuario.toLowerCase() ||
        !(dados.name === null || typeof dados.name === "string")) {
      throw new Error("Perfil ausente ou resposta inválida.");
    }
    const perfil = new URL(dados.html_url);
    const avatar = dados.avatar_url ? new URL(dados.avatar_url) : null;
    if (perfil.origin !== "https://github.com" || perfil.pathname.toLowerCase() !== `/${usuario.toLowerCase()}` ||
        (avatar && avatar.origin !== "https://avatars.githubusercontent.com")) {
      throw new Error("Endereço do perfil inválido.");
    }
    return { usuario: dados.login, nome: dados.name?.trim() || null, endereco: perfil.href, avatar: avatar?.href || null };
  } finally {
    clearTimeout(temporizador);
  }
}
