import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { CalendarInput } from "../components/CalendarInput";
import { ErrorObj } from "../components/CalendarInput";
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
export type InputAge = {
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
  inputAge: InputAge;
};

function CalendarComponent() {
  //input age servers as the state thats update eveytime the input changes, and when form is submitted & inputAge has passed all tests, inputAge becomes the new age
  const [inputAge, setInputAge] = useState({
    year: "YYYY",
    month: "MM",
    day: "DD",
  } as InputAge);

  const displayAge = getDisplayAge(inputAge);
  return (
    <div className=" mt-20 flex max-w-[340px] flex-col rounded-2xl rounded-br-[4.5em] bg-[#fff] px-6 py-4 shadow-sm lg:max-w-[400px] ">
      <AgeForm
        age={displayAge}
        setInputAge={setInputAge}
        inputAge={inputAge}
      ></AgeForm>
      <DisplayResult age={displayAge} />
    </div>
  );
}
function AgeForm({ age, setInputAge, inputAge }: AgeFormInput) {
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
  function isYearInputError(currentInput: PossibleAge): String {
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
        // js months are weird xddddddd
        currentInput.month - 1,
        currentInput.day
      ).getTime();
      if (currentEpoch > presentEpoch) {
        message = "Must be in the past";
      }
    }
    return message;
  }
  const dayError = isInputError(inputAge.day, 1, 31, "Must be a valid day");
  const monthError = isInputError(
    inputAge.month,
    1,
    12,
    "Must be a valid month"
  );
  const [dayInput, setDayInput] = useState("DD");

  const [monthInput, setmonthInput] = useState("MM");
  const [yearInput, setyearInput] = useState("YYYY");
  const currentAge = {
    year: parseInt(yearInput, 10),
    month: parseInt(monthInput, 10),
    day: parseInt(dayInput, 10),
  };
  const isYearError = checkForYearError(currentAge);
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
            customError={false}
          ></CalendarInput>
          <CalendarInput
            maxInputLength={2}
            id={"month"}
            errorMessage={"Must be a valid month"}
            defaultValue="MM"
            errorRange={[1, 13]}
            textInput={monthInput}
            setTextInput={setmonthInput}
            customError={false}
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
        <AgeFormSubmit />
      </form>
    </>
  );
}

type PossibleAge = {
  year: string | number | string;
  month: string | number | string;
  day: string | number | string;
};

function isInputAgeSound(possibleAge: InputAge): boolean {
  const isDay = Number.isInteger(possibleAge.day);
  const isMonth = Number.isInteger(possibleAge.month);
  const isYear = Number.isInteger(possibleAge.year);
  if (isDay && isMonth && isYear) {
    return true;
  }
  return false;
}
function checkForYearError(possibeAge: PossibleAge): false | ErrorObj {
  const isDay = Number.isInteger(possibeAge.day);
  const isMonth = Number.isInteger(possibeAge.month);
  const isYear = Number.isInteger(possibeAge.year);
  console.log("xdddddddd ", makeTS_ReturnNumber(possibeAge.year));

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
  return false;
}
function makeTS_ReturnNumber(friendlyNumber: any): number {
  if (Number.isInteger(friendlyNumber)) {
    return friendlyNumber;
  }
  return -1;
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
function hasBdayPassed(bday: Age, referenceAge: Age): boolean {
  if (bday.month < referenceAge.month) {
    return true;
  }
  if (bday.month === referenceAge.month) {
    return bday.day < referenceAge.day;
  }
  return false;
}

function getDisplayAge(currentAge: InputAge): DisplayAge {
  let outputAge: DisplayAge = {
    year: "--",
    month: "--",
    day: "--",
  };
  const dayNum = makeInputAgeNumber(currentAge.day, [0, 32]);
  const monthNum = makeInputAgeNumber(currentAge.month, [0, 12]);
  const yearNum = makeInputAgeNumber(currentAge.year, [
    0,
    new Date().getFullYear(),
  ]);
  if (dayNum !== -1) {
    outputAge.day = dayNum;
  }
  if (monthNum !== -1) {
    outputAge.month = monthNum;
  }
  if (yearNum !== -1) {
    outputAge.year = yearNum;
  }
  return outputAge;
}

function makeInputAgeNumber(any: any, range: [number, number]): number {
  if (Number.isInteger(any)) {
    if (any >= range[0] && any < range[1]) {
      return any;
    }
  }
  return -1;
}
function getAgeDiff(DOB: Age, present: Age = presentAge()): Age {
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
function getLastDayOfMonth(age: Age): number {
  //Minus one since rest of program indexes months at 1 while js indexes months at zero
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
function testAgeFn(
  age: Age,
  present: Age,
  expectedOutput: Age,
  desc: string
): testObj {
  const result = getAgeDiff(age, present);
  const output: testObj = {
    success: true,
    message: `${JSON.stringify(age)}  ${JSON.stringify(
      present
    )} --> ${JSON.stringify(expectedOutput)}`,
    desc: desc,
  };
  for (let index = 0; index < Object.keys(age).length; index++) {
    const currentKey = Object.keys(age)[index] as keyof object;
    if (result[currentKey] != expectedOutput[currentKey]) {
      output.message = `${JSON.stringify(age)}  ${JSON.stringify(
        present
      )}\n  ${JSON.stringify(result)}  -/-> ${JSON.stringify(expectedOutput)}`;
      output.success = false;
      break;
    }
  }
  return output;
}
// testIterator(getAge, testAgeArgs, testAgeOutput);
type testObj = {
  success: boolean;
  message: string;
  desc: string;
};
function evaluteTest(results: testObj[]): void {
  results.forEach((e) => {
    if (e.success) {
      console.log("Passed!!! \n", e.message);
    } else {
      console.log("failed :( \n", e.message);
    }
  });
  console.log(
    results.some((result) => result.success === false)
      ? "Summary: did not pass all tests :( "
      : "Passed all test wohoooo"
  );
}
const secondTestDate = makeAge(2023, 7, 2);

evaluteTest([
  // testAgeFn(
  //   makeAge(2003, 1, 23),
  //   testDate,
  //   makeAge(20, 4, 23),
  //   "test for a bday that has passed and WMP is ahead of present"
  // ),
  // testAgeFn(
  //   makeAge(2003, 5, 4),
  //   testDate,
  //   makeAge(20, 1, 11),
  //   "test for a bday that has passed and WMP is behind of present"
  // ),
  // testAgeFn(
  //   makeAge(2003, 3, 15),
  //   testDate,
  //   makeAge(20, 3, 0),
  //   "test for a bday that has passed with full month D"
  // ),
  // testAgeFn(
  //   makeAge(2003, 9, 27),
  //   testDate,
  //   makeAge(19, 8, 19),
  //   "test for a bday where WMP is ahead of present"
  // ),
  // testAgeFn(
  //   makeAge(2003, 7, 10),
  //   testDate,
  //   makeAge(19, 11, 5),
  //   "test for a future where a WMP is behind present"
  // ),
  // testAgeFn(
  //   makeAge(2003, 7, 10),
  //   testDate,
  //   makeAge(19, 11, 5),
  //   "test for a future where a WMP is behind present"
  // ),
  // testAgeFn(
  //   makeAge(2003, 7, 15),
  //   testDate,
  //   makeAge(19, 11, 0),
  //   "test for a future bday with full month D"
  // ),
  // testAgeFn(
  //   makeAge(2003, 6, 15),
  //   testDate,
  //   makeAge(20, 0, 0),
  //   "test for a full year difference"
  // ),
  // testAgeFn(
  //   makeAge(2003, 7, 3),
  //   secondTestDate,
  //   makeAge(19, 11, 29),
  //   "test for weird bug where date is passed wrong"
  // ),
]);
export default Home;
