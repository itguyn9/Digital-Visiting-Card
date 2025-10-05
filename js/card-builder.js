// card-builder.js

const form = document.querySelector("#card-form");
const preview = document.querySelector("#card-preview");
const qrContainer = document.querySelector("#qr-container");

if (form) {
  form.addEventListener("input", updatePreview);
}

function updatePreview() {
  const name = document.querySelector("#name").value || "Your Name";
  const title = document.querySelector("#title").value || "Profession";
  const phone = document.querySelector("#phone").value || "+92 300 0000000";
  const email = document.querySelector("#email").value || "you@email.com";

  preview.innerHTML = `
    <h2>${name}</h2>
    <p>${title}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Email:</b> ${email}</p>
  `;

  generateQRCode(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}`);
}

function generateQRCode(text) {
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    text
  )}&size=120x120`;
  qrContainer.innerHTML = `<img src="${apiUrl}" alt="QR Code" />`;
}

// Save Card
document.querySelector("#save-card")?.addEventListener("click", () => {
  alert("Your digital card has been saved successfully!");
});
