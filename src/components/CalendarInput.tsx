import { TypeInputAge } from "../pages/index";
type CalendarInput = {
  id: "day" | "month" | "year";
  setState: Function;
  state: TypeInputAge;
  errorMessage: String;
};
type OkInput = {
  id: "day" | "month" | "year";
  setState: Function;
  state: TypeInputAge;
};
type ErrorInput = {
  id: "day" | "month" | "year";
  setState: Function;
  state: TypeInputAge;
  errorMessage: String;
};
export function CalendarInput({
  id,
  setState,
  state,
  errorMessage,
}: CalendarInput) {
  if (errorMessage !== "") {
    console.log("no error");

    return (
      <ErrorInput
        id={id}
        setState={setState}
        state={state}
        errorMessage={errorMessage}
      ></ErrorInput>
    );
  }
  return <OkInput id={id} setState={setState} state={state}></OkInput>;
}

function OkInput({ id, setState, state }: OkInput) {
  return (
    <div className="flex w-1/3 flex-col pr-5 ">
      <label
        htmlFor="month"
        className=" text-xs font-light uppercase text-template_smokey_grey"
      >
        {id}
      </label>
      <input
        className="m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey hover:ring-template_purple  "
        type="text"
        inputMode="numeric"
        id={id}
        defaultValue={state[id]}
        onChange={(e) => {
          const nextState = parseInt(e.target.value, 10);
          setState({ ...state, [id]: nextState });
        }}
      />
    </div>
  );
}

function ErrorInput({ id, setState, state, errorMessage }: ErrorInput) {
  return (
    <div className="flex w-1/3 flex-col pr-5 ">
      <label
        htmlFor="month"
        className=" text-xs font-light uppercase text-template_smokey_grey"
      >
        {id}
      </label>
      <input
        className="m-1  ml-[.10rem] cursor-pointer rounded py-1 pl-3 text-xl mix-blend-darken ring-1       ring-template_ligth_grey hover:ring-template_purple  "
        type="text"
        inputMode="numeric"
        id={id}
        defaultValue={state[id]}
        onChange={(e) => {
          const nextState = parseInt(e.target.value, 10);
          setState({ ...state, [id]: nextState });
        }}
      />

      <div className="text-xs italic text-template_red">{errorMessage}</div>
    </div>
  );
}
