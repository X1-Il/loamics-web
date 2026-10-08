import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: "Serving humankind through data · La data au service de l’humain",
    start_url: "/",
    display: "standalone",
    background_color: "#04041A",
    theme_color: "#04041A",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
