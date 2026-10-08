import { pageMetadata } from "@/i18n/metadata";
import { LegalView } from "@/views/LegalView";

export const metadata = pageMetadata("fr", "legal");

export default function Page() {
  return <LegalView locale="fr" kind="legal" />;
}
