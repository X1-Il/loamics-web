import { renderOgImage } from "@/lib/og";

export function GET() {
  return renderOgImage("La data", "au service de l'humain");
}
