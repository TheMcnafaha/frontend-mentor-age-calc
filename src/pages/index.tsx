import { log } from "console";
import { type NextPage } from "next";
import Head from "next/head";
import next from "next/types";
import { useState } from "react";
import { date } from "zod";
import InputError from "../components/InputError";
import { CalendarInput } from "../components/CalendarInput";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Age App Calculator</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/calculator-svgrepo-com.svg" />
      </Head>
      <main className="flex  min-h-screen flex-col  items-center  bg-template_off_white font-['Poppins']">
        <CalendarComponent />
      </main>
    </>
  );
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
export type TypeInputAge = {
  year: number | undefined | "YYYY";
  month: number | undefined | "MM";
  day: number | undefined | "DD";
};
type TypePropAge = {
  age: DisplayAge;
};
type AgeFormInput = {
  age: DisplayAge;
  setInputAge: Function;
  inputAge: TypeInputAge;
};
type TypeStateAge = {
  nextAge: Function;
};

class FormatError extends Error {}

function CalendarComponent() {
  const [age, setAge] = useState({
    year: "--",
    month: "--",
    day: "--",
  } as DisplayAge);
  //input age servers as the state thats update eveytime the input changes, and when form is submitted & inputAge has passed all tests, inputAge becomes the new age
  const [inputAge, setInputAge] = useState({
    year: "YYYY",
    month: "MM",
    day: "DD",
  } as TypeInputAge);

  const test = { month: 11, year: 11, day: 11 } as DisplayAge;
  function nextAge(nextAge: DisplayAge) {
    setAge(nextAge);
  }
  return (
    <div className=" mt-20 flex max-w-[340px] flex-col rounded-2xl rounded-br-[4.5em] bg-[#fff] px-6 py-4 shadow-sm lg:max-w-[400px] ">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();

          const allInputsAreNumbers: boolean = Object.values(inputAge).every(
            (e) => {
              return Number(e);
            }
          );
          if (allInputsAreNumbers) {
            setAge(
              getAge(new Date(inputAge.year, inputAge.month - 1, inputAge.day))
            );
          }
        }}
      >
        <AgeFormInput age={age} setInputAge={setInputAge} inputAge={inputAge} />
        <AgeFormSubmit />
      </form>

      <DisplayResult age={age} />
    </div>
  );
}
function AgeFormInput({ age, setInputAge, inputAge }: AgeFormInput) {
  function isInputError(
    number: number | undefined,
    start: number,
    end: number,
    message: string
  ) {
    if (number === undefined) {
      return message;
    }
    const numTooBig = number > end;
    const numTooSmall = number < start;
    if (!numTooBig && !numTooSmall) {
      return "";
    }
    return message;
  }

  function isYearInputError(currentInput: TypeInputAge): String {
    const undefinedDay = currentInput.day === undefined;
    const undefinedMonth = currentInput.month === undefined;
    const undefinedYear = currentInput.year === undefined;
    if (undefinedDay || undefinedMonth || undefinedYear) {
      return "";
    }
    const isDayNumber = !Number.isNaN(currentInput.day);
    const isMonthNumber = !Number.isNaN(currentInput.month);
    const isYearNumber = !Number.isNaN(currentInput.year);
    let message = "";
    if (isDayNumber && isMonthNumber && isYearNumber) {
      const presentEpoch = new Date().getTime();
      const currentEpoch = new Date(
        currentInput.year,
        currentInput.month,
        currentInput.day
      ).getTime();
      if (currentEpoch > presentEpoch) {
        message = "Must be in the past";
      }
    }
    return message;
  }
  function resetToDefault(defaultTrigger: String, defaultValue: String) {}
  const dayError = isInputError(inputAge.day, 1, 31, "Must be a valid day");
  const monthError = isInputError(
    inputAge.month,
    1,
    12,
    "Must be a valid month"
  );
  const yearError = isYearInputError(inputAge);

  return (
    <>
      <div className="mt-5 flex">
        <CalendarInput
          id={"day"}
          setState={setInputAge}
          errorMessage={dayError}
          state={inputAge}
        ></CalendarInput>

        <CalendarInput
          id={"month"}
          setState={setInputAge}
          state={inputAge}
          errorMessage={monthError}
        ></CalendarInput>

        <CalendarInput
          id={"year"}
          setState={setInputAge}
          state={inputAge}
          errorMessage={yearError}
        ></CalendarInput>
      </div>
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

function DisplayResult({ age }: TypePropAge) {
  const myTime: Date = new Date();
  return (
    <>
      <h1 className="mb-6 text-5xl font-extrabold italic">
        <span className=" text-template_purple">{age.year}</span> years
        <br></br>
        <span className=" text-template_purple">{age.month}</span> months
        <br></br>
        <span className=" text-template_purple">{age.day}</span> days
      </h1>
    </>
  );
}

// This fn works more like "time till my bday, with years since my bday added" than an aprox of time lived bc this method aligns better with human's view of age
// since age is realitive to bdays, not some binding unir of time like the number of milliseconds since DOB
// however, this approach has "carry over months", meaning a person will often have more months than the year
// eg: a DOB of 2003-11-22 and a present time of 2023-5-22 would have lived for 19 years and 6 months bc while the present year has 5 months, they lived the one month from nov 22 to dec 22 of 2022
// 2+3+2+2+2+2+3+2+2+2+3 +(37+11+39+58+19+37+49+55+41+18+5+43)/60
function getAge(birth_date: Date, present: Date = new Date()): DisplayAge {}

// check to see if person's bday has passed or not
function isBdayInThePast(monthD: number, dayD: number): boolean {
  if (monthD < 0) {
    return true;
  }
  if (monthD === 0 && dayD < 0) {
    return true;
  }
  return false;
}

function getLastDayInMonth(
  month: number,
  year: number = new Date().getFullYear()
): number {
  const lastDay = new Date(year, month, 0);

  return lastDay.getDate();
}

function makeAge(year: number, month: number, day: number): Age {
  return {
    year: year,
    month: month,
    day: day,
  };
}
function presentAge(): Age {
  const present = new Date();
  return {
    year: present.getFullYear(),
    month: present.getMonth() + 1,
    day: present.getDate(),
  };
}

function fullYearDifference(date1: Age, date2: Age): boolean {
  if (date1.month === date2.month && date1.day === date2.day) {
    return true;
  }
  return false;
}

function getAgeDiffOnFutureOrPresentBday(
  DOB: Age,
  present: Age = presentAge()
): Age {
  const outputDate: Age = {
    year: 0,
    month: 0,
    day: 0,
  };
  const datesAreIdentical = fullYearDifference(present, DOB);
  if (datesAreIdentical) {
    outputDate.year = present.year - DOB.year;
    return outputDate;
  }
  outputDate.year = present.year - DOB.year - 1;
  const perfectMonthDiff = present.day === DOB.day;

  const monthsFromYearPassed = 12 - DOB.month;
  if (perfectMonthDiff) {
    console.log("pef month");

    console.log(monthsFromYearPassed);

    outputDate.month = present.month + monthsFromYearPassed;
    return outputDate;
  }
  const wholeMonthStepOvershootBday = present.day - DOB.day > 0;
  const referenceWholeMonthStep = {
    year: present.year,
    month: present.month,
    day: DOB.day,
  } as Age;
  if (wholeMonthStepOvershootBday) {
    console.log(`overshooting!!!`, referenceWholeMonthStep);
    const dayDelta = present.day - DOB.day;
    console.log("ddelta", dayDelta);

    outputDate.month = referenceWholeMonthStep.month + monthsFromYearPassed - 1;
    outputDate.day = dayDelta;
    return outputDate;
  }
  return outputDate;
}
function getLastDayOfMonth(age: Age): number {
  const dateOfMonth = new Date(age.year, age.month - 1, 0);
  return dateOfMonth.getDate();
}
const testDate = makeAge(2023, 6, 15);
const testAgeArgs = [
  // test a perfect year difference
  [makeAge(2003, 6, 15), testDate],
];
const testAgeOutput: Array<Age> = [];
const myDOB = makeAge(2003, 11, 22);
function testAgeFn(age: Age, present: Age, expectedOutput) {
  const result = getAgeDiffOnFutureOrPresentBday(age, present);
  let message = `Passed :) \n ${JSON.stringify(age)}  ${JSON.stringify(
    present
  )} --> ${JSON.stringify(expectedOutput)}`;
  for (let index = 0; index < Object.keys(age).length; index++) {
    const currentKey = Object.keys(age)[index] as keyof object;
    if (result[currentKey] != expectedOutput[currentKey]) {
      message = `Failed :O ${JSON.stringify(age)}  ${JSON.stringify(
        present
      )}\n  ${JSON.stringify(result)}  -/-> ${JSON.stringify(expectedOutput)}`;
      break;
    }
  }
  return message;
}
// testIterator(getAge, testAgeArgs, testAgeOutput);

// test for a full year difference
console.log(testAgeFn(makeAge(2003, 6, 15), testDate, makeAge(20, 0, 0)));
// test for a future bday with full month D
console.log(testAgeFn(makeAge(2003, 7, 15), testDate, makeAge(19, 11, 0)));
//tests for a future bday where a whole-month-step overshoots bday
console.log(testAgeFn(makeAge(2003, 7, 10), testDate, makeAge(19, 11, 5)));
console.log(
  testAgeFn(makeAge(2003, 7, 10), makeAge(2023, 4, 27), makeAge(19, 10, 17))
);

export default Home;
