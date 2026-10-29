import assert from "node:assert/strict";
import { test } from "node:test";
import { BIRTHDAY, getBirthdayState, getCountdownParts } from "../src/countdown.js";

const sept28 = (year, h = 0, m = 0, s = 0) => new Date(year, BIRTHDAY.month, BIRTHDAY.day, h, m, s);

test("before the birthday: counts toward this year", () => {
  const { birthday, isBirthdayToday } = getBirthdayState(new Date(2026, 0, 15));
  assert.equal(isBirthdayToday, false);
  assert.deepEqual(birthday, sept28(2026));
});

test("on the birthday: flagged, start and end of day included/excluded correctly", () => {
  assert.equal(getBirthdayState(sept28(2026)).isBirthdayToday, true);
  assert.equal(getBirthdayState(sept28(2026, 23, 59, 59)).isBirthdayToday, true);
  assert.equal(getBirthdayState(new Date(2026, 8, 29)).isBirthdayToday, false);
});

test("after the birthday: rolls over to next year", () => {
  const { birthday, isBirthdayToday } = getBirthdayState(new Date(2026, 9, 29));
  assert.equal(isBirthdayToday, false);
  assert.deepEqual(birthday, sept28(2027));
});

test("custom birthday date is honoured", () => {
  const { birthday } = getBirthdayState(new Date(2026, 0, 1), { month: 1, day: 14 });
  assert.deepEqual(birthday, new Date(2026, 1, 14));
});

test("countdown parts split into days/hours/minutes/seconds", () => {
  const now = new Date(2026, 8, 20, 0, 0, 0);
  const target = new Date(2026, 8, 21, 2, 3, 4);
  assert.deepEqual(getCountdownParts(target, now), {
    days: "01",
    hours: "02",
    minutes: "03",
    seconds: "04",
  });
});

test("countdown parts zero-pad and never go negative", () => {
  const now = new Date(2026, 8, 28, 12);
  assert.deepEqual(getCountdownParts(new Date(2026, 8, 28, 11), now), {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
});
