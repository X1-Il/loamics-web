import { renderOgImage } from "@/lib/og";

export function GET() {
  return renderOgImage("Serving humankind", "through data");
}
