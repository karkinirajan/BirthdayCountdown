# Birthday Countdown 🎉

A sleek and interactive web application to count down to a special birthday! This project leverages HTML, CSS, and JavaScript to provide a dynamic and visually appealing countdown timer.

### 🌐 Live Demo

Check out the live version here: [Birthday Countdown](https://birthdaycountdown.netlify.app/)

---

## 📋 Features

- **Dynamic Countdown**:
  Automatically calculates and updates the countdown for the next birthday.

- **Modern Design**:
  Polished and responsive design with smooth animations and hover effects.

- **Real-Time Updates**:
  Countdown updates every second, displaying days, hours, minutes, and seconds.

- **Custom Animations**:
  Interactive animations for a delightful user experience.

- **Responsive**:
  Fully optimized for mobile, tablet, and desktop devices.

---

## 🛠️ Development

No build step and no runtime dependencies. Requires Node 24 (see `.nvmrc`) only for tests and the dev server.

```bash
npm start      # serves the site at http://localhost:5501 (python3 http.server)
npm test       # node:test unit tests for the date logic
```

The birthday is configured in `src/countdown.js` (`BIRTHDAY`, zero-indexed month). Confetti is skipped when the visitor prefers reduced motion.

### Project structure

```
index.html, style.css   page and styles
script.js               DOM wiring (ES module)
src/countdown.js        pure date/countdown logic
tests/                  node:test unit tests
images/                 background and photos
```

Dependency versions: [VERSIONS.md](./VERSIONS.md).
