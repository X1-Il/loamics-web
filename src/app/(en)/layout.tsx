import type { ReactNode } from "react";
import { SiteShell, rootMetadata } from "@/components/layout/SiteShell";

export { viewport } from "@/components/layout/SiteShell";
export const metadata = rootMetadata("en");

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
