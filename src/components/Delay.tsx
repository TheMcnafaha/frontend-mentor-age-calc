import { useState, useEffect, JSXElementConstructor } from "react";
import { EmptyOutput } from "./EmptyOutput";
type Props = {
  children: React.ReactNode;
  waitBeforeShow?: number;
  title: string;
};

export const Delayed = ({ children, waitBeforeShow, title }: Props) => {
  const [isShown, setIsShown] = useState(false);
  const Default = <EmptyOutput title={title}></EmptyOutput>;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  return isShown ? children : Default;
};

export default Delayed;
