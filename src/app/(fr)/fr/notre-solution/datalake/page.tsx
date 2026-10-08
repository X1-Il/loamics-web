import { pageMetadata } from "@/i18n/metadata";
import { DataLakeView } from "@/views/ModuleViews";

export const metadata = pageMetadata("fr", "datalake");

export default function Page() {
  return <DataLakeView locale="fr" />;
}
