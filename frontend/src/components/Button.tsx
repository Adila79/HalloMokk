import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`bg-sky-300 hover:bg-sky-400 text-black p-3 rounded-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}