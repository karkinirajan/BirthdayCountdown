// JavaScript months are zero-indexed: 8 is September.
const targetMonth = 8;
const targetDay = 28;

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secsEl = document.getElementById("secs");
const countdownEl = document.getElementById("countdown");
const celebrationEl = document.getElementById("celebration");
const subtextEl = document.getElementById("subtext");
let hasCelebrated = false;

function getBirthdayState(now) {
  const year = now.getFullYear();
  const birthday = new Date(year, targetMonth, targetDay);
  const birthdayEnd = new Date(year, targetMonth, targetDay + 1);
  const isBirthdayToday = now >= birthday && now < birthdayEnd;

  if (isBirthdayToday) return { birthday, isBirthdayToday };
  if (now >= birthdayEnd) birthday.setFullYear(year + 1);
  return { birthday, isBirthdayToday };
}

function updateCountdown() {
  const now = new Date();
  const { birthday, isBirthdayToday } = getBirthdayState(now);

  if (isBirthdayToday) {
    handleBirthday();
    return;
  }

  subtextEl.textContent = `Wish me a Happy Birthday on ${birthday.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
  })}!`;

  const diff = birthday - now;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minsEl.textContent = String(minutes).padStart(2, "0");
  secsEl.textContent = String(seconds).padStart(2, "0");
}

function handleBirthday() {
  if (hasCelebrated) return;
  hasCelebrated = true;
  countdownEl.hidden = true;
  subtextEl.textContent = "It's your birthday today—let's celebrate!";
  celebrationEl.style.display = "block";

  if (typeof window.confetti !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const duration = 15000;
  const animationEnd = Date.now() + duration;
  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      window.clearInterval(interval);
      return;
    }

    const particleCount = 50 * (timeLeft / duration);
    window.confetti({ particleCount, spread: 360, origin: { x: 0.2, y: 0.6 } });
    window.confetti({ particleCount, spread: 360, origin: { x: 0.8, y: 0.6 } });
  }, 250);
}

updateCountdown();
window.setInterval(updateCountdown, 1000);
