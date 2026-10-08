import { pageMetadata } from "@/i18n/metadata";
import { AugmentedView } from "@/views/AugmentedView";

export const metadata = pageMetadata("fr", "augmented");

export default function Page() {
  return <AugmentedView locale="fr" />;
}
