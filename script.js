const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

const navLinks = $("#navLinks");
$("#menuBtn").addEventListener("click", () => navLinks.classList.toggle("open"));
$$(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const savedTheme = localStorage.getItem("sweta-theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
$("#themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("sweta-theme", next);
  $("#themeToggle").textContent = next === "dark" ? "☾" : "☼";
});

const glow = $(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
$$(".reveal").forEach(el => observer.observe(el));

const filters = $$(".filter");
const skills = $$(".skill-item");
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    skills.forEach(item => {
      const show = filter === "all" || item.dataset.cat === filter;
      item.style.display = show ? "grid" : "none";
    });
  });
});

const projectData = {
  mindwell: {
    kicker: "AI / ML · Feb 2026 — Mar 2026",
    title: "MindWell AI",
    description: "An AI-powered depression risk prediction system designed around PHQ-9 assessment data, machine learning, and explainable insights.",
    details: "Implemented Logistic Regression for risk prediction, added TextBlob-based sentiment analysis and symptom-importance analysis, and designed a trend-monitoring framework for observing patterns over time.",
    tags: ["Python", "Logistic Regression", "PHQ-9", "TextBlob", "NLP"]
  },
  bail: {
    kicker: "SMART INDIA HACKATHON 2024 · CO-LEAD",
    title: "Bail Reckoner",
    description: "An AI-driven legal-tech concept focused on making bail eligibility assessment more structured and user-centric.",
    details: "Contributed to data processing and analytical logic, team discussions, idea presentations, workflow planning, problem-solving, and project execution throughout the hackathon.",
    tags: ["AI", "Legal-Tech", "Data Processing", "Leadership"]
  }
};

const modal = $("#projectModal");
function openProject(key) {
  const p = projectData[key];
  $("#modalKicker").textContent = p.kicker;
  $("#modalTitle").textContent = p.title;
  $("#modalDescription").textContent = p.description;
  $("#modalDetails").textContent = p.details;
  $("#modalTags").innerHTML = p.tags.map(t => `<span>${t}</span>`).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}
$$(".project-card").forEach(card => {
  card.addEventListener("click", () => openProject(card.dataset.project));
});
$("#modalClose").addEventListener("click", () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
});
$(".modal-backdrop").addEventListener("click", () => $("#modalClose").click());
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("open")) $("#modalClose").click();
});
