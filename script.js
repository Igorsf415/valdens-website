/* =====================================================================
   SETTINGS — edit these to customize the site
   ===================================================================== */

// 1. Change this to whatever password you want family members to use.
const SITE_PASSWORD = "valden2026";

// 2. Add your photos here. Just put the image files in the /images folder
//    and add a line below with the filename and a short caption.
const PHOTOS = [
  // { file: "valden-hospital.jpg", caption: "The day we met you" },
  // { file: "first-smile.jpg", caption: "First smile" },
];

// 3. Add milestones here. They will show up in date order automatically.
//    date: any text is fine, e.g. "March 2026" or "Day 1"
const MILESTONES = [
  { date: "Day 1", title: "Welcome to the world!", description: "Valden was born and our hearts grew three sizes." },
  // { date: "Month 1", title: "First smile", description: "Valden gave us the biggest, gummiest smile." },
  // { date: "Month 6", title: "First taste of food", description: "Valden tried solid food for the first time." },
];

/* =====================================================================
   PASSWORD PROTECTION
   ===================================================================== */

const lockScreen = document.getElementById("lock-screen");
const siteContent = document.getElementById("site-content");
const passwordInput = document.getElementById("password-input");
const unlockBtn = document.getElementById("unlock-btn");
const lockError = document.getElementById("lock-error");

function tryUnlock() {
  if (passwordInput.value === SITE_PASSWORD) {
    lockScreen.classList.add("hidden");
    siteContent.classList.remove("hidden");
    sessionStorage.setItem("valden-unlocked", "true");
    lockError.style.display = "none";
  } else {
    lockError.style.display = "block";
  }
}

unlockBtn.addEventListener("click", tryUnlock);
passwordInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") tryUnlock();
});

// Stay unlocked for the rest of the browser session
if (sessionStorage.getItem("valden-unlocked") === "true") {
  lockScreen.classList.add("hidden");
  siteContent.classList.remove("hidden");
}

/* =====================================================================
   PHOTO GALLERY
   ===================================================================== */

const galleryGrid = document.getElementById("gallery-grid");

if (PHOTOS.length === 0) {
  galleryGrid.innerHTML = '<p class="gallery-empty">No photos yet — add some to the /images folder and list them in script.js!</p>';
} else {
  PHOTOS.forEach((photo) => {
    const img = document.createElement("img");
    img.src = `images/${photo.file}`;
    img.alt = photo.caption || "Valden photo";
    img.loading = "lazy";
    img.addEventListener("click", () => openLightbox(img.src));
    galleryGrid.appendChild(img);
  });
}

/* Lightbox (click a photo to view it bigger) */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  lightbox.classList.add("hidden");
  lightboxImg.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

/* =====================================================================
   MILESTONES TIMELINE
   ===================================================================== */

const timeline = document.getElementById("timeline");

MILESTONES.forEach((milestone) => {
  const item = document.createElement("div");
  item.className = "timeline-item";
  item.innerHTML = `
    <div class="timeline-date">${milestone.date}</div>
    <div class="timeline-title">${milestone.title}</div>
    <div class="timeline-desc">${milestone.description}</div>
  `;
  timeline.appendChild(item);
});
