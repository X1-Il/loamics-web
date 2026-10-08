import { pageMetadata } from "@/i18n/metadata";
import { ContactView } from "@/views/ContactView";

export const metadata = pageMetadata("en", "contact");

export default function Page() {
  return <ContactView locale="en" />;
}
