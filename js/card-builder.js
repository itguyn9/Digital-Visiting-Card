// card-builder.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Card Builder Ready");

  const createButton = document.querySelector(".btn-primary");

  if (createButton) {
    createButton.addEventListener("click", (e) => {
      e.preventDefault();
      alert("🚀 Card Builder coming soon! You’ll be able to design your own digital business card here.");
    });
  }
});
