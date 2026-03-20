import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import ButtonSvg from "@/public/assets/svg/ButtonSvg";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps {
  className?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  px?: string;
  white?: boolean;
  variant?: string;
  size?: string;
  [key: string]: any;
}

const Button = ({
  className,
  href,
  onClick,
  children,
  px,
  white,
  variant,
  size,
  ...props
}: ButtonProps) => {
  const classes = cn(
    "button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1",
    px || "px-7",
    white ? "text-n-8" : "text-n-1",
    className
  );

  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button className={classes} onClick={onClick} {...props}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </button>
  );

  const renderLink = () => (
    <Link href={href!} className={classes} {...props}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </Link>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
export { Button };
