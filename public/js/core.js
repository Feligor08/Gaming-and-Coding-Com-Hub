/* ═══════════════════════════════════
           TRANSATLATIONS
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
    nav_login: "Login",
    nav_register: "Registrieren",
    hero_title: "Level Up Deine Realität",
    hero_subtitle: "Der ultimative Nexus für Entwickler, Gamer und digitale Entdecker.",
    settings_title: "Kontrollzentrum",
    settings_theme: "Visueller Modus",
    settings_lang: "Kernsprache",
    login_title: "Neuraler Login",
    login_subtitle: "Betreten Sie den Nexus",
    reg_title: "Neuer Account",
    reg_subtitle: "Starten Sie Ihre Reise",
    gaming_title: "Gaming Hub",
    coding_title: "Coding Hub",
    tournaments_title: "Elite Turniere",
    server_status_title: "Nexus Puls",
    projects_title: "Gemeinschafts-Projekte",
    training_title: "Neuraler Trainingskern",
    members_title: "Sternen-Kollektiv",
    news_title: "Nexus Nachrichten",
    leaderboards_title: "Globale Ränge",
    challenges_title: "Coding Herausforderungen",
    resources_title: "Resource-Kern",
    sheets_title: "Sheets Hub",
    nav_sheets: "Seiten",
    nav_updates: "Updates",
    updates_title: "Sektor-Logbuch",
    updates_subtitle: "Chronik der Nexus-Erweiterungen und Optimierungen."
  },
  en: {
    nav_home: "Home",
    nav_explore: "Explore",
    nav_learn: "Learn",
    nav_courses: "Courses",
    nav_community: "Community",
    nav_settings: "Settings",
    nav_launch: "Launch ▶",
    nav_login: "Login",
    nav_register: "Register",
    hero_title: "Level Up Your Reality",
    hero_subtitle: "The ultimate nexus for developers, gamers, and digital explorers.",
    settings_title: "Control Center",
    settings_theme: "Visual Mode",
    settings_lang: "Core Language",
    login_title: "Neural Login",
    login_subtitle: "Enter the Nexus",
    reg_title: "New Account",
    reg_subtitle: "Begin Your Journey",
    gaming_title: "Gaming Hub",
    coding_title: "Coding Hub",
    tournaments_title: "Elite Tournaments",
    server_status_title: "Nexus Pulse",
    projects_title: "Community Projects",
    training_title: "Neural Training Core",
    members_title: "Star Collective",
    news_title: "Nexus News",
    leaderboards_title: "Global Rankings",
    challenges_title: "Coding Challenges",
    resources_title: "Resource Core",
    sheets_title: "Sheets Hub",
    nav_sheets: "Sheets",
    nav_updates: "Updates",
    updates_title: "Sector Logbook",
    updates_subtitle: "Chronicle of Nexus expansions and optimizations."
  }
};

/* ═══════════════════════════════════
           SHARED CORE CLASS
        ═══════════════════════════════════ */
class CoreHub {
  constructor() {
    this.initCursor();
    this.initStarfield();
    this.initSettings();
    this.initLocalization();
    this.initTheme();
    this.initNav();
    this.syncData();
  }

  /* --- CURSOR --- */
  initCursor() {
    const cursor = document.getElementById("cursor");
    const cursorRing = document.getElementById("cursorTrail");
    if (!cursor || !cursorRing) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + "px"; cursor.style.top = my + "px";
    });

    const anim = () => {
      rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
      cursorRing.style.left = rx + "px"; cursorRing.style.top = ry + "px";
      requestAnimationFrame(anim);
    };
    anim();
  }

  /* --- STARFIELD --- */
  initStarfield() {
    const c = document.getElementById("bg-stars");
    if (!c) return;
    const ctx = c.getContext("2d");
    let W, H, stars = [];

    const resize = () => {
      W = c.width = window.innerWidth; H = c.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 220; i++) {
        stars.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.5,
          speed: 0.02 + Math.random() * 0.06,
          alpha: Math.random(),
          dir: Math.random() > 0.5 ? 1 : -1,
          hue: Math.random() > 0.7 ? (Math.random() > 0.5 ? 200 : 290) : 270,
          twinkle: Math.random() * Math.PI * 2
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.twinkle += s.speed * s.dir;
        const a = 0.3 + 0.5 * Math.abs(Math.sin(s.twinkle));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 80%, ${a})`; ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize(); draw();
  }

  /* --- THEME --- */
  initTheme() {
    const toggle = document.getElementById("themeToggle");
    const mode = localStorage.getItem("fez_theme") || "dark";
    this.setTheme(mode === "light");
    toggle?.addEventListener("change", (e) => this.setTheme(e.target.checked));
  }

  setTheme(isLight) {
    document.body.classList.toggle("light-mode", isLight);
    localStorage.setItem("fez_theme", isLight ? "light" : "dark");
    const toggle = document.getElementById("themeToggle");
    if (toggle) toggle.checked = isLight;
  }

  /* --- LOCALIZATION --- */
  initLocalization() {
    this.currentLang = localStorage.getItem("fez_lang") || "de";
    this.setLanguage(this.currentLang);

    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.addEventListener("click", () => this.setLanguage(btn.dataset.lang));
    });
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem("fez_lang", lang);
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-t]").forEach(el => {
      const key = el.getAttribute("data-t");
      if (translations[lang] && translations[lang][key]) {
        if (el.dataset.label !== undefined) el.setAttribute("data-label", translations[lang][key]);
        else el.textContent = translations[lang][key];
      }
    });

    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  /* --- SETTINGS --- */
  initSettings() {
    const panel = document.getElementById("settingsPanel");
    const trigger = document.getElementById("settingsTrigger");
    const close = document.getElementById("closeSettings");

    trigger?.addEventListener("click", (e) => {
      e.preventDefault(); panel.classList.toggle("open");
    });
    close?.addEventListener("click", () => panel.classList.remove("open"));
    
    document.addEventListener("click", (e) => {
      if (panel?.classList.contains("open") && !panel.contains(e.target) && !trigger.contains(e.target)) {
        panel.classList.remove("open");
      }
    });
  }

  /* --- NAVIGATION & TOOLTIPS --- */
  initNav() {
    const tooltip = document.getElementById("tooltip");
    document.querySelectorAll("[data-label]").forEach(el => {
      el.addEventListener("mouseenter", () => {
        tooltip.textContent = el.getAttribute("data-label");
        tooltip.classList.add("show");
      });
      el.addEventListener("mousemove", (e) => {
        tooltip.style.left = e.clientX + 16 + "px";
        tooltip.style.top = e.clientY - 36 + "px";
      });
      el.addEventListener("mouseleave", () => tooltip.classList.remove("show"));
    });
  }

  /* --- BACKEND SYNC --- */
  async syncData() {
    const serverList = document.getElementById("server-list");
    const projectGrid = document.getElementById("projects-container");
    const newsContainer = document.getElementById("news-container");
    const leaderboardTable = document.getElementById("leaderboard-table");
    const challengesContainer = document.getElementById("challenges-container");

    if (serverList) {
      const data = await this.fetchAPI("/api/gaming/servers");
      if (data) this.updateServerStatus(data);
    }

    if (projectGrid) {
      const data = await this.fetchAPI("/api/coding/projects");
      if (data) this.updateProjectsList(data);
    }

    if (newsContainer) {
      const data = await this.fetchAPI("/api/gaming/news");
      if (data) this.updateNewsFeed(data);
    }

    if (leaderboardTable) {
      const data = await this.fetchAPI("/api/gaming/leaderboards");
      if (data) this.updateLeaderboards(data);
    }

    if (challengesContainer) {
      const data = await this.fetchAPI("/api/coding/challenges");
      if (data) this.updateChallenges(data);
    }
  }

  async fetchAPI(endpoint) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Sync failed");
      return await response.json();
    } catch (err) {
      console.warn("[Nexus-Sync] Offline Mode:", err);
      return null;
    }
  }

  updateServerStatus(servers) {
    const tbody = document.querySelector("#server-list tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    servers.forEach(s => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${s.name}</td>
        <td><span class="pulse"></span>${s.status}</td>
        <td>${s.ping}</td>
        <td>${Math.floor(Math.random() * 30 + 10)}%</td>
      `;
      tbody.appendChild(row);
    });
  }

  updateProjectsList(projects) {
    const container = document.getElementById("projects-container");
    if (!container) return;
    container.innerHTML = "";
    projects.forEach(p => {
      const card = document.createElement("div");
      card.className = "glass-card";
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>Dynamic project stream from NexusCore.</p>
        <div class="project-meta">
            <span>by <b>${p.author}</b></span>
            <span class="like-btn">♥ ${p.likes}</span>
        </div>
      `;
      container.appendChild(card);
    });
  }

  updateNewsFeed(news) {
    const container = document.getElementById("news-container");
    if (!container) return;
    container.innerHTML = "";
    news.forEach(n => {
      const item = document.createElement("div");
      item.className = "glass-card news-item";
      item.innerHTML = `
        <span class="news-date">${new Date(n.date).toLocaleDateString(this.currentLang === 'de' ? 'de-DE' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
        <h3>${n.title}</h3>
        <p>${n.excerpt}</p>
      `;
      container.appendChild(item);
    });
  }

  updateLeaderboards(ranks) {
    const tbody = document.querySelector("#leaderboard-table tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    ranks.forEach(r => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><span class="rank-number">#${r.rank}</span></td>
        <td>${r.name}</td>
        <td><span class="rank-role">${r.role}</span></td>
        <td>${r.score.toLocaleString()}</td>
      `;
      tbody.appendChild(row);
    });
  }

  updateChallenges(challenges) {
    const container = document.getElementById("challenges-container");
    if (!container) return;
    container.innerHTML = "";
    challenges.forEach(c => {
      const card = document.createElement("div");
      card.className = "glass-card challenge-card";
      const diffClass = `diff-${c.difficulty.toLowerCase()}`;
      card.innerHTML = `
        <span class="difficulty-badge ${diffClass}">${c.difficulty.toUpperCase()}</span>
        <h3>${c.title}</h3>
        <p>Interactive sector-mission: ${c.status}.</p>
        <span class="points">${c.points} Credits</span>
        <button class="glow-button" style="width: 100%; margin-top: 15px;">Accept Mission</button>
      `;
      container.appendChild(card);
    });
  }
}

// Global Core Instance
window.coreHub = new CoreHub();
