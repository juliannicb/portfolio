'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Github, Star, GitFork, Users } from 'lucide-react';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

interface Repository {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // Fetch user stats
        const userResponse = await fetch('https://api.github.com/users/juliannicb');
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setStats(userData);

        // Fetch repositories
        const reposResponse = await fetch('https://api.github.com/users/juliannicb/repos?sort=stars&per_page=6');
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposResponse.json();
        setRepos(reposData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Github className="w-5 h-5" />
          <h3 className="font-semibold">GitHub Activity</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-surface-secondary rounded w-3/4"></div>
          <div className="h-4 bg-surface-secondary rounded w-1/2"></div>
          <div className="h-4 bg-surface-secondary rounded w-2/3"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Github className="w-5 h-5" />
          <h3 className="font-semibold">GitHub Activity</h3>
        </div>
        <p className="text-text-secondary text-sm">Unable to load GitHub data</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Github className="w-5 h-5" />
        <h3 className="font-semibold">GitHub Activity</h3>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{stats.public_repos}</div>
            <div className="text-xs text-text-secondary">Repositories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{stats.followers}</div>
            <div className="text-xs text-text-secondary">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{stats.following}</div>
            <div className="text-xs text-text-secondary">Following</div>
          </div>
        </div>
      )}

      {/* Top Repositories */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-secondary">Popular Repositories</h4>
        {repos.slice(0, 3).map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 rounded-lg bg-surface-secondary/50 hover:bg-surface-secondary transition-colors"
          >
            <div className="flex justify-between items-start mb-1">
              <h5 className="font-medium text-sm truncate">{repo.name}</h5>
              <div className="flex items-center gap-2 text-xs text-text-secondary ml-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {repo.stargazers_count}
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-3 h-3" />
                  {repo.forks_count}
                </div>
              </div>
            </div>
            {repo.description && (
              <p className="text-xs text-text-secondary line-clamp-2 mb-2">
                {repo.description}
              </p>
            )}
            {repo.language && (
              <span className="inline-block px-2 py-1 text-xs bg-accent/20 text-accent rounded">
                {repo.language}
              </span>
            )}
          </a>
        ))}
      </div>
    </Card>
  );
}