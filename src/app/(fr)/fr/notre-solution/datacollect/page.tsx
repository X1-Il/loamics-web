import { pageMetadata } from "@/i18n/metadata";
import { DataCollectView } from "@/views/ModuleViews";

export const metadata = pageMetadata("fr", "dataCollect");

export default function Page() {
  return <DataCollectView locale="fr" />;
}
