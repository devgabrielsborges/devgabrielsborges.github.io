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
              ideias em realidade. Preencha o formulário abaixo e vamos discutir como 
              posso ajudar a tornar seu projeto uma realidade.
            </p>
            
            <form @submit.prevent="submitContactForm" class="contact-form">
              <div class="form-group">
                <label for="name">Nome *</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="contactForm.name" 
                  required 
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div class="form-group">
                <label for="email">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="contactForm.email" 
                  required 
                  placeholder="seu.email@exemplo.com"
                />
              </div>
              
              <div class="form-group">
                <label for="company">Empresa/Organização</label>
                <input 
                  type="text" 
                  id="company" 
                  v-model="contactForm.company" 
                  placeholder="Nome da sua empresa (opcional)"
                />
              </div>
              
              <div class="form-group">
                <label for="budget">Orçamento Estimado</label>
                <select id="budget" v-model="contactForm.budget">
                  <option value="">Selecione uma faixa</option>
                  <option value="under-1k">Até R$ 1.000</option>
                  <option value="1k-5k">R$ 1.000 - R$ 5.000</option>
                  <option value="5k-10k">R$ 5.000 - R$ 10.000</option>
                  <option value="10k-25k">R$ 10.000 - R$ 25.000</option>
                  <option value="25k-plus">Acima de R$ 25.000</option>
                  <option value="discuss">Prefiro discutir</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="timeline">Prazo do Projeto</label>
                <select id="timeline" v-model="contactForm.timeline">
                  <option value="">Selecione um prazo</option>
                  <option value="asap">O mais rápido possível</option>
                  <option value="1-month">Até 1 mês</option>
                  <option value="2-3-months">2-3 meses</option>
                  <option value="3-6-months">3-6 meses</option>
                  <option value="6-plus-months">Mais de 6 meses</option>
                  <option value="flexible">Flexível</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="project">Descreva seu Projeto *</label>
                <textarea 
                  id="project" 
                  v-model="contactForm.project" 
                  required 
                  rows="6"
                  placeholder="Conte-me sobre seu projeto: objetivos, tecnologias preferidas, funcionalidades principais, etc."
                ></textarea>
              </div>
              
              <button type="submit" class="cta-button" :disabled="isSubmitting">
                {{ isSubmitting ? 'Enviando...' : 'Enviar Proposta' }}
              </button>
            </form>
            
            <div class="contact-alternative">
              <p>Ou entre em contato diretamente:</p>
              <a href="mailto:gabrielsborges@ieee.org" class="email-link">
                gabrielsborges@ieee.org
              </a>
            </div>
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
      heroImage,
      isSubmitting: false,
      contactForm: {
        name: '',
        email: '',
        company: '',
        budget: '',
        timeline: '',
        project: ''
      }
    }
  },
  methods: {
    async submitContactForm() {
      this.isSubmitting = true;
      
      try {
        const formData = {
          name: this.contactForm.name.trim(),
          email: this.contactForm.email.trim(),
          company: this.contactForm.company.trim(),
          budget: this.contactForm.budget,
          timeline: this.contactForm.timeline,
          project: this.contactForm.project.trim()
        };

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/contact';
        
        const isAppwriteFunction = apiUrl.includes('appwrite.global') || apiUrl.includes('/functions/v1/functions/');
        
        const requestUrl = isAppwriteFunction 
          ? `${apiUrl}/executions`
          : apiUrl;                 
        
        const response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          this.resetForm();
          alert('✅ ' + result.message);
        } else {
          throw new Error(result.message || 'Erro ao enviar mensagem');
        }
        
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        
        // Check if it's a network error
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          alert('❌ Erro de conexão. Verifique sua internet e tente novamente.');
        } else {
          alert('❌ ' + (error.message || 'Erro ao enviar mensagem. Tente novamente.'));
        }
      } finally {
        this.isSubmitting = false;
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
