/** Locale-independent facts. Everything a reader sees in words lives in content/en and content/fr. */
export const site = {
  name: "Loamics",
  url: "https://loamics.com",
  video: "https://loamics.com/wp-content/uploads/2021/11/Loamics_V2-1.mp4",
  contact: {
    street: "88 Avenue du Général Leclerc",
    city: "92100 Boulogne-Billancourt, France",
    postalCode: "92100",
    locality: "Boulogne-Billancourt",
    phone: "+33 (0)1 81 89 33 90",
    phoneHref: "tel:+33181893390",
    email: "contact@loamics.com",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/loamics/",
    x: "https://twitter.com/loamics",
  },
  p4dpExternal: "https://www.p4dp.fr/",
} as const;

export type ModuleKey = "collect" | "catalog" | "prepare";
