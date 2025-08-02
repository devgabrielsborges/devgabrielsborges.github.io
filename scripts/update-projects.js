#!/usr/bin/env node

import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GITHUB_USERNAME = "devgabrielsborges";
const PROJECTS_JSON_PATH = join(
  __dirname,
  "..",
  "public",
  "latest-projects.json"
);
const IGNORE_JSON_PATH = join(__dirname, "..", "ignore.json");
const GITHUB_API_BASE = "https://api.github.com";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Load the ignore list from ignore.json
 */
async function loadIgnoreList() {
  try {
    const ignoreFileContent = await readFile(IGNORE_JSON_PATH, "utf-8");
    const ignoreData = JSON.parse(ignoreFileContent);
    return ignoreData.ignoredProjects || [];
  } catch (error) {
    console.warn(
      "⚠️  Could not load ignore.json, proceeding without ignored projects"
    );
    return [];
  }
}

/**
 * Fetch user's repositories from GitHub API
 */
async function fetchGitHubRepos() {
  try {
    const headers = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "devgabrielsborges-portfolio-updater",
    };

    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }

    console.log("Loading ignore list...");
    const ignoredProjects = await loadIgnoreList();
    console.log(
      `📋 Ignored projects: ${
        ignoredProjects.length > 0 ? ignoredProjects.join(", ") : "none"
      }`
    );

    console.log("Fetching repositories from GitHub...");
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    const repos = await response.json();
    console.log(`Found ${repos.length} repositories`);

    const filteredRepos = repos
      .filter(
        (repo) =>
          !repo.fork &&
          !repo.archived &&
          !ignoredProjects.includes(repo.name) &&
          repo.updated_at
      )
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 3); // Get latest 3

    console.log(
      "Latest 3 repositories:",
      filteredRepos.map((r) => r.name)
    );
    return filteredRepos;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    throw error;
  }
}

/**
 * Get programming languages for a repository
 */
async function getRepoLanguages(repoName) {
  try {
    const headers = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "devgabrielsborges-portfolio-updater",
    };

    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      {
        headers,
      }
    );

    if (!response.ok) {
      return [];
    }

    const languages = await response.json();
    return Object.keys(languages).slice(0, 4); // Get top 4 languages
  } catch (error) {
    console.warn(`Could not fetch languages for ${repoName}:`, error.message);
    return [];
  }
}

/**
 * Generate tech tags from repository languages and topics
 */
function generateTechTags(repo, languages) {
  const tags = new Set();

  if (repo.language) {
    tags.add(repo.language);
  }

  languages.forEach((lang) => {
    if (lang !== repo.language) {
      tags.add(lang);
    }
  });

  if (repo.topics && repo.topics.length > 0) {
    repo.topics.slice(0, 2).forEach((topic) => {
      const cleanTopic = topic
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      tags.add(cleanTopic);
    });
  }

  // Limit to 4 tags
  return Array.from(tags).slice(0, 4);
}

/**
 * Transform repository data for JSON storage
 */
async function transformRepoData(repos) {
  const projectsData = [];

  for (const repo of repos) {
    console.log(`Processing ${repo.name}...`);

    const languages = await getRepoLanguages(repo.name);
    const techTags = generateTechTags(repo, languages);
    const description =
      repo.description || "Projeto em desenvolvimento ativo no GitHub.";

    projectsData.push({
      name: repo.name,
      description: description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      topics: repo.topics || [],
      updated_at: repo.updated_at,
      techTags: techTags,
    });

    // Add small delay to respect GitHub API rate limits
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return projectsData;
}

/**
 * Update the projects JSON file with latest data
 */
async function updateProjectsJson(repos) {
  try {
    console.log("Transforming repository data...");
    const projectsData = await transformRepoData(repos);

    console.log("Writing to projects JSON file...");
    await writeFile(
      PROJECTS_JSON_PATH,
      JSON.stringify(projectsData, null, 2),
      "utf-8"
    );

    console.log("✅ Projects JSON updated successfully!");

    const timestamp = new Date().toISOString();
    console.log(`📅 Updated at: ${timestamp}`);
  } catch (error) {
    console.error("Error updating projects JSON:", error);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log("🚀 Starting project update process...");
    console.log(`📂 Working directory: ${process.cwd()}`);
    console.log(`👤 GitHub username: ${GITHUB_USERNAME}`);
    console.log(
      `🔑 GitHub token: ${
        GITHUB_TOKEN ? "provided" : "not provided (rate limits may apply)"
      }`
    );
    console.log(`📄 Output file: ${PROJECTS_JSON_PATH}`);

    const repos = await fetchGitHubRepos();

    if (repos.length === 0) {
      console.log("⚠️  No repositories found to update");
      return;
    }

    await updateProjectsJson(repos);

    console.log("✨ Project update completed successfully!");
    console.log(
      "💡 The Vue component will automatically load the updated data."
    );
  } catch (error) {
    console.error("❌ Error during project update:", error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main, fetchGitHubRepos, updateProjectsJson };
