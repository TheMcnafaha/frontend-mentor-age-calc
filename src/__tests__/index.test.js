// you run the test by typing "npm test" on srs dir
import "@testing-library/jest-dom";
import {
  getAgeDiff,
  checkForYearError,
  checkForDayError,
  getNewDisplayAge,
} from "../components/CalendarForm.tsx";
function makeAge(year, month, day) {
  return {
    year: year,
    month: month,
    day: day,
  };
}
// This test relate solely to the agediff fn
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
// this test relate soley to the year errors
const futureDate = makeAge(3023, 1, 1);
const reallyPastDate = makeAge(-420, 6, 9);
test("only dates from the past should be allowed", () => {
  expect(checkForYearError(futureDate)).toStrictEqual({
    isError: true,
    errorMessage: "Must be in the past",
  });
});
test("dates too past should error out", () => {
  expect(checkForYearError(reallyPastDate)).toStrictEqual({
    isError: true,
    errorMessage: "Date must be older than 0 CE",
  });
});
// tests solely for day errors
test("days should never be bigger than last day of month", () => {
  expect(checkForDayError(makeAge(2023, 2, 30))).toStrictEqual({
    isError: true,
    errorMessage: "The last day of February 2023 is the 28th",
  });
});
test("days should account for leap years", () => {
  expect(checkForDayError(makeAge(2020, 2, 29))).toStrictEqual(false);
});
// tests below relate to display errors
const emptyAge = {
  year: "--",
  month: "--",
  day: "--",
};
const febError = {
  age: emptyAge,
  error: {
    isError: true,
    errorMessage: "The last day of February 2023 is the 28th",
  },
};
test("display should error on days outside of month bound", () => {
  return expect(
    getNewDisplayAge(makeAge(2023, 2, 29)).error.isError
  ).toStrictEqual(true);
});
