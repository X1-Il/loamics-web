import { BRAND_COLORS } from "@/components/brand/paths";
import { logoSvg, svgResponse } from "@/lib/brandSvg";

export function GET() {
  return svgResponse(logoSvg({ fg: BRAND_COLORS.night, pad: 4 }));
}
