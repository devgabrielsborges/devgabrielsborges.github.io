import { ref, onMounted } from "vue";

export function useCVContent() {
  const cvContent = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const loadCVContent = async () => {
    try {
      loading.value = true;
      const response = await fetch("/cv-content.json");

      if (!response.ok) {
        throw new Error(`Failed to load CV content: ${response.statusText}`);
      }

      const data = await response.json();
      cvContent.value = data;
      error.value = null;
    } catch (err) {
      console.error("Error loading CV content:", err);
      error.value = err.message;
      cvContent.value = getDefaultContent();
    } finally {
      loading.value = false;
    }
  };

  const getDefaultContent = () => {
    return {
      personal_info: {
        name: "Gabriel Borges",
        location: "Recife, Pernambuco, Brasil",
        email: "gabrielsborges@ieee.org",
        github: "devgabrielsborges",
        linkedin: "devgabrielsborges",
      },
      summary:
        "Desenvolvedor de Código Aberto e estudante de Engenharia da Computação com sólida experiência em Python, Java e C. Atualmente, atuo como Líder de Ciência de Dados em um Projeto de Extensão Tecnológica (PET) e mantenho pacotes PyPI. Possuo familiaridade com ambientes Linux, conteinerização com Docker e desenvolvimento de soluções como freelancer em Sistemas Embarcados, Desenvolvimento Android, Web Scraping e Inteligência Artificial.",
      skills: [
        "Python",
        "Java",
        "JavaScript",
        "C",
        "Docker",
        "Linux",
        "Git",
        "GitHub",
      ],
      experience: [],
      education: [],
      languages: [
        { language: "Português", level: "Nativo" },
        { language: "Inglês", level: "Profissional" },
      ],
      last_updated: new Date().toISOString(),
    };
  };

  // Format experience for display
  const formatExperience = (experience) => {
    if (!experience || !Array.isArray(experience)) return [];

    return experience.map((exp) => ({
      title: exp.title || "Cargo não especificado",
      period: exp.period || "Período não especificado",
      description:
        exp.description || exp.details?.join(" ") || "Descrição não disponível",
      company: exp.company || "",
    }));
  };

  // Format education for display
  const formatEducation = (education) => {
    if (!education || !Array.isArray(education)) return [];

    return education.map((edu) => ({
      title: edu.title || "Curso não especificado",
      institution: edu.institution || "",
      period: edu.period || "Período não especificado",
      description: edu.description || edu.details?.join(" ") || "",
    }));
  };

  // Get skills as formatted array
  const getSkillsArray = (skills) => {
    if (!skills || !Array.isArray(skills)) return [];
    return skills.filter((skill) => skill && skill.trim().length > 0);
  };

  // Get personal info with fallbacks
  const getPersonalInfo = (personalInfo) => {
    const defaultInfo = getDefaultContent().personal_info;
    return {
      name: personalInfo?.name || defaultInfo.name,
      location: personalInfo?.location || defaultInfo.location,
      email: personalInfo?.email || defaultInfo.email,
      github: personalInfo?.github || defaultInfo.github,
      linkedin: personalInfo?.linkedin || defaultInfo.linkedin,
    };
  };

  // Get formatted summary
  const getFormattedSummary = (summary) => {
    if (!summary || summary.trim().length === 0) {
      return getDefaultContent().summary;
    }
    return summary;
  };

  onMounted(() => {
    loadCVContent();
  });

  return {
    cvContent,
    loading,
    error,
    loadCVContent,
    formatExperience,
    formatEducation,
    getSkillsArray,
    getPersonalInfo,
    getFormattedSummary,
  };
}
