import { pageMetadata } from "@/i18n/metadata";
import { BrandView } from "@/views/BrandView";

export const metadata = pageMetadata("en", "brand");

export default function Page() {
  return <BrandView locale="en" />;
}
