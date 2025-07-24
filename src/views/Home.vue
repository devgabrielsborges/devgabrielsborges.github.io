<template>
  <div>
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <a href="#" class="logo">gabrielsborges</a>
          <div class="nav-icons">
            <!-- GitHub Icon -->
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
            <!-- LinkedIn Icon -->
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
            <!-- Email Icon -->
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
            <!-- Resume Icon -->
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
              <h2>bio</h2>
              <p>
                I'm Gabriel Borges, a passionate full-stack developer with
                expertise in modern web technologies. I love creating beautiful,
                functional applications that solve real-world problems.
              </p>
            </div>
            <div class="hero-card">
              <h2>hero</h2>
              <p>
                Welcome to my digital space where creativity meets code. Explore
                my journey through innovative projects and cutting-edge
                solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="projects-section">
        <div class="container">
          <div class="projects-header">
            <h2>Featured Work</h2>
            <p>
              A collection of projects that showcase my skills and passion for
              development
            </p>
          </div>

          <div class="projects-grid">
            <div class="project-card">
              <h3>projects</h3>
              <p>
                E-commerce platform built with Vue.js and Node.js, featuring
                real-time inventory management and secure payment processing.
              </p>
            </div>
            <div class="project-card">
              <h3>projects</h3>
              <p>
                Mobile-first social media application with React Native,
                implementing real-time messaging and content sharing
                capabilities.
              </p>
            </div>
            <div class="project-card">
              <h3>projects</h3>
              <p>
                AI-powered analytics dashboard using Python and TensorFlow,
                providing intelligent insights for business decision-making.
              </p>
            </div>
          </div>

          <div class="latest-projects">
            <h3>latest projects</h3>
            <p>
              Stay tuned for my newest creations and experimental projects that
              push the boundaries of web development.
            </p>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="experience-section">
        <div class="container">
          <div class="experience-card">
            <h2>experience</h2>
            <p>
              Over 5 years of experience in full-stack development, working with
              startups and established companies to deliver high-quality web
              applications. Specialized in JavaScript ecosystems, cloud
              architecture, and agile development methodologies.
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section">
        <div class="container">
          <div class="contact-card">
            <h2>lets work together</h2>
            <p>
              Have an exciting project in mind? Let's collaborate and bring your
              ideas to life. I'm always open to discussing new opportunities and
              challenges.
            </p>
            <a href="mailto:gabriel@gabrielsborges.dev" class="cta-button"
              >Get In Touch</a
            >
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "Home",
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
