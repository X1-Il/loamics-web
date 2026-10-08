import { pageMetadata } from "@/i18n/metadata";
import { FilmView } from "@/views/FilmView";

export const metadata = pageMetadata("fr", "film");

export default function Page() {
  return <FilmView locale="fr" />;
}
