// Pure countdown logic (no DOM access) so it can be unit tested.

// JavaScript months are zero-indexed: 8 is September.
export const BIRTHDAY = { month: 8, day: 28 };

/**
 * Work out which birthday to count toward and whether today is the birthday.
 * @param {Date} now
 * @param {{month: number, day: number}} [birthdayDate]
 * @returns {{birthday: Date, isBirthdayToday: boolean}}
 */
export function getBirthdayState(now, { month, day } = BIRTHDAY) {
  const year = now.getFullYear();
  const birthday = new Date(year, month, day);
  const birthdayEnd = new Date(year, month, day + 1);
  const isBirthdayToday = now >= birthday && now < birthdayEnd;

  if (isBirthdayToday) return { birthday, isBirthdayToday };
  if (now >= birthdayEnd) birthday.setFullYear(year + 1);
  return { birthday, isBirthdayToday };
}

/**
 * Split the time remaining until `birthday` into zero-padded display parts.
 * @param {Date} birthday
 * @param {Date} now
 * @returns {{days: string, hours: string, minutes: string, seconds: string}}
 */
export function getCountdownParts(birthday, now) {
  const diff = Math.max(0, birthday - now);
  const pad = (n) => String(Math.floor(n)).padStart(2, "0");
  return {
    days: pad(diff / 86400000),
    hours: pad((diff / 3600000) % 24),
    minutes: pad((diff / 60000) % 60),
    seconds: pad((diff / 1000) % 60),
  };
}
