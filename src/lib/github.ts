import snapshotData from '../data/github-snapshot.json';

export interface GitHubStats {
  username: string;
  name: string;
  bio: string;
  publicRepos: number;
  totalMergedPRs: number;
  projectsContributedTo: number;
  yearsActive: number;
  isLive: boolean;
  lastFetched: string;
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const fallback: GitHubStats = {
    username: snapshotData.username,
    name: snapshotData.name,
    bio: snapshotData.bio,
    publicRepos: snapshotData.publicRepos,
    totalMergedPRs: snapshotData.totalMergedPRs,
    projectsContributedTo: snapshotData.projectsContributedTo,
    yearsActive: snapshotData.yearsActive,
    isLive: false,
    lastFetched: snapshotData.lastFetched
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const headers: Record<string, string> = {
      'User-Agent': 'Many-Hands-Portfolio-Build',
      'Accept': 'application/vnd.github.v3+json'
    };

    if (typeof process !== 'undefined' && process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch('https://api.github.com/users/Tejas-Raj01', {
      headers,
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      return {
        username: data.login || fallback.username,
        name: data.name || fallback.name,
        bio: data.bio || fallback.bio,
        publicRepos: typeof data.public_repos === 'number' ? data.public_repos : fallback.publicRepos,
        totalMergedPRs: fallback.totalMergedPRs,
        projectsContributedTo: fallback.projectsContributedTo,
        yearsActive: fallback.yearsActive,
        isLive: true,
        lastFetched: new Date().toISOString()
      };
    }
  } catch (error) {
    // Graceful fallback to snapshot without breaking build
  }

  return fallback;
}
