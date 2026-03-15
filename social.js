// ══════════════════════════════════════════════
//  social.js — Projets Social Media
// ══════════════════════════════════════════════

// ── Tes projets ─────────────────────────────
// Pour chaque projet : titre, plateformes, stratégie, et liste de posts.
// Types de posts : "instagram" | "story" | "linkedin" | "podcast" | "carousel"

const projects = [
  {
    id: 1,
    title: "Agate Etikwear",
    platforms: ["Instagram", "Podcasts, TikTok, Pinterest"],
    strategy: {
      objectif: "Construire une communauté autour d'une marque de lingerie écoresponsable.",
      cible: "Femmes 20–35 ans, sensibles aux valeurs éco et au corps positif.",
      tonalite: "Doux, inclusif, poétique.",
      contenu: "Posts produits, contenu éducatif sur les matières éco, coulisses de fabrication.",
      frequence: "4 posts / semaine + 5 stories / semaine",
    },
    posts: [
      { type: "story", image: "Posts agathe-04.png", caption: "Épisode spécial fête des mères", date: "Mai 2025" },
      { type: "instagram",  image: "Posts agathe-10.png", caption: "Nouvelle collection d'allaitement",  date: "Mai 2025" },
      { type: "carousel",  image: "Posts agathe-11.png", caption: "Kit matenité: le guide",          date: "Avr 2025" },
      { type: "story", image: "Posts agathe-12.png", caption: "Photographie feed",                     date: "Avr 2025" },
      { type: "story",     image: "design.jpg", caption: "Les coulisses de la conception",               date: "Avr 2025" },
      { type: "instagram",     image: "Posts agathe-13.png", caption: "Une Saint Valentin, pour soi",                   date: "Fév 2025" },
      { type: "instagram", image: "Posts agathe-09.png", caption: "Nouvelle collection d'amour: RUBIS",       date: "Fév 2025" },
      { type: "carousel",  image: "Posts agathe-08.png", caption: "Les best sellers de la collection Camelia",               date: "Jan 2025" },
    ]
  },
  {
    id: 2,
    title: "Red Castle",
    platforms: ["Instagram", "LinkedIn", "Podcast"],
    strategy: {
      objectif: "Mettre en avant l’univers et le savoir-faire de Red Castle tout en suscitant de l’intérêt et l’engagement de la communauté.",
      cible: "Amateurs de vin et consommateurs de produits premium, adultes de 25 à 50 ans sensibles aux expériences œnologiques et au lifestyle luxe.",
      tonalite: "Élégante, experte et conviviale",
      contenu: "Contenus mêlant storytelling du domaine, mise en avant des vins, conseils de dégustation et expériences proposées par le club.",
      frequence: "2 posts / semaine + 3 stories / semaine",
    },
    posts: [
      { type: "instagram", image: "RED CASTLE POSTS-15.png", caption: "Photographie illustrant le travail artisanal",               date: "Oct 2025" },
      { type: "story",  image: "RED CASTLE POSTS-16.png", caption: "Évènement masterclass", date: "Sep 2025" },
      { type: "instagram",   image: "RED CASTLE POSTS-17.png", caption: "Carrousel période des vendanges", date: "Aoû 2025" },
      { type: "story", image: "RED CASTLE POSTS-18.png", caption: "Évènement millésime au domaine",   date: "Juin 2025" },
      { type: "instagram",  image: "RED CASTLE POSTS-20.png", caption: "Vin de la semaine",                   date: "Mai 2025" },
      { type: "story",  image: "RED CASTLE POSTS-19.png", caption: "Évènement dégustation", date: "Mai 2025" },
      { type: "story",     image: "RED CASTLE POSTS-21.png", caption: "Nouvel épisode : l'art du vin",          date: "Avr 2025" },
    
    ]
  },
  // Ajoute tes projets ici...
];

// ══════════════════════════════════════════════
//  CONSTRUCTION DOM
// ══════════════════════════════════════════════

function build() {
  const container = document.getElementById("social-projects");

  // SVG ink filter
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "hidden-svg");
  svg.innerHTML = `<filter id="ink-texture"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="3"/></filter>`;
  document.body.appendChild(svg);

  projects.forEach((project, pi) => {
    const section = document.createElement("section");
    section.className = "social-project";
    section.id = `project-${project.id}`;

    // ── EN-TÊTE ──
    const platformsHTML = project.platforms
      .map(p => `<span class="platform-tag">${p}</span>`)
      .join("");

    const strategyHTML = Object.entries(project.strategy)
      .map(([key, val]) => `
        <div class="strategy-block">
          <span class="strategy-label">${labelMap[key] || key}</span>
          <p class="strategy-value">${val}</p>
        </div>
      `).join("");

    section.innerHTML = `
      <div class="project-header">
        <div class="project-left">
          <span class="project-num">0${pi + 1}</span>
          <h2 class="project-title">${project.title}</h2>
          <div class="project-platforms">${platformsHTML}</div>
        </div>
        <div class="project-strategy">
          ${strategyHTML}
        </div>
      </div>

      <div class="posts-scroll-area">
        <div class="posts-header">
          <span class="posts-header-label">Posts · ${project.posts.length} contenus</span>
          <div class="posts-nav">
            <button class="posts-nav-btn btn-prev" data-proj="${pi}" disabled>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="posts-nav-btn btn-next" data-proj="${pi}">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="posts-track-wrapper">
          <div class="posts-track" id="track-${pi}">
            ${project.posts.map(post => buildPost(post)).join("")}
          </div>
        </div>
      </div>
    `;

    container.appendChild(section);
  });

  initScrollBehavior();
}

const labelMap = {
  objectif:  "Objectif",
  cible:     "Cible",
  tonalite:  "Tonalité",
  contenu:   "Type de contenu",
  frequence: "Fréquence",
};

function buildPost(post) {
  const visual = post.image
    ? `<img src="${post.image}" alt="${post.caption}" />`
    : `<div class="post-placeholder"><span>${post.type}</span></div>`;

  return `
    <div class="post-card" data-type="${post.type}">
      <div class="post-visual">
        ${visual}
        <span class="post-type-badge">${post.type}</span>
      </div>
      <div class="post-meta">
        <p class="post-caption">${post.caption}</p>
        <span class="post-date">${post.date}</span>
      </div>
    </div>
  `;
}

// ══════════════════════════════════════════════
//  SCROLL HORIZONTAL DES POSTS
// ══════════════════════════════════════════════

const trackOffsets = {}; // offset par projet

function initScrollBehavior() {
  document.querySelectorAll(".btn-next").forEach(btn => {
    btn.addEventListener("click", () => scrollTrack(+btn.dataset.proj, 1));
  });
  document.querySelectorAll(".btn-prev").forEach(btn => {
    btn.addEventListener("click", () => scrollTrack(+btn.dataset.proj, -1));
  });

  // Drag scroll sur la piste
  document.querySelectorAll(".posts-track").forEach((track, pi) => {
    let isDragging = false;
    let startX = 0;
    let startOffset = 0;

    track.addEventListener("mousedown", e => {
      isDragging = true;
      startX = e.clientX;
      startOffset = trackOffsets[pi] || 0;
      track.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", e => {
      if (!isDragging) return;
      const delta = e.clientX - startX;
      applyOffset(pi, startOffset + delta);
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      track.style.cursor = "grab";
    });

    track.style.cursor = "grab";
  });
}

function scrollTrack(pi, dir) {
  const STEP = 280;
  const current = trackOffsets[pi] || 0;
  applyOffset(pi, current + dir * -STEP);
}

function applyOffset(pi, rawOffset) {
  const track = document.getElementById(`track-${pi}`);
  if (!track) return;

  const wrapper = track.closest(".posts-track-wrapper");
  const maxOffset = -(track.scrollWidth - wrapper.clientWidth + 0);
  const offset = Math.min(0, Math.max(maxOffset, rawOffset));

  trackOffsets[pi] = offset;
  track.style.transform = `translateX(${offset}px)`;

  // Maj boutons
  const section = document.getElementById(`project-${projects[pi].id}`);
  const btnPrev = section.querySelector(".btn-prev");
  const btnNext = section.querySelector(".btn-next");
  btnPrev.disabled = offset >= 0;
  btnNext.disabled = offset <= maxOffset;
}

// ══════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", build);