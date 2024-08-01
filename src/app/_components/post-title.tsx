import { ReactNode } from "react";

export const PostTitle = ({ children }: { children: ReactNode }) => (
  <div className="mt-8 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center">
    {children}
  </div>
);
