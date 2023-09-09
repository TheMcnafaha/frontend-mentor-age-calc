import { useRef, useEffect, useState } from "react";
import { useCountUp } from "react-countup";

type Output = {
  number: number | "--";
  title: string;
  delay: number;
};
type Render = {
  end: number;
  delay: number;
  title: string;
};
export const CalendarOutput = ({ number, title, delay = 0 }: Output) => {
  const isNumber = typeof number === "number";
  if (!isNumber) {
    return (
      <>
        <span className=" text-template_purple">--</span> {title}
      </>
    );
  }

  return (
    <>
      <MyWay end={number} title={title} delay={delay}></MyWay>
    </>
  );
};

const MyWay = ({ end, title, delay }: Render) => {
  const countUpRef = useRef(null);
  const { reset } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: end,
    delay: delay,
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
