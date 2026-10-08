import { pageMetadata } from "@/i18n/metadata";
import { LegalView } from "@/views/LegalView";

export const metadata = pageMetadata("fr", "privacy");

export default function Page() {
  return <LegalView locale="fr" kind="privacy" />;
}
