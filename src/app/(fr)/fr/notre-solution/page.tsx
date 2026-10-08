import { pageMetadata } from "@/i18n/metadata";
import { SoftwareView } from "@/views/SoftwareView";

export const metadata = pageMetadata("fr", "software");

export default function Page() {
  return <SoftwareView locale="fr" />;
}
