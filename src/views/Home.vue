<template>
  <div>
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <a href="#" class="logo">gabrielsborges</a>
          <div class="nav-icons">
            <!-- GitHub Icon -->
            <a href="https://github.com/devgabrielsborges" target="_blank" class="nav-icon-link">
              <svg
                class="nav-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                ></path>
              </svg>
            </a>
            <!-- LinkedIn Icon -->
            <a href="https://linkedin.com/in/devgabrielsborges" target="_blank" class="nav-icon-link">
              <svg
                class="nav-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="m5.839 4.5c0-.864.7-1.5 1.561-1.5s1.54.636 1.54 1.5c0 .864-.679 1.5-1.54 1.5s-1.561-.636-1.561-1.5zm.184 19.5v-15h2.962v15zm4.455 0v-15h2.962v2.310c.739-1.472 2.564-2.499 4.28-2.499 3.637 0 5.542 3.052 5.542 7.019v8.17zm9.213-8.372c0-2.063-.826-3.077-2.415-3.077-1.543 0-2.529 1.02-2.529 3.077v8.372h-2.962v-8.372z"
                ></path>
              </svg>
            </a>
            <!-- Email Icon -->
            <a href="mailto:dev.gabrielsborges@gmail.com" class="nav-icon-link">
              <svg
                class="nav-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <!-- Resume Icon -->
            <a href="assets/CV.pdf" target="_blank" class="nav-icon-link">
              <svg
                class="nav-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                ></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-grid">
            <div class="bio-card">
              <h2>Gabriel Borges</h2>
              <p class="location"><strong>Recife, Pernambuco, Brasil</strong></p>
              <p class="contact-info">
                <a href="https://linkedin.com/in/devgabrielsborges" target="_blank">linkedin.com/in/devgabrielsborges</a> | 
                <a href="https://github.com/devgabrielsborges" target="_blank">github.com/devgabrielsborges</a>
              </p>
              <h3>Resumo Profissional</h3>
              <p>
                Desenvolvedor de Código Aberto e estudante de Engenharia da Computação com sólida experiência em Python, Java e C. 
                Atualmente, atuo como Líder de Ciência de Dados em um Projeto de Extensão Tecnológica (PET) e mantenho pacotes PyPI. 
                Possuo familiaridade com ambientes Linux, conteinerização com Docker e desenvolvimento de soluções como freelancer 
                em Sistemas Embarcados, Desenvolvimento Android, Web Scraping e Inteligência Artificial.
              </p>
              <h3>Tecnologias & Ferramentas</h3>
              <p>
                <strong>Linguagens:</strong> Python, Java, JavaScript, C, Cython, HTML, CSS, SQL<br>
                <strong>Ferramentas:</strong> Docker, Linux, Git, GitHub, ProcessingJS<br>
                <strong>Competências:</strong> Desenvolvimento Open Source, Algoritmos, Web Scraping, IA, Automação, Sistemas Embarcados
              </p>
            </div>
            <div class="hero-card">
              <div class="hero-image-container">
                <img :src="heroImage" alt="Gabriel Borges" class="hero-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="projects-section">
        <div class="container">
          <div class="projects-header">
            <h2>Experiência Profissional</h2>
            <p>
              Principais experiências e projetos que demonstram minha expertise técnica
            </p>
          </div>

          <div class="projects-grid">
            <div class="project-card">
              <h3>Bolsista de Extensão Tecnológica & Líder de Ciência de Dados</h3>
              <p class="project-period">FACEPE | Maio de 2025 – Presente</p>
              <p>
                Lidero a frente de Ciência de Dados no Projeto de Extensão Tecnológica 
                "Inteligência Artificial de Pré-diagnóstico para Auxiliar na Tomada de 
                Decisões em Teleconsultas no CISAM".
              </p>
            </div>
            <div class="project-card">
              <h3>Desenvolvedor Open Source & Mantenedor de Pacotes Python</h3>
              <p class="project-period">Maio de 2025 – Presente</p>
              <p>
                Desenvolvo, mantenho e publico pacotes Python de código aberto focados em 
                automação, IA e produtividade. Projeto em destaque: Handmark - ferramenta 
                CLI que converte anotações manuscritas em Markdown usando IA multimodal e OCR.
              </p>
            </div>
            <div class="project-card">
              <h3>Monitor de Linguagem de Programação Imperativa (C)</h3>
              <p class="project-period">Universidade de Pernambuco | Março de 2025 – Presente</p>
              <p>
                Ministro aulas sobre conceitos fundamentais da linguagem C, incluindo 
                alocação dinâmica de memória, ponteiros, structs, compilação e otimização. 
                Presto consultoria em projetos com GCC, CMake e aplicações GTK para Linux e Windows.
              </p>
            </div>
          </div>

          <div class="latest-projects">
            <h3>Formação Acadêmica & Certificações</h3>
            <p>
              <strong>Bacharelado em Engenharia da Computação</strong> - Universidade de Pernambuco (UPE)<br>
              Abril de 2024 – Dezembro de 2028 (previsão)<br><br>
              
              <strong>Certificações:</strong> CS50's Introduction to Computer Science (Harvard), 
              Figma for Developers v2, API Rest, Lógica de programação básica com Javascript<br><br>
              
              <strong>Idiomas:</strong> Português (Nativo), Inglês (Profissional)
            </p>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="featured-projects-section">
        <div class="container">
          <div class="projects-header">
            <h2>Projetos em Destaque</h2>
            <p>
              Alguns dos meus principais projetos de código aberto e desenvolvimento
            </p>
          </div>

          <div class="projects-grid">
            <div class="project-card">
              <div class="project-header">
                <h3>Handmark</h3>
                <div class="project-links">
                  <a href="https://github.com/devgabrielsborges/handmark" target="_blank" class="project-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://pypi.org/project/handmark/" target="_blank" class="project-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <p class="project-description">
                Ferramenta CLI que converte anotações manuscritas em Markdown usando IA multimodal e OCR. 
                Processamento de imagens com Python e integração com modelos de linguagem.
              </p>
              <div class="project-tech">
                <span class="tech-tag">Python</span>
                <span class="tech-tag">AI/ML</span>
                <span class="tech-tag">OCR</span>
                <span class="tech-tag">CLI</span>
              </div>
            </div>

            <div class="project-card">
              <div class="project-header">
                <h3>X-Bot</h3>
                <div class="project-links">
                  <a href="https://github.com/devgabrielsborges/x-bot" target="_blank" class="project-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <p class="project-description">
                X-Bot é um bot de automação para o Twitter/X que publica tweets promocionais usando dados armazenados no Firebase, gera textos com inteligência artificial por meio do Groq Cloud e envia notificações por SMS usando a API do Twilio.
              </p>
              <div class="project-tech">
                <span class="tech-tag">Python</span>
                <span class="tech-tag">IA</span>
                <span class="tech-tag">Twilio</span>
              </div>
            </div>

            <div class="project-card">
              <div class="project-header">
                <h3>Dashborges</h3>
                <div class="project-links">
                  <a href="https://github.com/devgabrielsborge/dashborges" target="_blank" class="project-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <p class="project-description">
                DashBorges é uma poderosa ferramenta de painel financeiro desenvolvida em Python que permite aos usuários acompanhar, analisar e visualizar dados financeiros pessoais. Construída com Streamlit e FastAPI, ela oferece uma interface intuitiva e eficiente para gestão financeira.
              </p>
              <div class="project-tech">
                <span class="tech-tag">Python</span>
                <span class="tech-tag">FastAPI</span>
                <span class="tech-tag">Streamlit</span>
              </div>
            </div>
          </div>

          <div class="projects-header">
            <h2>Projetos Recentes</h2>
            <p>
              Últimos projetos em andamento
            </p>
          </div>

          <div class="projects-grid">
            <div class="project-card">
              <div class="project-header">
                <h3>autorriculum</h3>
                <div class="project-links">
                  <a href="https://github.com/devgabrielsborges/autorriculum" target="_blank" class="project-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <p class="project-description">
                Aplicativo baseado em LLM para criação de currículos (CVs) a partir do seu perfil do GitHub e LinkedIn.
              </p>
              <div class="project-tech">
                <span class="tech-tag">Python</span>
                <span class="tech-tag">Automation</span>
                <span class="tech-tag">GitHub</span>
                <span class="tech-tag">LLM</span>
              </div>
            </div>
            <div class="project-card">
              <div class="project-header">
                <h3>mcp-fl</h3>
                <div class="project-links">
                  <a href="https://github.com/devgabrielsborges/mcp-fl" target="_blank" class="project-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <p class="project-description">
                Integração do Model Context Protocol para Aprendizado Federado Escalável.
              </p>
              <div class="project-tech">
                <span class="tech-tag">Python</span>
                <span class="tech-tag">Open Source</span>
                <span class="tech-tag">Federated Learning</span>
                <span class="tech-tag">MCP</span>
              </div>
            </div>
            <div class="project-card">
              <div class="project-header">
                <h3>Carpenter</h3>
                <div class="project-links">
                  <a href="https://github.com/devgabrielsborges/carpenter" target="_blank" class="project-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <p class="project-description">
                Carpenter é uma ferramenta de raspagem de vagas que extrai listas de empregos dos sites Jobrapido e Glassdoor. Ela permite que os usuários busquem por cargos e exportem os resultados.
              </p>
              <div class="project-tech">
                <span class="tech-tag">Python</span>
                <span class="tech-tag">Open Source</span>
                <span class="tech-tag">Automation</span>
                <span class="tech-tag">Web Scraping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="experience-section">
        <div class="container">
                    <div class="experience-card">
            <h2>Sobre Mim</h2>
            <p>
              Desenvolvedor apaixonado por tecnologia desde os 11 anos, quando comecei programando interfaces web 
              pela Khan Academy. Hoje, combino expertise técnica em múltiplas linguagens com experiência prática 
              em projetos de impacto social e desenvolvimento de código aberto.
            </p>
            <p>
              Minha jornada inclui liderança em projetos de IA para saúde, desenvolvimento de ferramentas 
              open source publicadas no PyPI, e ensino de programação. Tenho forte experiência com Python, 
              Java, C e tecnologias modernas como Docker e ambientes Linux.
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section">
        <div class="container">
          <div class="contact-card">
            <h2>Vamos trabalhar juntos</h2>
            <p>
              Tem um projeto interessante em mente? Vamos colaborar e transformar suas 
              ideias em realidade. Estou sempre aberto para discutir novas oportunidades, 
              projetos de freelance e desafios tecnológicos.
            </p>
            <a href="mailto:dev.gabrielsborges@gmail.com" class="cta-button"
              >Entre em Contato</a
            >
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import heroImage from '/assets/hero.jpeg'

export default {
  name: "Home",
  data() {
    return {
      heroImage
    }
  },
  mounted() {
    // Add smooth scrolling behavior
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  },
};
</script>
