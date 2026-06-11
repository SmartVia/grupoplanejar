const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const dropdown = document.querySelector(".nav-dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const sections = document.querySelectorAll("main section[id], header[id]");

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
};

menuToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

dropdownToggle.addEventListener("click", (event) => {
  if (window.innerWidth <= 1020) {
    event.preventDefault();
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
  if (window.innerWidth > 1020) {
    closeMenu();
    dropdown.classList.remove("open");
    dropdownToggle.setAttribute("aria-expanded", "false");
  }
});

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
};

const updateActiveLink = () => {
  let currentId = "inicio";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 170) currentId = section.id;
  });

  document.querySelectorAll(".main-nav > .nav-link").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};

window.addEventListener("scroll", () => {
  updateHeader();
  updateActiveLink();
}, { passive: true });

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
document.getElementById("current-year").textContent = new Date().getFullYear();
updateHeader();
updateActiveLink();
