import { normalizeGithubProfile } from "../../utils/normalizeGithubProfile";

const GITHUB_API_BASE_URL = "https://api.github.com";
const DEFAULT_TIMEOUT_MS = 8000;

export async function fetchGithubProfile(
  username,
  { timeoutMs = DEFAULT_TIMEOUT_MS } = {},
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(
      `${GITHUB_API_BASE_URL}/users/${encodeURIComponent(username)}`,
      {
        signal: controller.signal,
        headers: { Accept: "application/vnd.github+json" },
      },
    );
    if (!response.ok) throw new Error(`Falha HTTP ${response.status}`);
    return normalizeGithubProfile(await response.json());
  } finally {
    clearTimeout(timeoutId);
  }
}
