import { type NextPage } from "next";
import Head from "next/head";
import next from "next/types";
import { useState } from "react";
import { date } from "zod";

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
type TypeInputAge = {
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
              getAge(new Date(inputAge.year, inputAge.month, inputAge.day))
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
  return (
    <>
      <div className="mt-5 flex">
        <div className="flex w-1/3 flex-col pr-5 ">
          <label
            htmlFor="day"
            className=" text-xs font-light uppercase text-template_smokey_grey"
          >
            Day
          </label>
          <input
            className="m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey hover:ring-template_purple  "
            type="text"
            inputMode="numeric"
            id="day"
            defaultValue={age.day}
            onChange={(e) => {
              const nextDay = e.target.value;
              setInputAge({ ...inputAge, day: nextDay });
            }}
          />
        </div>

        <div className="flex w-1/3 flex-col pr-5 ">
          <label
            htmlFor="month"
            className=" text-xs font-light uppercase text-template_smokey_grey"
          >
            Month
          </label>
          <input
            className="m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey hover:ring-template_purple  "
            type="text"
            inputMode="numeric"
            id="month"
            defaultValue={age.month}
            onChange={(e) => {
              const nextMonth = e.target.value;
              setInputAge({ ...inputAge, month: nextMonth });
            }}
          />
        </div>

        <div className="flex w-1/3 flex-col pr-5 ">
          <label
            htmlFor="year"
            className=" text-xs font-light uppercase text-template_smokey_grey"
          >
            Year
          </label>
          <input
            className="m-1  ml-[.10rem] cursor-pointer  rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey hover:ring-template_purple  "
            type="text"
            inputMode="numeric"
            id="year"
            defaultValue={age.year}
            onChange={(e) => {
              const nextYear = e.target.value;
              setInputAge({ ...inputAge, year: nextYear });
            }}
          />
        </div>
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
          className=" z-10 mb-4 mt-5  flex h-16  w-16 rounded-full bg-template_purple p-4 hover:bg-template_off_black"
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
      <h1 className="  mb-6  text-5xl font-extrabold italic ">
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

  if (
    birth_date.getDate() === present.getDate() &&
    birth_date.getMonth() === present.getMonth()
  ) {
    age.year = present.getFullYear() - birth_date.getFullYear();
    return age;
  }

  // check to see if person's bday has passed or not
  if (
    birth_date.getMonth() < present.getMonth() ||
    (birth_date.getMonth() === present.getMonth() &&
      birth_date.getDate() < present.getDate())
  ) {
    // code runs only if bday has passed
    const monthDelta = birth_date.getMonth() - present.getMonth();
    const dayDelta = birth_date.getDate() - present.getDate();
    const yearDelta = present.getFullYear() - birth_date.getFullYear();
    age.year = yearDelta;
    age.month = monthDelta;
    age.day = dayDelta;
  } else {
    // code runs only if bday has yet to pass
    age.year = present.getFullYear() - birth_date.getFullYear() - 1;

    if (birth_date.getMonth() === present.getMonth()) {
      const lastDayOfPreviousPresentMonth = new Date(
        present.getFullYear(),
        present.getMonth() - 1,
        0
      ).getDate();
      const dayGapOfPreviousAndPresentMonth =
        lastDayOfPreviousPresentMonth - birth_date.getDate();
      age.month = 11;
      age.day = dayGapOfPreviousAndPresentMonth + present.getDate();
    } else {
      age.month = 12 - birth_date.getMonth() + present.getMonth();
      age.day = present.getDate() - birth_date.getDate();
    }
  }
  return age;
}

const myDOB: Date = new Date("November 22,2003 ");

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
        )}`
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
];
const testAgeOutput: Array<TypeAge> = [
  { year: 20, month: 0, day: 0 },
  { year: 19, month: 11, day: 30 },
  { year: 19, month: 11, day: 0 },
  { year: 19, month: 6, day: 2 },
];

testIterator(getAge, testAgeArgs, testAgeOutput);
export default Home;
