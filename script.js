const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector("[data-overlay]");
const mobileLinks = document.querySelectorAll(".mobile-nav a");
const backToTop = document.querySelector(".back-to-top");
const yearEl = document.querySelector("#year");
const reviewTrack = document.querySelector("[data-reviews]");
const prevBtn = document.querySelector("[data-prev]");
const nextBtn = document.querySelector("[data-next]");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const openMenu = () => {
  if (!mobileMenu || !menuToggle || !overlay) return;
  mobileMenu.classList.add("open");
  overlay.classList.add("active");
  menuToggle.setAttribute("aria-expanded", "true");
  mobileMenu.setAttribute("aria-hidden", "false");
};

const closeMenu = () => {
  if (!mobileMenu || !menuToggle || !overlay) return;
  mobileMenu.classList.remove("open");
  overlay.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
};

const toggleMenu = () => {
  const isOpen = menuToggle?.getAttribute("aria-expanded") === "true";
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
};

menuToggle?.addEventListener("click", toggleMenu);

overlay?.addEventListener("click", closeMenu);

mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Smooth scroll for all anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Back to top button
window.addEventListener("scroll", () => {
  if (!backToTop) return;
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));

// Mobile review controls
const scrollByCard = (direction) => {
  if (!reviewTrack) return;
  const card = reviewTrack.querySelector(".review-card");
  if (!card) return;
  const scrollAmount = card.getBoundingClientRect().width + 16;
  reviewTrack.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
};

prevBtn?.addEventListener("click", () => scrollByCard(-1));
nextBtn?.addEventListener("click", () => scrollByCard(1));
