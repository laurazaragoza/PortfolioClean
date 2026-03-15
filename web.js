
const projects = [
  {
    id: "agate",
    title: "Agate",
    desc: "Création d'une maquette pour un site e-commerce qui vend de la lingerie écoresponsable.",
    image: "MAQUETTE AGATE 1.png",           // ← ton image ex: "web/midica.png"
    url: "agatetikwear.fr",
    details: [
      { label: "Type",       value: "Réalisation de la maquette puis intégration sur WordPress" },
      { label: "Brief",      value: "Créer un site e-commerce pour Agate Etikwear" },
      { label: "Année",      value: "2025" },
    ],
    tags: ["Figma", "e-commerce", "wordpress"],
  },
  {
    id: "urban paws",
    title: "Urban Paws",
    desc: "Création d'une maquette pour une association qui reccueille et met à l'adoption des chats abandonnés. Et mise en place d'un système de match-making pour que les adoptions soient personnalisées.",
    image: "Urban pawspng-23.png",
    url: "urban-paws.com",
    details: [
      { label: "Type",  value: "Maquette de la page d'accueil" },
      { label: "Brief", value: "Réaliser une maquette pour une association qui reccueille et met à l'adoption des chats abandonnés." },
      { label: "Année", value: "2024" },
    ],
    tags: ["Figma", "UI Design"],
  },
];



let lbCurrentIndex = 0;

function build() {
  buildSideNav();
  buildProjects();
  initLightbox();
  initScrollSpy();
}


function buildSideNav() {
  const list = document.getElementById("side-nav-list");
  projects.forEach((p, i) => {
    const li = document.createElement("li");
    li.className = "side-nav-item";
    li.innerHTML = `
      <a href="#project-${p.id}" class="side-nav-link" data-index="${i}">
        ${p.title}
      </a>
    `;
    list.appendChild(li);
  });
}


function buildProjects() {
  const container = document.getElementById("web-projects");

  projects.forEach((p, i) => {
    const section = document.createElement("section");
    section.className = "web-project";
    section.id = `project-${p.id}`;

    const detailsHTML = p.details.map(d => `
      <div class="detail-row">
        <span class="detail-label">${d.label}</span>
        <span class="detail-value">${d.value}</span>
      </div>
    `).join("");

    const tagsHTML = p.tags.map(t => `<span class="web-tag">${t}</span>`).join("");

    const imgHTML = p.image
      ? `<img src="${p.image}" alt="${p.title}" />`
      : `<div style="width:100%;height:400px;background:#eae6de;display:flex;align-items:center;justify-content:center;">
           <span style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(17,17,17,0.25);">Maquette à venir</span>
         </div>`;

    section.innerHTML = `
      <!-- Infos gauche sticky -->
      <div class="web-project-info">
        <span class="web-project-num">0${i + 1}</span>
        <h2 class="web-project-title">${p.title}</h2>
        <p class="web-project-desc">${p.desc}</p>
        <div class="web-project-details">${detailsHTML}</div>
        <div class="web-tags">${tagsHTML}</div>
        <button class="btn-open-lb" data-index="${i}">
          Voir la maquette
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Aperçu droite -->
      <div class="web-project-preview" data-index="${i}">
        <div class="browser-chrome">
          <div class="browser-dots">
            <div class="browser-dot"></div>
            <div class="browser-dot"></div>
            <div class="browser-dot"></div>
          </div>
          <div class="browser-bar">
            <span class="browser-url">${p.url}</span>
          </div>
        </div>
        <div class="browser-screen">
          ${imgHTML}
        </div>
        <span class="preview-hint">Voir en plein écran ↗</span>
      </div>
    `;

    container.appendChild(section);
  });


  document.querySelectorAll(".btn-open-lb, .web-project-preview").forEach(el => {
    el.addEventListener("click", () => openLightbox(+el.dataset.index));
  });
}



function initLightbox() {
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lb-prev").addEventListener("click", () => openLightbox(lbCurrentIndex - 1));
  document.getElementById("lb-next").addEventListener("click", () => openLightbox(lbCurrentIndex + 1));


  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") openLightbox(lbCurrentIndex + 1);
    if (e.key === "ArrowLeft")  openLightbox(lbCurrentIndex - 1);
  });

 
  document.getElementById("lightbox-scroll").addEventListener("click", e => {
    if (e.target === document.getElementById("lightbox-scroll")) closeLightbox();
  });
}

function openLightbox(index) {
  if (index < 0 || index >= projects.length) return;
  lbCurrentIndex = index;
  const p = projects[index];
  const lb = document.getElementById("lightbox");


  document.getElementById("lb-num").textContent    = `0${index + 1} — Web Design`;
  document.getElementById("lb-title").textContent  = p.title;
  document.getElementById("lb-desc").textContent   = p.desc;
  document.getElementById("lb-tags").innerHTML     = p.tags.map(t => `<span class="web-tag">${t}</span>`).join("");


  const img = document.getElementById("lightbox-img");
  if (p.image) {
    img.src = p.image;
    img.alt = p.title;
  } else {
    img.src = "";
    img.alt = "";
    img.style.display = p.image ? "block" : "none";
    document.getElementById("lightbox-scroll").innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:70vh;color:rgba(17,17,17,0.25);font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;">
        Maquette à venir
      </div>
    `;
  }

  if (p.image) {
    document.getElementById("lightbox-scroll").innerHTML = `<img id="lightbox-img" src="${p.image}" alt="${p.title}" />`;
  }

  // Scroll en haut de l'image
  document.getElementById("lightbox-scroll").scrollTop = 0;


  document.getElementById("lb-prev").disabled = index === 0;
  document.getElementById("lb-next").disabled = index === projects.length - 1;

  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}



function initScrollSpy() {
  const sections = document.querySelectorAll(".web-project");
  const links    = document.querySelectorAll(".side-nav-link");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          const href = l.getAttribute("href").replace("#", "");
          l.classList.toggle("active", href === id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}



document.addEventListener("DOMContentLoaded", build);