// =============================================================================
// AUTO ATELIER — UI
// - Mobile nav toggle (aria)
// - Close on ESC + click outside
// - Reveal on scroll (IntersectionObserver)
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------
  // Mobile navigation
  // ---------------------------
  const nav = document.querySelector("nav");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("navMenu");

  const closeMenu = () => {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    if (!nav || !toggle) return;
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  if (nav && toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      if (isOpen) closeMenu();
      else openMenu();
    });

    // Close menu on link click
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeMenu);
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Close on click outside nav
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("is-open")) return;
      const target = e.target;
      const clickedInside = nav.contains(target);
      if (!clickedInside) closeMenu();
    });
  }

  // ---------------------------
  // Reveal on scroll
  // ---------------------------
  const revealItems = document.querySelectorAll(".reveal");

  if (revealItems.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    revealItems.forEach((el) => observer.observe(el));
  }
});
