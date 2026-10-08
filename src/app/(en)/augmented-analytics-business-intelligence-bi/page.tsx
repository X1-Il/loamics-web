import { pageMetadata } from "@/i18n/metadata";
import { AugmentedView } from "@/views/AugmentedView";

export const metadata = pageMetadata("en", "augmented");

export default function Page() {
  return <AugmentedView locale="en" />;
}
