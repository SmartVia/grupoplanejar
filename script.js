const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const dropdown = document.querySelector(".nav-dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const logoTrack = document.querySelector(".logo-track");
const logoSet = document.querySelector(".logo-set");

if (logoTrack && logoSet) {
  const clone = logoSet.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  clone.querySelectorAll("img").forEach((image) => image.setAttribute("alt", ""));
  logoTrack.appendChild(clone);
}

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
