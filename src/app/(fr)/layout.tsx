import type { ReactNode } from "react";
import { SiteShell, rootMetadata } from "@/components/layout/SiteShell";

export { viewport } from "@/components/layout/SiteShell";
export const metadata = rootMetadata("fr");

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteShell locale="fr">{children}</SiteShell>;
}
