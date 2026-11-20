
"use strict";

/* =========================================
   1. DEMONSTRATION DATA
========================================= */

const companies = [
  { name:"Google", industry:"Technology", initials:"G", location:"Global", roles:["Software Engineer","Intern"], description:"Technology, software engineering and cloud-related opportunities.", topics:["Data Structures","Algorithms","Problem Solving","System Design"] },
  { name:"Microsoft", industry:"Technology", initials:"M", location:"Global", roles:["Software Engineer","Intern"], description:"Software development, cloud computing and AI opportunities.", topics:["DSA","OOP","Operating Systems","Projects"] },
  { name:"Amazon", industry:"Technology", initials:"A", location:"Global", roles:["Software Engineer","Intern"], description:"Software development, cloud and distributed systems roles.", topics:["DSA","Problem Solving","System Design","Leadership"] },
  { name:"Deloitte", industry:"Consulting", initials:"D", location:"India", roles:["Analyst"], description:"Consulting, technology and business analyst opportunities.", topics:["Aptitude","Communication","SQL","Programming"] },
  { name:"Goldman Sachs", industry:"Finance", initials:"GS", location:"Global", roles:["Analyst"], description:"Financial services, engineering and analyst opportunities.", topics:["Programming","Problem Solving","Aptitude","Finance"] },
  { name:"Adobe", industry:"Technology", initials:"AD", location:"Global", roles:["Software Engineer","Intern"], description:"Software products, digital experiences and engineering roles.", topics:["DSA","OOP","Coding","Projects"] }
];

const experiences = [
  { id:1, company:"Google", role:"Software Engineer", outcome:"Selected", rounds:["Online Assessment","DSA Interview","Technical Interview","HR"], description:"Illustrative example of a multi-round software engineering interview.", source:"Demonstration record", verification:"Sample" },
  { id:2, company:"Microsoft", role:"Software Engineer", outcome:"Selected", rounds:["Coding Round","Technical Interview","Project Discussion","HR"], description:"Illustrative example covering coding, technical concepts and projects.", source:"Demonstration record", verification:"Sample" },
  { id:3, company:"Amazon", role:"Software Engineer", outcome:"Not Selected", rounds:["Online Assessment","DSA","Leadership Principles"], description:"Illustrative example of an assessment and technical interview process.", source:"Demonstration record", verification:"Sample" },
  { id:4, company:"Deloitte", role:"Analyst", outcome:"Selected", rounds:["Aptitude","Technical","Communication","HR"], description:"Illustrative example of an analyst recruitment process.", source:"Demonstration record", verification:"Sample" },
  { id:5, company:"Adobe", role:"Intern", outcome:"Selected", rounds:["Coding Test","Technical Interview","Managerial Round"], description:"Illustrative example of an internship interview.", source:"Demonstration record", verification:"Sample" },
  { id:6, company:"Goldman Sachs", role:"Analyst", outcome:"Not Selected", rounds:["Aptitude","Technical","Interview"], description:"Illustrative example of an analyst recruitment process.", source:"Demonstration record", verification:"Sample" },
  { id:7, company:"Google", role:"Intern", outcome:"Selected", rounds:["Coding","Technical","Project Discussion"], description:"Illustrative example of an internship hiring process.", source:"Demonstration record", verification:"Sample" },
  { id:8, company:"Amazon", role:"Intern", outcome:"Not Selected", rounds:["Online Assessment","Technical Interview"], description:"Illustrative example of a technical internship process.", source:"Demonstration record", verification:"Sample" }
];

const updates = [
  { title:"Placement preparation resources", description:"Review company-specific preparation topics and organise your study plan.", type:"General Guidance", icon:"▤" },
  { title:"Interview experience submissions", description:"Students can contribute their placement experiences to help future candidates.", type:"Community Update", icon:"✎" },
  { title:"Resume preparation reminder", description:"Keep your resume updated with relevant skills and project contributions.", type:"Preparation Reminder", icon:"▧" },
  { title:"Placement information", description:"Check official placement-cell announcements for confirmed recruitment details.", type:"Information", icon:"◷" }
];

const taskGroups = {
  dsaTasks: [
    "Arrays and Strings",
    "Linked Lists",
    "Stacks and Queues",
    "Trees and Binary Search Trees",
    "Graphs and Traversals",
    "Dynamic Programming",
    "Sorting and Searching",
    "Greedy Algorithms"
  ],
  coreTasks: [
    "Object-Oriented Programming",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "SQL and Query Practice"
  ],
  developmentTasks: [
    "Build a full-stack project",
    "Complete a database-backed application",
    "Understand API development",
    "Deploy a working project",
    "Document project architecture"
  ],
  interviewTasks: [
    "Prepare a technical resume",
    "Practise explaining projects",
    "Complete mock interviews",
    "Practise communication skills",
    "Prepare behavioural answers"
  ]
};

const STORAGE = {
  theme: "beyondTheme",
  questions: "beyondQuestions",
  checklist: "beyondChecklist"
};


/* =========================================
   2. SMALL UTILITIES
========================================= */

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  })[char]);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function readJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}


/* =========================================
   3. THEME SWITCHING
========================================= */

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE.theme, theme);

  $("#themeIcon").textContent = theme === "dark" ? "☀" : "☾";
  $("#themeToggle").title = theme === "dark"
    ? "Switch to light mode"
    : "Switch to dark mode";
}

function initialiseTheme() {
  const saved = localStorage.getItem(STORAGE.theme);

  const systemPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  applyTheme(saved || (systemPrefersDark ? "dark" : "light"));

  $("#themeToggle").addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    applyTheme(current === "dark" ? "light" : "dark");
  });
}


/* =========================================
   4. PAGE NAVIGATION
========================================= */

const pageNames = {
  dashboard:"Dashboard",
  companies:"Companies",
  experiences:"Interview Experiences",
  preparation:"Preparation Tracker",
  community:"Senior Guidance",
  updates:"Placement Updates"
};

function showPage(pageName) {
  const page = document.getElementById(pageName);
  if (!page) return;

  $$(".page").forEach(section => section.classList.remove("active"));
  page.classList.add("active");

  $$(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.page === pageName);
  });

  $("#breadcrumb").textContent = pageNames[pageName] || "Dashboard";
  $("#sidebar").classList.remove("open");
  $("#notificationMenu").classList.remove("open");

  window.scrollTo({ top:0, behavior:"smooth" });
}

$$("[data-page]").forEach(element => {
  element.addEventListener("click", event => {
    event.preventDefault();
    showPage(element.dataset.page);
  });
});

$("#menuToggle").addEventListener("click", () => {
  $("#sidebar").classList.toggle("open");
});


/* =========================================
   5. NOTIFICATION DROPDOWN
========================================= */

$("#notificationToggle").addEventListener("click", event => {
  event.stopPropagation();
  $("#notificationMenu").classList.toggle("open");
});

$("#notificationMenu").addEventListener("click", event => {
  event.stopPropagation();
});

document.addEventListener("click", () => {
  $("#notificationMenu").classList.remove("open");
});

$("#markRead").addEventListener("click", () => {
  $(".notification-button i").style.display = "none";
  $("#notificationMenu").classList.remove("open");
  showToast("Notifications marked as read.");
});


/* =========================================
   6. COMPANY DIRECTORY
========================================= */

function renderCompanies() {
  const search = $("#companySearch").value.trim().toLowerCase();
  const industry = $("#industryFilter").value;
  const role = $("#roleCompanyFilter").value;

  const filtered = companies.filter(company => {
    const matchesSearch =
      company.name.toLowerCase().includes(search) ||
      company.industry.toLowerCase().includes(search) ||
      company.description.toLowerCase().includes(search);

    const matchesIndustry =
      industry === "all" || company.industry === industry;

    const matchesRole =
      role === "all" || company.roles.includes(role);

    return matchesSearch && matchesIndustry && matchesRole;
  });

  const container = $("#companyGrid");

  if (!filtered.length) {
    container.innerHTML = `<div class="panel">No matching companies found.</div>`;
    return;
  }

  container.innerHTML = filtered.map(company => `
    <article class="company-card">
      <div class="company-card-top">
        <div class="company-logo">${escapeHTML(company.initials)}</div>
        <span class="pill">${escapeHTML(company.industry)}</span>
      </div>
      <h3>${escapeHTML(company.name)}</h3>
      <p>${escapeHTML(company.description)}</p>
      <div class="tag-row">
        ${company.roles.map(role => `<span class="tag">${escapeHTML(role)}</span>`).join("")}
        <span class="tag">${escapeHTML(company.location)}</span>
      </div>
      <p><strong>Preparation areas:</strong> ${company.topics.map(escapeHTML).join(", ")}</p>
      <button class="button secondary company-details" data-company="${escapeHTML(company.name)}">View company profile →</button>
    </article>
  `).join("");
}

$("#companySearch").addEventListener("input", renderCompanies);
$("#industryFilter").addEventListener("change", renderCompanies);
$("#roleCompanyFilter").addEventListener("change", renderCompanies);

$("#companyGrid").addEventListener("click", event => {
  const button = event.target.closest(".company-details");
  if (!button) return;

  const company = companies.find(item => item.name === button.dataset.company);
  if (!company) return;

  openModal(`
    <span class="eyebrow">COMPANY PROFILE</span>
    <h2>${escapeHTML(company.name)}</h2>
    <p>${escapeHTML(company.description)}</p>
    <div class="tag-row">
      <span class="tag">${escapeHTML(company.industry)}</span>
      <span class="tag">${escapeHTML(company.location)}</span>
    </div>
    <h3>Roles listed in this demo</h3>
    <p>${company.roles.map(escapeHTML).join(" · ")}</p>
    <h3>Suggested preparation areas</h3>
    <div class="tag-row">${company.topics.map(topic => `<span class="tag">${escapeHTML(topic)}</span>`).join("")}</div>
    <p class="source-tag">Demonstration content. Confirm current hiring information through official company sources.</p>
    <button class="button primary" data-modal-page="experiences">Explore interview experiences →</button>
  `);
});


/* =========================================
   7. INTERVIEW EXPERIENCES
========================================= */

function renderExperiences() {
  const search = $("#experienceSearch").value.trim().toLowerCase();
  const role = $("#roleFilter").value;
  const outcome = $("#statusFilter").value;

  const filtered = experiences.filter(exp => {
    const matchesSearch =
      exp.company.toLowerCase().includes(search) ||
      exp.role.toLowerCase().includes(search);

    const matchesRole = role === "all" || exp.role === role;
    const matchesOutcome = outcome === "all" || exp.outcome === outcome;

    return matchesSearch && matchesRole && matchesOutcome;
  });

  const container = $("#experienceList");

  if (!filtered.length) {
    container.innerHTML = `<div class="panel">No matching experiences found.</div>`;
    return;
  }

  container.innerHTML = filtered.map(exp => `
    <article class="experience-card">
      <div class="experience-head">
        <div>
          <h3>${escapeHTML(exp.company)} — ${escapeHTML(exp.role)}</h3>
          <p>${escapeHTML(exp.description)}</p>
        </div>
        <span class="status-badge">Sample record</span>
      </div>
      <div class="rounds">
        ${exp.rounds.map(round => `<span class="round">${escapeHTML(round)}</span>`).join("")}
      </div>
      <p><strong>Illustrative outcome:</strong> ${escapeHTML(exp.outcome)}</p>
      <span class="source-tag">Source: ${escapeHTML(exp.source)} · Not verified</span>
      <div style="margin-top:12px">
        <button class="text-button experience-details" data-id="${exp.id}">Read experience details →</button>
      </div>
    </article>
  `).join("");
}

["experienceSearch", "roleFilter", "statusFilter"].forEach(id => {
  $("#" + id).addEventListener("input", renderExperiences);
});

$("#experienceList").addEventListener("click", event => {
  const button = event.target.closest(".experience-details");
  if (!button) return;

  const exp = experiences.find(item => item.id === Number(button.dataset.id));
  if (!exp) return;

  openModal(`
    <span class="eyebrow">INTERVIEW EXPERIENCE · SAMPLE</span>
    <h2>${escapeHTML(exp.company)}</h2>
    <p><strong>Role:</strong> ${escapeHTML(exp.role)}</p>
    <p><strong>Illustrative outcome:</strong> ${escapeHTML(exp.outcome)}</p>
    <h3>Example interview stages</h3>
    <div class="rounds">${exp.rounds.map((round, index) => `<span class="round">${index + 1}. ${escapeHTML(round)}</span>`).join("")}</div>
    <p>${escapeHTML(exp.description)}</p>
    <p><strong>Source:</strong> ${escapeHTML(exp.source)}</p>
    <p>This is sample demonstration data, not an actual student-submitted or verified interview report.</p>
  `);
});


/* =========================================
   8. PREPARATION CHECKLIST
========================================= */

function getChecklistState() {
  return readJSON(STORAGE.checklist, {});
}

function saveChecklistState(state) {
  localStorage.setItem(STORAGE.checklist, JSON.stringify(state));
}

function renderChecklist() {
  const state = getChecklistState();

  Object.entries(taskGroups).forEach(([group, tasks]) => {
    const container = document.getElementById(group);

    container.innerHTML = tasks.map((task, index) => {
      const key = `${group}_${index}`;
      const checked = Boolean(state[key]);

      return `
        <label class="task ${checked ? "done" : ""}">
          <input type="checkbox" data-task="${key}" ${checked ? "checked" : ""}>
          <span>${escapeHTML(task)}</span>
        </label>
      `;
    }).join("");
  });

  updateProgress();
}

function updateProgress() {
  const state = getChecklistState();
  let completed = 0;
  let total = 0;

  Object.entries(taskGroups).forEach(([group, tasks]) => {
    tasks.forEach((task, index) => {
      total++;
      if (state[`${group}_${index}`]) completed++;
    });
  });

  const percentage = total ? Math.round(completed / total * 100) : 0;

  $("#trackerPercentage").textContent = percentage + "%";
  $("#readinessValue").textContent = percentage + "%";
  $("#weeklyPercent").textContent = percentage + "%";
  $("#taskCount").textContent = `${completed} of ${total} tasks completed`;

  $("#trackerDescription").textContent =
    percentage === 100
      ? "Excellent work! You have completed every checklist task."
      : `${completed} tasks completed. Keep building your preparation routine.`;

  $("#trackerBar").style.width = percentage + "%";
  $("#weeklyBar").style.width = percentage + "%";

  $("#readinessDonut").style.background =
    `conic-gradient(var(--primary) ${percentage * 3.6}deg, var(--surface-3) 0deg)`;

  $("#readinessValue").textContent = percentage + "%";

  const categoryIds = ["dsaTasks", "coreTasks", "developmentTasks", "interviewTasks"];
  const barIds = ["bar-dsa", "bar-core", "bar-dev", "bar-interview"];

  categoryIds.forEach((group, index) => {
    const tasks = taskGroups[group];
    const count = tasks.filter((task, i) => state[`${group}_${i}`]).length;
    const categoryPercentage = Math.round(count / tasks.length * 100);
    document.getElementById(barIds[index]).style.height = categoryPercentage + "%";
  });

  updateMilestones(completed, total, percentage);
  renderNextSteps(state);
}

function updateMilestones(completed, total, percentage) {
  const milestones = [
    completed >= 1,
    percentage >= 25,
    percentage >= 50,
    percentage === 100
  ];

  let unlocked = 0;

  milestones.forEach((earned, index) => {
    if (earned) unlocked++;
    document.getElementById(`milestone${index + 1}`).textContent = earned ? "✓" : "○";
  });

  $("#milestoneCount").textContent = `${unlocked} / 4`;
}

function renderNextSteps(state) {
  const suggestions = [
    { group:"dsaTasks", label:"Practise one DSA topic", description:"Build consistency through focused problem solving.", icon:"⌘" },
    { group:"coreTasks", label:"Revise a CS foundation", description:"Strengthen one core computer science subject.", icon:"▤" },
    { group:"developmentTasks", label:"Improve a project", description:"Document an implementation or architecture decision.", icon:"✧" },
    { group:"interviewTasks", label:"Practise explaining your work", description:"Prepare a concise explanation of a project.", icon:"◷" }
  ];

  $("#nextSteps").innerHTML = suggestions.map(item => {
    const index = taskGroups[item.group].findIndex((task, i) => !state[`${item.group}_${i}`]);
    const label = index === -1 ? "Category completed" : taskGroups[item.group][index];

    return `
      <div class="next-step">
        <div class="step-icon">${item.icon}</div>
        <div><strong>${escapeHTML(label)}</strong><small>${escapeHTML(item.description)}</small></div>
      </div>
    `;
  }).join("");
}

document.addEventListener("change", event => {
  if (!event.target.matches("[data-task]")) return;

  const state = getChecklistState();
  state[event.target.dataset.task] = event.target.checked;
  saveChecklistState(state);

  event.target.closest(".task").classList.toggle("done", event.target.checked);
  updateProgress();
});

$("#resetChecklist").addEventListener("click", () => {
  if (!confirm("Reset all preparation checklist progress?")) return;
  saveChecklistState({});
  renderChecklist();
  showToast("Preparation checklist reset.");
});


/* =========================================
   9. COMMUNITY QUESTIONS
========================================= */

function renderQuestions() {
  const questions = readJSON(STORAGE.questions, []);
  const container = $("#questionList");

  if (!questions.length) {
    container.innerHTML = `<p class="small-note">No questions submitted yet. Start the discussion!</p>`;
    return;
  }

  container.innerHTML = questions.map(question => `
    <div class="question-item">
      <strong>${escapeHTML(question.title)}</strong>
      <p>${escapeHTML(question.body)}</p>
      <span class="source-tag">Submitted in this browser</span>
    </div>
  `).join("");
}

$("#questionForm").addEventListener("submit", event => {
  event.preventDefault();

  const title = $("#questionTitle").value.trim();
  const body = $("#questionBody").value.trim();

  if (!title || !body) return;

  const questions = readJSON(STORAGE.questions, []);

  questions.unshift({
    title,
    body,
    createdAt: new Date().toISOString()
  });

  saveQuestions(questions);
  event.target.reset();
  renderQuestions();
  showToast("Your question was added to this prototype.");
});

function saveQuestions(questions) {
  localStorage.setItem(STORAGE.questions, JSON.stringify(questions));
}


/* =========================================
   10. PLACEMENT UPDATES
========================================= */

function renderUpdates() {
  $("#updatesList").innerHTML = updates.map(update => `
    <article class="update-card">
      <div class="update-icon">${escapeHTML(update.icon)}</div>
      <div>
        <h3>${escapeHTML(update.title)}</h3>
        <p>${escapeHTML(update.description)}</p>
        <span class="update-type">${escapeHTML(update.type)} · Sample</span>
      </div>
    </article>
  `).join("");
}


/* =========================================
   11. DASHBOARD STATISTICS
========================================= */

function renderDashboardStats() {
  $("#statCompanies").textContent = String(companies.length).padStart(2, "0");
  $("#statExperiences").textContent = String(experiences.length).padStart(2, "0");
  $("#statUpdates").textContent = String(updates.length).padStart(2, "0");
}


/* =========================================
   12. MODAL
========================================= */

function openModal(content) {
  $("#modalContent").innerHTML = content;
  $("#modalBackdrop").classList.add("open");
}

function closeModal() {
  $("#modalBackdrop").classList.remove("open");
}

$("#modalClose").addEventListener("click", closeModal);

$("#modalBackdrop").addEventListener("click", event => {
  if (event.target === $("#modalBackdrop")) closeModal();
});

$("#modalContent").addEventListener("click", event => {
  const button = event.target.closest("[data-modal-page]");
  if (!button) return;

  const page = button.dataset.modalPage;
  closeModal();
  showPage(page);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    $("#globalSearch").focus();
  }
});


/* =========================================
   13. GLOBAL SEARCH
========================================= */

$("#globalSearch").addEventListener("keydown", event => {
  if (event.key !== "Enter") return;

  const query = event.target.value.trim();
  if (!query) return;

  const companyMatch = companies.find(company =>
    company.name.toLowerCase().includes(query.toLowerCase())
  );

  const experienceMatch = experiences.find(exp =>
    exp.company.toLowerCase().includes(query.toLowerCase()) ||
    exp.role.toLowerCase().includes(query.toLowerCase())
  );

  if (companyMatch) {
    showPage("companies");
    $("#companySearch").value = query;
    renderCompanies();
  } else if (experienceMatch) {
    showPage("experiences");
    $("#experienceSearch").value = query;
    renderExperiences();
  } else {
    showToast("No matching company or experience found.");
  }
});


/* =========================================
   14. INITIALISE THE APPLICATION
========================================= */

function initialiseWebsite() {
  initialiseTheme();
  renderCompanies();
  renderExperiences();
  renderChecklist();
  renderQuestions();
  renderUpdates();
  renderDashboardStats();
}

initialiseWebsite();
