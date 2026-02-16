import LocaleLink from '@/components/ui/LocaleLink';

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-charcoal-darker hover:bg-offwhite",
  outline:
    "border-2 border-white text-white hover:bg-white hover:text-charcoal-darker",
  ghost:
    "text-white hover:text-white/80",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const baseStyles =
    "inline-block uppercase tracking-wider font-heading font-medium transition-all duration-300";
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  if (href) {
    return (
      <LocaleLink to={href} className={classes}>
        {children}
      </LocaleLink>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
