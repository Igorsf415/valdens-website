/* =====================================================================
   SETTINGS — edit these to customize the site
   ===================================================================== */

// 1. Change this to whatever password you want family members to use.
const SITE_PASSWORD = "valden2026";

// 2. These tell the site where to look for your photos on GitHub.
//    If you ever rename the repo or your GitHub username changes,
//    update these two values.
const GITHUB_OWNER = "Igorsf415";
const GITHUB_REPO = "valdens-website";
const GITHUB_BRANCH = "main";

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
const IMAGE_FILE_PATTERN = /\.(jpe?g|png|gif|webp|heic|avif)$/i;

// Turn "first-steps.jpg" into "First steps"
function captionFromFilename(filename) {
  const name = filename.replace(IMAGE_FILE_PATTERN, "");
  const spaced = name.replace(/[-_]+/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function renderGallery(photos) {
  if (photos.length === 0) {
    galleryGrid.innerHTML = '<p class="gallery-empty">No photos yet — just drag some into the /images folder on GitHub and they\'ll show up here!</p>';
    return;
  }

  galleryGrid.innerHTML = "";
  photos.forEach((photo) => {
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption;
    img.loading = "lazy";
    img.addEventListener("click", () => openLightbox(img.src));
    galleryGrid.appendChild(img);
  });
}

// Ask GitHub what files are currently in the /images folder, so new photos
// show up automatically — no code editing required!
fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/images?ref=${GITHUB_BRANCH}`)
  .then((res) => res.json())
  .then((files) => {
    const photos = (Array.isArray(files) ? files : [])
      .filter((file) => file.type === "file" && IMAGE_FILE_PATTERN.test(file.name))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((file) => ({ src: file.download_url, caption: captionFromFilename(file.name) }));
    renderGallery(photos);
  })
  .catch(() => {
    galleryGrid.innerHTML = '<p class="gallery-empty">Couldn\'t load photos right now. If you just added some, try refreshing in a minute.</p>';
  });

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
