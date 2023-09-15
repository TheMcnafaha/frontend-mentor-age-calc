import React from "react";
import type { Dispatch, SetStateAction } from "react";
import type { NeoError, OutputReset } from "./CalendarForm";
export type ErrorObj = {
  isError: boolean;
  errorMessage: string;
};
type stateFn = Dispatch<SetStateAction<string>>;
type CalendarInput = {
  id: "day" | "month" | "year";
  defaultValue: string;
  errorRange: [number, number];
  errorMessage: string;
  maxInputLength: number;
  textInput: string | number;
  setTextInput: stateFn;
  customError: NeoError;
  submit: boolean;
  resetOutput: OutputReset;
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
  submit,
  resetOutput,
}: CalendarInput) {
  const hasAnyDefaultValue = textInput === defaultValue;
  const isError = isErrorCheck(textInput, errorRange);
  let className =
    "m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey lg:hover:ring-template_purple lg:hover:ring-2 ";
  let appliedErrorMessage = "";
  // else statement must be used because all default  values are also error values, but very much so not the other way around
  if (hasAnyDefaultValue || textInput === "") {
    className =
      "m-1   ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl text-template_smokey_grey  mix-blend-darken ring-1     ring-template_ligth_grey lg:hover:ring-template_purple  w-[3.75em] lg:hover:ring-2 ";
  } else if (isError) {
    appliedErrorMessage = errorMessage;
    className =
      "m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey lg:hover:ring-template_purple lg:hover:ring-2 ";
  }
  // custom error has less precedence than the non-custom error, thus else-if-ed last
  else if (customError.isError && submit) {
    appliedErrorMessage = customError.errorMessage;
    className =
      "m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey lg:hover:ring-template_purple lg:hover:ring-2 ";
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
          resetOutput();
        }}
      />
      <div className="text-xs italic text-template_red">
        {appliedErrorMessage}
      </div>
    </div>
  );
}

function isErrorCheck(
  input: string | number,
  errRange: [number, number]
): boolean {
  const isString = typeof input === "string";
  if (isString && checkForLetters(input)) {
    return true;
  }
  const parsed = isString ? parseInt(input, 10) : input;
  if (!Number.isInteger(parsed)) {
    return true;
  }
  if (parsed >= errRange[0] && parsed < errRange[1]) {
    return false;
  }
  return true;
}
function checkForLetters(input: string): boolean {
  // lord forgive thee for I have regexed
  const hasAnyLetters = /\p{L}/u.test(input);
  return hasAnyLetters;
}
