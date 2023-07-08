import { render, screen } from "@testing-library/react";
import { getAgeDiff } from "../pages/index";
import "@testing-library/jest-dom";
function makeAge(year, month, day) {
  return {
    year: year,
    month: month,
    day: day,
  };
}

test("wokrs xdddd", () => {
  expect(makeAge(19, 0, 0)).toStrictEqual({ year: 19, month: 0, day: 0 });
});
