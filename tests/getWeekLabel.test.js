import assert from "node:assert/strict";
import test from "node:test";
import dayjs from "dayjs";
import { getWeekLabel } from "../src/utils/drawHeader/getWeekLabel.ts";

test("a Sunday start labels the first Monday block as ISO week 40", () => {
  const firstDay = dayjs("2026-09-27");
  assert.equal(getWeekLabel(firstDay, 0), 40);
  assert.equal(getWeekLabel(firstDay, 1), 41);
});

test("a Monday start labels successive blocks with their ISO weeks", () => {
  const firstDay = dayjs("2026-09-28");
  assert.deepEqual(
    [0, 1, 2].map((index) => getWeekLabel(firstDay, index)),
    [40, 41, 42]
  );
});

test("a mid-week start labels the partial first block with its Monday's ISO week", () => {
  const firstDay = dayjs("2026-09-30");
  assert.deepEqual(
    [0, 1, 2].map((index) => getWeekLabel(firstDay, index)),
    [40, 41, 42]
  );
});

test("a span crossing into 2027 includes ISO week 53 before week 1", () => {
  const firstDay = dayjs("2026-12-21");
  assert.deepEqual(
    [0, 1, 2, 3].map((index) => getWeekLabel(firstDay, index)),
    [52, 53, 1, 2]
  );
});

test("a Sunday before ISO week 53 follows the Monday blocks into 2027", () => {
  const firstDay = dayjs("2026-12-27");
  assert.deepEqual(
    [0, 1, 2].map((index) => getWeekLabel(firstDay, index)),
    [53, 1, 2]
  );
});

test("a mid-week start in January still labels the partial block as ISO week 53", () => {
  const firstDay = dayjs("2027-01-01");
  assert.deepEqual(
    [0, 1].map((index) => getWeekLabel(firstDay, index)),
    [53, 1]
  );
});

test("a 52-week ISO year rolls over directly to week 1", () => {
  const firstDay = dayjs("2025-12-22");
  assert.deepEqual(
    [0, 1].map((index) => getWeekLabel(firstDay, index)),
    [52, 1]
  );
});
