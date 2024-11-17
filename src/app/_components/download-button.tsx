"use client";

import { ReactNode } from "react";

// Separate component so the client component can be imported into server components
// without making the entire thing a client component
export const DownloadButton = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => <div onClick={() => window.open(href)}>{children}</div>;
