// pricing-calculator.js

const basePrice = 500;
const features = {
  qr: 100,
  logo: 200,
  customDomain: 300,
  analytics: 150,
};

const checkboxes = document.querySelectorAll(".feature-checkbox");
const totalDisplay = document.querySelector("#total-price");
const discountInput = document.querySelector("#discount-code");
const applyBtn = document.querySelector("#apply-discount");

let total = basePrice;
let discount = 0;

function updateTotal() {
  total = basePrice;
  checkboxes.forEach((c) => {
    if (c.checked) total += features[c.value];
  });
  const final = total - discount;
  totalDisplay.textContent = `PKR ${final}`;
}

checkboxes.forEach((c) => c.addEventListener("change", updateTotal));

// Discount codes
applyBtn?.addEventListener("click", () => {
  const code = discountInput.value.trim().toUpperCase();
  if (code === "JK10") {
    discount = total * 0.1;
    alert("🎉 10% discount applied!");
  } else if (code === "VIP20") {
    discount = total * 0.2;
    alert("🔥 20% discount applied!");
  } else {
    discount = 0;
    alert("Invalid discount code.");
  }
  updateTotal();
});

// Initialize total
updateTotal();
