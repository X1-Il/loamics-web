import { pageMetadata } from "@/i18n/metadata";
import { AlgoEngineView } from "@/views/ModuleViews";

export const metadata = pageMetadata("fr", "algoengine");

export default function Page() {
  return <AlgoEngineView locale="fr" />;
}
