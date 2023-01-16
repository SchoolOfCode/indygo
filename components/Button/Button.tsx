import { twMerge } from "tailwind-merge";

export interface ButtonProps {
  buttonText: string;
  onClick: () => void;
  className?: string;
}

export default function Button({
  buttonText,
  onClick,
  className,
}: ButtonProps) {
  const classes = twMerge(`
    border-2
    bg-indigo-400
    box-border
    h-10
    w-32
    border-indigo-400
    text-slate-800
    rounded-md
    shadow-md
    shadow-slate-900
    font-Open
    font-semibold
    z-10
    ${className ?? ""}
  `);
  return (
    <button onClick={onClick} className={classes}>
      {buttonText}
    </button>
  );
}
