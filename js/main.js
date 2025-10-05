// main.js

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const themeToggle = document.querySelector("#theme-toggle");
  const links = document.querySelectorAll("a[href^='#']");

  // Sticky Navbar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  });

  // Smooth Scroll
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Theme Toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-theme") ? "dark" : "light"
      );
    });
  }

  // Remember theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
  }

  // Button ripple effect
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      circle.classList.add("ripple");
      this.appendChild(circle);

      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      setTimeout(() => circle.remove(), 500);
    });
  });
});
