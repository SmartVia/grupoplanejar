const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const dropdown = document.querySelector(".nav-dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const logoTrack = document.querySelector(".logo-track");
const logoSet = document.querySelector(".logo-set");
const header = document.querySelector(".site-header");
const heroBackground = document.querySelector(".hero-background");
const systemsHeroBackground = document.querySelector(".systems-hero-bg");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (logoTrack && logoSet) {
  const clone = logoSet.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  clone.querySelectorAll("img").forEach((image) => image.setAttribute("alt", ""));
  logoTrack.appendChild(clone);
}

if (!reduceMotion) {
  body.classList.add("motion-ready");

  const heroElements = [
    document.querySelector(".hero-copy .overline"),
    document.querySelector(".hero-copy h1"),
    document.querySelector(".hero-description"),
    document.querySelector(".hero-actions"),
    document.querySelector(".systems-hero-copy .overline"),
    document.querySelector(".systems-hero-copy h1"),
    document.querySelector(".systems-hero-copy > p:not(.overline)"),
    document.querySelector(".systems-benefits"),
    document.querySelector(".systems-hero-copy .hero-actions")
  ].filter(Boolean);

  heroElements.forEach((element, index) => {
    element.classList.add("hero-animate");
    element.style.setProperty("--hero-delay", `${120 + index * 130}ms`);
  });

  const revealGroups = [
    [document.querySelector(".about-content")],
    [...document.querySelectorAll(".story-item")],
    [document.querySelector(".about-image")],
    [...document.querySelectorAll(".about-differentials article")],
    [document.querySelector(".pillars-box")],
    [...document.querySelectorAll(".about-pillars article")],
    [...document.querySelectorAll(".metric")],
    [...document.querySelectorAll(".solutions-heading > *")],
    [...document.querySelectorAll(".service-card")],
    [...document.querySelectorAll(".systems-heading")],
    [...document.querySelectorAll(".video-card")],
    [...document.querySelectorAll(".gallery-item")],
    [document.querySelector(".systems-cta .container")],
    [document.querySelector(".trusted")],
    [document.querySelector(".contact-strip .container")]
  ];

  revealGroups.forEach((group) => {
    group.filter(Boolean).forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", `${Math.min(index * 90, 270)}ms`);
    });
  });

  requestAnimationFrame(() => body.classList.add("page-loaded"));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px" });

  document.querySelectorAll(".reveal-on-scroll").forEach((element) => revealObserver.observe(element));
}

const counters = [
  { element: document.querySelector(".metric:nth-child(1) strong"), target: 15, prefix: "+", format: false },
  { element: document.querySelector(".metric:nth-child(2) strong"), target: 1000, prefix: "+", format: true }
].filter((counter) => counter.element);

const startCounter = (counter) => {
  const duration = 1450;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(counter.target * eased);
    const display = counter.format ? value.toLocaleString("pt-BR") : String(value);
    counter.element.textContent = `${counter.prefix}${display}`;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

if (!reduceMotion && counters.length) {
  counters.forEach((counter) => counter.element.textContent = `${counter.prefix}0`);
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = counters.find((item) => item.element === entry.target);
        if (counter) startCounter(counter);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.65 });
  counters.forEach((counter) => counterObserver.observe(counter.element));
}

let scrollFrame = null;
const updateScrollEffects = () => {
  const scrollY = window.scrollY;
  header?.classList.toggle("scrolled", scrollY > 24);

  if (!reduceMotion && heroBackground && window.innerWidth > 700) {
    const offset = Math.min(scrollY * 0.12, 48);
    heroBackground.style.setProperty("--parallax-y", `${offset}px`);
  }

  if (!reduceMotion && systemsHeroBackground && window.innerWidth > 700) {
    const offset = Math.min(scrollY * 0.1, 42);
    systemsHeroBackground.style.setProperty("--systems-parallax", `${offset}px`);
  }

  scrollFrame = null;
};

window.addEventListener("scroll", () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollEffects);
}, { passive: true });

updateScrollEffects();

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");
const galleryItems = document.querySelectorAll("[data-lightbox]");

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.hidden = true;
  body.classList.remove("lightbox-open");
  if (lightboxImage) lightboxImage.src = "";
};

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = item.dataset.lightbox;
    lightboxImage.alt = item.querySelector("img")?.alt || "Foto ampliada de obra";
    lightbox.hidden = false;
    body.classList.add("lightbox-open");
    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
});

function closeMenu() {
  body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

dropdownToggle.addEventListener("click", () => {
  if (window.innerWidth <= 980) {
    const isOpen = dropdown.classList.toggle("open");
    dropdownToggle.setAttribute("aria-expanded", String(isOpen));
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
    dropdown.classList.remove("open");
    dropdownToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    closeMenu();
    dropdown.classList.remove("open");
    dropdownToggle.setAttribute("aria-expanded", "false");
  }
});
