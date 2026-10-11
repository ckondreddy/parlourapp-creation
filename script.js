const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  nav.classList.toggle("is-open", !isExpanded);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    nav.classList.remove("is-open");
  });
});

const reviews = [
  {
    quote: "“Indu made me feel so calm and so completely myself on my wedding day. I still look at those photos and feel all the magic again.”",
    name: "Shreya M.",
    type: "BRIDAL BEAUTY",
    initial: "S",
  },
  {
    quote: "“The whole experience felt like getting ready with family. My daughter loved her little look, and I felt absolutely radiant.”",
    name: "Ananya R.",
    type: "MOTHER & DAUGHTER",
    initial: "A",
  },
  {
    quote: "“She listened to what I wanted and made the day feel so special. I left feeling beautiful, relaxed, and completely myself.”",
    name: "Nisha K.",
    type: "OCCASION BEAUTY",
    initial: "N",
  },
];

let activeReview = 0;
const quote = document.querySelector("#review-quote");
const name = document.querySelector("#review-name");
const type = document.querySelector("#review-type");
const avatar = document.querySelector("#review-avatar");
const counter = document.querySelector("#review-counter");
const progress = document.querySelector("#review-progress");

function showReview(index) {
  activeReview = (index + reviews.length) % reviews.length;
  const review = reviews[activeReview];
  quote.textContent = review.quote;
  name.textContent = review.name;
  type.textContent = review.type;
  avatar.textContent = review.initial;
  counter.textContent = `0${activeReview + 1} — 0${reviews.length}`;
  progress.style.width = `${((activeReview + 1) / reviews.length) * 100}%`;
}

document.querySelector("#prev-review").addEventListener("click", () => showReview(activeReview - 1));
document.querySelector("#next-review").addEventListener("click", () => showReview(activeReview + 1));

document.querySelector("#current-year").textContent = new Date().getFullYear();

document.querySelector("#booking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const date = formData.get("date");
  const preferredDate = date
    ? ` for ${new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { dateStyle: "long" })}`
    : "";
  const message = document.querySelector("#form-message");
  message.textContent = `Thanks, ${formData.get("name")}! Your ${formData.get("service").toLowerCase()} enquiry${preferredDate} is ready, but this website preview does not send bookings yet. Please contact the studio directly to confirm.`;
  form.reset();
});