import { useRef } from "react";
import { useCountUp } from "react-countup";
import { EmptyOutput } from "./EmptyOutput";
import Delayed from "./Delay";
type Output = {
  number: number | "--";
  title: string;
  delay: number;
  pre_delay: number;
};
type Render = {
  end: number;
  delay: number;
  title: string;
};
export const CalendarOutput = ({ number, title, delay, pre_delay }: Output) => {
  const isNumber = typeof number === "number";
  if (!isNumber) {
    return <EmptyOutput title={title}></EmptyOutput>;
  }

  return (
    <Delayed title={title} waitBeforeShow={pre_delay}>
      <>
        <MyWay end={number} delay={delay} title={title}></MyWay>
      </>
    </Delayed>
  );
};

const MyWay = ({ end, title, delay }: Render) => {
  const countUpRef = useRef(null);
  const {} = useCountUp({
    ref: countUpRef,
    start: 1,
    end: end,
    delay: delay,
    duration: 3,
  });
  return (
    <>
      <span className=" text-template_purple" ref={countUpRef} /> {title}
    </>
  );
};
