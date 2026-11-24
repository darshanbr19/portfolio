// ══════════════════════════════════════════════════════
// Footer year
// ══════════════════════════════════════════════════════
document.getElementById("year").textContent = new Date().getFullYear();

// ══════════════════════════════════════════════════════
// Mobile nav toggle
// ══════════════════════════════════════════════════════
const navToggle = document.getElementById("nav-toggle");
const navLinks  = document.getElementById("nav-links");

navToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ══════════════════════════════════════════════════════
// Scroll reveal (IntersectionObserver)
// ══════════════════════════════════════════════════════
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealEls = document.querySelectorAll(".reveal");

if (prefersReducedMotion) {
  revealEls.forEach((el) => el.classList.add("in-view"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("in-view"), i * 40);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
}

// ══════════════════════════════════════════════════════
// Typing effect — hero role line
// ══════════════════════════════════════════════════════
const ROLES = [
  "ML Engineer / AI Systems Developer",
  "Deep Learning · Computer Vision",
  "Full-Stack &amp; AI Systems Builder".replace(/&amp;/g, "&"),
];

const typedEl = document.getElementById("role-typed");

function typeLoop() {
  if (!typedEl) return;
  if (prefersReducedMotion) {
    typedEl.textContent = ROLES[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting  = false;

  function tick() {
    const current = ROLES[roleIndex];

    if (!deleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1500);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
      }
    }

    setTimeout(tick, deleting ? 30 : 55);
  }

  tick();
}
typeLoop();

// ══════════════════════════════════════════════════════
// Count-up metrics in the model card
// ══════════════════════════════════════════════════════
function animateCounters() {
  const counters = document.querySelectorAll(".mc-val");

  counters.forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const isDecimal = target % 1 !== 0 || target < 10;
    const duration = 1200;
    const startTime = performance.now();

    if (prefersReducedMotion) {
      el.textContent = (isDecimal ? target.toFixed(2) : target) + suffix;
      return;
    }

    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (isDecimal ? value.toFixed(2) : Math.round(value)) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
}

const modelCard = document.querySelector(".model-card");
if (modelCard) {
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          counterIO.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  counterIO.observe(modelCard);
}

// ══════════════════════════════════════════════════════
// Active nav link on scroll
// ══════════════════════════════════════════════════════
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-link");

const sectionIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => a.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
);
sections.forEach((s) => sectionIO.observe(s));

// ══════════════════════════════════════════════════════
// Theme switcher (persists in localStorage)
// ══════════════════════════════════════════════════════
const themeButtons = document.querySelectorAll("[data-theme-btn]");

function applyTheme(name) {
  document.documentElement.setAttribute("data-theme", name);
  themeButtons.forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.themeBtn === name))
  );
  try { localStorage.setItem("theme", name); } catch (e) {}
}

themeButtons.forEach((b) =>
  b.addEventListener("click", () => applyTheme(b.dataset.themeBtn))
);
applyTheme(document.documentElement.getAttribute("data-theme") || "light");
