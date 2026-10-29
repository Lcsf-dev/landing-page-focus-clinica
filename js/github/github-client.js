import { isValidGithubUsername, normalizeGithubProfile } from "./github-profile.js";

const GITHUB_API_BASE_URL = "https://api.github.com";
const DEFAULT_TIMEOUT_MS = 8000;

/**
 * Fetch a public profile without credentials; timeout includes reading the body.
 * @param {string} username - Expected GitHub login.
 * @param {{ timeoutMs?: number }} [options]
 * @returns {Promise<import("./github-profile.js").GithubProfile>}
 * @throws {Error} On HTTP failure or incompatible profile data.
 * @throws {TypeError} On network failure.
 * @throws {SyntaxError} On invalid JSON.
 * @throws {DOMException} With name AbortError when the request times out.
 */
export async function fetchGithubProfile(username, { timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  if (!isValidGithubUsername(username)) {
    throw new Error("Usuário do GitHub inválido.");
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${GITHUB_API_BASE_URL}/users/${encodeURIComponent(username)}`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error(`Falha HTTP ${response.status}`);
    return normalizeGithubProfile(await response.json(), username);
  } finally {
    clearTimeout(timeoutId);
  }
}
