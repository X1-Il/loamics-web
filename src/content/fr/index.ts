import type { Content } from "../en";
import { softwareOverview, modulePages } from "./software";
import { healthcare, augmented } from "./pages";
import { legalNotice, privacyPolicy } from "./legal";

/** Contenu français. Typé sur la version anglaise : une clé manquante ne compile pas. */
export const fr: Content = {
  meta: {
    siteTitle: "Loamics | La data au service de l'humain",
    description:
      "Loamics permet aux acteurs de tous les secteurs d'activité de mettre en place des processus de gestion et de décision basés sur le croisement de données hétérogènes, intelligentes, fiables et sécurisées en temps réel.",
    ogLocale: "fr_FR",
    pages: {
      software: { title: "Notre solution", description: softwareOverview.intro },
      dataCollect: { title: "Data Collect : notre logiciel de collecte de données", description: modulePages["data-collect"].intro },
      datalake: { title: "DataLake : stockage et virtualisation de données", description: modulePages.datalake.intro },
      algoengine: { title: "AlgoEngine : bibliothèque d'algorithmes", description: modulePages.algoengine.intro },
      health: { title: "P4DP : données de santé", description: "" },
      augmented: { title: "Analyse augmentée et Business Intelligence (BI)", description: augmented.intro },
      film: { title: "Film", description: "L'histoire de Loamics en 44 secondes : une animation calculée en direct dans votre navigateur, de la donnée brute à la décision." },
      contact: {
        title: "Contact : démo gratuite",
        description: "Vous avez un projet ? Vous souhaitez en savoir plus sur notre plateforme ? Contactez-nous, nous serons heureux d'échanger avec vous !",
      },
      brand: { title: "Marque", description: "Le système d'identité Loamics : logo, construction, couleurs, typographie et iconographie." },
      legal: { title: "Mentions légales", description: "" },
      privacy: { title: "Politique de confidentialité", description: "" },
    },
  },
  tagline: "La data au service de l'humain",
  home: {
    hero: { eyebrow: "Plateforme de données temps réel", lead: "La data", accent: "au service de l'humain", p4dp: "Découvrez le projet P4DP" },
    factsAria: "Chiffres clés",
    facts: [
      "Plug & play, opérationnel en 2 heures",
      "Traitement en temps réel",
      "Tout volume, toute source, tout format",
      "Disponible sur Microsoft Azure Marketplace",
      "Membre du hub européen Gaia-X",
      "Souveraineté et gouvernance des données",
    ],
    mission: {
      eyebrow: "Notre mission & notre passion",
      titleLead: "Des processus de gestion et de décision fondés sur",
      titleAccent: "des données hétérogènes, intelligentes, fiables et sécurisées.",
      p1: "Loamics permet aux acteurs de tous les secteurs d'activité de mettre en place des processus de gestion et de décision basés sur le croisement de données hétérogènes, intelligentes, fiables et sécurisées en temps réel.",
      p2: "Notre solution est unique car elle peut être déployée en mode plug&play, c'est-à-dire qu'il est possible d'être opérationnel en seulement 2 heures. C'est la première solution complète de bout en bout qui révèle la puissance des données de nos clients pour accélérer le succès de leur organisation.",
    },
    stats: [
      { value: "2h", label: "pour être opérationnel, déployé en mode plug & play" },
      { value: "3", label: "modules pour la première solution complète de bout en bout" },
      { value: "∞", label: "volumes, sources et formats, ingérés en temps réel" },
      { value: "1", label: "prix fixe, indépendant des utilisateurs et des volumes" },
    ],
    suite: {
      eyebrow: "La suite Loamics",
      title: "De la donnée brute à la décision, en un flux continu.",
      lead: "Trois modules étroitement intégrés, non intrusifs pour votre instance et vos applications cloud existantes.",
      link: "Découvrir notre solution",
    },
    p4dp: { eyebrow: "Santé · Platform for Data in Primary Care", title: "Découvrez le projet P4DP", cta: "Consulter le projet" },
    sectors: {
      eyebrow: "Business secteurs",
      title: "Des acteurs de tous les secteurs d'activité.",
      p4dpLink: "Projet P4DP",
      generic: "Données temps réel, croisées",
      items: [
        { key: "health", title: "Santé" },
        { key: "city", title: "Smart cities" },
        { key: "factory", title: "Industrie 4.0" },
        { key: "aero", title: "Aérospatiale et défense" },
      ],
    },
    ecosystem: {
      eyebrow: "Écosystème",
      title: "Souverain par conception, ouvert par nature.",
      items: [
        {
          name: "Microsoft Azure Marketplace",
          since: "Avril 2021",
          text: "Les solutions et outils Data Lake de Loamics sont disponibles sur Microsoft Azure Marketplace, via le réseau de partenaires Microsoft.",
        },
        {
          name: "Gaia-X",
          since: "Hub européen",
          text: "Loamics a rejoint le hub européen Gaia-X, qui contribue à renforcer la souveraineté et la gouvernance des données européennes.",
        },
        {
          name: "MyDataModels",
          since: "Juin 2021",
          text: "Deux start-ups françaises de la deep tech associées pour maximiser la valeur et l'accessibilité des données avec une solution d'analyse augmentée.",
        },
        {
          name: "Environmental Start-up Accelerator",
          since: "avec Microsoft",
          text: "Un programme d'accélération de 6 mois pour des start-ups européennes œuvrant à la réduction et à la compensation des émissions de carbone.",
        },
      ],
    },
    film: {
      eyebrow: "Film",
      titleLead: "L'histoire de Loamics,",
      titleAccent: "calculée en direct.",
      lead: "Quarante-quatre secondes, de données hétérogènes à une source de vérité unique, écrites en code et calculées image par image dans votre navigateur.",
      cta: "Voir le film · 00:44",
    },
  },
  modules: [
    {
      key: "collect",
      index: "01",
      title: "Data Collect",
      product: "DataCollect",
      route: "dataCollect",
      summary:
        "Collecter et absorber des données brutes en temps réel (quels que soient le volume, les sources ou le format), pour les transformer très simplement en données enrichies homogènes, efficaces et précieuses, prêtes pour la visualisation des données et les premiers niveaux d'analyse.",
      verbs: ["Ingérer", "Homogénéiser", "Enrichir"],
    },
    {
      key: "catalog",
      index: "02",
      title: "Data Catalog",
      product: "DataLake",
      route: "datalake",
      summary:
        "Fournir un accès à toutes les métadonnées (données contextuelles) dans un système de valeurs clés. Stocker et accéder aux données propriétaires dans un système unique, élastique et évolutif, hébergé au sein de l'organisation. Les données sont prêtes à être exposées sans qu'il soit nécessaire de les répliquer. Ces données sont préparées pour l'analyse et l'intelligence artificielle.",
      verbs: ["Stocker", "Indexer", "Exposer"],
    },
    {
      key: "prepare",
      index: "03",
      title: "Data Prepare",
      product: "AlgoEngine",
      route: "algoengine",
      summary:
        "Connecter, traiter et analyser les données en temps réel pour générer des informations qui répondent à tous les besoins des utilisateurs finaux au sein de l'organisation. Gérer un workflow et une bibliothèque d'algorithmes qui peuvent être enrichis en permanence. Partager les connaissances en mettant à disposition ou en échangeant les « bonnes » données. Industrialiser les processus de connexion des algorithmes aux données pour tous vos besoins.",
      verbs: ["Connecter", "Traiter", "Analyser"],
    },
  ],
  p4dp: {
    titleLead: "P4DP : Révolutionner les soins de santé",
    titleAccent: "grâce à l'exploitation des données",
    short: "Platform for Data in Primary Care",
    intro:
      "Le projet P4DP (Platform for Data in Primary Care) vise à créer le premier entrepôt national de données de santé pour la médecine générale en France. Ce projet, soutenu par le programme France 2030, centralise des données réelles issues de la médecine de ville pour améliorer la recherche, la qualité des soins et l'innovation dans le secteur de la santé. Le projet a remporté des prix prestigieux, dont le Prix Coup de Cœur des Talents de la e-santé 2023, récompensant son impact novateur dans l'exploitation des données médicales.",
    stats: [
      { value: "2 000+", label: "cabinets médicaux en France" },
      { value: "2030", label: "Soutenu par le programme France 2030" },
      { value: "2023", label: "Prix Coup de Cœur des Talents de la e-santé" },
      { value: "RGPD", label: "Accès sécurisé avec le Health Data Hub" },
    ],
    visit: "Consulter le site de P4DP",
  },
  cta: {
    lead: "Vous avez un projet ?",
    accent: "Contactez-nous, nous serons heureux d'échanger avec vous.",
  },
  software: {
    overview: softwareOverview,
    modulePages,
    page: {
      arch: { eyebrow: "Architecture de référence", title: "Une suite, au cœur de votre cloud." },
      platform: { eyebrow: "Gestion des données de référence" },
      pillars: [
        { k: "Souveraineté", v: "Vos données restent sous votre gouvernance, quelle que soit votre configuration." },
        { k: "Interopérabilité", v: "Traitement dynamique, non intrusif pour votre instance et vos applications cloud." },
        { k: "Prix fixe", v: "Indépendant du nombre d'utilisateurs et des volumes collectés, stockés ou traités." },
        { k: "Prise en main rapide", v: "La formation de votre équipe IT est accessible et rapide." },
      ],
      modules: { eyebrow: "Les modules", title: "DataCollect, DataLake, AlgoEngine." },
      process: { eyebrow: "Processus" },
    },
    modulePage: {
      seeItWork: "En action",
      demoTitles: {
        "data-collect": "Des données brutes, ingérées dès leur arrivée.",
        datalake: "Tout stocker. Décider du schéma plus tard.",
        algoengine: "D'un flux désordonné à des données prêtes pour le ML.",
      },
      others: { eyebrow: "Découvrez nos autres logiciels", title: "Le reste de la suite." },
    },
  },
  healthcare: {
    ...healthcare,
    crumbs: ["Secteurs", "Santé"],
    figuresAria: "Chiffres clés",
    consortiumEyebrow: "Consortium",
    pillarsAria: "Piliers du projet",
    softwareTitle: "Éditeurs de logiciels médicaux partenaires",
    governanceEyebrow: "Gouvernance",
    governanceTitle: "Éthique et transparence à chaque étape.",
    flow: {
      practices: "2 000+ cabinets",
      practicesSub: "Médecine générale partout en France",
      vendorsSub: "Éditeurs de logiciels médicaux",
      loamicsSub: "Brique technologique de traitement des données",
      hubSub: "Accès sécurisé · RGPD",
      research: "Recherche et soins",
      researchSub: "Outils de visualisation et rapports épidémiologiques",
      consortium: "Consortium",
    },
  },
  augmented: {
    ...augmented,
    crumb: "BI augmentée",
    eyebrows: {
      definition: "Définition",
      ml: "Machine learning",
      mlTitle: "Le rôle du Machine Learning dans l'analyse augmentée",
      benefits: "Avantages",
      benefitsTitle: "Quels sont les avantages de l'analyse augmentée ?",
      partnership: "Partenariat",
      useCases: "Cas d'usage",
    },
  },
  film: {
    eyebrow: "Film",
    titleLead: "De la donnée brute à la décision,",
    titleAccent: "en quarante-quatre secondes.",
    lead: "Un film marketing écrit en code. Chaque image est calculée en direct à partir de la géométrie de la marque : naviguez dans la timeline, passez d'un chapitre à l'autre, activez la bande-son générative ou exportez-le en fichier vidéo.",
    playerAria: "Lecteur du film",
    specsAria: "Fiche technique",
    specs: [
      { k: "Durée", v: "00:44" },
      { k: "Rendu", v: "Canvas 2D, 60 i/s" },
      { k: "Particules", v: "360, déterministes" },
      { k: "Bande-son", v: "WebAudio générative" },
      { k: "Poids", v: "0 Ko de vidéo" },
    ],
    keyboard: "Clavier : Espace lecture/pause · ← → ±5 s · F plein écran · M son",
  },
  contact: {
    eyebrow: "Contact",
    titleLead: "Contactez-nous,",
    titleAccent: "nous serons heureux d'échanger avec vous !",
    lead: "Vous avez un projet ? Vous souhaitez en savoir plus sur notre plateforme ?",
    direct: "Contactez-nous directement",
  },
  brand: {
    titleLead: "Une orbite, un point.",
    titleAccent: "L'identité Loamics.",
    intro:
      "Le « O » de Loamics devient le symbole : une orbite ouverte (le cycle continu de la donnée) et un point unique qui vient se loger dans l'ouverture : la donnée qui boucle le cycle. Un trait unique, géométrique, dessiné sans police, pour un rendu identique dans un favicon, un film ou sur un écran 4K.",
    logo: { eyebrow: "Logo", title: "Logotype & symbole", dl: ["Logo · SVG", "Logo sur fond clair · SVG", "Symbole · SVG"] },
    construction: {
      eyebrow: "Construction",
      title: "Construit sur une grille de 32 unités.",
      rules: [
        "Orbite de rayon 12, trait de 3, terminaisons arrondies.",
        "Ouverture de 70°, centrée sur la diagonale à 45°.",
        "Point de rayon 2,9, posé sur le tracé de l'orbite.",
        "Zone de protection : un diamètre de point de chaque côté.",
        "Taille minimale : 16 px pour le symbole, 72 px pour le logotype.",
      ],
      aria: "Épure de construction du symbole Loamics",
    },
    color: {
      eyebrow: "Couleur",
      title: "La nuit, l'encre et un signal.",
      lead: "Une palette retenue : l'interface est faite de nuit et d'encre ; le signal indigo-magenta est réservé à la donnée en mouvement, au focus et au point.",
      roles: [
        "Fond. Chaque surface part d'ici.",
        "Texte principal, l'orbite, boutons principaux.",
        "Début du signal. Issu de l'historique #120F8D.",
        "Focus, liens, états actifs.",
        "Fin du signal. Insight, résultat, emphase.",
      ],
      copy: "Copier",
      copied: "Copié",
      gradient: "Dégradé signal : indigo, violet, magenta",
    },
    type: {
      eyebrow: "Typographie",
      title: "Geist & Geist Mono.",
      lead: "La linéale pour la voix, la mono pour la donnée : index, libellés, horodatages et tout ce qu'une machine imprimerait.",
      sample: "Collecter et ingérer des données brutes en temps réel, quels que soient le volume, les sources ou le format.",
    },
    icons: {
      eyebrow: "Iconographie",
      title: "Trait unique, 24 px, épaisseur 1,5.",
      lead: "Dessinées selon les mêmes règles que le logotype. Aucun emoji, aucune police d'icônes générique.",
    },
  },
  legal: { legalNotice, privacyPolicy },
};
