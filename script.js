/* ═══════════════════════════════════
           CURSOR
        ═══════════════════════════════════ */
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursorTrail");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});
function animRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  cursorRing.style.left = rx + "px";
  cursorRing.style.top = ry + "px";
  requestAnimationFrame(animRing);
}
animRing();

/* ═══════════════════════════════════
           BG STARFIELD
        ═══════════════════════════════════ */
(function () {
  const c = document.getElementById("bg-stars");
  const ctx = c.getContext("2d");
  let W,
    H,
    stars = [];

  function resize() {
    W = c.width = window.innerWidth;
    H = c.height = window.innerHeight;
    init();
  }

  function init() {
    stars = [];
    for (let i = 0; i < 220; i++) {
      const r = Math.random() * 1.5;
      const hue = Math.random() > 0.7 ? (Math.random() > 0.5 ? 200 : 290) : 270;
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r,
        speed: 0.02 + Math.random() * 0.06,
        alpha: Math.random(),
        dir: Math.random() > 0.5 ? 1 : -1,
        hue,
        sat: 60 + Math.random() * 40,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.twinkle += s.speed * s.dir;
      const a = 0.3 + 0.5 * Math.abs(Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue},${s.sat}%,80%,${a})`;
      ctx.fill();
      if (s.r > 1) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue},${s.sat}%,80%,${a * 0.12})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
})();

/* ═══════════════════════════════════
           NAV INNER STARFIELD
        ═══════════════════════════════════ */
(function () {
  const navEl = document.getElementById("navCapsule");
  const c = document.getElementById("nav-stars");
  const ctx = c.getContext("2d");
  let stars = [];
  let W, H;

  function setup() {
    const rect = navEl.getBoundingClientRect();
    W = c.width = rect.width;
    H = c.height = rect.height;
    stars = [];
    for (let i = 0; i < 18; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.3 + Math.random() * 0.6,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.06,
        alpha: Math.random() * 0.4,
        twinkle: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.025,
        hue: Math.random() > 0.5 ? 200 : 280,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.twinkle += s.speed;
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = W;
      if (s.x > W) s.x = 0;
      if (s.y < 0) s.y = H;
      if (s.y > H) s.y = 0;
      const a = 0.08 + 0.22 * Math.abs(Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue},60%,90%,${a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  setup();
  requestAnimationFrame(draw);
})();

/* ═══════════════════════════════════
           LOCALIZATION
        ═══════════════════════════════════ */
const translations = {
  de: {
    nav_home: "Startseite",
    nav_explore: "Erkunden",
    nav_learn: "Akademie",
    nav_courses: "Kurse",
    nav_community: "Gemeinschaft",
    nav_settings: "Einstellungen",
    nav_launch: "Starten ▶",
    nav_home_tooltip: "Portal Hub",
    nav_explore_tooltip: "Kosmos erkunden",
    nav_learn_tooltip: "Akademie-Kern",
    nav_courses_tooltip: "Neuronale Kurse",
    nav_community_tooltip: "Sternen-Kollektiv",
    nav_settings_tooltip: "Kontrollzentrum",
    hero_title: "Level Up Deine Realität",
    hero_subtitle: "Der ultimative Nexus für Entwickler, Gamer und digitale Entdecker.",
    stat_members: "Aktive Mitglieder",
    stat_projects: "Gebaute Projekte",
    stat_servers: "Dedizierte Server",
    feat_coding: "Neuronale Codierung",
    feat_coding_desc: "Meistere die Architekturen von morgen mit unseren KI-gesteuerten Lernpfaden.",
    feat_gaming: "Pro Gaming",
    feat_gaming_desc: "Hochleistungs-Infrastruktur für kompetitives Spiel und Community-Tests.",
    feat_nexus: "Der Nexus",
    feat_nexus_desc: "Verbinde dich mit Elite-Köpfen in einem dezentralen Community-Ökosystem.",
    settings_title: "Kontrollzentrum",
    settings_theme: "Visueller Modus",
    settings_lang: "Kernsprache"
  },
  en: {
    nav_home: "Home",
    nav_explore: "Explore",
    nav_learn: "Learn",
    nav_courses: "Courses",
    nav_community: "Community",
    nav_settings: "Settings",
    nav_launch: "Launch ▶",
    nav_home_tooltip: "Portal Hub",
    nav_explore_tooltip: "Explore Cosmos",
    nav_learn_tooltip: "Academy Core",
    nav_courses_tooltip: "Neural Courses",
    nav_community_tooltip: "Star Collective",
    nav_settings_tooltip: "Control Center",
    hero_title: "Level Up Your Reality",
    hero_subtitle: "The ultimate nexus for developers, gamers, and digital explorers.",
    stat_members: "Active Members",
    stat_projects: "Projects Built",
    stat_servers: "Dedicated Servers",
    feat_coding: "Neural Coding",
    feat_coding_desc: "Master the architectures of tomorrow with our AI-driven learning paths.",
    feat_gaming: "Pro Gaming",
    feat_gaming_desc: "High-performance infrastructure for competitive play and community trials.",
    feat_nexus: "The Nexus",
    feat_nexus_desc: "Connect with elite minds in a decentralized community ecosystem.",
    settings_title: "Control Center",
    settings_theme: "Visual Mode",
    settings_lang: "Core Language"
  }
};

let currentLang = localStorage.getItem("fez_lang") || "de";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("fez_lang", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-t]").forEach(el => {
    const key = el.getAttribute("data-t");
    if (translations[lang][key]) {
      if (el.tagName === "INPUT" && el.type === "placeholder") {
        el.placeholder = translations[lang][key];
      } else if (el.hasAttribute("data-label")) {
        // Handle elements that have both translation and tooltip label
        el.setAttribute("data-label", translations[lang][key]);
        // If it's a nav-label inside, translate that too
        const labelSpan = el.querySelector(".nav-label");
        if (labelSpan && labelSpan.getAttribute("data-t") === key) {
           labelSpan.textContent = translations[lang][key];
        }
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  // Update nav item tooltips specifically
  document.querySelectorAll(".nav-item[data-t]").forEach(item => {
    const key = item.getAttribute("data-t");
    item.setAttribute("data-label", translations[lang][key]);
  });

  // Update active state on buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
}

/* ═══════════════════════════════════
           THEME MANAGEMENT
        ═══════════════════════════════════ */
const themeToggle = document.getElementById("themeToggle");
let isLightMode = localStorage.getItem("fez_theme") === "light";

function setTheme(light) {
  isLightMode = light;
  document.body.classList.toggle("light-mode", light);
  localStorage.setItem("fez_theme", light ? "light" : "dark");
  if (themeToggle) themeToggle.checked = light;
}

themeToggle?.addEventListener("change", (e) => setTheme(e.target.checked));

/* ═══════════════════════════════════
           SETTINGS PANEL
        ═══════════════════════════════════ */
const settingsPanel = document.getElementById("settingsPanel");
const settingsTrigger = document.getElementById("settingsTrigger");
const closeSettings = document.getElementById("closeSettings");

settingsTrigger?.addEventListener("click", (e) => {
  e.preventDefault();
  settingsPanel.classList.toggle("open");
});

closeSettings?.addEventListener("click", () => settingsPanel.classList.remove("open"));

// Close on outside click
document.addEventListener("click", (e) => {
  if (settingsPanel.classList.contains("open") && 
      !settingsPanel.contains(e.target) && 
      !settingsTrigger.contains(e.target)) {
    settingsPanel.classList.remove("open");
  }
});

/* ═══════════════════════════════════
           INITIALIZATION
        ═══════════════════════════════════ */
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
});

// Run on load
setLanguage(currentLang);
setTheme(isLightMode);

/* ═══════════════════════════════════
           TOOLTIP
        ═══════════════════════════════════ */
const tooltip = document.getElementById("tooltip");
document.querySelectorAll("[data-label]").forEach((el) => {
  el.addEventListener("mouseenter", (e) => {
    tooltip.textContent = el.getAttribute("data-label");
    tooltip.classList.add("show");
  });
  el.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.clientX + 16 + "px";
    tooltip.style.top = e.clientY - 36 + "px";
  });
  el.addEventListener("mouseleave", () => tooltip.classList.remove("show"));
});

/* ═══════════════════════════════════
           ACTIVE STATE TOGGLE
        ═══════════════════════════════════ */
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    if (item === settingsTrigger) return; // Don't highlight settings as active page
    document
      .querySelectorAll(".nav-item")
      .forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  });
});