// ══════════════════════════════════════════════
//  branding.js
//  Architecture : sticky cards + accordéon
// ══════════════════════════════════════════════

// ── Données ────────────────────────────────────
// Remplis cover, infos et gallery avec tes vrais fichiers.

const projects = [
  {
    id: 1,
    title: "Agate",
    category: "Identité visuelle · Écoresponsable",
    cover: "agate/POPUP STORE.png",
    infos: [
      { label: "Nom du projet",  value: "Agate Etikwear" },
      { label: "Brief",          value: "Créer une marque de vêtements écoresponsable" },
      { label: "Description",    value: "Branding d'une marque de sous-vêtements écoresponsable proposant de la lingerie d'allaitement et menstruelle." },
      { label: "Objectifs",      value: "Identité visuelle forte, féminine et élégante" },
      { label: "Logiciels",      value: "Illustrator, Photoshop" },
    ],
    gallery: [
      "agate/Fichier 1logos-agate.png",
      "agate/cartes fid.png",
      "agate/Fichier 3couleurs-agate.png",
      "agate/Fichier 5icones-agate.png",
      "agate/Fichier 7etiquette-agate.png",
      "agate/Fichier 6bw-agate.png",
    ],
  },
  

   {
    id: 2,
    title: "Red Castle",
    category: "Rebranding · Luxe",
    cover: "RED CASTLE cover.png",        // ← remplace par ton image
    infos: [
      { label: "Nom du projet", value: "Red Castle" },
      { label: "Brief",         value: "Challenge 48h: Vous avez 48h pour choisir une marque, changer sa cible, son concept et son identité visuelle..." },
      { label: "Description",   value: "Au cours d'un challenge de 48h, j'ai troqué les boissons energisantes de Red Bull pour créer Red Castle une marque de vins luxieux." },
      { label: "Logiciels",     value: "Photoshop, Illustrator, Indesign" },
    ],
    gallery: [
        "RED CASTLE.png",
        "RED CASTLE logos cond .png",
        "MOCKUP 2.png",
    ],   
  },

];

// ══════════════════════════════════════════════
//  CONSTRUCTION DOM
// ══════════════════════════════════════════════

function build() {
  const section = document.getElementById("cards-section");

  projects.forEach((p, i) => {
    /*
      Structure :
      .card-track              ← hauteur = 100vh (sticky scroll driver) + accordéon
        .sticky-card           ← position:sticky top:0  z-index:i+1
          img + overlay
        .accordion-body        ← max-height:0 → 2400px au clic
    */

    const track = document.createElement("div");
    track.className = "card-track";
    track.id = `track-${i}`;

    // ── Carte sticky ──
    const card = document.createElement("div");
    card.className = "sticky-card";
    card.style.zIndex = i + 1; // chaque carte couvre la précédente

    const coverHTML = p.cover
      ? `<img src="${p.cover}" alt="${p.title}" />`
      : `<div style="width:100%;height:100%;background:#1c1c1c;"></div>`;

    card.innerHTML = `
      ${coverHTML}
      <div class="card-overlay">
        <div class="card-info">
          <span class="card-num">0${p.id}</span>
          <h2 class="card-title">${p.title}</h2>
          <p class="card-cat">${p.category}</p>
        </div>
        <span class="card-cta">voir le projet ↓</span>
      </div>
    `;

    // Clic sur la carte → toggle accordéon
    card.addEventListener("click", () => toggleAccordion(track));

    // ── Accordéon ──
    const infosHTML = p.infos.map(({label, value}) =>
      `<p><strong>${label}</strong>${value}</p>`
    ).join("");

    const galleryHTML = p.gallery.length
      ? `<div class="accordion-gallery">
          ${p.gallery.map(src => `<img src="${src}" alt="" loading="lazy" />`).join("")}
         </div>`
      : "";

    const accordion = document.createElement("div");
    accordion.className = "accordion-body";
    accordion.innerHTML = `
      <div class="accordion-banner">
        ${p.infos.map(({label, value}) => `
          <div class="accordion-banner-block">
            <span class="accordion-banner-label">${label}</span>
            <span class="accordion-banner-value">${value}</span>
          </div>
        `).join("")}
        <button class="accordion-close">↑ fermer</button>
      </div>
      ${galleryHTML}
    `;

    // Bouton fermer
    accordion.querySelector(".accordion-close").addEventListener("click", (e) => {
      e.stopPropagation();
      track.classList.remove("open");
      // Remonte doucement vers la carte
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    track.appendChild(card);
    track.appendChild(accordion);
    section.appendChild(track);
  });
}

// ══════════════════════════════════════════════
//  LOGIQUE ACCORDÉON
// ══════════════════════════════════════════════

function toggleAccordion(track) {
  const isOpen = track.classList.contains("open");

  // Ferme tous les autres
  document.querySelectorAll(".card-track.open").forEach(t => {
    if (t !== track) t.classList.remove("open");
  });

  if (isOpen) {
    track.classList.remove("open");
  } else {
    track.classList.add("open");
    // Laisse l'accordéon commencer à s'ouvrir, puis scrolle vers lui
    setTimeout(() => {
      const accordion = track.querySelector(".accordion-body");
      accordion.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }
}

// ══════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════


// ── Nav couleur adaptative (blanc sur images, noir sur fond clair) ──
function initNavColor() {
  const nav = document.querySelector(".folders-nav");
  if (!nav) return;

  const hero = document.getElementById("branding-hero");

  function update() {
    const heroBottom = hero.getBoundingClientRect().bottom;
    // Si on a dépassé le titre → on est sur une image sombre
    if (heroBottom <= 0) {
      nav.classList.add("on-dark");
    } else {
      nav.classList.remove("on-dark");
    }
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}

document.addEventListener("DOMContentLoaded", () => {
  build();
  initNavColor();
});