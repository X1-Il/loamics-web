import { pageMetadata } from "@/i18n/metadata";
import { getContent } from "@/i18n/server";
import { HealthView } from "@/views/HealthView";

export const metadata = pageMetadata("en", "health", { description: getContent("en").p4dp.intro });

export default function Page() {
  return <HealthView locale="en" />;
}
