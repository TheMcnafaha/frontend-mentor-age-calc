// you run the test by typing "npm test" on srs dir
import "@testing-library/jest-dom";
import { getAgeDiff } from "../pages/index";
function makeAge(year, month, day) {
  return {
    year: year,
    month: month,
    day: day,
  };
}

const secondTestDate = makeAge(2023, 7, 2);
const testDate = makeAge(2023, 6, 15);
test("make age fn works", () => {
  expect(makeAge(19, 0, 0)).toStrictEqual({ year: 19, month: 0, day: 0 });
});

test(" test for a bday that has passed and WMP is ahead of present ", () => {
  expect(getAgeDiff(makeAge(2003, 1, 23), testDate)).toStrictEqual(
    makeAge(20, 4, 23)
  );
});
test(" test for a bday that has passed and WMP is behind of present", () => {
  expect(getAgeDiff(makeAge(2003, 5, 4), testDate)).toStrictEqual(
    makeAge(20, 1, 11)
  );
});
test(" test for a bday that has passed with full month D", () => {
  expect(getAgeDiff(makeAge(2003, 3, 15), testDate)).toStrictEqual(
    makeAge(20, 3, 0)
  );
});
test(" test for a bday where WMP is ahead of present", () => {
  expect(getAgeDiff(makeAge(2003, 9, 27), testDate)).toStrictEqual(
    makeAge(19, 8, 19)
  );
});
test(" test for a future where a WMP is behind present", () => {
  expect(getAgeDiff(makeAge(2003, 7, 10), testDate)).toStrictEqual(
    makeAge(19, 11, 5)
  );
});
test(" test for a future where a WMP is behind present", () => {
  expect(getAgeDiff(makeAge(2003, 7, 10), testDate)).toStrictEqual(
    makeAge(19, 11, 5)
  );
});
test(" test for a future bday with full month D", () => {
  expect(getAgeDiff(makeAge(2003, 7, 15), testDate)).toStrictEqual(
    makeAge(19, 11, 0)
  );
});
test(" test for a full year difference", () => {
  expect(getAgeDiff(makeAge(2003, 6, 15), testDate)).toStrictEqual(
    makeAge(20, 0, 0)
  );
});
test(" test for weird bug where date is passed wrong", () => {
  expect(getAgeDiff(makeAge(2003, 7, 3), secondTestDate)).toStrictEqual(
    makeAge(19, 11, 29)
  );
});
