import { TypeInputAge } from "../pages/index";
import { useState } from "react";
type CalendarInput = {
  id: "day" | "month" | "year";
  state: TypeInputAge;
  errorMessage: String;
  defaultValue: string;
};
type OkInput = {
  id: "day" | "month" | "year";
  state: TypeInputAge;
};
type ErrorInput = {
  id: "day" | "month" | "year";
  state: TypeInputAge;
  errorMessage: String;
};

export function CalendarInput({
  id,
  defaultValue,
  errorMessage,
}: CalendarInput) {
  const [textInput, setTextInput] = useState(defaultValue);
  const hasAnyDefaultValue = textInput === defaultValue;
  console.log("le textInput le is me ", textInput);

  if (hasAnyDefaultValue) {
    console.log("We have a default val: ", hasAnyDefaultValue);
    return (
      <DefaultInput
        id={id}
        textInput={textInput}
        setState={setTextInput}
      ></DefaultInput>
    );
  }
  if (errorMessage !== "") {
    return (
      <ErrorInput
        id={id}
        textInput={textInput}
        errorMessage={errorMessage}
      ></ErrorInput>
    );
  }
  return <OkInput id={id} textInput={textInput}></OkInput>;
}
function DefaultInput({ id, textInput, setState }: OkInput) {
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
        onFocus={(e) => {
          console.log("halp");
          setState("");
        }}
      />
    </div>
  );
}
function OkInput({ id, textInput }: OkInput) {
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
