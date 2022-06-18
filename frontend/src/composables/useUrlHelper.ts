export function projectIconUrl(owner: string, projectName: string) {
  return `/api/internal/projects/project/${owner}/${projectName}/icon`;
}

export function avatarUrl(name: string) {
  return `${import.meta.env.HANGAR_AUTH_HOST}/avatar/user/${name}`;
}

export function authUrl(user: string) {
  return import.meta.env.HANGAR_AUTH_HOST + "/" + user;
}

export function forumUrl(topicId: number) {
  return `https://forums.papermc.io/threads/` + topicId;
}

export function forumUserUrl(name: number | string) {
  // TODO fixme?
  return `https://forums.papermc.io/members/` + name;
}

export function linkout(url: string) {
  return "/linkout?remoteUrl=" + url;
}
