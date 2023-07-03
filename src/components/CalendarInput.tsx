import { TypeInputAge } from "../pages/index";
import { useState } from "react";
import React from "react";
export type ErrorObj = {
  isError: boolean;
  errorMessage: string;
};
type CalendarInput = {
  id: "day" | "month" | "year";
  defaultValue: string;
  errorRange: [number, number];
  errorMessage: string;
  maxInputLength: number;
  textInput: string | number;
  setTextInput: Function;
  customError: ErrorObj | false;
};
type OkInput = {
  id: "day" | "month" | "year";
  textInput: number;
  isStart: boolean;
  nextState: Function;
};
type DefaultInput = {
  id: "day" | "month" | "year";
  textInput: "DD" | "MM" | "YYY";
  setState: Function;
};
export function CalendarInput({
  id,
  defaultValue,
  errorRange,
  errorMessage,
  maxInputLength,
  textInput,
  setTextInput,
  customError,
}: CalendarInput) {
  const hasAnyDefaultValue = textInput === defaultValue;
  const isError = isErrorCheck(textInput, errorRange);
  let className =
    "m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey hover:ring-template_purple  ";
  let appliedErrorMessage = "";
  // else statement must be used because all default  values are also error values, but very much so not the other way around
  if (hasAnyDefaultValue || textInput === "") {
    className =
      "m-1   ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl text-template_smokey_grey  mix-blend-darken ring-1     ring-template_ligth_grey hover:ring-template_purple  w-[3.75em] ";
  } else if (isError) {
    appliedErrorMessage = errorMessage;
    className =
      "m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey hover:ring-template_purple  ";
  }
  // custom error has less precedence than the non-custom error, thus else-if-ed last
  else if (customError != false && customError.isError) {
    appliedErrorMessage = customError.errorMessage;
    className =
      "m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey hover:ring-template_purple  ";
  }
  return (
    <div className="flex w-1/3 flex-col pr-5 ">
      <label
        htmlFor={id}
        className=" text-xs font-light uppercase text-template_smokey_grey"
      >
        {id}
      </label>
      <input
        className={className}
        type="text"
        inputMode="numeric"
        id={id}
        defaultValue={textInput}
        key={"sure"}
        maxLength={maxInputLength}
        onFocus={
          hasAnyDefaultValue
            ? () => {
                setTextInput("");
              }
            : undefined
        }
        onChange={(e) => {
          const input = e.target.value;
          setTextInput(input);
        }}
      />
      <div className="text-xs italic text-template_red">
        {appliedErrorMessage}
      </div>
    </div>
  );
}
function DefaultInput({ id, textInput, setState }: DefaultInput) {
  return (
    <div className="flex w-1/3 flex-col pr-5 ">
      <label
        htmlFor={id}
        className=" text-xs font-light uppercase text-template_smokey_grey"
      >
        {id}
      </label>
      <input
        className="m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl text-template_smokey_grey  mix-blend-darken ring-1     ring-template_ligth_grey hover:ring-template_purple  "
        type="text"
        inputMode="numeric"
        id={id}
        defaultValue={textInput}
        key={"sure"}
        onChange={(e) => {
          setState("");
        }}
      />
    </div>
  );
}
function OkInput({ id, textInput, isStart, nextState }: OkInput) {
  if (isStart) {
    return (
      <div className="flex w-1/3 flex-col pr-5 ">
        <label
          htmlFor={id}
          className=" text-xs font-light uppercase text-template_smokey_grey"
        >
          {id}
        </label>
        <input
          className="m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey hover:ring-template_purple  "
          type="text"
          inputMode="numeric"
          id={id}
          defaultValue=""
          key={"sure"}
          onChange={(e) => {
            const nextState = parseInt(e.target.value, 10);
          }}
        />
      </div>
    );
  }
  return (
    <div className="flex w-1/3 flex-col pr-5 ">
      <label
        htmlFor={id}
        className=" text-xs font-light uppercase text-template_smokey_grey"
      >
        {id}
      </label>
      <input
        className="m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey hover:ring-template_purple  "
        type="text"
        inputMode="numeric"
        id={id}
        defaultValue={textInput}
        onChange={(e) => {
          const nextState = parseInt(e.target.value, 10);
        }}
      />
    </div>
  );
}

function ErrorInput({ id, textInput, errorMessage }: ErrorInput) {
  return (
    <div className="flex w-1/3 flex-col pr-5 ">
      <label
        htmlFor={id}
        className=" text-xs font-light uppercase text-template_smokey_grey"
      >
        {id}
      </label>
      <input
        className="m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey hover:ring-template_purple  "
        type="text"
        inputMode="numeric"
        id={id}
        defaultValue={textInput[id]}
        onChange={(e) => {
          const nextState = parseInt(e.target.value, 10);
        }}
      />

      <div className="w-3 text-xs italic text-template_red">{errorMessage}</div>
    </div>
  );
}
function resetInputValueIfNotDefaultValue(
  input: string,
  defaultValue: string
): string {
  if (input === defaultValue) {
    return "";
  }
  return input;
}
function isErrorCheck(input: any, errRange: [number, number]): boolean {
  if (checkForLetters(input)) {
    return true;
  }
  const parsed = parseInt(input, 10);
  if (!Number.isInteger(parsed)) {
    return true;
  }
  if (input >= errRange[0] && input < errRange[1]) {
    return false;
  }
  return true;
}
function checkForLetters(input: string): boolean {
  const hasAnyLetters = /\p{L}/u.test(input);
  return hasAnyLetters;
}
