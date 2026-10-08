import { pageMetadata } from "@/i18n/metadata";
import { LegalView } from "@/views/LegalView";

export const metadata = pageMetadata("en", "legal");

export default function Page() {
  return <LegalView locale="en" kind="legal" />;
}
