export function normalizeGithubProfile(data) {
  return {
    username: data.login,
    name: data.name?.trim() || null,
    profileUrl: data.html_url,
    avatarUrl: data.avatar_url || null,
  };
}
