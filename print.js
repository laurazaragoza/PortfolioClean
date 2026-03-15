// ══════════════════════════════════════════════
//  print.js — Grille masonry posters
// ══════════════════════════════════════════════

// ── Tes posters ─────────────────────────────
// aspect : ratio hauteur/largeur (ex: 1.41 pour A4, 1 pour carré)

const posters = [
  {
    title: "Affiche braderie",
    category: "Affiche événementielle",
    desc: "L’objectif du projet est de valoriser l’événement et de transmettre rapidement les informations essentielles (date, lieu, concept). La communication doit également donner envie aux visiteurs de participer à la braderie.",
    image: "MOCKUP AFFICHE BRADERIE.png",          // ← "print/affiche1.jpg"
    aspect: 1.41,       // A4 portrait
    details: [
      { label: "Format",    value: "A2 — 42 × 59,4 cm" },
      { label: "Technique", value: "Typographie, illustration vectorielle" },
      { label: "Logiciels", value: "Procreate, Canva,Illustrator, Photoshop" },
      { label: "Année",     value: "2026" },
    ],
    tags: ["Affiche", "Typographie", "2026"],
  },
  {
    title: "Billets de la braderie",
    category: "Billets d'entrée",
    desc: "Déclinaison de l’identité visuelle de la braderie sur les billets d’entrée. L’objectif est de créer des billets attrayants et cohérents avec l’affiche, tout en intégrant les informations essentielles (date, lieu, prix).",
    image: "BILLETS.png",
    aspect: 1.41,
    details: [
      { label: "Format",    value: "A3 — 29,7 × 42 cm" },
      { label: "Technique", value: "Mise en page" },
      { label: "Logiciels", value: " Photoshop, Canva" },
      { label: "Année",     value: "2026" },
    ],
    tags: ["Affiche", "Culture", "2026"],
  },
  {
    title: "Affiche 3",
    category: "Identité visuelle",
    desc: "Menu d'un brunch, réalisé dans le cadre d'un projet d'identité visuelle pour un restaurant fictif. L'objectif était de créer une affiche qui reflète l'ambiance du restaurant tout en mettant en avant les plats proposés.",
    image: "menu recto.png",
    aspect: 1,          // carré
    details: [
      { label: "Format",    value: "50 × 50 cm" },
      { label: "Technique", value: "Illustration, Mise en page" },
      { label: "Logiciels", value: "Illustrator, Canva" },
      { label: "Année",     value: "2025" },
    ],
    tags: ["Poster", "Illustration", "2025"],
  },
  {
    title: "Affiche 4",
    category: "Flyer",
    desc: "Description du projet.",
    image: "",
    aspect: 1.41,
    details: [
      { label: "Format",    value: "A5 recto-verso" },
      { label: "Logiciels", value: "InDesign" },
      { label: "Année",     value: "2025" },
    ],
    tags: ["Flyer", "2025"],
  },
  {
    title: "Affiche 5",
    category: "Poster éditorial",
    desc: "Description du projet.",
    image: "",
    aspect: 0.7,        // paysage
    details: [
      { label: "Format",    value: "A3 paysage" },
      { label: "Logiciels", value: "InDesign, Illustrator" },
      { label: "Année",     value: "2025" },
    ],
    tags: ["Éditorial", "2025"],
  },
  // Ajoute tes posters ici...
];

// ══════════════════════════════════════════════
//  CONSTRUCTION DE LA GRILLE
// ══════════════════════════════════════════════

let currentIndex = 0;

function buildGrid() {
  const grid = document.getElementById("print-grid");

  posters.forEach((poster, i) => {
    const item = document.createElement("div");
    item.className = "print-item";
    item.dataset.index = i;

    const visual = poster.image
      ? `<img src="${poster.image}" alt="${poster.title}" />`
      : `<div class="print-placeholder" style="aspect-ratio:${1/poster.aspect}">
           <span>${poster.category}</span>
         </div>`;

    item.innerHTML = `
      <span class="print-item-num">0${i + 1}</span>
      <div class="print-item-visual">
        ${visual}
        <div class="print-item-overlay">
          <p class="overlay-title">${poster.title}</p>
          <p class="overlay-cat">${poster.category}</p>
        </div>
      </div>
    `;

    item.addEventListener("click", () => openLightbox(i));
    grid.appendChild(item);
  });
}

// ══════════════════════════════════════════════
//  LIGHTBOX
// ══════════════════════════════════════════════

function openLightbox(index) {
  if (index < 0 || index >= posters.length) return;
  currentIndex = index;
  const p = posters[index];
  const lb = document.getElementById("lightbox");

  // Remplis les infos
  document.getElementById("lb-num").textContent   = `0${index + 1} — Print`;
  document.getElementById("lb-title").textContent = p.title;
  document.getElementById("lb-desc").textContent  = p.desc;

  // Détails
  document.getElementById("lb-details").innerHTML = p.details.map(d => `
    <div class="lb-detail-row">
      <span class="lb-detail-label">${d.label}</span>
      <span class="lb-detail-value">${d.value}</span>
    </div>
  `).join("");

  // Tags
  document.getElementById("lb-tags").innerHTML = p.tags.map(t =>
    `<span class="print-tag">${t}</span>`
  ).join("");

  // Image ou placeholder
  const lbVisual = document.getElementById("lb-visual");
  if (p.image) {
    lbVisual.innerHTML = `<img id="lb-img" src="${p.image}" alt="${p.title}" />`;
  } else {
    lbVisual.innerHTML = `
      <div style="width:min(400px,60%);aspect-ratio:${1/p.aspect};background:#eae6de;
                  display:flex;align-items:center;justify-content:center;
                  border:0.5px solid rgba(17,17,17,0.08);">
        <span style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(17,17,17,0.25);">
          ${p.title}
        </span>
      </div>
    `;
  }

  // Compteur + nav
  document.getElementById("lb-counter").textContent = `${index + 1} / ${posters.length}`;
  document.getElementById("lb-prev").disabled = index === 0;
  document.getElementById("lb-next").disabled = index === posters.length - 1;

  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.getElementById("lightbox").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ══════════════════════════════════════════════
//  ÉVÉNEMENTS
// ══════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
  buildGrid();

  document.getElementById("lightbox-close")
    .addEventListener("click", closeLightbox);

  document.getElementById("lb-prev")
    .addEventListener("click", () => openLightbox(currentIndex - 1));

  document.getElementById("lb-next")
    .addEventListener("click", () => openLightbox(currentIndex + 1));

  document.addEventListener("keydown", e => {
    if (e.key === "Escape")      closeLightbox();
    if (e.key === "ArrowRight")  openLightbox(currentIndex + 1);
    if (e.key === "ArrowLeft")   openLightbox(currentIndex - 1);
  });
});