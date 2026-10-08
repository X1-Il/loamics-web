import { md } from "../blocks";
import type { augmented as AugmentedEn, healthcare as HealthcareEn } from "../en/pages";

export const healthcare: typeof HealthcareEn = {
  consortium: md(`
## Un consortium d’experts pour révolutionner la gestion des données de santé

Le projet P4DP repose sur un consortium d’acteurs clés de la santé, de la recherche et de la technologie, incluant des institutions comme l’Université Côte d’Azur, l’Université de Rouen Normandie, le CHU de Rouen, et le Collège National des Généralistes Enseignants (CNGE). Loamics apporte la brique technologique pour le traitement des données, et le Health Data Hub garantit l’accès sécurisé. En rassemblant des données de plus de 2000 cabinets médicaux et en les croisant avec celles de l’Assurance Maladie, P4DP ambitionne d’améliorer la recherche clinique et la prise en charge des patients, avec des outils accessibles aux médecins d’ici 2025.
`),
  members: ["Université Côte d’Azur", "Université de Rouen Normandie", "CHU de Rouen", "CNGE", "Health Data Hub", "Loamics"],
  pillars: [
    {
      title: "Collecte et centralisation des données",
      text: "P4DP regroupe les données de santé de plus de 2000 cabinets médicaux en France. Ce processus permet de centraliser des informations cruciales pour une meilleure analyse des pratiques médicales et la recherche scientifique.",
    },
    {
      title: "Amélioration des soins grâce à la data",
      text: "Grâce à la plateforme P4DP, les médecins et chercheurs ont accès à des outils de visualisation des données et des rapports épidémiologiques pour optimiser la prise en charge des patients d’ici 2025.",
    },
  ],
  software: {
    text: "Le projet P4DP collabore avec plusieurs éditeurs de logiciels médicaux comme Weda, HyperMed et Amedulo pour faciliter la collecte de données de santé. Ces partenariats permettent une intégration plus fluide des données issues de la médecine générale, favorisant ainsi la qualité des analyses et de la recherche clinique.",
    vendors: ["Weda", "HyperMed", "Amedulo"],
  },
  security: {
    title: "Sécurité des données et respect de la vie privée",
    text: "Le projet P4DP accorde une grande importance à la sécurité des données des patients. En partenariat avec le Health Data Hub, des protocoles stricts de protection des données sont mis en place pour garantir la confidentialité et le respect des droits des patients, en conformité avec la réglementation RGPD.",
  },
  governance: [
    {
      title: "Gouvernance éthique du projet",
      text: "Le comité éthique de P4DP supervise l’utilisation des données pour s’assurer que les patients sont informés et que leurs données sont utilisées de manière responsable.",
    },
    {
      title: "Transparence et implication des professionnels",
      text: "P4DP inclut les médecins et professionnels de santé dans toutes les étapes, garantissant ainsi une transparence totale et une utilisation optimisée des données au service de la santé publique.",
    },
  ],
  analytics: md(`
## Comment utiliser l’analyse des soins de santé ?

L’analyse des soins de santé est une façon d’introduire l’enregistrement du Big Data dans le domaine des soins de santé. Elle peut être utilisée pour améliorer les soins personnalisés aux patients. Elle permet également d’établir des diagnostics rapides avec une réduction des marges d’erreur et des polices d’assurance. L’analyse dans le domaine de la santé peut également réduire le coût des traitements, prédire l’apparition d’épidémies et mieux gérer les pathologies évitables.

L’analyse des données dans les soins de santé est particulièrement utile du point de vue de l’analyse préventive. L’anticipation des risques au cours des processus d’analyse des données peut aider les médecins à reconnaître rapidement les manifestations, les causes et les effets courants d’une maladie. Cela permet un diagnostic et des traitements plus rapides. Il est également possible d’améliorer la satisfaction des patients en analysant les données relatives aux soins de santé, en permettant aux médecins de traiter et de soigner leurs patients de manière personnalisée.

- L’utilisation des feuilles d’enregistrement électroniques permet de faire des économies et d’augmenter la productivité.
- Elle permet également de réduire la perte de temps qui survient lorsqu’on se retrouve à chercher des tas de fichiers.
- Les professionnels de la santé peuvent accéder aux mêmes dossiers à tout moment sans avoir à déplacer les documents d’un établissement à l’autre.

L’intelligence artificielle (IA) et le Natural Language Processing (NLP) représentent de sérieuses pistes d’avenir pour un meilleur système de santé. En effet, l’intervention de l’IA dans les soins de santé introduira des robots capables de penser et d’agir pour le bien-être des patients. Ils pourront alors établir un diagnostic, réaliser des opérations chirurgicales ou administrer des vaccins. Ils pourront également utiliser les données existantes pour identifier des pathologies ou proposer des parcours médicaux adaptés à un patient.

Outre l’IA, le NLP est également une aubaine pour le domaine médical car il permet d’analyser des textes écrits à la main. Cette nouvelle technologie pourra ainsi détecter et valoriser les informations pertinentes qui sont présentes sur les dossiers médicaux des patients. L’analyse de la science des données qualitatives et l’apprentissage automatique joueront un rôle crucial dans l’avancement des conditions de santé.

Le système de soins de santé est un domaine qui génère une énorme quantité de données. La plupart du temps, ces données ne sont pas exploitées et ne sont pas facilement compréhensibles. Heureusement, l’analyse des données sur les soins de santé permet d’interpréter ces données qualitatives et quantitatives. La compréhension de ces données peut avoir un impact positif important sur les hôpitaux, les patients et les médecins. Plus important encore, elle améliore les conditions de travail des soignants et les soins aux patients.
`),
};

export const augmented: typeof AugmentedEn = {
  title: "Analyse augmentée et Business Intelligence (BI)",
  intro:
    "La définition la plus simple de l’analytique augmentée est l’utilisation du Machine Learning (ML) et du traitement du langage naturel ou Natural Language Processing (NLP) pour mieux analyser les données. Les données sont extraites, filtrées et analysées avec l’IA pour trouver des modèles et des informations pertinentes. Cela génère des réponses rapides et automatisées qui peuvent être communiquées sans l’intervention d’un data scientist ou d’un analyste.",
  what: md(`
## Qu’est-ce que l’analyse augmentée ?

Cette méthode permet d’industrialiser le traitement des données en vue de leur exploitation. La notion d’analytique augmentée a été conceptualisée par le cabinet d’études Gartner en 2017, dans son rapport « Emerging technologies : hype cycle ».

En effet, les informations fournies par les données au sein d’une entreprise peuvent être assez vagues. Par exemple, si les données montrent que vos revenus sont en baisse, le fait de le savoir ne sera d’aucune utilité. Il est alors nécessaire d’identifier la source du problème ainsi que les autres dysfonctionnements qui peuvent être liés. Entre autres choses, les données non interprétées sont superflues.

Or, l’analytique augmentée permet une analyse plus approfondie de la signification réelle de ces données. Elle analyse toutes les ressources pour en extraire les informations pertinentes. Ces tâches traditionnellement effectuées par des analystes et des data scientists sont désormais automatisées grâce à l’utilisation de techniques d’apprentissage automatique, et notamment du NLP, pour optimiser l’analyse des données à chaque étape de leur cycle de vie, depuis leur préparation et leur formatage jusqu’aux indicateurs qui en résultent.

Ces méthodes constituent ainsi une nouvelle étape dans la démocratisation de l’intelligence économique. Comme les tableaux de bord interactifs en libre-service tels que Microsoft Power BI, qui permet aux utilisateurs de poser leurs questions directement à l’application décisionnelle via la traduction par la machine des requêtes graphiques en requêtes SQL, le logiciel va alors répondre à ces requêtes en générant des indicateurs personnalisés expliqués en langage naturel et sous forme de graphiques, en tenant compte des besoins et du contexte métier de l’employé.

Les résultats de l’analyse augmentée sont affichés de manière pertinente à l’aide de représentations visuelles. Ces représentations aident les utilisateurs à mieux interpréter les données, mais aussi à initier des stratégies pour améliorer les revenus de l’entreprise.
`),
  mlIntro:
    "Comme nous l’avons vu plus haut, l’analytique augmentée s’appuie sur les techniques de Machine Learning (ML) et en particulier le NLP pour optimiser l’analyse des données. Le Machine Learning est donc la méthode principale, mais diverses techniques sont utilisées en fonction des besoins du cas, notamment :",
  techniques: [
    {
      title: "Le Machine Learning par Loamics (AutoML)",
      text: "Loamics AutoML, basé sur des données historiques et des modèles statistiques multiples, peut trouver automatiquement des informations sur les indicateurs clés de performance. L’utilisation du Machine Learning dans l’analyse augmentée simplifie le processus de création et de simulation des tendances. Le programme Loamics AutoML comprend plusieurs fonctions telles que le regroupement, la classification et la prédiction, entre autres.",
    },
    {
      title: "Programme de fiabilisation des données Loamics",
      text: "La préparation augmentée des données vous permet d’intégrer plus rapidement des listes de données fiables. Le programme d’Intelligence Artificielle de Loamics « Data Cleaning » trouve les données manquantes et erronées, les corrige et les complète avec les nouvelles bonnes données. Le contrôle de la qualité des données peut être mis en place rapidement ainsi que le profilage, le taggage et diverses annotations sur les données. Des outils tels que Microsoft Power BI permettent, quelle que soit la source des données, d’y accéder rapidement, avec une interface utilisateur simple.",
    },
    {
      title: "Natural Language Processing (NLP)",
      text: "Une autre caractéristique des plateformes d’analyse augmentée est l’utilisation du NLP, un domaine linguistique combinant l’informatique et l’intelligence artificielle. La requête en langage naturel (NLQ) utilise les mêmes techniques que le NLP, mais cette fois pour requérir des informations en langage naturel, ce qui permet d’utiliser les plateformes via un moteur de recherche, ainsi que des outils de génération en langage naturel pour renvoyer les résultats du moteur de recherche.",
    },
    {
      title: "Auto-visualisation",
      text: "Certaines plateformes permettent la création de tableaux de bord et de visualisations simples pour les utilisateurs professionnels. Ces plateformes permettent la création automatisée de graphiques. Par exemple, certains outils, via des modules dédiés, vous permettent d’interroger comme vous le feriez dans Google via des techniques NLQ pour générer des visuels automatiquement.",
    },
  ],
  mlOutro:
    "Ce ne sont là que quelques exemples de la manière dont les différentes techniques de Machine Learning peuvent être intégrées dans les principales plateformes d’analyse augmentée. Mais il en existe bien d’autres, comme la génération automatique de rapports, la prédiction de tendances, etc.",
  benefitsIntro: {
    quote: "L’analyse augmentée va fondamentalement changer l’expérience utilisateur en matière d’analytique.",
    cite: "Rita Sallam, Gartner",
    text: "Combinée à la curiosité humaine, l’intelligence artificielle fait de l’analytique augmentée un moyen très efficace d’obtenir rapidement les informations contenues dans les données. En proposant de transcrire les demandes des utilisateurs en requêtes SQL, les différents outils d’analytique augmentée permettront aux utilisateurs de formuler simplement leur demande et de recevoir immédiatement une réponse compréhensible et pertinente. Cela permet d’améliorer la productivité et de prendre les meilleures décisions pour une entreprise pour plusieurs raisons :",
  },
  benefits: [
    {
      title: "Analyse plus rapide des données",
      text: "Lorsqu’elles sont combinées, la science des données et l’intelligence artificielle permettent de préparer les données plus rapidement. Cela signifie également une visualisation plus rapide, des résultats de recherche plus rapides et donc une productivité accrue. Grâce aux algorithmes utilisés dans l’analytique augmentée, il est plus facile de combiner différentes sources de données, et de les nettoyer. Il suffit de glisser-déposer sur l’interface visuelle pour générer des graphiques, des cartes, des objets KPI et d’autres modes de visualisation des données en fonction de vos préférences.",
    },
    {
      title: "Des connaissances approfondies",
      text: "Avec les outils simples de Business Intelligence (BI), vous deviez deviner des hypothèses sur les informations que vous recherchiez. Avec l’IA, en revanche, les algorithmes sont chargés de trouver des intuitions pour générer les informations nécessaires, voire inattendues. Les machines utilisées dans l’analytique augmentée ont la capacité d’analyser d’énormes sources de données combinées. Il s’agit donc d’un moyen plus efficace d’analyser les données de manière plus approfondie. Les relations, corrélations et valeurs irrégulières mises en évidence facilitent la découverte d’informations par les utilisateurs.",
    },
    {
      title: "Des algorithmes plus fiables",
      text: "Il convient de noter que plus les algorithmes reçoivent de données à apprendre, plus leurs performances augmentent. Lorsque l’utilisateur initie une analyse des données, l’algorithme d’apprentissage enregistre l’information sur toutes ses implications. Par conséquent, les suggestions qu’il fait deviennent de plus en plus pertinentes et fiables pour les utilisateurs.",
    },
    {
      title: "Des données mieux interprétées",
      text: "Encore une fois, il est important de rappeler que les données ne signifient pas grand-chose si l’entreprise n’a pas la capacité de les exploiter. Avec l’analytique augmentée, ces données seront mieux maîtrisées grâce aux informations fournies. Ces résultats sont utilisés pour conseiller les utilisateurs et fournir des stratégies pour optimiser ces données.",
    },
    {
      title: "La démocratisation des données",
      text: "Grâce au NLP, il est plus pratique de mettre les données à la disposition d’un plus grand nombre d’utilisateurs. Cela augmentera les compétences d’un plus grand nombre de personnes dans l’entreprise et encouragera en même temps les initiatives de prise de décision. De même, le personnel informatique se concentrera sur les questions stratégiques plutôt que sur l’analyse proprement dite des données.",
    },
  ],
  microsoft: md(`
## Microsoft x Loamics

Créée en 2020 par des spécialistes des données, Loamics a développé une infrastructure technologique PaaS qui assure un traitement entièrement automatisé des données, ce qui permet de les valoriser et de les rendre immédiatement disponibles.

Cette infrastructure PaaS est disponible sur la Microsoft Azure Marketplace grâce à un partenariat entre Loamics et Microsoft. Microsoft a cru en ce projet dès le début en donnant à Loamics l’accès au réseau de partenaires, et aujourd’hui la plateforme peut se connecter directement et automatiquement à tous les services Microsoft et est capable de traiter des données massives hétérogènes en continu ou en temps réel de manière entièrement automatisée et industrialisée.

Loamics, en tant que membre du réseau de partenaires Microsoft, a un accès direct aux entreprises, organisations et administrations du monde entier tout en bénéficiant d’un support local par les équipes Microsoft, et les clients de Loamics peuvent désormais profiter de la plateforme Cloud Azure, productive et de confiance, avec un déploiement et une gestion simplifiés. Cette plateforme permet aux acteurs de tous les secteurs d’activité de disposer d’un véritable contrôle et d’une prise de décision « data-driven » basée sur le recoupement intelligent, fiable et sécurisé des données.

Loamics a également participé avec son partenaire Microsoft à l’initiative Environmental Start-up Accelerator, un programme d’accélération de 6 mois destiné à 7 à 10 start-ups européennes œuvrant à la réduction et à la compensation des émissions de carbone.
`),
  useCases: {
    title: "Nos derniers cas d’usage de l’analyse augmentée",
    text: "L’analyse augmentée se retrouve dans divers domaines tels que le commerce électronique, le marketing, la supply chain ou la gestion des outils de communication. Elle facilite la prise de décision et est pertinente dans de nombreuses situations. Les services financiers sont, sans aucun doute, l’un des domaines les plus prometteurs pour l’analyse augmentée. En particulier, les solutions d’analytique augmentée peuvent faire gagner un temps précieux aux analystes financiers face à la complexité de leurs environnements professionnels en constante évolution, tant en termes de réglementation que de conditions de marché. Cependant, chez Loamics, nous concevons et mettons en œuvre des solutions qui sont indépendantes de l’usage et qui peuvent fonctionner avec tous les types de données, et nous vous présentons nos deux solutions logicielles développées pour deux utilisations :",
    items: [
      {
        title: "DataCollect",
        text: "L’objectif de DataCollect est de collecter et d’ingérer des données brutes en temps réel (quels que soient leur volume, leur source ou leur format). Les données sont transformées en un résultat enrichi homogène, efficace et précieux pour la visualisation et l’analyse de premier niveau.",
        href: "/fr/notre-solution/datacollect",
      },
      {
        title: "Loamics et le logiciel MyDataModels",
        text: "Loamics et MyDataModels, deux start-ups françaises de la deep tech, se sont associées pour maximiser la valeur et l’accessibilité des données. Ensemble, elles ont créé une solution d’analyse augmentée permettant l’analyse rapide de grands volumes de données afin de prendre des décisions stratégiques. En combinant la puissante infrastructure de Loamics, qui automatise et industrialise la préparation des données, avec l’intelligence de la plateforme d’IA et de modélisation prédictive de MyDataModels, cette offre propose une solution unique sur le marché du Big Data, qui rivalise avec des solutions coûteuses, principalement américaines.",
      },
    ],
  },
};
