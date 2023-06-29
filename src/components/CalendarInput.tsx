import { TypeInputAge } from "../pages/index";
import { useState } from "react";
type CalendarInput = {
  id: "day" | "month" | "year";
  defaultValue: string;
  errorRange: [number, number];
  errorMessage: string;
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
}: CalendarInput) {
  const [textInput, setTextInput] = useState(defaultValue);
  const hasAnyDefaultValue = textInput === defaultValue;
  const isError = isErrorCheck(textInput, errorRange);
  console.log("le textInput le is me ", textInput);
  let classText =
    "m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey hover:ring-template_purple  ";
// else statement must be used because all default  values are also error values, but very much so not the other way around
  if (hasAnyDefaultValue) {
    console.log("We got a default");
    
    classText =
      "m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl text-template_smokey_grey  mix-blend-darken ring-1     ring-template_ligth_grey hover:ring-template_purple  ";
  }
  else if (isError) {
    console.log("we got an error");
    
    classText =
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
        className={classText}
        type="text"
        inputMode="numeric"
        id={id}
        defaultValue={textInput}
        key={"sure"}
        onFocus={hasAnyDefaultValue?()=>{setTextInput("")}:undefined}
        onChange={(e) => {
          const nextState = parseInt(e.target.value, 10);
        }}
      />
      <div className="text-xs italic text-template_red">{errorMessage}</div>
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
          console.log("halp");
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

      <div className="text-xs italic text-template_red">{errorMessage}</div>
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
  if (!Number.isInteger(input)) {
    return true;
  }
  if (input >= errRange[0] && input < errRange[1]) {
    return false;
  }
  return true;
}
