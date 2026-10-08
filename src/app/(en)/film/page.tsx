import { pageMetadata } from "@/i18n/metadata";
import { FilmView } from "@/views/FilmView";

export const metadata = pageMetadata("en", "film");

export default function Page() {
  return <FilmView locale="en" />;
}
