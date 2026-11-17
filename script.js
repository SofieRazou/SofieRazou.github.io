
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     CONTENTS DROPDOWN
  ===================================== */

  const button = document.getElementById("contentsBtn");
  const menu = document.getElementById("contentsMenu");

  function closeMenu() {
    if (!button || !menu) return;

    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
  }

  if (button && menu) {

    button.addEventListener("click", () => {
      const isOpen =
        button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isOpen));
      menu.hidden = isOpen;
    });

    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      if (
        !button.contains(event.target) &&
        !menu.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

/* =====================================
   RIGHT-HAND SCROLLING STARS
   Automatic contrast based on section
===================================== */

const rail = document.getElementById("scrollStars");

const stars = rail
  ? [...rail.querySelectorAll(".scroll-star")]
  : [];

let ticking = false;

function updateStars() {
  if (!rail || !stars.length) return;

  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = maxScroll > 0
    ? window.scrollY / maxScroll
    : 0;

  const active = Math.min(
    stars.length - 1,
    Math.floor(progress * stars.length)
  );

  const railRect = rail.getBoundingClientRect();

  stars.forEach((star, index) => {
    // Find the background directly behind each star
    const starRect = star.getBoundingClientRect();

    const x = Math.max(
      0,
      Math.min(window.innerWidth - 1, starRect.left + starRect.width / 2)
    );

    const y = Math.max(
      0,
      Math.min(window.innerHeight - 1, starRect.top + starRect.height / 2)
    );

    const element = document.elementFromPoint(x, y);
    const section = element?.closest(".section");

    // Change star colour according to the section background
    const isLight = section?.classList.contains("light-section");

    star.classList.toggle("on-light", isLight);
    star.classList.toggle("on-dark", !isLight);

    // Highlight the star corresponding to scroll progress
    star.classList.toggle("active", index === active);
  });

  rail.classList.toggle("visible", window.scrollY > 60);

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateStars);
    ticking = true;
  }
}, { passive: true });

window.addEventListener("resize", updateStars);

updateStars();

  /* =====================================
     AUTOMATIC FOOTER YEAR
  ===================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});
