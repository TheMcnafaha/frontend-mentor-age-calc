import { useRef, useState } from "react";
import { useCountUp } from "react-countup";
import { EmptyOutput } from "./EmptyOutput";
type Output = {
  number: number | "--";
  title: string;
};
type Render = {
  end: number;
  isReset: boolean;
  title: string;
};
export const CalendarOutput = ({ number, title }: Output) => {
  const isNumber = typeof number === "number";
  if (!isNumber) {
    return <EmptyOutput title={title}></EmptyOutput>;
  }
  return (
    <>
      <MyWay end={number} title={title}></MyWay>
    </>
  );
};

const MyWay = ({ end, isReset, title }: Render) => {
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
    <>
      <span className=" text-template_purple" ref={countUpRef} /> {title}
    </>
  );
};
