import { useRef, useState } from "react";
import { useCountUp } from "react-countup";

type Output = {
  number: number | "--";
  title: string;
};
type Render = {
  end: number;
  isReset: boolean;
};
export const CalendarOutput = ({ number, title }: Output) => {
  const isNumber = typeof number === "number";
  if (!isNumber) {
    return (
      <>
        <span className=" text-template_purple">--</span> {title}
        <br></br>
      </>
    );
  }
  return (
    <>
      <span className=" text-template_purple">{number}</span> {title}
    </>
  );
};

const MyWay = ({ end, isReset }: Render) => {
  const countUpRef = useRef(null);
  const { reset } = useCountUp({
    ref: countUpRef,
    start: 1,
    end: end,
    delay: 0,
    duration: 4,
    onReset: () => console.log("Resetted!"),
    onUpdate: () => console.log("Updated!"),
    onPauseResume: () => console.log("Paused or resumed!"),
  });
  return (
    <div>
      <div ref={countUpRef} />
    </div>
  );
};
