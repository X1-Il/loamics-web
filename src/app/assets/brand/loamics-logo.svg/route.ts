import { logoSvg, svgResponse } from "@/lib/brandSvg";

export function GET() {
  return svgResponse(logoSvg({ pad: 4 }));
}
