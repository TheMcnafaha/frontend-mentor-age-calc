import { TypeInputAge } from "../pages/index";
type CalendarInput = {
  id: "day" | "month" | "year";
  setState: Function;
  state: TypeInputAge;
};
export function CalendarInput({ id, setState, state }: CalendarInput) {
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
          const nextState = e.target.value;
          setState({ ...state, [id]: nextState });
        }}
      />
    </div>
  );
}
