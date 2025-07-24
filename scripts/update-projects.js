#!/usr/bin/env node

/**
 * Auto-update Portfolio Projects Script
 *
 * This script automatically fetches the latest GitHub repositories
 * and updates the "Projetos Recentes" section in Home.vue
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  github: {
    username: "devgabrielsborges",
    apiUrl: "https://api.github.com",
    maxProjects: 3,
  },
  files: {
    homeVue: path.join(__dirname, "../src/views/Home.vue"),
  },
};

/**
 * Fetch GitHub repositories
 */
function fetchGitHubRepos() {
  return new Promise((resolve, reject) => {
    const url = `${CONFIG.github.apiUrl}/users/${CONFIG.github.username}/repos?sort=created&direction=desc&per_page=20`;

    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "Portfolio-Update-Script",
            Accept: "application/vnd.github.v3+json",
          },
        },
        (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            try {
              const repos = JSON.parse(data);
              if (Array.isArray(repos)) {
                resolve(repos);
              } else {
                reject(new Error("Invalid response format"));
              }
            } catch (error) {
              reject(error);
            }
          });
        }
      )
      .on("error", reject);
  });
}

/**
 * Filter and process repositories
 */
function processRepositories(repos) {
  // Filter public repositories and exclude portfolio site
  const filteredRepos = repos
    .filter(
      (repo) => !repo.private && repo.name !== "devgabrielsborges.github.io"
    )
    .slice(0, CONFIG.github.maxProjects);

  return filteredRepos.map((repo) => ({
    name: repo.name,
    displayName: formatDisplayName(repo.name),
    description: translateDescription(repo.description || ""),
    url: repo.html_url,
    language: repo.language,
    technologies: getTechnologies(repo),
    isPrivate: repo.private,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
  }));
}

/**
 * Format repository name for display
 */
function formatDisplayName(name) {
  // Convert kebab-case to Title Case
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Translate descriptions to Portuguese or provide defaults
 */
function translateDescription(description) {
  const translations = {
    handmark:
      "Transforme suas anotações manuscritas em arquivos .md em segundos. Ferramenta de IA/ML para conversão inteligente de handwriting para Markdown.",
    dashborges:
      "Dashboard financeiro poderoso construído com Python. Permite rastrear, analisar e visualizar dados financeiros pessoais com Streamlit e FastAPI.",
    "vision-app":
      "Aplicação TypeScript focada em visão computacional e processamento de imagens. Projeto com arquitetura moderna e interface intuitiva para análise visual.",
    carpenter:
      "Ferramenta de web scraping para extração de vagas de emprego. Busca e analisa oportunidades de trabalho em múltiplas plataformas.",
    scrivener:
      "Aplicação CLI de gerenciamento de tarefas escrita em C/Cython. Ferramenta simples e eficiente para organização pessoal.",
    "servant-xbot":
      "Bot para rastreamento de preços da Amazon e geração de links de afiliados. Automatiza monitoramento de produtos e oportunidades.",
    "mcp-fl":
      "Integração do Model Context Protocol para Federated Learning escalável. Projeto de pesquisa em aprendizado de máquina distribuído.",
    algorithms:
      "Estudos e implementações de algoritmos fundamentais. Coleção de soluções em C para problemas clássicos de programação.",
  };

  const key = description.toLowerCase();
  const repoKey = Object.keys(translations).find(
    (k) => key.includes(k) || k.includes(key)
  );

  if (repoKey) {
    return translations[repoKey];
  }

  // Default Portuguese description if no specific translation
  if (description) {
    return `Projeto de desenvolvimento em código aberto. ${description}`;
  }

  return "Projeto de desenvolvimento e inovação tecnológica com foco em soluções práticas e eficientes.";
}

/**
 * Get technology tags based on language and repo name
 */
function getTechnologies(repo) {
  const techs = [];

  // Primary language
  if (repo.language) {
    techs.push(repo.language);
  }

  // Infer additional technologies from repo name and description
  const name = repo.name.toLowerCase();
  const desc = (repo.description || "").toLowerCase();

  if (
    name.includes("ai") ||
    name.includes("ml") ||
    desc.includes("artificial") ||
    desc.includes("machine learning")
  ) {
    techs.push("IA/ML");
  }
  if (name.includes("dashboard") || desc.includes("dashboard")) {
    techs.push("Dashboard");
  }
  if (name.includes("cli") || desc.includes("command line")) {
    techs.push("CLI");
  }
  if (name.includes("web") || desc.includes("scraping")) {
    techs.push("Web Scraping");
  }
  if (name.includes("bot") || desc.includes("automation")) {
    techs.push("Automation");
  }
  if (desc.includes("streamlit")) {
    techs.push("Streamlit");
  }
  if (desc.includes("fastapi")) {
    techs.push("FastAPI");
  }
  if (desc.includes("docker")) {
    techs.push("Docker");
  }
  if (name.includes("gtk") || desc.includes("gtk")) {
    techs.push("GTK");
  }
  if (repo.language === "C") {
    techs.push("CMake");
  }
  if (name.includes("vision") || desc.includes("computer vision")) {
    techs.push("Computer Vision");
  }

  // Limit to 4 tags max
  return techs.slice(0, 4);
}

/**
 * Generate Vue component code for projects
 */
function generateProjectsHTML(projects) {
  return projects
    .map((project) => {
      const lockIcon = project.isPrivate
        ? `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18,8h-1V6A5,5 0 0,0 12,1A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8Z"/>
                    </svg>`
        : `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>`;

      const privateClass = project.isPrivate ? " private" : "";
      const techTags = project.technologies
        .map((tech) => `<span class="tech-tag">${tech}</span>`)
        .join("\n                ");

      return `            <div class="project-card">
              <div class="project-header">
                <h3>${project.displayName}</h3>
                <div class="project-links">
                  <a href="${project.url}" target="_blank" class="project-link${privateClass}">${lockIcon}
                  </a>
                </div>
              </div>
              <p class="project-description">
                ${project.description}
              </p>
              <div class="project-tech">
                ${techTags}
              </div>
            </div>`;
    })
    .join("\n");
}

/**
 * Update Home.vue file
 */
function updateHomeVue(projects) {
  try {
    const filePath = CONFIG.files.homeVue;
    let content = fs.readFileSync(filePath, "utf8");

    // Find the "Projetos Recentes" section
    const startMarker =
      '<div class="projects-header">\n            <h2>Projetos Recentes</h2>';
    const endMarker =
      "          </div>\n        </div>\n      </section>\n\n      <!-- Experience Section -->";

    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker, startIndex);

    if (startIndex === -1 || endIndex === -1) {
      throw new Error(
        'Could not find "Projetos Recentes" section markers in Home.vue'
      );
    }

    // Generate new projects HTML
    const projectsHTML = generateProjectsHTML(projects);

    // Build new section
    const newSection = `<div class="projects-header">
            <h2>Projetos Recentes</h2>
            <p>
              Últimos projetos em andamento (atualizado automaticamente)
            </p>
          </div>

          <div class="projects-grid">
${projectsHTML}
          </div>`;

    // Replace the section
    const newContent =
      content.substring(0, startIndex) +
      newSection +
      content.substring(endIndex);

    // Write back to file
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log("✅ Home.vue updated successfully");

    return true;
  } catch (error) {
    console.error("❌ Error updating Home.vue:", error.message);
    return false;
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log("🚀 Starting portfolio projects update...");
    console.log(`📡 Fetching repositories for ${CONFIG.github.username}...`);

    // Fetch repositories
    const repos = await fetchGitHubRepos();
    console.log(`📦 Found ${repos.length} total repositories`);

    // Process repositories
    const projects = processRepositories(repos);
    console.log(`🎯 Selected ${projects.length} projects for display:`);

    projects.forEach((project, index) => {
      console.log(
        `   ${index + 1}. ${project.displayName} (${project.language || "N/A"})`
      );
    });

    // Update Home.vue
    console.log("📝 Updating Home.vue...");
    const success = updateHomeVue(projects);

    if (success) {
      console.log("🎉 Portfolio updated successfully!");
      console.log(`⏰ Last updated: ${new Date().toLocaleString("pt-BR")}`);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main, fetchGitHubRepos, processRepositories, updateHomeVue };
