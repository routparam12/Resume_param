const body = document.body;
const savedTheme = localStorage.getItem("portfolio-theme");
const savedFont = localStorage.getItem("portfolio-font");

if (savedTheme === "light") body.classList.add("light-mode");
if (savedFont === "serif") body.classList.add("serif-mode");

const themeToggle = document.querySelector("#theme-toggle");
const fontToggle = document.querySelector("#font-toggle");

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  localStorage.setItem("portfolio-theme", body.classList.contains("light-mode") ? "light" : "dark");
});

fontToggle?.addEventListener("click", () => {
  body.classList.toggle("serif-mode");
  localStorage.setItem("portfolio-font", body.classList.contains("serif-mode") ? "serif" : "sans");
});

const updateClock = () => {
  const now = new Date();
  const date = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata", weekday: "long", day: "2-digit", month: "long"
  }).format(now);
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  }).format(now);
  const dateNode = document.querySelector("#local-date");
  const timeNode = document.querySelector("#local-time");
  if (dateNode) dateNode.textContent = date;
  if (timeNode) timeNode.textContent = `${time} IST`;
};

updateClock();
setInterval(updateClock, 1000);
document.querySelector("#year").textContent = new Date().getFullYear();

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("visible"));
}

document.querySelectorAll(".faq details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq details").forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});
