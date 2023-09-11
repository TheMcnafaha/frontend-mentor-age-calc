type Empty = {
  title: string;
};
export const EmptyOutput = ({ title }: Empty) => {
  return (
    <>
      <span className=" text-template_purple">--</span> {title}
    </>
  );
};
