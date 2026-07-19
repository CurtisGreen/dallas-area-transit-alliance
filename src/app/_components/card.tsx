import cn from "classnames";

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "bg-neutral-100 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 dark:text-slate-300 shadow-sm rounded-md p-6",
      className,
    )}
  >
    {children}
  </div>
);
