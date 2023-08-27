import { CalendarInput } from "../components/CalendarInput";
import type { Dispatch, SetStateAction } from "react";
import type { ErrorObj } from "../components/CalendarInput";
import { useState } from "react";
import { NextPage } from "next";
type Display = {
  age: DisplayAge;
  error: string;
};
export type TypePropAge = {
  display: Display;
  error: NeoError;
};
type Age = {
  year: number;
  month: number;
  day: number;
};
type DisplayAge = {
  year: number | "--";
  month: number | "--";
  day: number | "--";
};
export type InputAge = {
  year: number | undefined | "YYYY";
  month: number | undefined | "MM";
  day: number | undefined | "DD";
};
type AgeFormInput = {
  age: DisplayAge;
  setInputAge: StateInputAgeFn;
  inputAge: InputAge;
  display: Display;
};
export type NeoError = {
  isError: boolean;
  errorMessage: string;
};

type StateInputAgeFn = Dispatch<SetStateAction<InputAge>>;
export const Refactor: NextPage = () => {
  //input age servers as the state thats update eveytime the input changes, and when form is submitted & inputAge has passed all tests, inputAge becomes the new age
  const [inputAge, setInputAge] = useState({
    year: "YYYY",
    month: "MM",
    day: "DD",
  } as InputAge);
  const [displayError, setdisplayError] = useState({
    isError: false,
    errorMessage: "test123",
  } as NeoError);
  const display: Display = getNewDisplayAge(inputAge);
  // const display: Display = { age: { year: 1, month: 1, day: 1 }, error: "lol" };
  return (
    <div className=" mt-20 flex max-w-[340px] flex-col rounded-2xl rounded-br-[4.5em] bg-[#fff] px-6 py-4 shadow-sm lg:max-w-[400px] ">
      <h1>This is the refactored one lul</h1>
      <AgeForm
        age={display.age}
        setInputAge={setInputAge}
        inputAge={inputAge}
        display={display}
      ></AgeForm>
      <DisplayResult display={display} error={displayError} />
    </div>
  );
};
function CalendarComponent() {
  //input age servers as the state thats update eveytime the input changes, and when form is submitted & inputAge has passed all tests, inputAge becomes the new age
  const [inputAge, setInputAge] = useState({
    year: "YYYY",
    month: "MM",
    day: "DD",
  } as InputAge);

  const display: Display = getNewDisplayAge(inputAge);
  // const display: Display = { age: { year: 1, month: 1, day: 1 }, error: "lol" };
  return (
    <div className=" mt-20 flex max-w-[340px] flex-col rounded-2xl rounded-br-[4.5em] bg-[#fff] px-6 py-4 shadow-sm lg:max-w-[400px] ">
      <AgeForm
        age={display.age}
        setInputAge={setInputAge}
        inputAge={inputAge}
        display={display}
      ></AgeForm>
      <DisplayResult display={display} />
    </div>
  );
}

function AgeForm({ setInputAge, display }: AgeFormInput) {
  const [dayInput, setDayInput] = useState("DD");

  const [monthInput, setmonthInput] = useState("MM");
  const [yearInput, setyearInput] = useState("YYYY");
  const currentAge = {
    year: parseInt(yearInput, 10),
    month: parseInt(monthInput, 10),
    day: parseInt(dayInput, 10),
  };
  const isYearError = checkForYearError(currentAge);
  const isDayError = checkForDayError(currentAge);
  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (isInputAgeSound(currentAge)) {
            const nextAge = getAgeDiff(currentAge);
            setInputAge(nextAge);
          } else {
            console.log("else wah lol");
          }
        }}
      >
        <div className="mt-5 flex">
          <CalendarInput
            maxInputLength={2}
            id={"day"}
            errorMessage={"Must be a valid day"}
            defaultValue="DD"
            errorRange={[1, 32]}
            textInput={dayInput}
            setTextInput={setDayInput}
            customError={isDayError}
          ></CalendarInput>
          <CalendarInput
            maxInputLength={2}
            id={"month"}
            errorMessage={"Must be a valid month"}
            defaultValue="MM"
            errorRange={[1, 13]}
            textInput={monthInput}
            setTextInput={setmonthInput}
            customError={{ isError: false, errorMessage: "" }}
          ></CalendarInput>
          <CalendarInput
            maxInputLength={4}
            id={"year"}
            errorMessage={"Must be in the past"}
            defaultValue="YYYY"
            errorRange={[-Infinity, new Date().getFullYear() + 1]}
            textInput={yearInput}
            setTextInput={setyearInput}
            customError={isYearError}
          ></CalendarInput>
        </div>
        <p className=" text-center text-base italic text-template_red">
          {display.error}
        </p>
        <AgeFormSubmit />
      </form>
    </>
  );
}
function DisplayResult({ display, error }: TypePropAge) {
  if (error.isError) {
    return (
      <>
        <h1 className="mb-6 text-5xl font-extrabold italic">
          <p>we got error</p>
          <p>{error.errorMessage}</p>
          <span className=" text-template_purple">--</span> years
          <br></br>
          <span className=" text-template_purple">--</span> months
          <br></br>
          <span className=" text-template_purple">--</span> days
        </h1>
      </>
    );
  }
  return (
    <>
      <h1 className="mb-6 text-5xl font-extrabold italic">
        <span className=" text-template_purple">{display.age.year}</span> years
        <br></br>
        <span className=" text-template_purple">{display.age.month}</span>{" "}
        months
        <br></br>
        <span className=" text-template_purple">{display.age.day}</span> days
      </h1>
    </>
  );
}
function AgeFormSubmit() {
  return (
    <>
      <div className="relative top-[53px] w-full ring-1 ring-template_ligth_grey"></div>
      <div className=" flex min-w-full justify-center lg:justify-end">
        <input
          className="  z-10 mb-4  mt-5 flex h-16 w-16 rounded-full  bg-template_purple p-4 hover:bg-template_off_black"
          id="nextAge"
          type="image"
          src="/icon-arrow.svg"
          alt="downpointing  arrow"
        />
      </div>
    </>
  );
}
export function getNewDisplayAge(currentAge: InputAge): Display {
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
  // if (currentDisplay.error != "") {
  //   return { age: outputAge, error: currentDisplay.error };
  // }
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
export function checkForYearError(possibeAge: PossibleAge): NeoError {
  const isDay = Number.isInteger(possibeAge.day);
  const isMonth = Number.isInteger(possibeAge.month);
  const isYear = Number.isInteger(possibeAge.year);

  if (makeTS_ReturnNumber(possibeAge.year) <= 0) {
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
function dispayYearError(possibeAge: InputAge): ErrorObj {
  const isDay = Number.isInteger(possibeAge.day);
  const isMonth = Number.isInteger(possibeAge.month);
  const isYear = Number.isInteger(possibeAge.year);
  // return { isError: true, errorMessage: "test" };
  if (makeTS_ReturnNumber(possibeAge.year) <= 0) {
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
export function checkForDayError(possibleAge: PossibleAge): NeoError {
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
    ).toLocaleString("default", { month: "long" });

    if (shouldBeAge.day > lastPossibleDay) {
      return {
        isError: true,
        errorMessage: `The last day of ${monthName} ${shouldBeAge.year} is the ${lastPossibleDay}th`,
      } as ErrorObj;
    }
    return { isError: false, errorMessage: "" };
  }
  return { isError: false, errorMessage: "" };
}
function isInputAgeSound(possibleAge: InputAge): boolean {
  const isDay = Number.isInteger(possibleAge.day);
  const isMonth = Number.isInteger(possibleAge.month);
  const isYear = Number.isInteger(possibleAge.year);
  if (isDay && isMonth && isYear) {
    return true;
  }
  return false;
}
export function getAgeDiff(DOB: Age, present: Age = presentAge()): Age {
  const wholeMonthPivot = {
    year: present.year,
    month: present.month,
    day: DOB.day,
  };

  const outputDate: Age = {
    year: 0,
    month: 0,
    day: 0,
  };
  outputDate.year = wholeMonthPivot.year - DOB.year;
  const bdayIsToday = fullYearDifference(present, DOB);
  if (bdayIsToday) {
    return outputDate;
  }
  const bdayHasPassed = hasBdayPassed(DOB, present);
  if (bdayHasPassed) {
    outputDate.month = present.month - DOB.month;
    if (present.day === wholeMonthPivot.day) {
      return outputDate;
    }
    if (present.day > wholeMonthPivot.day) {
      outputDate.day = present.day - wholeMonthPivot.day;
      return outputDate;
    }
    if (present.day < wholeMonthPivot.day) {
      outputDate.month--;
      const previousWholeMonthPivot: Age = {
        year: wholeMonthPivot.year,
        month: wholeMonthPivot.month - 2,
        day: wholeMonthPivot.day,
      };
      const dayFix =
        getLastDayOfMonth(previousWholeMonthPivot) - wholeMonthPivot.day;
      outputDate.day = present.day + dayFix;
      return outputDate;
    }
    return outputDate;
  }
  outputDate.year = outputDate.year - 1;
  const passedMonths = 12 - DOB.month;
  if (present.day === wholeMonthPivot.day) {
    outputDate.month = passedMonths + present.month;
    return outputDate;
  }
  outputDate.month = wholeMonthPivot.month + passedMonths;
  if (present.day > wholeMonthPivot.day) {
    outputDate.day = present.day - wholeMonthPivot.day;
    return outputDate;
  }
  if (present.day < wholeMonthPivot.day) {
    outputDate.month = outputDate.month - 1;
    const previousWholeMonthPivot: Age = {
      year: wholeMonthPivot.year,
      month: wholeMonthPivot.month - 2,
      day: wholeMonthPivot.day,
    };
    const dayFix =
      getLastDayOfMonth(previousWholeMonthPivot) - wholeMonthPivot.day;

    outputDate.day = present.day + dayFix;
    return outputDate;
  }
  return outputDate;
}
function presentAge(): Age {
  const present = new Date();
  return {
    year: present.getFullYear(),
    month: present.getMonth() + 1,
    day: present.getDate(),
  };
}
function getLastDayOfMonth(age: Age): number {
  //Minus one since rest of program indexes months at 1 while js indexes months at zero
  const dateOfMonth = new Date(age.year, age.month - 1, 0);
  return dateOfMonth.getDate();
}
function fullYearDifference(date1: Age, date2: Age): boolean {
  if (date1.month === date2.month && date1.day === date2.day) {
    return true;
  }
  return false;
}
function hasBdayPassed(bday: Age, referenceAge: Age): boolean {
  if (bday.month < referenceAge.month) {
    return true;
  }
  if (bday.month === referenceAge.month) {
    return bday.day < referenceAge.day;
  }
  return false;
}
