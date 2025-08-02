import { Client, Messaging, ID } from "node-appwrite";

// Validation helper
const validateContactForm = (data) => {
  const errors = [];

  if (!data.name || data.name.length < 2 || data.name.length > 100) {
    errors.push("Nome deve ter entre 2 e 100 caracteres");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Email inválido");
  }

  if (!data.project || data.project.length < 10 || data.project.length > 2000) {
    errors.push("Descrição do projeto deve ter entre 10 e 2000 caracteres");
  }

  if (data.company && data.company.length > 100) {
    errors.push("Nome da empresa deve ter no máximo 100 caracteres");
  }

  const validBudgets = [
    "under-1k",
    "1k-5k",
    "5k-10k",
    "10k-25k",
    "25k-plus",
    "discuss",
    "",
  ];
  if (data.budget && !validBudgets.includes(data.budget)) {
    errors.push("Orçamento inválido");
  }

  const validTimelines = [
    "asap",
    "1-month",
    "2-3-months",
    "3-6-months",
    "6-plus-months",
    "flexible",
    "",
  ];
  if (data.timeline && !validTimelines.includes(data.timeline)) {
    errors.push("Prazo inválido");
  }

  return errors;
};

// Budget and timeline labels
const budgetLabels = {
  "under-1k": "Até R$ 1.000",
  "1k-5k": "R$ 1.000 - R$ 5.000",
  "5k-10k": "R$ 5.000 - R$ 10.000",
  "10k-25k": "R$ 10.000 - R$ 25.000",
  "25k-plus": "Acima de R$ 25.000",
  discuss: "Prefiro discutir",
};

const timelineLabels = {
  asap: "O mais rápido possível",
  "1-month": "Até 1 mês",
  "2-3-months": "2-3 meses",
  "3-6-months": "3-6 meses",
  "6-plus-months": "Mais de 6 meses",
  flexible: "Flexível",
};

// Rate limiting helper (simple in-memory storage)
const rateLimitStore = new Map();

const checkRateLimit = (ip) => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }

  const requests = rateLimitStore.get(ip);

  // Remove old requests
  const validRequests = requests.filter((time) => now - time < windowMs);
  rateLimitStore.set(ip, validRequests);

  if (validRequests.length >= maxRequests) {
    return false;
  }

  validRequests.push(now);
  rateLimitStore.set(ip, validRequests);
  return true;
};

export default async ({ req, res, log, error }) => {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": process.env.FRONTEND_URL || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.json({ success: true }, 200, corsHeaders);
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.json(
      { success: false, message: "Método não permitido" },
      405,
      corsHeaders
    );
  }

  try {
    // Rate limiting
    const clientIP =
      req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "unknown";
    if (!checkRateLimit(clientIP)) {
      return res.json(
        {
          success: false,
          message: "Muitas tentativas de envio. Tente novamente em 15 minutos.",
        },
        429,
        corsHeaders
      );
    }

    // Parse request body
    let body;
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch (parseError) {
      return res.json(
        { success: false, message: "Dados inválidos no corpo da requisição" },
        400,
        corsHeaders
      );
    }

    // Validate input
    const validationErrors = validateContactForm(body);
    if (validationErrors.length > 0) {
      return res.json(
        {
          success: false,
          message: "Dados inválidos",
          details: validationErrors,
        },
        400,
        corsHeaders
      );
    }

    const { name, email, company, budget, timeline, project } = body;

    // Create email content
    const emailSubject = `🚀 Nova Proposta de Projeto - ${name}`;

    const emailBodyHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
        Nova Proposta de Projeto - ${name}
      </h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Informações do Cliente</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Empresa:</strong> ${company || "Não informado"}</p>
        <p><strong>Orçamento:</strong> ${
          budget ? budgetLabels[budget] : "Não informado"
        }</p>
        <p><strong>Prazo:</strong> ${
          timeline ? timelineLabels[timeline] : "Não informado"
        }</p>
      </div>
      
      <div style="background: #fff; padding: 20px; border: 2px solid #e5e5e5; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Descrição do Projeto</h3>
        <p style="white-space: pre-wrap;">${project}</p>
      </div>
      
      <div style="font-size: 12px; color: #666; border-top: 1px solid #e5e5e5; padding-top: 10px; margin-top: 20px;">
        <p><strong>Data/Hora:</strong> ${new Date().toLocaleString("pt-BR", {
          timeZone: "America/Recife",
        })}</p>
        <p><strong>IP:</strong> ${clientIP}</p>
        <p>Enviado através do formulário de contato do portfolio</p>
      </div>
    </div>
    `;

    // Initialize Appwrite client
    const client = new Client()
      .setEndpoint(
        process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
      )
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const messaging = new Messaging(client);

    // Send email using Appwrite Messaging
    try {
      await messaging.createEmail(
        ID.unique(),
        emailSubject,
        emailBodyHTML,
        [], // topics (empty for direct email)
        [], // users (empty for direct email)
        [], // targets (we'll use direct recipients)
        [], // cc
        [], // bcc
        [], // attachments
        false, // draft
        emailBodyHTML, // html content
        new Date(Date.now() + 30000).toISOString(), // schedule 30 seconds from now
        {
          email: process.env.RECIPIENT_EMAIL || "gabrielsborges@ieee.org",
          name: "Gabriel Borges",
        }
      );

      // Optional: Send confirmation email to client
      if (process.env.SEND_CONFIRMATION === "true") {
        const confirmationHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Obrigado pelo seu contato, ${name}!</h2>
          <p>Recebi sua proposta de projeto e entrarei em contato em breve.</p>
          <p>Resumo da sua mensagem:</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>Projeto:</strong> ${project.substring(0, 100)}${
          project.length > 100 ? "..." : ""
        }</p>
            <p><strong>Orçamento:</strong> ${
              budget ? budgetLabels[budget] : "Não informado"
            }</p>
            <p><strong>Prazo:</strong> ${
              timeline ? timelineLabels[timeline] : "Não informado"
            }</p>
          </div>
          <p>Atenciosamente,<br>Gabriel Borges</p>
        </div>
        `;

        await messaging.createEmail(
          ID.unique(),
          "Confirmação - Proposta de Projeto Recebida",
          confirmationHTML,
          [],
          [],
          [],
          [],
          [],
          [],
          false,
          confirmationHTML,
          new Date(Date.now() + 60000).toISOString(), // schedule 1 minute from now
          {
            email: email,
            name: name,
          }
        );
      }

      log(`Contact form submitted successfully by ${name} (${email})`);

      return res.json(
        {
          success: true,
          message:
            "Mensagem enviada com sucesso! Entrarei em contato em breve.",
        },
        200,
        corsHeaders
      );
    } catch (emailError) {
      error(`Email sending failed: ${emailError.message}`);
      return res.json(
        {
          success: false,
          message: "Erro ao enviar email. Tente novamente mais tarde.",
        },
        500,
        corsHeaders
      );
    }
  } catch (err) {
    error(`Unexpected error: ${err.message}`);
    return res.json(
      {
        success: false,
        message: "Erro interno do servidor. Tente novamente mais tarde.",
      },
      500,
      corsHeaders
    );
  }
};
