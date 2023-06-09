type InputError = {
  isInputError: boolean;
  message: string;
};
export default function InputError({ isInputError, message }: InputError) {
  if (!isInputError) {
    return <div className="text-xs italic text-template_red">{message}</div>;
  }
  return <div></div>;
}
