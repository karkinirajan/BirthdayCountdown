import { getBirthdayState, getCountdownParts } from "./src/countdown.js";

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secsEl = document.getElementById("secs");
const countdownEl = document.getElementById("countdown");
const celebrationEl = document.getElementById("celebration");
const subtextEl = document.getElementById("subtext");
let hasCelebrated = false;

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

  const { days, hours, minutes, seconds } = getCountdownParts(birthday, now);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minsEl.textContent = minutes;
  secsEl.textContent = seconds;
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
