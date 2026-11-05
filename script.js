// Zorentiva Technologies website interactions.
// Replace YOUR_EMAILJS_PUBLIC_KEY with the Public Key from EmailJS > Account.
// Never put your Gmail password or private Google credentials in this file.
const CONTACT_EMAIL = "zorentivatech@gmail.com";
const EMAILJS_PUBLIC_KEY = "C2zN5G0OTlrKHcVMA";
const EMAILJS_SERVICE_ID = "service_b93kn8d";
const EMAILJS_TEMPLATE_ID = "template_bjh1sfa";

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const emailLink = document.getElementById("emailLink");
emailLink.href = `mailto:${CONTACT_EMAIL}`;
emailLink.textContent = CONTACT_EMAIL;

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (EMAILJS_PUBLIC_KEY === "YOUR_EMAILJS_PUBLIC_KEY") {
    formNote.textContent =
      "Setup needed: add your EmailJS Public Key in script.js before sending enquiries.";
    return;
  }

  if (!window.emailjs) {
    formNote.textContent =
      "Email service could not load. Check your internet connection and try again.";
    return;
  }

  const data = new FormData(contactForm);
  const templateParams = {
    name: String(data.get("name") || ""),
    email: String(data.get("email") || ""),
    service: String(data.get("service") || ""),
    message: String(data.get("message") || "")
  };

  const originalButtonText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.textContent = "Sending…";
  formNote.textContent = "Sending your enquiry…";

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
      publicKey: EMAILJS_PUBLIC_KEY
    });
    formNote.textContent =
      "Thank you! Your enquiry was sent successfully. We will get back to you soon.";
    contactForm.reset();
  } catch (error) {
    console.error("EmailJS send failed:", error);
    formNote.textContent =
      "Sorry, your enquiry could not be sent. Please email zorentivatech@gmail.com directly.";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
});


// Reveal service cards smoothly as they enter the viewport; keep other page sections visible.
document.querySelectorAll(".project-card, .process-grid > div, .about-copy, .about-visual, .contact-panel").forEach((item) => item.classList.add("is-visible"));
const serviceCards = document.querySelectorAll(".service-card");
if ("IntersectionObserver" in window) {
  const serviceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  serviceCards.forEach((card) => serviceObserver.observe(card));
} else {
  serviceCards.forEach((card) => card.classList.add("is-visible"));
}

// Service detail dialog: tools, project roadmap, and expected deliverables.
const serviceDetails = {
  website: {
    eyebrow: "01 / DIGITAL PRESENCE", title: "Website development",
    intro: "A clear, responsive website that introduces your business, explains your offer, and guides visitors toward an enquiry or action.",
    tools: ["HTML5", "CSS3", "JavaScript", "React (when suitable)", "Figma (design)", "Git / GitHub", "Netlify or similar hosting", "Basic SEO tools"],
    roadmap: [["Discover", "Agree on audience, goals, pages, and content."], ["Design", "Plan the page structure and visual direction."], ["Build & test", "Create responsive pages and test common screen sizes."], ["Launch", "Connect the domain, publish, and check the enquiry flow."]],
    deliverables: ["Responsive page layouts", "Contact or enquiry form", "Basic on-page SEO setup", "Launch and handover guidance"]
  },
  apps: {
    eyebrow: "02 / DIGITAL PRODUCTS", title: "Web applications",
    intro: "Custom dashboards, portals, booking workflows, and internal tools designed around the way your team works.",
    tools: ["React", "Node.js / Express", "MongoDB or PostgreSQL", "REST APIs", "Git / GitHub", "Figma", "Authentication libraries", "Hosting selected for the project"],
    roadmap: [["Map requirements", "Define users, roles, workflows, and must-have features."], ["Prototype", "Outline screens and data flow before development."], ["Develop & test", "Build the interface, backend, database, and validation."], ["Deploy & hand over", "Publish, explain usage, and plan future improvements."]],
    deliverables: ["Agreed feature list", "Responsive user interface", "Database and API integration where needed", "Basic testing and handover notes"]
  },
  cloud: {
    eyebrow: "03 / CLOUD & DELIVERY", title: "Cloud & deployment",
    intro: "Get your website or application published with a practical deployment setup. The hosting approach is chosen to fit the project rather than forcing one platform on every client.",
    tools: ["Netlify or Vercel", "AWS (when suitable)", "GitHub", "DNS and domain settings", "Environment variables", "Docker (if required)", "CI/CD workflows (if required)", "Basic uptime checks"],
    roadmap: [["Review", "Check the app, domain, assets, and deployment needs."], ["Choose hosting", "Compare cost, traffic, support, and technical needs."], ["Configure & publish", "Set environment settings, domain, and deployment."], ["Verify", "Test links, mobile layout, forms, and HTTPS."]],
    deliverables: ["Published website or app", "Domain/DNS guidance", "Deployment configuration", "Launch verification checklist"]
  },
  support: {
    eyebrow: "04 / CONTINUITY", title: "Support & improvement",
    intro: "Keep an existing website or application healthy with agreed updates, fixes, small improvements, and practical technical guidance.",
    tools: ["Git / GitHub", "Browser developer tools", "Lighthouse", "Error logs", "Analytics (if configured)", "Hosting dashboard", "Backup tools", "Issue tracker"],
    roadmap: [["Inspect", "Review the current site and list the main issues."], ["Prioritize", "Agree on urgency, scope, and what is included."], ["Fix & improve", "Apply changes and test affected pages and features."], ["Report back", "Summarize completed work and suggest next steps."]],
    deliverables: ["Issue review", "Agreed fixes or updates", "Basic performance/accessibility checks", "Change summary and recommendations"]
  }
};
const serviceDialog = document.getElementById("serviceDetails");
if (serviceDialog) {
  const closeDialog = serviceDialog.querySelector(".dialog-close");
  const title = document.getElementById("serviceDialogTitle");
  const eyebrow = document.getElementById("serviceDialogEyebrow");
  const intro = document.getElementById("serviceDialogIntro");
  const tools = document.getElementById("serviceDialogTools");
  const roadmap = document.getElementById("serviceDialogRoadmap");
  const deliverables = document.getElementById("serviceDialogDeliverables");
  const dialogCta = document.getElementById("serviceDialogCta");
  document.querySelectorAll(".service-details-trigger").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const item = serviceDetails[trigger.dataset.service];
      if (!item) return;
      eyebrow.textContent = item.eyebrow;
      title.textContent = item.title;
      intro.textContent = item.intro;
      document.querySelector("#serviceDetails .dialog-block h3").textContent = "Tools we may use";
      document.querySelector("#serviceDetails .dialog-columns .dialog-block:nth-child(2) h3").textContent = "Project roadmap";
      document.querySelector("#serviceDetails .dialog-deliverables h3").textContent = "What you can receive";
      dialogCta.innerHTML = 'Discuss this service <span>↗</span>';
      tools.replaceChildren(...item.tools.map((tool) => { const chip = document.createElement("span"); chip.textContent = tool; return chip; }));
      roadmap.replaceChildren(...item.roadmap.map(([heading, detail]) => { const li = document.createElement("li"); const b = document.createElement("b"); b.textContent = heading; li.append(b, document.createTextNode(detail)); return li; }));
      deliverables.replaceChildren(...item.deliverables.map((value) => { const li = document.createElement("li"); li.textContent = value; return li; }));
      const serviceSelect = document.getElementById("service");
      if (serviceSelect) {
        const matching = [...serviceSelect.options].find((option) => option.textContent.toLowerCase().includes(item.title.toLowerCase().split(" ")[0]));
        if (matching) dialogCta.dataset.serviceValue = matching.value || matching.textContent;
        else dialogCta.dataset.serviceValue = item.title;
      }
      if (typeof serviceDialog.showModal === "function") serviceDialog.showModal();
      else serviceDialog.setAttribute("open", "open");
    });
  });
  closeDialog.addEventListener("click", () => serviceDialog.close ? serviceDialog.close() : serviceDialog.removeAttribute("open"));
  serviceDialog.addEventListener("click", (event) => { if (event.target === serviceDialog) serviceDialog.close(); });
  dialogCta.addEventListener("click", () => {
    const select = document.getElementById("service");
    if (select) {
      const value = dialogCta.dataset.serviceValue;
      const option = [...select.options].find((item) => item.textContent === value || item.value === value);
      if (option) select.value = option.value || option.textContent;
    }
    if (serviceDialog.close) serviceDialog.close(); else serviceDialog.removeAttribute("open");
  });
}

// Let visitors open service details by selecting anywhere on a service card.
document.querySelectorAll(".service-card[data-service]").forEach((card) => {
  const openDetails = () => {
    const trigger = card.querySelector(".service-details-trigger");
    if (trigger) trigger.click();
  };
  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    openDetails();
  });
  card.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target === card) {
      event.preventDefault();
      openDetails();
    }
  });
});



// Clickable "How we work" cards: explain each phase with practical, client-facing detail.
const workStepDialog = document.getElementById("serviceDetails");
const workStepTitle = document.getElementById("serviceDialogTitle");
const workStepEyebrow = document.getElementById("serviceDialogEyebrow");
const workStepIntro = document.getElementById("serviceDialogIntro");
const workStepTools = document.getElementById("serviceDialogTools");
const workStepRoadmap = document.getElementById("serviceDialogRoadmap");
const workStepDeliverables = document.getElementById("serviceDialogDeliverables");
const workStepCta = document.getElementById("serviceDialogCta");
const workStepDetails = {
  discover: {
    eyebrow: "01 / DISCOVERY & SCOPE",
    title: "Understand the goal",
    intro: "We start by understanding the business outcome you want—not by jumping straight into code. This helps define a useful, realistic project before time and budget are committed.",
    tools: ["Initial consultation", "Requirement notes", "Audience and user needs", "Competitor and reference review", "Scope checklist"],
    roadmap: [
      ["Listen", "Discuss your idea, business context, target audience, and current challenges."],
      ["Clarify", "Identify the key user journeys, must-have features, and success criteria."],
      ["Define scope", "Agree on pages or features, assumptions, dependencies, and priorities."],
      ["Plan next steps", "Share a proposed approach, estimated timeline, and the information needed to begin."]
    ],
    deliverables: ["Written project brief and agreed scope", "Prioritized requirements", "Initial timeline and milestones", "Clear list of client-provided content or access needed"]
  },
  design: {
    eyebrow: "02 / EXPERIENCE & DEVELOPMENT",
    title: "Design with purpose",
    intro: "We turn the agreed scope into a clear digital experience. Layout, content structure, visual design, and technology choices are considered together so the result is useful, accessible, and appropriate for the project.",
    tools: ["Page and user-flow planning", "Wireframes or design references", "Responsive HTML and CSS", "JavaScript or React where suitable", "Git-based version control"],
    roadmap: [
      ["Structure", "Organize pages, navigation, content, and important user actions."],
      ["Design", "Set the visual direction, responsive layouts, and reusable interface elements."],
      ["Develop", "Build the agreed pages or features in manageable stages."],
      ["Review", "Share progress, collect feedback, and refine within the agreed scope."]
    ],
    deliverables: ["Approved page or feature structure", "Responsive interface", "Implemented agreed functionality", "Progress reviews and revision notes"]
  },
  launch: {
    eyebrow: "03 / QUALITY & HANDOVER",
    title: "Launch with confidence",
    intro: "Before handover, we check the important journeys and make sure you understand how to use and manage the delivered work. Launch is treated as a planned step, not just a publish button.",
    tools: ["Responsive browser checks", "Form and link testing", "Basic accessibility review", "Performance checks", "Hosting and domain configuration"],
    roadmap: [
      ["Test", "Check key pages, navigation, forms, and agreed features across common screen sizes."],
      ["Resolve", "Fix issues found during the agreed review and confirm final approval."],
      ["Publish", "Deploy to the selected hosting and verify the live website or application."],
      ["Handover", "Explain access, important settings, and practical next steps for maintenance."]
    ],
    deliverables: ["Tested and published agreed deliverables", "Handover notes and usage guidance", "Domain or hosting setup guidance", "Recommended next steps and support options"]
  }
};
document.querySelectorAll(".work-value-card[data-work-step]").forEach((card) => {
  const openStep = () => {
    const item = workStepDetails[card.dataset.workStep];
    if (!item || !workStepDialog) return;
    workStepEyebrow.textContent = item.eyebrow;
    workStepTitle.textContent = item.title;
    workStepIntro.textContent = item.intro;
    document.querySelector("#serviceDetails .dialog-block h3").textContent = "What this phase involves";
    document.querySelector("#serviceDetails .dialog-columns .dialog-block:nth-child(2) h3").textContent = "Typical process";
    document.querySelector("#serviceDetails .dialog-deliverables h3").textContent = "What you can expect";
    workStepCta.innerHTML = 'Discuss your project <span>↗</span>';
    workStepCta.dataset.serviceValue = "";
    workStepTools.replaceChildren(...item.tools.map((value) => { const chip = document.createElement("span"); chip.textContent = value; return chip; }));
    workStepRoadmap.replaceChildren(...item.roadmap.map(([heading, detail]) => { const li = document.createElement("li"); const b = document.createElement("b"); b.textContent = heading; li.append(b, document.createTextNode(detail)); return li; }));
    workStepDeliverables.replaceChildren(...item.deliverables.map((value) => { const li = document.createElement("li"); li.textContent = value; return li; }));
    if (typeof workStepDialog.showModal === "function") workStepDialog.showModal();
    else workStepDialog.setAttribute("open", "open");
  };
  card.addEventListener("click", openStep);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openStep();
    }
  });
});

// Interactive portfolio concept filters and detail panels.
const portfolioFilters = document.querySelectorAll('.portfolio-filter');
const portfolioCards = document.querySelectorAll('.project-interactive');
portfolioFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    portfolioFilters.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    portfolioCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.kind !== filter;
    });
  });
});

const projectConcepts = {
  restaurant: {
    eyebrow: 'WEBSITE CONCEPT · HOSPITALITY',
    title: 'Restaurant & hospitality website',
    intro: 'A warm, visual-first website concept for restaurants, cafés, bakeries, and hospitality brands. The goal is to make the menu easy to explore and the next step obvious.',
    features: ['Menu and signature items', 'Mobile-friendly layout', 'Location and opening hours', 'Reservation or enquiry path', 'Brand story and gallery'],
    tools: ['HTML & CSS', 'JavaScript', 'Responsive UI', 'Optional CMS'],
    roadmap: [['Discover','Understand the brand, audience, menu, and key customer actions.'],['Design','Plan the page structure and visual direction.'],['Build','Create responsive pages and test across screen sizes.'],['Launch','Connect the domain, check forms, and hand over the site.']],
    service: 'Website development',
    liveDemo: 'https://zorentivatech.github.io/restaurant-website-demo/'
  },
  dashboard: {
    eyebrow: 'APPLICATION CONCEPT · BUSINESS',
    title: 'Business dashboard',
    intro: 'A dashboard concept that brings important metrics and daily workflows into one organized workspace. Final features and data connections depend on your requirements.',
    features: ['At-a-glance metrics', 'Charts and activity views', 'Role-based screens', 'Search and data tables', 'API and database integration'],
    tools: ['React', 'Node.js', 'REST APIs', 'PostgreSQL or MongoDB'],
    roadmap: [['Map workflows','Identify users, data sources, and the decisions the dashboard should support.'],['Prototype','Agree on screens, permissions, and navigation.'],['Develop','Build the interface, APIs, and data handling.'],['Validate','Test access, data accuracy, responsiveness, and deployment.']],
    service: 'Web application'
  },
  campus: {
    eyebrow: 'PORTAL CONCEPT · EDUCATION',
    title: 'Student & campus portal',
    intro: 'A portal concept for schools, colleges, and training organizations that want a clearer way to share updates and manage common student requests.',
    features: ['Announcements and notices', 'Student request forms', 'Role-based dashboards', 'Status tracking for requests', 'Centralized information pages'],
    tools: ['React', 'Spring Boot or Node.js', 'PostgreSQL', 'Authentication'],
    roadmap: [['Understand roles','Map student, faculty, and administrator needs.'],['Define modules','Prioritize requests, notices, and status tracking.'],['Build securely','Implement permissions, data models, and screens.'],['Pilot and improve','Test with representative users and refine the workflow.']],
    service: 'Web application'
  },
  commerce: {
    eyebrow: 'WEBSITE CONCEPT · COMMERCE',
    title: 'Online store concept',
    intro: 'A product-focused storefront concept for small brands that need to present their catalogue clearly and guide shoppers toward an enquiry or purchase.',
    features: ['Product catalogue and categories', 'Product detail pages', 'Search and filters', 'Cart or enquiry flow', 'Mobile-first shopping experience'],
    tools: ['HTML, CSS & JavaScript', 'React', 'Commerce platform integration', 'Payment provider integration if required'],
    roadmap: [['Plan catalogue','Organize products, categories, and customer journey.'],['Design storefront','Create a consistent product and brand experience.'],['Build shopping flow','Implement catalogue, cart or enquiry, and integrations.'],['Test and launch','Verify mobile usability, forms, checkout integrations, and domain.']],
    service: 'Website development'
  }
};
const projectDialog = document.getElementById('projectDetails');
if (projectDialog) {
  const projectClose = projectDialog.querySelector('.project-dialog-close');
  const projectCta = document.getElementById('projectDialogCta');
  const renderProject = (key) => {
    const item = projectConcepts[key];
    if (!item) return;
    document.getElementById('projectDialogEyebrow').textContent = item.eyebrow;
    document.getElementById('projectDialogTitle').textContent = item.title;
    document.getElementById('projectDialogIntro').textContent = item.intro;
    const features = document.getElementById('projectDialogFeatures');
    features.replaceChildren(...item.features.map((feature) => { const li = document.createElement('li'); li.textContent = feature; return li; }));
    const tools = document.getElementById('projectDialogTools');
    tools.replaceChildren(...item.tools.map((tool) => { const chip = document.createElement('span'); chip.textContent = tool; return chip; }));
    const roadmap = document.getElementById('projectDialogRoadmap');
    roadmap.replaceChildren(...item.roadmap.map(([title, detail]) => { const li = document.createElement('li'); const b = document.createElement('b'); b.textContent = title; const span = document.createElement('span'); span.textContent = detail; li.append(b, span); return li; }));
    projectCta.dataset.serviceValue = item.service;
    projectCta.href = '#contact';
    if (projectDialog.showModal) projectDialog.showModal(); else projectDialog.setAttribute('open', '');
  };
  portfolioCards.forEach((card) => {
    const open = () => renderProject(card.dataset.project);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
    });
  });
  projectClose.addEventListener('click', () => projectDialog.close ? projectDialog.close() : projectDialog.removeAttribute('open'));
  projectDialog.addEventListener('click', (event) => { if (event.target === projectDialog) projectDialog.close(); });
  projectCta.addEventListener('click', () => {
    const select = document.getElementById('service');
    if (select) {
      const value = projectCta.dataset.serviceValue;
      const option = [...select.options].find((item) => item.textContent === value || item.value === value);
      if (option) select.value = option.value || option.textContent;
    }
    if (projectDialog.close) projectDialog.close(); else projectDialog.removeAttribute('open');
  });
}

// Soft blue-cyan-purple glow that follows the visitor's cursor on desktop.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const aura = document.createElement('div');
  aura.className = 'cursor-aura';
  aura.setAttribute('aria-hidden', 'true');
  const dot = document.createElement('div');
  dot.className = 'cursor-aura-dot';
  dot.setAttribute('aria-hidden', 'true');
  document.body.append(aura, dot);
  let frame = 0;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let auraX = pointerX;
  let auraY = pointerY;
  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    aura.classList.add('is-active');
    dot.classList.add('is-active');
    dot.style.left = `${pointerX}px`;
    dot.style.top = `${pointerY}px`;
    if (!frame) frame = requestAnimationFrame(moveAura);
  }, { passive: true });
  function moveAura() {
    auraX += (pointerX - auraX) * 0.16;
    auraY += (pointerY - auraY) * 0.16;
    aura.style.left = `${auraX}px`;
    aura.style.top = `${auraY}px`;
    if (Math.abs(pointerX - auraX) + Math.abs(pointerY - auraY) > 0.5) {
      frame = requestAnimationFrame(moveAura);
    } else {
      frame = 0;
    }
  }
  document.addEventListener('pointerleave', () => {
    aura.classList.remove('is-active');
    dot.classList.remove('is-active');
  });
}


// Open the founder profile in the same detail dialog style used by service cards.
const founderCard = document.getElementById("founderProfileCard");
const founderDialog = document.getElementById("serviceDetails");
if (founderCard && founderDialog) {
  const openFounderProfile = () => {
    document.getElementById("serviceDialogEyebrow").textContent = "MEET THE FOUNDER";
    document.getElementById("serviceDialogTitle").textContent = "Pirla Rohit Satya Naga Swamy";
    document.getElementById("serviceDialogIntro").textContent =
      "Founder of Zorentiva Technologies — passionate about technology, creativity, and turning practical ideas into meaningful digital experiences.";
    const tools = document.getElementById("serviceDialogTools");
    tools.replaceChildren(...["Founder & Technology Enthusiast", "Kakinada, Andhra Pradesh", "Vision & Strategy", "Client Relationships"].map((value) => {
      const chip = document.createElement("span"); chip.textContent = value; return chip;
    }));
    const roadmap = document.getElementById("serviceDialogRoadmap");
    const founderSections = [
      ["My vision", "Building a technology company focused on useful, thoughtful digital solutions."],
      ["My approach", "Continuous learning, honest communication, and understanding each client's goals."],
      ["My focus", "Modern websites, practical web applications, and digital experiences that help businesses grow."]
    ];
    roadmap.replaceChildren(...founderSections.map(([heading, detail]) => {
      const li = document.createElement("li"); const b = document.createElement("b");
      b.textContent = heading; li.append(b, document.createTextNode(detail)); return li;
    }));
    document.querySelector("#serviceDetails .dialog-block h3").textContent = "Founder at a glance";
    document.querySelector("#serviceDetails .dialog-columns .dialog-block:nth-child(2) h3").textContent = "About me";
    document.querySelector("#serviceDetails .dialog-deliverables h3").textContent = "A note from the founder";
    const deliverables = document.getElementById("serviceDialogDeliverables");
    deliverables.replaceChildren(...[
      "I started Zorentiva Technologies with a passion for technology, creativity, and solving real-world problems.",
      "My goal is to create modern websites and practical digital solutions that help people and businesses move forward.",
      "I believe every good project begins with listening, clear planning, and a strong working relationship."
    ].map((value) => { const li = document.createElement("li"); li.textContent = value; return li; }));
    const cta = document.getElementById("serviceDialogCta");
    cta.innerHTML = 'Connect with the founder <span>↗</span>';
    cta.dataset.serviceValue = "Founder profile";
    if (founderDialog.showModal) founderDialog.showModal();
    else founderDialog.setAttribute("open", "open");
  };
  founderCard.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    openFounderProfile();
  });
  founderCard.addEventListener("keydown", (event) => {
    if (event.target !== founderCard) return;
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openFounderProfile(); }
  });
}
