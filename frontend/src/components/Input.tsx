import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`border p-3 w-full rounded-xl text-black ${className}`}
      {...props}
    />
  );
}