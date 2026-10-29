/**
 * @typedef {Object} GithubProfile
 * @property {string} username - Validated GitHub login.
 * @property {string|null} name - Trimmed public name; null preserves the static name.
 * @property {string} profileUrl - HTTPS URL on github.com matching the requested login.
 * @property {string|null} avatarUrl - HTTPS URL on avatars.githubusercontent.com, or null.
 */

/**
 * @typedef {Object} GithubUserResponse
 * @property {string} login
 * @property {string|null} name
 * @property {string} html_url
 * @property {string|null} [avatar_url] - Missing or empty values use the static initials.
 */

/**
 * @param {unknown} username
 * @returns {username is string}
 */
export function isValidGithubUsername(username) {
  return typeof username === "string" && /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(username);
}

/**
 * @param {unknown} data
 * @param {string} username
 * @returns {boolean}
 */
function isExpectedGithubUser(data, username) {
  if (data === null || typeof data !== "object" || Array.isArray(data)) return false;
  const hasExpectedLogin = typeof data.login === "string" && data.login.toLowerCase() === username.toLowerCase();
  const hasValidName = data.name === null || typeof data.name === "string";
  return hasExpectedLogin && hasValidName;
}

/**
 * @param {unknown} value
 * @param {string} expectedOrigin
 * @returns {URL}
 */
function parseTrustedUrl(value, expectedOrigin) {
  let url;
  try {
    if (typeof value !== "string") throw new Error();
    url = new URL(value);
  } catch {
    throw new Error("Endereço do perfil inválido.");
  }
  if (url.origin !== expectedOrigin || url.username || url.password) {
    throw new Error("Endereço do perfil inválido.");
  }
  return url;
}

/**
 * Validate external data before exposing the normalized internal contract.
 * @param {unknown} data - Untrusted JSON from the GitHub API.
 * @param {string} username - Requested login, compared without case sensitivity.
 * @returns {GithubProfile}
 * @throws {Error} On missing fields, mismatched login or unexpected URLs.
 */
export function normalizeGithubProfile(data, username) {
  if (!isValidGithubUsername(username) || !isExpectedGithubUser(data, username)) {
    throw new Error("Perfil ausente ou resposta inválida.");
  }

  const profileUrl = parseTrustedUrl(data.html_url, "https://github.com");
  if (profileUrl.pathname.toLowerCase() !== `/${username.toLowerCase()}`) {
    throw new Error("Endereço do perfil inválido.");
  }

  const hasAvatar = data.avatar_url !== undefined && data.avatar_url !== null && data.avatar_url !== "";
  const avatarUrl = hasAvatar ? parseTrustedUrl(data.avatar_url, "https://avatars.githubusercontent.com") : null;

  return {
    username: data.login,
    name: data.name?.trim() || null,
    profileUrl: profileUrl.href,
    avatarUrl: avatarUrl?.href || null
  };
}
