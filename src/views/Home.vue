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
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                ></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <!-- Email Icon -->
            <a href="mailto:gabrielsborges@ieee.org" class="nav-icon-link">
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
            <a href="/profile.pdf" target="_blank" class="nav-icon-link">
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
              <div v-if="cvLoading" class="loading-state">
                <p>📄 Carregando informações do CV...</p>
              </div>
              
              <div v-else-if="cvError" class="error-state">
                <p>⚠️ Erro ao carregar CV. Usando informações padrão.</p>
              </div>

              <template v-if="cvContent">
                <h2>{{ getPersonalInfo(cvContent.personal_info).name }}</h2>
                <p class="location"><strong>{{ getPersonalInfo(cvContent.personal_info).location }}</strong></p>
                <p class="contact-info">
                  <a :href="`https://linkedin.com/in/${getPersonalInfo(cvContent.personal_info).linkedin}`" target="_blank">
                    linkedin.com/in/{{ getPersonalInfo(cvContent.personal_info).linkedin }}
                  </a> | 
                  <a :href="`https://github.com/${getPersonalInfo(cvContent.personal_info).github}`" target="_blank">
                    github.com/{{ getPersonalInfo(cvContent.personal_info).github }}
                  </a>
                </p>
                
                <h3>Resumo Profissional</h3>
                <p>{{ getFormattedSummary(cvContent.summary) }}</p>
                
                <h3>Tecnologias & Ferramentas</h3>
                <div v-if="getSkillsArray(cvContent.skills).length > 0" class="skills-section">
                  <div class="skills-grid">
                    <span 
                      v-for="skill in getSkillsArray(cvContent.skills).slice(0, 12)" 
                      :key="skill" 
                      class="skill-tag"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>
                <p v-else>
                  <strong>Linguagens:</strong> Python, Java, JavaScript, C, Cython, HTML, CSS, SQL<br>
                  <strong>Ferramentas:</strong> Docker, Linux, Git, GitHub, ProcessingJS<br>
                  <strong>Competências:</strong> Desenvolvimento Open Source, Algoritmos, Web Scraping, IA, Automação, Sistemas Embarcados
                </p>

                <div v-if="cvContent.languages && cvContent.languages.length > 0" class="languages-section">
                  <h3>Idiomas</h3>
                  <div class="languages-grid">
                    <span 
                      v-for="lang in cvContent.languages" 
                      :key="lang.language" 
                      class="language-tag"
                    >
                      {{ lang.language }} ({{ lang.level }})
                    </span>
                  </div>
                </div>
              </template>

              <!-- Fallback content if CV is not loaded -->
              <template v-else>
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
              </template>
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
            <!-- Dynamic CV Experience -->
            <template v-if="cvContent && formatExperience(cvContent.experience).length > 0">
              <div 
                v-for="exp in formatExperience(cvContent.experience)" 
                :key="exp.title" 
                class="project-card"
              >
                <h3>{{ exp.title }}</h3>
                <p v-if="exp.company" class="project-company">{{ exp.company }}</p>
                <p v-if="exp.period" class="project-period">{{ exp.period }}</p>
                <p>{{ exp.description }}</p>
              </div>
            </template>

            <!-- Fallback experience entries -->
            <template v-else>
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
            </template>
          </div>

          <div class="latest-projects">
            <h3>Formação Acadêmica & Certificações</h3>
            
            <template v-if="cvContent && formatEducation(cvContent.education).length > 0">
              <div 
                v-for="edu in formatEducation(cvContent.education)" 
                :key="edu.title" 
                class="education-item"
              >
                <p>
                  <strong>{{ edu.title }}</strong>
                  <span v-if="edu.institution"> - {{ edu.institution }}</span><br>
                  <span v-if="edu.period">{{ edu.period }}</span>
                  <span v-if="edu.description"><br>{{ edu.description }}</span>
                </p>
              </div>
            </template>

            <!-- Fallback education content -->
            <template v-else>
              <p>
                <strong>Bacharelado em Engenharia da Computação</strong> - Universidade de Pernambuco (UPE)<br>
                Abril de 2024 – Dezembro de 2028 (previsão)<br><br>
                
                <strong>Certificações:</strong> CS50's Introduction to Computer Science (Harvard), 
                Figma for Developers v2, API Rest, Lógica de programação básica com Javascript<br><br>
                
                <strong>Idiomas:</strong> Português (Nativo), Inglês (Profissional)
              </p>
            </template>
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
                  <a href="https://github.com/devgabrielsborges/dashborges" target="_blank" class="project-link">
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
            <div 
              v-for="project in latestProjects" 
              :key="project.name" 
              class="project-card"
            >
              <div class="project-header">
                <h3>{{ project.name }}</h3>
                <div class="project-links">
                  <a :href="project.html_url" target="_blank" class="project-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a 
                    v-if="project.homepage" 
                    :href="project.homepage" 
                    target="_blank" 
                    class="project-link"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <p class="project-description">
                {{ project.description }}
              </p>
              <div class="project-tech">
                <span 
                  v-for="tag in project.techTags" 
                  :key="tag" 
                  class="tech-tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <!-- Fallback message if no projects loaded -->
            <div v-if="latestProjects.length === 0" class="project-card">
              <div class="project-header">
                <h3>Carregando projetos...</h3>
              </div>
              <p class="project-description">
                Os projetos mais recentes estão sendo carregados do GitHub.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Academic Works Section -->
      <section class="academic-works-section">
        <div class="container">
          <div class="projects-header">
            <h2>Trabalhos Acadêmicos</h2>
            <p>
              Publicações e trabalhos científicos desenvolvidos durante minha jornada acadêmica
            </p>
          </div>

          <div class="academic-works-grid">
            <div 
              v-for="paper in academicPapers" 
              :key="paper.id" 
              class="academic-paper-card"
            >
              <div class="paper-preview">
                <div class="pdf-preview-container">
                  <iframe 
                    :src="paper.pdfUrl + '#toolbar=0&navpanes=0&scrollbar=0'" 
                    class="pdf-preview"
                    frameborder="0"
                    scrolling="no"
                  ></iframe>
                  <div class="pdf-overlay">
                    <a :href="paper.pdfUrl" target="_blank" class="view-pdf-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10,9 9,9 8,9"></polyline>
                      </svg>
                      Ver PDF
                    </a>
                  </div>
                </div>
              </div>
              <div class="paper-info">
                <h3 class="paper-title">{{ paper.title }}</h3>
                <div class="paper-metadata">
                  <span v-if="paper.conference" class="paper-conference">{{ paper.conference }}</span>
                  <span v-if="paper.year" class="paper-year">{{ paper.year }}</span>
                </div>
                <div class="paper-status">
                  <span 
                    :class="['status-badge', `status-${paper.status}`]"
                  >
                    {{ paper.statusLabel }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Fallback message if no papers loaded -->
            <div v-if="academicPapers.length === 0" class="academic-paper-card">
              <div class="paper-info">
                <h3 class="paper-title">Carregando trabalhos acadêmicos...</h3>
                <p class="paper-description">
                  Os trabalhos acadêmicos estão sendo carregados.
                </p>
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
            
            <!-- Contact Form -->
            <form @submit.prevent="submitContactForm" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="name">Nome *</label>
                  <input
                    type="text"
                    id="name"
                    v-model="contactForm.name"
                    :class="{ 'error': formErrors.name }"
                    placeholder="Seu nome completo"
                    maxlength="100"
                    required
                  />
                  <span v-if="formErrors.name" class="error-message">{{ formErrors.name }}</span>
                </div>
                <div class="form-group">
                  <label for="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    v-model="contactForm.email"
                    :class="{ 'error': formErrors.email }"
                    placeholder="seu@email.com"
                    maxlength="254"
                    required
                  />
                  <span v-if="formErrors.email" class="error-message">{{ formErrors.email }}</span>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="company">Empresa/Organização</label>
                  <input
                    type="text"
                    id="company"
                    v-model="contactForm.company"
                    placeholder="Nome da sua empresa (opcional)"
                    maxlength="200"
                  />
                </div>
                <div class="form-group">
                  <label for="budget">Orçamento</label>
                  <select id="budget" v-model="contactForm.budget">
                    <option value="">Selecione (opcional)</option>
                    <option value="< R$ 5.000">< R$ 5.000</option>
                    <option value="R$ 5.000 - R$ 15.000">R$ 5.000 - R$ 15.000</option>
                    <option value="R$ 15.000 - R$ 30.000">R$ 15.000 - R$ 30.000</option>
                    <option value="R$ 30.000+">R$ 30.000+</option>
                    <option value="A definir">A definir</option>
                  </select>
                </div>
              </div>
              
              <div class="form-group">
                <label for="timeline">Prazo</label>
                <select id="timeline" v-model="contactForm.timeline">
                  <option value="">Selecione (opcional)</option>
                  <option value="Urgente (< 1 semana)">Urgente (< 1 semana)</option>
                  <option value="1-2 semanas">1-2 semanas</option>
                  <option value="1 mês">1 mês</option>
                  <option value="2-3 meses">2-3 meses</option>
                  <option value="3+ meses">3+ meses</option>
                  <option value="Flexível">Flexível</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="project">Descrição do Projeto *</label>
                <textarea
                  id="project"
                  v-model="contactForm.project"
                  :class="{ 'error': formErrors.project }"
                  placeholder="Descreva seu projeto, objetivos, tecnologias desejadas e qualquer detalhe relevante..."
                  rows="6"
                  maxlength="5000"
                  required
                ></textarea>
                <div class="character-count">{{ contactForm.project.length }}/5000</div>
                <span v-if="formErrors.project" class="error-message">{{ formErrors.project }}</span>
              </div>
              
              <button 
                type="submit" 
                class="cta-button"
                :disabled="isSubmitting"
                :class="{ 'loading': isSubmitting }"
              >
                <span v-if="!isSubmitting">Enviar Mensagem</span>
                <span v-else>Enviando...</span>
              </button>
              
              <div v-if="submitMessage" class="submit-message" :class="submitMessageType">
                {{ submitMessage }}
              </div>
            </form>
            
            <div class="contact-alternative">
              <p>Ou entre em contato diretamente:</p>
              <a href="mailto:gabrielsborges@ieee.org" class="email-link">gabrielsborges@ieee.org</a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Floating CTA Button -->
    <div 
      v-if="showFloatingButton" 
      class="floating-cta-container"
      :class="{ 'hidden': isInContactSection }"
    >
      <button 
        @click="scrollToContact"
        class="floating-cta-button"
        aria-label="Ir para seção de contato"
      >
        <span class="floating-cta-text">Vamos trabalhar juntos!</span>
        <svg 
          class="floating-cta-icon" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import heroImage from '/assets/hero.jpeg'
import { Client, Functions } from 'appwrite'
import { useCVContent } from '../lib/useCVContent.js'

const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID

console.log('Appwrite config:', { 
  endpoint: appwriteEndpoint, 
  projectId: appwriteProjectId,
  hasEndpoint: !!appwriteEndpoint,
  hasProjectId: !!appwriteProjectId
})

let client = null
let functions = null

if (appwriteEndpoint && appwriteProjectId) {
  client = new Client()
    .setEndpoint(appwriteEndpoint)
    .setProject(appwriteProjectId)
  functions = new Functions(client)
} else {
  console.warn('Appwrite environment variables are missing. Contact form will be disabled.')
}

export default {
  name: "Home",
  setup() {
    const {
      cvContent,
      loading: cvLoading,
      error: cvError,
      loadCVContent,
      formatExperience,
      formatEducation,
      getSkillsArray,
      getPersonalInfo,
      getFormattedSummary
    } = useCVContent()

    return {
      cvContent,
      cvLoading,
      cvError,
      loadCVContent,
      formatExperience,
      formatEducation,
      getSkillsArray,
      getPersonalInfo,
      getFormattedSummary
    }
  },
  data() {
    return {
      heroImage,
      latestProjects: [],
      academicPapers: [],
      showFloatingButton: false,
      isInContactSection: false,
      scrollThrottle: null,
      contactForm: {
        name: '',
        email: '',
        company: '',
        budget: '',
        timeline: '',
        project: ''
      },
      formErrors: {},
      isSubmitting: false,
      submitMessage: '',
      submitMessageType: ''
    }
  },
  methods: {
    throttledHandleScroll() {
      if (this.scrollThrottle) return;
      
      this.scrollThrottle = requestAnimationFrame(() => {
        this.handleScroll();
        this.scrollThrottle = null;
      });
    },
    
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      
      const experienceSection = document.querySelector('.projects-section');
      let hasReachedExperience = false;
      
      if (experienceSection) {
        const experienceRect = experienceSection.getBoundingClientRect();
        const experienceTop = experienceRect.top + scrollTop;
        
        hasReachedExperience = scrollTop + windowHeight > experienceTop + 150;
      }
      
      const contactSection = document.querySelector('.contact-section');
      let isInContact = false;
      
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        const contactTop = contactRect.top + scrollTop;
        const contactBottom = contactTop + contactRect.height;
        
        isInContact = scrollTop + windowHeight > contactTop - 150;
      }
      
      this.showFloatingButton = hasReachedExperience && !isInContact;
      this.isInContactSection = isInContact;
    },
    
    scrollToContact() {
      const contactSection = document.querySelector('.contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    },
    
    validateForm() {
      this.formErrors = {};
      
      if (!this.contactForm.name.trim()) {
        this.formErrors.name = 'Nome é obrigatório';
      } else if (this.contactForm.name.trim().length < 2) {
        this.formErrors.name = 'Nome deve ter pelo menos 2 caracteres';
      } else if (this.contactForm.name.trim().length > 100) {
        this.formErrors.name = 'Nome muito longo (máximo 100 caracteres)';
      }
      
      if (!this.contactForm.email.trim()) {
        this.formErrors.email = 'Email é obrigatório';
      } else {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(this.contactForm.email)) {
          this.formErrors.email = 'Por favor, insira um email válido';
        } else if (this.contactForm.email.length > 254) {
          this.formErrors.email = 'Email muito longo';
        }
      }
      
      if (!this.contactForm.project.trim()) {
        this.formErrors.project = 'Descrição do projeto é obrigatória';
      } else if (this.contactForm.project.trim().length < 10) {
        this.formErrors.project = 'Descrição deve ter pelo menos 10 caracteres';
      } else if (this.contactForm.project.trim().length > 5000) {
        this.formErrors.project = 'Descrição muito longa (máximo 5000 caracteres)';
      }
      
      return Object.keys(this.formErrors).length === 0;
    },
    
    async submitContactForm() {
      if (!this.validateForm()) {
        this.showMessage('Por favor, corrija os erros no formulário.', 'error');
        return;
      }
      
      if (!functions) {
        this.showMessage('Formulário de contato indisponível. Entre em contato diretamente via email: gabrielsborges@ieee.org', 'error');
        this.isSubmitting = false;
        return;
      }
      
      this.isSubmitting = true;
      this.submitMessage = '';
      
      try {
        console.log('Enviando formulário para Appwrite usando SDK...');
        
        const requestData = {
          name: this.contactForm.name.trim(),
          email: this.contactForm.email.trim().toLowerCase(),
          company: this.contactForm.company.trim(),
          budget: this.contactForm.budget,
          timeline: this.contactForm.timeline,
          project: this.contactForm.project.trim()
        };
        
        console.log('Dados do formulário:', requestData);
        
        const execution = await functions.createExecution(
          'contact-form',
          JSON.stringify(requestData),
          false,
          '/',
          'POST',
          { 'Content-Type': 'application/json' }
        );
        
        console.log('Execution result:', execution);
        
        if (execution.responseStatusCode === 200) {
          let functionResponse;
          try {
            functionResponse = JSON.parse(execution.responseBody);
          } catch (parseError) {
            console.error('Erro ao fazer parse da resposta:', parseError);
            console.log('Response body raw:', execution.responseBody);
            throw new Error('Resposta inválida do servidor');
          }
          
          if (functionResponse.success) {
            this.showMessage(functionResponse.message, 'success');
            this.resetForm();
          } else {
            this.showMessage(functionResponse.message || 'Erro ao enviar mensagem. Tente novamente.', 'error');
          }
        } else {
          console.error('Erro na execução:', execution);
          throw new Error(execution.errors || `Erro HTTP ${execution.responseStatusCode}`);
        }
        
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        
        let errorMessage = 'Erro ao enviar mensagem. ';
        
        if (error.name === 'AppwriteException') {
          if (error.code === 401) {
            errorMessage += 'Erro de autenticação. Tente novamente.';
          } else if (error.code === 404) {
            errorMessage += 'Função não encontrada. Verifique a configuração.';
          } else if (error.code === 403) {
            errorMessage += 'Acesso negado. Origem não autorizada.';
          } else {
            errorMessage += `Erro do servidor: ${error.message}`;
          }
        } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
          errorMessage += 'Problema de conexão com o servidor. Verifique sua internet.';
        } else {
          errorMessage += 'Tente novamente ou entre em contato diretamente via email.';
        }
        
        this.showMessage(errorMessage, 'error');
      } finally {
        this.isSubmitting = false;
      }
    },
    
    showMessage(message, type) {
      this.submitMessage = message;
      this.submitMessageType = type;
      
      if (type === 'success') {
        setTimeout(() => {
          this.submitMessage = '';
        }, 5000);
      }
    },
    
    resetForm() {
      this.contactForm = {
        name: '',
        email: '',
        company: '',
        budget: '',
        timeline: '',
        project: ''
      };
      this.formErrors = {};
    }
  },
  async mounted() {
    try {
      const response = await fetch('/latest-projects.json');
      if (response.ok) {
        this.latestProjects = await response.json();
      } else {
        console.warn('Could not load latest projects');
        this.latestProjects = [];
      }
    } catch (error) {
      console.error('Error loading latest projects:', error);
      this.latestProjects = [];
    }

    try {
      const response = await fetch('/academic-papers.json');
      if (response.ok) {
        this.academicPapers = await response.json();
      } else {
        console.warn('Could not load academic papers');
        this.academicPapers = [];
      }
    } catch (error) {
      console.error('Error loading academic papers:', error);
      this.academicPapers = [];
    }

    // Setup smooth scrolling
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

    window.addEventListener('scroll', this.throttledHandleScroll, { passive: true });
    this.handleScroll();
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.throttledHandleScroll);
    if (this.scrollThrottle) {
      cancelAnimationFrame(this.scrollThrottle);
    }
  },
};
</script>
