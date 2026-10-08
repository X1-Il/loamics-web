import { md } from "../blocks";

export const healthcare = {
  consortium: md(`
## A consortium of experts to revolutionize health data management

The P4DP project is based on a consortium of key players in healthcare, research, and technology, including institutions like Université Côte d’Azur, Université de Rouen Normandie, CHU de Rouen, and the Collège National des Généralistes Enseignants (CNGE). Loamics provides the technological framework for data processing, and the Health Data Hub ensures secure access. By gathering data from over 2,000 medical practices and combining it with data from Assurance Maladie, P4DP aims to enhance clinical research and patient care, with tools accessible to doctors by 2025.
`),
  members: [
    "Université Côte d’Azur",
    "Université de Rouen Normandie",
    "CHU de Rouen",
    "CNGE",
    "Health Data Hub",
    "Loamics",
  ],
  pillars: [
    {
      title: "Data Collection and Centralization",
      text: "P4DP gathers health data from over 2,000 medical practices across France. This process allows the centralization of crucial information for better analysis of medical practices and scientific research.",
    },
    {
      title: "Improving Care Through Data",
      text: "Through the P4DP platform, doctors and researchers have access to data visualization tools and epidemiological reports to optimize patient care by 2025.",
    },
  ],
  software: {
    text: "The P4DP project collaborates with several medical software providers, such as Weda, HyperMed, and Amedulo, to facilitate the collection of health data. These partnerships allow for smoother integration of data from general medicine, thereby enhancing the quality of analyses and clinical research.",
    vendors: ["Weda", "HyperMed", "Amedulo"],
  },
  security: {
    title: "Data Security and Privacy Protection",
    text: "The P4DP project places great importance on patient data security. In partnership with the Health Data Hub, strict data protection protocols are implemented to ensure confidentiality and respect for patient rights, in compliance with GDPR regulations.",
  },
  governance: [
    {
      title: "Ethical Governance of the Project",
      text: "The P4DP ethics committee oversees the use of data to ensure that patients are informed and that their data is used responsibly.",
    },
    {
      title: "Transparency and Involvement of Professionals",
      text: "P4DP involves doctors and healthcare professionals at every stage, ensuring complete transparency and optimized use of data in the service of public health.",
    },
  ],
  analytics: md(`
## How to use Healthcare Analytics?

Healthcare Analytics is a way of introducing big data recording in Healthcare domain. It can be used to upgrade the heed of patients and allows the treatment of each patient to be special to him and personalized. It also allows getting rapid diagnoses with reduced margin of error and insurance measures. Aside from these multiple uses, healthcare analytics can also lower the cost of treatments, predict the onset of epidemics, and better preventable diseases.

Let’s highlight a few other usefulnesses of data analytics in healthcare such as the preventive analytics. In fact, anticipate risks during the processes of data analytics help doctors to quickly recognize common manifestation, cause and effect of a disease. This also enables them to have a quick diagnostic and solution as well, when a patient could have some risk of having a health problem.

Improving patient satisfaction by analyzing healthcare data is also possible. The information obtained can enable doctors to know how to treat and care for their patients in a personalized way.

- The use of the electronic record storages sheets allows economy and increases productivity.
- It also allows to reduce the waste of time which occurs when one finds oneself to search heaps of file.
- Health professionals can access the same files at any time without having to move documents from one establishment to another.

Artificial intelligence (AI) and natural language processing represent serious future paths for a better healthcare system. Indeed, AI intervention in healthcare will introduce robots capable of thinking and acting for the well-being of patients. They can then make a diagnosis, perform surgical operations or administer vaccines. They may also use existing data to identify pathologies or propose appropriate medical pathways for a patient.

Apart from AI, the treatment of language is also a boon for the medical field because it will make it possible to analyze manuscripts made by man. This new technology will thus be able to detect and enhance the relevant information that is present on patient’s medical books. And most important, the analysis of these qualitative data science and machine learning will play a crucial role in advancing health conditions.

The health care system is a sensible field that generates a huge quantity of data. Most of the time, those data are not exploited and are not easily understandable. Fortunately, healthcare data analysis helps to understand them and interpret those qualitative and quantitative data. In fact, understanding those data present positive impact on hospitals, patients and physicians. Most important, it helps to give a better healthcare to patient by using technology and thus to improve the caregivers work conditions.
`),
};

export const augmented = {
  title: "Augmented analytics & business intelligence (BI)",
  intro:
    "The simplest definition of augmented analytics is the use of machine learning (ML) and natural language processing (NLP) to better analyse data. Data is extracted, filtered and analysed to find AI patterns and relevant information, which will generate automatic and rapid responses that can be communicated without the intervention of a data scientist or an analyst.",
  what: md(`
## What is augmented analytics?

This method makes it possible to industrialise the processing of data with a view to its exploitation. The notion of augmented analytics was conceptualised by the research firm Gartner in 2017, in their report "Emerging technologies: hype cycle".

Indeed, the information provided by data within a company can be quite vague. For example, if the data show that your revenues are declining, knowing this will not help. It is then necessary to identify the source of the problem as well as other malfunctions that may be related. Among other things, uninterpreted data is superfluous.

Now, augmented analytics allows a deeper analysis of what this data really mean. It analyses all the resources to extract the relevant information. These tasks traditionally performed by analysts and data scientists are now automated by using machine learning techniques, and in particular natural language processing (NLP), to optimise the analysis of data at every stage of the data life cycle, from its preparation and formatting to the resulting indicators.

These methods thus constitute a new stage in the democratisation of business intelligence. Like interactive self-service dashboards such as Microsoft Power BI which allows users to ask their questions directly to the BI application via the translation of graphical queries into SQL queries by the machine, the software will then answer them by generating personalised indicators explained in natural language and in graphs, taking into account the needs and business context of the employee.

To answer the queries, the results of the augmented analysis are displayed in a relevant way with visual representations. These representations help users to better interpret the data, but also to initiate strategies to improve the company’s revenue.
`),
  mlIntro:
    "As we have seen above, augmented analytics relies on ML techniques and in particular NLP to optimise data analysis. So machine learning is the main actor in this method, but various ML techniques are used in different cases, including:",
  techniques: [
    {
      title: "Loamics Automated Machine Learning (AutoML)",
      text: "Loamics AutoML based on historical data & multiple statistic model allows to find automatically a KPIs Insight. The use of machine learning in augmented analytics simplifies the process of creating and simulating trends. Loamics AutoML program includes several functions: clustering, classification, prediction …",
    },
    {
      title: "Loamics data fiabilisation program",
      text: "Augmented data preparation allows you to integrate lists of reliable data more quickly. The Artificial Intelligence program of Loamics « Data Cleaning » finds missing and error data, corrects and fill with the new good data. The quality control of the data can be set up quickly as well as profiling, tagging and various annotations on the data. Tools such as Microsoft Power BI allow, regardless of the data source, to be accessed quickly, with a simple user interface.",
    },
    {
      title: "Natural Language Processing",
      text: "Another characteristic of augmented analytics platforms is the use of Natural language processing which is a linguistic field combining computer science and artificial intelligence which aims to create natural language processing tools, Natural Language Querying which uses the same techniques as NLP but this time to query information using natural language which allows the platforms to be used via a search engine, and finally Natural Language Generation tools to return the results of the search engine.",
    },
    {
      title: "Auto-visualisation",
      text: "Some platforms allow the creation of simple Dashboards and visualisations for business users. These platforms allow the creation of charts in an automated way. For example, some tools, via dedicated modules, allow you to query as you would in google via NLQ techniques to generate visualisations automatically.",
    },
  ],
  mlOutro:
    "These are just a few examples of how different machine learning techniques can be integrated in the main augmented analytics platforms. But there are many more, such as automatic report generation, trend prediction etc.",
  benefitsIntro: {
    quote: "Augmented analytics will fundamentally change the user experience for analytics.",
    cite: "Rita Sallam, Gartner",
    text: "Combined with human curiosity, artificial intelligence makes augmented analytics a very effective way to quickly obtain the information contained in data. By offering to transcribe user requests into SQL queries, the various augmented analytics tools will allow users to simply formulate their request and receive an immediately understandable and relevant response. This helps to improve productivity and make the best business decisions for a company for several reasons:",
  },
  benefits: [
    {
      title: "Faster data analysis",
      text: "When combined, data science and artificial intelligence will ensure that data is prepared faster. This also means faster visualisation, faster search results and therefore higher productivity. Thanks to the algorithms used in augmented analytics, it is easier to combine different data sources, and to clean them up. Simply drag and drop on the visual interface to generate charts, maps, KPI objects and other data visualization modes according to your preferences.",
    },
    {
      title: "Deeper insights",
      text: "With simple business intelligence (BI) tools, you had to guess at assumptions about the information you were looking for. With AI, however, the algorithms are responsible for finding insights to generate the necessary, if not unexpected, information. The machines used in augmented analytics have the capacity to analyse huge sources of combined data. It is therefore a more efficient way of analysing data in a deeper way. The highlighted relationships, correlations and irregular values make it easier for users to discover information.",
    },
    {
      title: "Exponential confidence",
      text: "It should be noted that as the algorithms are given more data to learn, their performance increases. When the user initiates an analysis of the data, the learning algorithm records the information on all its implications. As a result, the suggestions it makes become increasingly relevant and trusted by users.",
    },
    {
      title: "Better interpreted data",
      text: "Again, it is important to remember that data means little if the company does not have the ability to leverage it. With augmented analytics, this data will be better controlled thanks to the information provided. These results are used to advise users and provide strategies to optimise this data.",
    },
    {
      title: "The democratisation of data",
      text: "Through natural language processing (NLP), it is more convenient to make data available to a larger number of users. This will increase the skills of more people in the company and at the same time encourage decision-making initiatives. Similarly, IT staff will focus on strategic issues rather than on the actual analysis of the data.",
    },
  ],
  microsoft: md(`
## Microsoft x Loamics

Created in 2020 by data specialists, Loamics has developed a PaaS technological infrastructure that ensures fully automated data processing, which enhances the value of the data and makes it immediately available.

This PaaS infrastructure is available in the Microsoft Azure Marketplace through a partnership between Loamics and Microsoft, which believed in this project very early on by giving Loamics access to the partner network. The platform can now connect directly and automatically to all Microsoft services and is capable of processing massive heterogeneous data continuously or in real time in a fully automated and industrialised manner.

Loamics, as a partner of the Microsoft Partner Network, has direct access to companies, organisations and administrations throughout the world while benefiting from local support by Microsoft teams, and Loamics customers can now take advantage of the productive and trusted Azure cloud platform, with streamlined deployment and management. This platform enables players in all sectors of activity to have real “data-driven” control and decision-making based on intelligent, reliable and secure cross-referencing of data.

Loamics also took part with its partner Microsoft in the Environmental Start-up Accelerator initiative, a 6-month acceleration programme for 7 to 10 European start-ups working to reduce and offset carbon emissions.
`),
  useCases: {
    title: "Our latest augmented analytics use cases",
    text: "Augmented analysis can be found in various fields such as e-commerce, marketing, supply chain or management of communication tools. It facilitates decision making and is relevant in many situations. Financial services are, without a doubt, one of the most promising areas for augmented analytics. In particular, augmented analytics solutions can save financial analysts valuable time in the face of the complexity of their ever-changing business environment, both in terms of regulations and market conditions. However, we at Loamics, design and implement solutions that are usage-independent and can work with all types of data, and we’re going to show you two software solutions that we have developed for two use cases:",
    items: [
      {
        title: "DataCollect",
        text: "The goal of DataCollect is to collect and ingest raw data in real time (regardless of its volume, source or format). The data is transformed into a homogenous, efficient and valuable enriched output for data visualization and first level analysis.",
        href: "/software/data-collect",
      },
      {
        title: "Loamics and MyDataModels software",
        text: "Loamics and MyDataModels, two French deep tech start-ups, have teamed up to maximise the value and accessibility of data. Together, they have created an augmented analytics solution allowing rapid analysis of large volumes of data in order to make strategic decisions. Combining Loamics’ powerful infrastructure – which automates and industrialises data preparation – with the intelligence of MyDataModels’ AI and predictive modelling platform offers a unique and unparalleled solution in the Big data market, rivalling expensive solutions from mainly American competitors.",
      },
    ],
  },
};
