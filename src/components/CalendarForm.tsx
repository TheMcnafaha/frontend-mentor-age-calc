import { CalendarInput } from "../components/CalendarInput";
import type { Dispatch, SetStateAction } from "react";
import { CalendarOutput } from "../components/CalendarOutput";
import { useContext, useState } from "react";
import type { NextPage } from "next";
import { EmptyOutput } from "./EmptyOutput";
import { getAgeDiff } from "./ageLogic";
import {
  checkForDayError,
  checkForYearError,
  getNewDisplayAge,
} from "./ageOutputLogic";
import { useRouter } from "next/router";
import { LangContext, MyLocale } from "~/locales/allLocales";
export type Display = {
  age: DisplayAge;
  error: string;
};
export type TypePropAge = {
  display: Display;
  error: NeoError;
};
export type DisplayAge = {
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
  currentYear: string;
  setCurrentYear: StateInputFn;
  currentMonth: string;
  setCurrentMonth: StateInputFn;
  currentDay: string;
  setCurrentDay: StateInputFn;
  submit: boolean;
  setSubmit: StateSubmitFn;
  resetOutput: OutputReset;
  currentLocale: MyLocale;
};
export type NeoError = {
  isError: boolean;
  errorMessage: string;
};

type NeoDisplay = {
  display: Display;
  error: NeoError;
  currentLocale: MyLocale;
};
type StateInputAgeFn = Dispatch<SetStateAction<InputAge>>;
type StateInputFn = Dispatch<SetStateAction<string>>;
export type StateSubmitFn = Dispatch<SetStateAction<boolean>>;
export type OutputReset = () => void;
export const CalendarForm: NextPage = () => {
  //input age servers as the state thats update eveytime the input changes, and when form is submitted & inputAge has passed all tests, inputAge becomes the new age
  const { locale } = useRouter();
  const locales = useContext(LangContext);
  let currentLocale = locales.en;
  if (locale === "es") {
    currentLocale = locales.es;
  }
  const [inputAge, setInputAge] = useState({
    year: "YYYY",
    month: "MM",
    day: "DD",
  } as InputAge);
  const [submitted, setsubmitted] = useState(false);
  const [year, setyear] = useState(currentLocale.abreviations.year);
  const [month, setmonth] = useState("MM");
  const [day, setday] = useState("DD");
  const display: Display = getNewDisplayAge(inputAge, submitted, setsubmitted);
  function resetOutput() {
    const defaultOutput = {
      year: currentLocale.abreviations.year,
      month: currentLocale.abreviations.month,
      day: currentLocale.abreviations.day,
    };
    if (display.age === inputAge) {
      return;
    }
    setInputAge(defaultOutput as InputAge);
  }
  return (
    <div className=" mt-20 flex max-w-[340px] flex-col rounded-2xl rounded-br-[4.5em] bg-[#fff] px-6 py-4 shadow-sm lg:max-w-[400px] ">
      <AgeForm
        age={display.age}
        setInputAge={setInputAge}
        inputAge={inputAge}
        display={display}
        currentDay={day}
        currentMonth={month}
        currentYear={year}
        setCurrentDay={setday}
        setCurrentMonth={setmonth}
        setCurrentYear={setyear}
        submit={submitted}
        setSubmit={setsubmitted}
        resetOutput={resetOutput}
        currentLocale={currentLocale}
      ></AgeForm>
    </div>
  );
};
function AgeForm({
  setInputAge,
  display,
  currentYear,
  currentMonth,
  currentDay,
  setCurrentYear,
  setCurrentMonth,
  setCurrentDay,
  submit,
  setSubmit,
  resetOutput,
  currentLocale,
}: AgeFormInput) {
  const dayInput = currentDay;
  const monthInput = currentMonth;
  const yearInput = currentYear;
  const currentAge = {
    year: parseInt(yearInput, 10),
    month: parseInt(monthInput, 10),
    day: parseInt(dayInput, 10),
  };
  const isYearError = checkForYearError(currentAge, yearInput);
  const isDayError = checkForDayError(currentAge, currentLocale);
  const displayError = getDisplayError([isYearError, isDayError]);
  console.log("my errors: ", isDayError, " from ", currentAge);

  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();

          setSubmit(!submit);
          // check to see if the input data is good enough to make a new age attempt
          if (isInputAgeSound(currentAge)) {
            const nextAge = getAgeDiff(currentAge);
            setInputAge(nextAge);
          } else {
            return;
          }
        }}
      >
        <div className="mt-5 flex">
          <CalendarInput
            submit={submit}
            maxInputLength={2}
            id={"day"}
            errorMessage={currentLocale.errors.day}
            defaultValue={currentLocale.abreviations.day}
            errorRange={[1, 32]}
            textInput={dayInput}
            setTextInput={setCurrentDay}
            customError={isDayError}
            resetOutput={resetOutput}
            currentLocale={currentLocale}
          ></CalendarInput>
          <CalendarInput
            submit={submit}
            maxInputLength={2}
            id={"month"}
            errorMessage={currentLocale.errors.month}
            defaultValue={currentLocale.abreviations.month}
            errorRange={[1, 13]}
            textInput={monthInput}
            setTextInput={setCurrentMonth}
            customError={{ isError: false, errorMessage: "" }}
            resetOutput={resetOutput}
            currentLocale={currentLocale}
          ></CalendarInput>
          <CalendarInput
            submit={submit}
            maxInputLength={4}
            id={"year"}
            errorMessage={currentLocale.errors.year}
            defaultValue={currentLocale.abreviations.year}
            errorRange={[-Infinity, new Date().getFullYear() + 1]}
            textInput={yearInput}
            setTextInput={setCurrentYear}
            customError={isYearError}
            resetOutput={resetOutput}
            currentLocale={currentLocale}
          ></CalendarInput>
        </div>
        <p className=" text-center text-base italic text-template_red">
          {display.error}
        </p>
        <AgeFormSubmit />
      </form>
      <NeoDisplayResult
        display={display}
        error={displayError}
        currentLocale={currentLocale}
      ></NeoDisplayResult>
    </>
  );
}
function NeoDisplayResult({ display, error, currentLocale }: NeoDisplay) {
  const years = currentLocale.plurals.year;
  const months = currentLocale.plurals.month;
  const days = currentLocale.plurals.day;
  if (error.isError) {
    return (
      <>
        <h1 className="mb-6 text-5xl font-extrabold italic">
          <EmptyOutput title={years}></EmptyOutput>
          <br></br>
          <EmptyOutput title={months}></EmptyOutput>
          <br></br>
          <EmptyOutput title={days}></EmptyOutput>
        </h1>
      </>
    );
  }
  return (
    <>
      <h1 className="mb-6 text-5xl font-extrabold italic">
        <CalendarOutput
          number={display.age.year}
          title={years}
          delay={0}
          pre_delay={0}
        />
        <br></br>
        <CalendarOutput
          number={display.age.month}
          title={months}
          delay={0}
          pre_delay={0}
        ></CalendarOutput>
        <br></br>
        <CalendarOutput
          number={display.age.day}
          title={days}
          delay={0}
          pre_delay={0}
        ></CalendarOutput>
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

function isInputAgeSound(possibleAge: InputAge): boolean {
  const isDay = Number.isInteger(possibleAge.day);
  const isMonth = Number.isInteger(possibleAge.month);
  const isYear = Number.isInteger(possibleAge.year);
  if (isDay && isMonth && isYear) {
    return true;
  }
  return false;
}

function getDisplayError(singleErrors: NeoError[]) {
  // first check single errors
  for (let index = 0; index < singleErrors.length; index++) {
    const e = singleErrors[index];
    if (e?.isError) {
      return e;
    }
  }
  return { isError: false, errorMessage: "" } as NeoError;
}
