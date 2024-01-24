import type {
  NeoError,
  InputAge,
  StateSubmitFn,
  DisplayAge,
  Display,
} from "./CalendarForm";
import type { ErrorObj } from "../components/CalendarInput";
import { MyLocale } from "~/locales/allLocales";
type PossibleAge = {
  year: string | number | string;
  month: string | number | string;
  day: string | number | string;
};
type Age = {
  year: number;
  month: number;
  day: number;
};

function makeTS_ReturnNumber(
  friendlyNumber: string | number | undefined
): number {
  if (friendlyNumber === undefined) {
    return -1;
  }
  const isString = typeof friendlyNumber === "string";
  const argToPass = isString ? parseInt(friendlyNumber, 10) : friendlyNumber;
  const isNumber = Number.isInteger(argToPass);
  if (isNumber) {
    return argToPass;
  }
  return -1;
}

//runtime errors
export function getNewDisplayAge(
  currentAge: InputAge,
  isSubmit: boolean,
  setSubmit: StateSubmitFn
): Display {
  const outputAge: DisplayAge = {
    year: "--",
    month: "--",
    day: "--",
  };
  const emptyAge: DisplayAge = {
    year: "--",
    month: "--",
    day: "--",
  };
  const monthNum = makeInputAgeNumber(currentAge.month, [0, 12]);
  const yearNum = makeInputAgeNumber(currentAge.year, [
    0,
    new Date().getFullYear(),
  ]);
  const dayNum = makeInputAgeNumber(currentAge.day, [
    0,
    actualLastDayOfMonth({
      year: yearNum,
      month: monthNum,
      day: makeTS_ReturnNumber(currentAge.day),
    }),
  ]);

  const isNotValidDay = dayNum === -1;
  const isNotValidMonth = monthNum === -1;
  const isNotValidYear = yearNum === -1;
  if (isSubmit) {
    // we do what we must because we can't afford reading documentation
    setTimeout(() => {
      setSubmit(false);
    }, 0);
    return { age: emptyAge, error: "" };
  }
  // check for default values or if all inputs are empty
  if (isNotValidDay || isNotValidMonth || isNotValidYear) {
    return { age: outputAge, error: " " };
  }

  const isYearError = dispayYearError(currentAge);
  const isDayError = checkForDayError(currentAge);
  if (isYearError.isError) {
    return { age: emptyAge, error: isYearError.errorMessage };
  }
  if (isDayError.isError) {
    return { age: emptyAge, error: isDayError.errorMessage };
  }
  outputAge.day = dayNum;
  outputAge.month = monthNum;
  outputAge.year = yearNum;
  return { age: outputAge, error: " " };
}
function makeInputAgeNumber(
  arg: string | number | undefined,
  range: [number, number]
): number {
  if (arg === undefined) {
    return -1;
  }
  const isString = typeof arg === "string";
  const argToPass = isString ? parseInt(arg, 10) : arg;
  const isNumber = Number.isInteger(argToPass);
  if (isNumber) {
    if (argToPass >= range[0] && argToPass < range[1]) {
      return argToPass;
    }
  }
  return -1;
}
function actualLastDayOfMonth(age: Age): number {
  const dateOfMonth = new Date(age.year, age.month, 0);
  return dateOfMonth.getDate();
}
function dispayYearError(possibeAge: InputAge): ErrorObj {
  if (possibeAge.year === "YYYY") {
    return { isError: true, errorMessage: "" };
  }
  const isDay = Number.isInteger(possibeAge.day);
  const isMonth = Number.isInteger(possibeAge.month);
  const isYear = Number.isInteger(possibeAge.year);
  // return { isError: true, errorMessage: "test" };
  if (makeTS_ReturnNumber(possibeAge.year) < 0) {
    console.log(possibeAge.year, makeTS_ReturnNumber(possibeAge.year));

    return { isError: true, errorMessage: "Date must be older than 0 CE" };
  }
  if (isDay && isMonth && isYear) {
    const presentEpoch = new Date().getTime();
    const inputEpoch = new Date(
      makeTS_ReturnNumber(possibeAge.year),
      makeTS_ReturnNumber(possibeAge.month),
      makeTS_ReturnNumber(possibeAge.day)
    ).getTime();
    if (inputEpoch > presentEpoch) {
      return { isError: true, errorMessage: "Must be in the past" };
    }
  }
  return { isError: false, errorMessage: " " };
}
export function checkForDayError(
  possibleAge: InputAge,
  currentLocale: MyLocale
): NeoError {
  if (possibleAge.day === "DD") {
    return { isError: true, errorMessage: " " };
  }
  const isDay = Number.isInteger(possibleAge.day);
  const isMonth = Number.isInteger(possibleAge.month);
  const isYear = Number.isInteger(possibleAge.year);

  if (isDay && isMonth && isYear) {
    const shouldBeAge: Age = {
      year: makeTS_ReturnNumber(possibleAge.year),
      month: makeTS_ReturnNumber(possibleAge.month),
      day: makeTS_ReturnNumber(possibleAge.day),
    };
    const lastPossibleDay = actualLastDayOfMonth(shouldBeAge);
    const monthName = new Date(
      shouldBeAge.year,
      shouldBeAge.month - 1,
      1
    ).toLocaleString(currentLocale.locale, { month: "long" });

    if (shouldBeAge.day > lastPossibleDay) {
      return {
        isError: true,
        errorMessage: `${currentLocale.errors.checkDay.start} ${monthName} ${shouldBeAge.year} ${currentLocale.errors.checkDay.middle} ${lastPossibleDay}${currentLocale.errors.checkDay.end}`,
      } as ErrorObj;
    }
    return { isError: false, errorMessage: "" };
  }
  return { isError: false, errorMessage: "" };
}
export function checkForYearError(
  possibeAge: PossibleAge,
  currentYear: string
): NeoError {
  const isDay = Number.isInteger(possibeAge.day);
  const isMonth = Number.isInteger(possibeAge.month);
  const isYear = Number.isInteger(possibeAge.year);

  if (!currentYear) {
    return { isError: false, errorMessage: "" };
  }
  if (currentYear === "YYYY") {
    return { isError: true, errorMessage: "" };
  }
  if (makeTS_ReturnNumber(possibeAge.year) < 0) {
    console.log(possibeAge.year, makeTS_ReturnNumber(possibeAge.year));

    return { isError: true, errorMessage: "Date must be older than 0 CE" };
  }
  if (isDay && isMonth && isYear) {
    const presentEpoch = new Date().getTime();
    const inputEpoch = new Date(
      makeTS_ReturnNumber(possibeAge.year),
      makeTS_ReturnNumber(possibeAge.month),
      makeTS_ReturnNumber(possibeAge.day)
    ).getTime();
    if (inputEpoch > presentEpoch) {
      return { isError: true, errorMessage: "Must be in the past" };
    }
  }
  return { isError: false, errorMessage: "" };
}
