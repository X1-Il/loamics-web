import { BRAND_COLORS } from "@/components/brand/paths";
import { markSvg, svgResponse } from "@/lib/brandSvg";

export function GET() {
  return svgResponse(markSvg({ bg: BRAND_COLORS.night }));
}
