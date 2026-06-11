import { cn } from "@/lib/utils";

type CommonProps = {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex select-none items-center justify-center gap-2 rounded-none font-display font-bold uppercase tracking-wide transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60";

const variants = {
  // Press-down interaction: the button travels into its own hard shadow.
  primary:
    "bg-accent text-black shadow-hard-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#F5F5F0] active:translate-x-1 active:translate-y-1 active:shadow-none",
  ghost:
    "border border-accent bg-transparent text-accent hover:bg-accent/10 active:bg-accent/20",
};

const sizes = {
  md: "h-11 px-5 text-base",
  lg: "h-14 px-8 text-lg",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof rest.href === "string") {
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }

  const { href: _href, ...buttonProps } = rest as ButtonAsButton;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
