import { softwareOverview, modulePages } from "./software";
import { healthcare, augmented } from "./pages";
import { legalNotice, privacyPolicy } from "./legal";

/** English page content. `content/fr` is typed against this object. */
export const en = {
  meta: {
    siteTitle: "Loamics | Serving humankind through data",
    description:
      "Loamics enables players from all business sectors to implement data-driven management and decision-making processes based on the cross-referencing of heterogeneous, intelligent, reliable and secure data with real time capability.",
    ogLocale: "en_US",
    pages: {
      software: { title: "Our software", description: softwareOverview.intro },
      dataCollect: { title: "DataCollect: real-time data collection software", description: modulePages["data-collect"].intro },
      datalake: { title: "DataLake: storage for heterogeneous data", description: modulePages.datalake.intro },
      algoengine: { title: "AlgoEngine: data engineering & analysis software", description: modulePages.algoengine.intro },
      health: { title: "P4DP: healthcare data platform", description: "" },
      augmented: { title: "Augmented analytics & business intelligence (BI)", description: augmented.intro },
      film: { title: "Film", description: "The Loamics story in 44 seconds: a motion piece rendered live in your browser, from raw data to insight." },
      contact: {
        title: "Contact: book a free demo",
        description: "You have a project? Do you want to know more about our platform? Contact us, we will be happy to exchange with you!",
      },
      brand: { title: "Brand", description: "The Loamics identity system: logo, construction, color, typography and iconography." },
      legal: { title: "Legal notice", description: "" },
      privacy: { title: "Privacy policy", description: "" },
    },
  },
  tagline: "Serving humankind through data",
  home: {
    hero: { eyebrow: "Real-time data platform", lead: "Serving humankind", accent: "through data", p4dp: "Discover the P4DP Project" },
    factsAria: "Key facts",
    facts: [
      "Plug & play, up and running in 2 hours",
      "Real-time capability",
      "Any volume, any source, any format",
      "Available on Microsoft Azure Marketplace",
      "Member of the European hub Gaia-X",
      "Data sovereignty & governance",
    ],
    mission: {
      eyebrow: "Our mission & our passion",
      titleLead: "Data-driven management and decision-making, built on",
      titleAccent: "heterogeneous, intelligent, reliable and secure data.",
      p1: "Loamics enables players from all business sectors to implement data-driven management and decision-making processes based on the cross-referencing of heterogeneous, intelligent, reliable and secure data with real time capability.",
      p2: "Our solution is unique because it can be deployed on a plug&play mode, meaning it is possible to be up and running in just 2 hours. It is the first complete end-to-end solution that reveals the power of our customers’ data to accelerate their organization’s success.",
    },
    stats: [
      { value: "2h", label: "to be up and running, deployed in plug & play mode" },
      { value: "3", label: "modules forming the first complete end-to-end solution" },
      { value: "∞", label: "volume, sources and formats, ingested in real time" },
      { value: "1", label: "fixed price, not based on users or data volume" },
    ],
    suite: {
      eyebrow: "The Loamics suite",
      title: "From raw data to insight, in one continuous flow.",
      lead: "Three modules, tightly integrated and non-intrusive to your existing cloud instance and applications.",
      link: "Explore the software",
    },
    p4dp: { eyebrow: "Healthcare · Platform for Data in Primary Care", title: "Discover the P4DP Project", cta: "Discover the project" },
    sectors: {
      eyebrow: "Business sectors",
      title: "Players from all business sectors.",
      p4dpLink: "P4DP project",
      generic: "Real-time data, cross-referenced",
      items: [
        { key: "health", title: "Healthcare industry" },
        { key: "city", title: "Smart cities" },
        { key: "factory", title: "Manufacturing industry" },
        { key: "aero", title: "Aerospace & defense" },
      ],
    },
    ecosystem: {
      eyebrow: "Ecosystem",
      title: "Sovereign by design, open by nature.",
      items: [
        {
          name: "Microsoft Azure Marketplace",
          since: "April 2021",
          text: "Loamics data lake solutions and data lake tools are available on the Microsoft Azure Marketplace, through the Microsoft Partner Network.",
        },
        {
          name: "Gaia-X",
          since: "European hub",
          text: "Loamics has joined the European hub Gaia-X, which contributes to strengthen the sovereignty and governance of European data.",
        },
        {
          name: "MyDataModels",
          since: "June 2021",
          text: "Two French deep tech start-ups teamed up to maximise the value and accessibility of data with an augmented analytics solution.",
        },
        {
          name: "Environmental Start-up Accelerator",
          since: "with Microsoft",
          text: "A 6-month acceleration programme for European start-ups working to reduce and offset carbon emissions.",
        },
      ],
    },
    film: {
      eyebrow: "Film",
      titleLead: "The Loamics story,",
      titleAccent: "rendered live.",
      lead: "Forty-four seconds from heterogeneous data to a single source of truth, written in code and computed frame by frame in your browser.",
      cta: "Watch the film · 00:44",
    },
  },
  modules: [
    {
      key: "collect" as const,
      index: "01",
      title: "Data Collect",
      product: "DataCollect",
      route: "dataCollect" as const,
      summary:
        "Collect and ingest raw data in real time (regardless of the volume, sources or format), to be very simply transformed into homogeneous, efficient and valuable enriched data ready for data visualization and first levels of analysis.",
      verbs: ["Ingest", "Homogenize", "Enrich"],
    },
    {
      key: "catalog" as const,
      index: "02",
      title: "Data Catalog",
      product: "DataLake",
      route: "datalake" as const,
      summary:
        "Provide access to all metadata (contextual data) in a key value system. Store and access proprietary data in a single, elastic, scalable system hosted within the organization. The data is ready to be exposed without the need to replicate. This data is prepared for analysis and artificial intelligence.",
      verbs: ["Store", "Index", "Expose"],
    },
    {
      key: "prepare" as const,
      index: "03",
      title: "Data Prepare",
      product: "AlgoEngine",
      route: "algoengine" as const,
      summary:
        "Connect, process and analyze data in real time to generate insights that meet any end-user need within the organization. Manage a workflow and a library of algorithms that can be continuously enriched. Share knowledge by making available or exchanging the « right » data. Industrialize the processes of connecting algorithms to the data for all your needs.",
      verbs: ["Connect", "Process", "Analyze"],
    },
  ],
  p4dp: {
    titleLead: "P4DP: Revolutionizing Healthcare",
    titleAccent: "Through Data Utilization",
    short: "Platform for Data in Primary Care",
    intro:
      "The P4DP project (Platform for Data in Primary Care) aims to create the first national health data warehouse for general medicine in France. Supported by the France 2030 program, this project centralizes real-world data from primary care to enhance research, improve care quality, and foster innovation in the healthcare sector. The project has won prestigious awards, including the 2023 eHealth Talents Jury's Choice Award, recognizing its innovative impact on medical data utilization.",
    stats: [
      { value: "2,000+", label: "medical practices across France" },
      { value: "2030", label: "Supported by the France 2030 program" },
      { value: "2023", label: "eHealth Talents Jury's Choice Award" },
      { value: "GDPR", label: "Secure access with the Health Data Hub" },
    ],
    visit: "Visit the P4DP website",
  },
  cta: {
    lead: "You have a project?",
    accent: "Contact us, we will be happy to exchange with you.",
  },
  software: {
    overview: softwareOverview,
    modulePages,
    page: {
      arch: { eyebrow: "Reference architecture", title: "One suite, inside your cloud." },
      platform: { eyebrow: "Master data management" },
      pillars: [
        { k: "Sovereignty", v: "Customers keep full governance of their data, whatever their configuration." },
        { k: "Interoperability", v: "Dynamic processing, non-intrusive to your cloud instance and applications." },
        { k: "Fixed price", v: "Not based on connected users nor on data collected, stored or processed." },
        { k: "Fast onboarding", v: "Training of your IT team is accessible and fast." },
      ],
      modules: { eyebrow: "The modules", title: "DataCollect, DataLake, AlgoEngine." },
      process: { eyebrow: "Process" },
    },
    modulePage: {
      seeItWork: "See it work",
      demoTitles: {
        "data-collect": "Raw data, ingested as it arrives.",
        datalake: "Store everything. Decide the schema later.",
        algoengine: "From a messy feed to model-ready data.",
      },
      others: { eyebrow: "Discover our other software", title: "The rest of the suite." },
    },
  },
  healthcare: {
    ...healthcare,
    crumbs: ["Industries", "Healthcare"],
    figuresAria: "Key figures",
    consortiumEyebrow: "Consortium",
    pillarsAria: "Project pillars",
    softwareTitle: "Medical software partners",
    governanceEyebrow: "Governance",
    governanceTitle: "Ethics and transparency at every stage.",
    flow: {
      practices: "2,000+ practices",
      practicesSub: "General medicine across France",
      vendorsSub: "Medical software providers",
      loamicsSub: "Technological framework for data processing",
      hubSub: "Secure access · GDPR",
      research: "Research & care",
      researchSub: "Visualization tools and epidemiological reports",
      consortium: "Consortium",
    },
  },
  augmented: {
    ...augmented,
    crumb: "Augmented BI",
    eyebrows: {
      definition: "Definition",
      ml: "Machine learning",
      mlTitle: "The role of machine learning in augmented analytics",
      benefits: "Benefits",
      benefitsTitle: "What are the benefits of augmented analytics?",
      partnership: "Partnership",
      useCases: "Use cases",
    },
  },
  film: {
    eyebrow: "Film",
    titleLead: "From raw data to insight,",
    titleAccent: "in forty-four seconds.",
    lead: "A marketing film written in code. Every frame is computed live from the brand geometry: scrub it, jump between chapters, switch on the generative soundtrack, or export it as a video file.",
    playerAria: "Film player",
    specsAria: "Technical specifications",
    specs: [
      { k: "Runtime", v: "00:44" },
      { k: "Rendering", v: "Canvas 2D, 60 fps" },
      { k: "Particles", v: "360, deterministic" },
      { k: "Soundtrack", v: "Generative WebAudio" },
      { k: "Assets", v: "0 KB of video" },
    ],
    keyboard: "Keyboard: Space play/pause · ← → seek 5s · F fullscreen · M sound",
  },
  contact: {
    eyebrow: "Contact",
    titleLead: "Contact us,",
    titleAccent: "we will be happy to exchange with you!",
    lead: "You have a project? Do you want to know more about our platform?",
    direct: "Contact us directly",
  },
  brand: {
    titleLead: "One orbit, one node.",
    titleAccent: "The Loamics identity.",
    intro:
      "The “O” of Loamics becomes the symbol: an open orbit (the continuous data cycle) and a single node docking into the gap: the data point that completes the loop. Monoline, geometric, drawn without a font, so it renders identically in a favicon, a film and a 4K screen.",
    logo: { eyebrow: "Logo", title: "Wordmark & symbol", dl: ["Logo · SVG", "Logo on light · SVG", "Symbol · SVG"] },
    construction: {
      eyebrow: "Construction",
      title: "Built on a 32-unit grid.",
      rules: [
        "Orbit radius 12, stroke 3, round caps.",
        "Opening of 70°, centred on the 45° diagonal.",
        "Node radius 2.9, seated on the orbit’s path.",
        "Clear space: one node diameter on every side.",
        "Minimum size: 16 px symbol, 72 px wordmark.",
      ],
      aria: "Construction drawing of the Loamics symbol",
    },
    color: {
      eyebrow: "Color",
      title: "Night, ink and one signal.",
      lead: "A restrained palette: the interface is night and ink; the indigo-to-magenta signal is reserved for data in motion, focus and the node.",
      roles: [
        "Background. Every surface starts here.",
        "Primary text, the orbit, primary buttons.",
        "Signal start. Lifted from the historical #120F8D.",
        "Focus, links, active states.",
        "Signal end. Insight, output, emphasis.",
      ],
      copy: "Copy",
      copied: "Copied",
      gradient: "Signal gradient: indigo, violet, magenta",
    },
    type: {
      eyebrow: "Typography",
      title: "Geist & Geist Mono.",
      lead: "Sans for voice, mono for data: indices, labels, timestamps and anything a machine would print.",
      sample: "Collect and ingest raw data in real time, regardless of the volume, sources or format.",
    },
    icons: {
      eyebrow: "Iconography",
      title: "Monoline, 24 px, 1.5 stroke.",
      lead: "Drawn to the same rules as the wordmark. No emoji, no stock icon font.",
    },
  },
  legal: { legalNotice, privacyPolicy },
};

export type Content = typeof en;
