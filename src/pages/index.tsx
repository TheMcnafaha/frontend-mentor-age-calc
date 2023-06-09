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

type TypeAge = {
  year: number;
  month: number;
  day: number;
};
export type TypeInputAge = {
  year: number | undefined;
  month: number | undefined;
  day: number | undefined;
};
type TypePropAge = {
  age: TypeAge;
};
type AgeFormInput = {
  age: TypeAge;
  setInputAge: Function;
  inputAge: TypeInputAge;
};
type TypeStateAge = {
  nextAge: Function;
};

class FormatError extends Error {}

function CalendarComponent() {
  const [age, setAge] = useState({ year: 38, month: 3, day: 26 } as TypeAge);
  //input age servers as the state thats update eveytime the input changes, and when form is submitted & inputAge has passed all tests, inputAge becomes the new age
  const [inputAge, setInputAge] = useState({
    year: undefined,
    month: undefined,
    day: undefined,
  } as TypeInputAge);

  const test = { month: 11, year: 11, day: 11 } as TypeAge;
  function nextAge(nextAge: TypeAge) {
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
  function determineInputError(
    arg: Number | undefined,
    start: Number,
    end: Number
  ): Boolean {
    if (arg === undefined) {
      return false;
    }
    if (arg <= end && arg >= start) {
      return true;
    }
    return false;
  }
  const dayError = determineInputError(inputAge.day, 1, 31);
  const monthError = determineInputError(inputAge.month, 1, 12);
  const yearError = determineInputError(
    inputAge.year,
    0,
    new Date().getFullYear()
  );
  return (
    <>
      <div className="mt-5 flex">
        <CalendarInput
          id={"day"}
          setState={setInputAge}
          isError={dayError}
          errorMessage={"Must be a valid day"}
          state={inputAge}
        ></CalendarInput>

        <CalendarInput
          id={"month"}
          setState={setInputAge}
          state={inputAge}
          isError={monthError}
          errorMessage={"Must be a valid month "}
        ></CalendarInput>

        <CalendarInput
          id={"year"}
          setState={setInputAge}
          state={inputAge}
          errorMessage={"Must be in the past"}
          isError={yearError}
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
function getAge(birth_date: Date, present: Date = new Date()): TypeAge {
  const age: TypeAge = {
    year: 0,
    month: 0,
    day: 0,
  };

  // all deltas assume <0 to mean that the DOB is behind of present; that 0 means DOB is present; and that >0 means DOB is ahead of present
  const monthDelta = birth_date.getMonth() - present.getMonth();
  const dayDelta = birth_date.getDate() - present.getDate();
  const yearDelta = present.getFullYear() - birth_date.getFullYear();
  const todayIsBday: boolean = dayDelta === 0 && monthDelta === 0;
  if (todayIsBday) {
    age.year = present.getFullYear() - birth_date.getFullYear();
    return age;
  }

  const bdayHasPassed: boolean = isBdayInThePast(monthDelta, dayDelta);
  if (bdayHasPassed) {
    console.log("bday passed");

    age.year = yearDelta;
    age.month = monthDelta;
    age.day = dayDelta;
    return age;
  }
  // bday hasnt passed, so the person's ageis one year behind yearD
  age.year = yearDelta - 1;
  const lastDayOfPresentMonth = getLastDayInMonth(present.getMonth());

  //mF is used to account for the months passed from the present and last year
  const monthFix = 11 - birth_date.getMonth() + present.getMonth();
  // dF is used to account for when going a full month into the future would put time ahead of bday
  // for example, a  dob of 2003-6-25 and  a present time of 2023-6-24 can't be a month away
  if (dayDelta > 0) {
    const sameMonth: boolean = present.getMonth() === birth_date.getMonth();
    if (sameMonth) {
      // bday is less than a month away
      age.month = 11;
      const lastDayOf11thMonth = getLastDayInMonth(birth_date.getMonth());
      const dayGapBetween11And12Month =
        lastDayOf11thMonth - birth_date.getDate();
      age.day = dayGapBetween11And12Month + present.getDate();
      return age;
    }
    age.month = 11 - birth_date.getMonth() + present.getMonth();
    age.day = birth_date.getDate() - present.getDate();
    return age;
  }
  if (dayDelta === 0) {
    // bday is a perfect number of months away, so a month is added and days are left at 0 bc there's a full month-worth of days thats "rounded" as another month
    age.month = monthFix + 1;
    return age;
  }
  // code that runs here has to take into account that bday and present are a fraction of a month  ahead
  // for example, DOB of 2003-11-22 and present of 2023-5-24 cant be a whole 6 months since that gives 2023-11-24, nor a whole 5 months since that would behind the bday
  age.month = monthFix;
  const lastFullMonth = birth_date.getMonth() - present.getMonth() + 1;
  age.day =
    getLastDayInMonth(lastFullMonth) - present.getDate() + birth_date.getDate();
  return age;
}

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
const myDOB: Date = new Date(2003, 11 - 1, 22);

function testIterator(fn: Function, args: Array<any>, output: Array<any>) {
  if (args.length !== output.length) {
    throw Error("Unmatchings arrs!!!!");
  }

  for (let index = 0; index < args.length; index++) {
    const elements = args[index];
    if (JSON.stringify(fn(...elements)) === JSON.stringify(output[index])) {
      console.log(
        `Passed: ${JSON.stringify(fn(...elements))} -->== ${JSON.stringify(
          output[index]
        )}`
      );
    } else {
      console.log(
        `Failed: ${JSON.stringify(fn(...elements))} -->!= ${JSON.stringify(
          output[index]
        )} \n for: ${args[index]}`
      );
      break;
    }
  }
}

const testAgeArgs = [
  [new Date(2003, 5 - 1, 24), new Date(2023, 5 - 1, 24)],
  [new Date(2003, 5 - 1, 25), new Date(2023, 5 - 1, 24)],
  [new Date(2003, 6 - 1, 24), new Date(2023, 5 - 1, 24)],
  [myDOB, new Date(2023, 5 - 1, 24)],
  [myDOB, new Date(2023, 6 - 1, 2)],
];
const testAgeOutput: Array<TypeAge> = [
  { year: 20, month: 0, day: 0 },
  { year: 19, month: 11, day: 29 },
  { year: 19, month: 11, day: 0 },
  { year: 19, month: 5, day: 29 },
  { year: 19, month: 6, day: 20 },
];

testIterator(getAge, testAgeArgs, testAgeOutput);
export default Home;
