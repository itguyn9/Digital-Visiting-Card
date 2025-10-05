// pricing-calculator.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("💰 Pricing Calculator Ready");

  const pricingCards = document.querySelectorAll(".price-card");

  pricingCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("hovered");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("hovered");
    });
  });

  // Example of a dynamic calculator
  function calculatePrice(cards, customDesign, support) {
    let base = cards * 999;
    if (customDesign) base += 500;
    if (support) base += 300;
    return base;
  }

  // Example usage
  console.log("Example: 5 cards with custom design =", calculatePrice(5, true, false), "PKR");
});
