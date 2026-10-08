import { pageMetadata } from "@/i18n/metadata";
import { BrandView } from "@/views/BrandView";

export const metadata = pageMetadata("fr", "brand");

export default function Page() {
  return <BrandView locale="fr" />;
}
