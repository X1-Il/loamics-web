import { md } from "../blocks";

export const softwareOverview = {
  title: "Our software",
  intro:
    "Loamics is the software editor that democratizes access to data to facilitate its use. Our main objectives are to guarantee our customers the sovereignty over their data. We give them the assurance of a good governance whatever their operational configuration. Our product Loamics suite allows an efficient industrialization of your data thanks to a remarkably high level of interoperability of its functionalities.",
  platform: md(`
## Our master data management platform

Loamics suite has strengths that are unmatched by the competition. Processing is performed on a dynamic basis with a high level of interoperability. This results in a high ROI in terms of time and tool total cost ownership. Loamics suite is immediately accessible and unlimited. The integration of our modules is fast and non-intrusive to your existing cloud instance and applications.

The price of the Suite is fixed, it is not based on the number of connected users and the amount of data collected, stored and processed. Finally, the training of your IT team is accessible and fast. The large number of use cases we have already encountered allows us to provide personalized answers to your specific problems in the shortest possible time.
`),
  tabs: [
    {
      key: "collect",
      name: "DataCollect",
      headline: "The first module of Loamics : DataCollect",
      body: md(`
The first module of Loamics is DataCollect. This is the module dedicated to the collection and management of raw data. This can be done in real time regardless of the volume involved. All types of formats are accepted. The data can be structured or unstructured and is then transformed into a homogeneous whole. This enriched raw information is then immediately exploitable and ready to be visualized.

The metadata generated during collection provides valuable attributes that can be used by machine learning. The collection allows an initial quantitative and qualitative analysis of the acquired data, which allows for the refinement of ingestion pipelines. Furthermore, we must not lose sight of the fact that the performance of machine learning models depends essentially on the quality of the data with which they have been trained.

Loamics – DataCollect does not perform any transformation of the data during its collection in real time or not. After collection, it is therefore possible to store a large volume of input data in real time, such as files in their entirety, regardless of their size. Downstream modules will process this data into information. The processes used by DataCollect are optimized to feed machine learning models. They allow for the creation of very large datasets that are not affected by transformation bias.
`),
      href: "/software/data-collect",
    },
    {
      key: "catalog",
      name: "DataLake",
      headline: "Loamics' DataLake module enables the storage of large amounts of heterogeneous data",
      body: md(`
Whatever their origin or format, your data is stored in a proprietary system. This system is totally secure. It is elastic and scales automatically.

Loamics DataLake interacts tightly with the cloud instance on which it operates to make any transaction on your data completely transparent. You retain complete governance of your data and do not need to replicate it.

Loamics DataLake provides simplified access to data, making it easier and faster to create value. Securing enterprise data assets enables tighter governance. This simplified data access also improves team collaboration and information sharing.

In addition to the standard ecosystem offered by LOAMICS, it is also possible to use a data space and create your own tools to access it. You can freely extract and share useful data in a totally collaborative mode.
`),
      href: "/software/datalake",
    },
    {
      key: "prepare",
      name: "AlgoEngine",
      headline: "Our data analysis software AlgoEngine specializes in connecting, processing and analyzing data in real time",
      body: md(`
Its powerful functionality and flexibility allows for the generation of information tailored to any business use case. Loamics AlgoEngine’s rich library of algorithms enables the development of resilient workflows and pipelines for all your business processes.

They can be enriched as they are used and made available in self-service so that your employees can take advantage of the solving power of machine learning. The high level of integration of Loamics AlgoEngine with the other two software products in the LOAMICS suite allows you to consume only the data that is relevant to the processing you want to perform. It becomes possible to industrialize data analysis processes by using them as easily and as quickly as you create them.

Even the most complex processing is performed dynamically with a high level of interoperability. This translates into a high ROI in terms of time and tool TCO. Integration of our modules is fast and non-intrusive to your cloud instance and its existing applications. Training of your IT team is accessible and fast. The large number of use cases that we have already encountered allows us to provide personalized answers to your specific problems in the shortest possible time. In fact, Loamics AlgoEngine allows you to respond to any intelligent processing problem you may face.
`),
      href: "/software/algoengine",
    },
  ],
  elt: {
    title: "ETL vs ELT",
    body: [
      "ELT (Extract/Load/Transform) also extracts data from one or more remote sources, but then loads it into the target data warehouse without format change.",
      "In an ELT process, the data transformation takes place in the target database. ELT requires fewer remote sources, but only their raw, unprepared data.",
    ],
  },
  evolution: {
    eyebrow: "LOAMICS software is constantly evolving technologically",
    title: "A permanent evolution of our solution",
    body: "We are currently strengthening its ELT-based multi-cloud capabilities, which is a trend and a strong market demand. Other technology avenues are being pursued by our experts. These include cloud virtualization, increased security of customer data and the widespread use of AI. The arrival of competition in a sector where we were virtually alone is pushing us to accelerate our recruitment, adapt the pricing policy of our offerings and maintain our technological lead.",
  },
};

export type ModulePage = {
  slug: "data-collect" | "datalake" | "algoengine";
  index: string;
  name: string;
  role: string;
  intro: string;
  body: ReturnType<typeof md>;
};

export const modulePages: Record<ModulePage["slug"], ModulePage> = {
  "data-collect": {
    slug: "data-collect",
    index: "01",
    name: "Data Collect",
    role: "Collect & ingest",
    intro:
      "Our data collection software is a computerized system for harvesting and storing electronically accessible data. This data collection solution has several advantages: it does not require preparation nor planning prior to the data collection process and it ingests raw data that can be used immediately for building reports to produce analyses and update dashboards. Our data collection tool is an efficient substitute for data entry. Real-time data collection serves as a data source to meet the data visualization needs of digitalized companies.",
    body: md(`
## Data Collect, a unique solution on the market

Data collection is the process of gathering and measuring information that is of interest to the company. It puts in place systematic and automated processes that answer user question. Data collection solutions also allow for the verification of certain hypotheses and evaluation of results. Many business processes require reliable data sources that result from the accumulation of validated data. Collected data can be quantitative or qualitative. Their integrity is crucial to validate their usefulness. A data collection tool must be as reliable as possible to minimize the possibility of error in the production of results.

### Four types of data collection methods

There are four types of data collection methods: observational, experimental, simulation, and derived. The type of data affects how it is managed. For example, irreplaceable data require specific backup procedures for raw data. In the case of data generation resulting from a fusion of other data sources, data corruption can be a central concern. The data collection solution must implement strict control procedures to address these potential problems.

### Data collection solutions can ingest raw data and transformed data sources

Data collection tools are fed with observational data. Collected data is harvested gathering data field from the company's operational, financial, administrative, and other activities. ERP and CRM systems are the source of most of this observed collected data. The data collection software can ingest raw data from these systems or ingest data already transformed by them. Increasingly, sensors measure the company's physical operational activity to produce data in real time. Real-time data may come from a production line or a building and its communicating modules using IoT for example.

## Data collection

Data collection can be done both online and offline. In the first case, it is a matter of capturing information of interest in real time that is disseminated from raw data streams. This could be orders placed in real time by customers on an e-commerce site. Where the data source is not connected, the acquisition of raw data is done by extracting information already stored.

For example, salespeople can extract important real-time data from their customer meeting databases to prepare their commercial reports.

### Real-time data capture

Companies that want increased responsiveness and agility in their business processes often turn to real-time data collection. This data provides quick insights into changing operational situations. It is generally fed into the company’s decision-making systems as real time data for continuous monitoring and even predictive analysis. This connection between data collection software and business systems such as CRM and ERP is automated by means of software plugins to collect raw data. This real-time data collection stream is tightly coupled with continuous machine learning systems to update the company’s entire data pipeline using MLOps.

### Offline data collection

One of the main benefits of data collection solutions is the ability to collect data offline even while on the go. Offline data collection platform features allow users who work in locations where the internet is unreliable to store a backup of their collected data on their mobile device and download it as soon as a network connection is available. The data collection tool then supports the transfer and reconciliation of the data with its storage locations in the company’s digital infrastructure.

## What to do next with collected data

The data collection platform is a piece of software that provides a unique and reliable source of truth for enterprise-wide information systems. As such, it ingests data by transforming it into the desired formats. It also avoids duplication and ensures, as far as possible to correct any errors made during data entry. The collected and validated data are then available for use with visualization software and for analysis to make predictions. LOAMICS is a leader in its field thanks to this unique and tight integration of intelligent data collection solutions and the various AI-based platforms that process them.

### Providing customized 360° visualization

As any data scientist or AI engineer will tell you, they spend most of their time building data sets. The cleanliness, reliability and interpretability of the data depend on the reliability of the models they build.

Our LOAMICS-Data Collect platform guarantees you the best sources of information for all your downstream processing. It is the cornerstone on which our suite of tools is built. They quickly transform your data-intensive business into a digitalized, data-driven business.

### LOAMICS-DataLake

Once ingested in real time, an unlimited volume of data in any format is transformed into a unique, homogeneous, and value-creating source of truth. LOAMICS-DataLake exposes it via metadata that makes replicating your proprietary data unnecessary.

Your information is ready to be used immediately for analysis and artificial intelligence. LOAMICS-AlgoEngine connects and analyzes it in real time. You can generate customized insights available to all users in the company. Create your own library of intelligent algorithms, real growth levers to increase your industrial performance.

## LOAMICS suite

Collecting, enriching, and analyzing data to offer a unique view of your company is our goal. With the LOAMICS suite of applications, enter the digital age and allow your data to be an integral part of your capital industrial and commercial resources.
`),
  },
  datalake: {
    slug: "datalake",
    index: "02",
    name: "DataLake",
    role: "Store & catalog",
    intro:
      "The volume of data doubles every year and has reached more than 44 billion gigabytes by 2020. More than 90% of this data is unstructured or semi-structured. Add to it the avalanche of information from real-time IoT sensors. This represents a double challenge. That of finding an efficient solution to store all this data and also that of permanently having the necessary capacities to process it rapidly. The Data Lake is able to meet both challenges, at least much better than previous storage paradigms such as the Data Warehouse. LOAMICS-DataLake is an optimized storage solution that is perfectly integrated in the pipeline of the total LOAMICS-Suite.",
    body: md(`
## What is a DataLake and how does it work?

It’s an innovative approach: ELT (Extract, Load, Transform) compared to the older process of ETL (Extract, Transform, Load).

A DataLake is a centralized storage location that contains Big Data in a raw and granular format. It comes from many sources in many formats. A DataLake can store structured, semi-structured or unstructured data, which means that the data can be kept in simpler and more flexible formats for later use. When importing data, the DataLake associates it with identifiers and metadata tags for faster retrieval. Searching a DataLake is also faster because you only need to browse the metadata, not read the entire contents of the files. The term Data Lake implies that the data is stored in bulk and in raw form. In traditional Data Warehouses, clean and processed data is stored.

### Read schema vs. write schema

The schema of a Data Warehouse is defined and structured before storage; it is applied while writing the data. That of a Data Lake is not predefined, which allows it to store data in its native format. In other words, in a Data Warehouse, most of the data preparation usually takes place before processing, whereas in a Data Lake it only takes place when the data is used.

### Accessibility and flexibility

With a Data Warehouse, you need to allow not only time to define the initial schema, but also significant resources to modify that schema whenever business needs change. Data Lakes are very adaptable to change. As storage capacity requirements increase, it is easier to scale the servers in a Data Lake big data cloud cluster because the raw data is not organized in the cluster.

## Why use a Data Lake solution?

The DataLake paradigm has many advantages over the traditional Data Warehouse.

There is a real warehouses data lakes tradeoff. With DataLakes, data is stored in a native way and is therefore easy to extract and process. It is totally possible to use any kind of open-source data pipelines.

LOAMICS-DataLake fully exploits this paradigm to put your single data source just a few clicks away from your users.

### Unfiltered data access

A Data Lake operates on a “schema on read” basis, which means that there is no predefined schema into which data must be imported before it is stored. Only when you access data for processing it is analyzed and adapted into a schema if necessary. This feature saves the time needed to define a schema. This is usually exceedingly long and depends on both the volume of data to be processed and the complexity of the schema. A Data Lake allows to store data as it is, in any format. This simplification allows data scientists to access, prepare and analyze data faster and with greater accuracy. For analytics experts, this vast pool of cloud data available in non-traditional formats gives them the ability to access data for various use cases such as consumer sentiment analysis or fraud detection.

### The Data Lake is fit for the cloud

Data Lakes are not comparable to Data Warehouses. In fact, they have some notable differences that can be significant advantages for some companies. This is especially true at a time when Big Data, machine learning and their processes are migrating massively from on-premises solutions to the Cloud. Typically, Data Lakes are configured on inexpensive and scalable standard server clusters. This type of configuration allows data to be stored in the Data Lake without having to worry about available storage capacity. If these clusters can be deployed on site, the trend is to place them in the Cloud. This evolution is logical when you consider the advantages provided by hosted data services (redundancy, fault tolerance, security, geo-localized replication, etc.).

## LOAMICS-DataLake software benefits

LOAMICS-DataLake is capable of handling large amounts of structured, semi-structured or unstructured data. Once collected, the data is placed in clusters located on the customer’s cloud instances. LOAMICS-DataLake ensures a real virtualization of all the data in the Data Lake. The data is then exposed and made available to all processes, including those in AlgoEngine, which feed analytical applications, reports and dashboards. LOAMICS-DataLake is fully integrated with our other software solutions.

### Data automation

According to a Forbes study, Data Scientists spend about 80% of their working time preparing the data they will work on. These skills are monopolized by repetitive and boring work, taking valuable specialists away from the tasks they really excel at. With LOAMICS-DataLake, data preparation is fully automated to an industrial standard. Data professionals can now focus on their analytical work and on feeding artificial intelligence models.

### Microsoft Azure Marketplace

Since April 2021, LOAMICS data lake solutions and data lake tools are available on the Microsoft Azure Marketplace. Microsoft’s cloud is recognized as the most flexible for data warehousing, thanks to its architecture that facilitates the establishment of Data Lakes. Azure is also the most renowned Cloud for its Artificial Intelligence offerings, notably thanks to its Cognitive Services.

All LOAMICS customers can now deploy their Data Lakes on Azure and benefit from its great scaling capabilities, agility, and reliability. They also benefit from all the advantages of a Microsoft Network Partner specialized in Big Data Analytics.

### The LOAMICS solution on 4 levels

The LOAMICS solution on Azure Cloud for your Data Lake is established at 4 levels:

- It is a plug and play flash solution ready for data analytics. Customers access their cloud Data Lake as soon as they are connected to the Cloud instance. You do not have to wait weeks or months to integrate them into decision-making processes or if you want to include them in your reports.
- Customers retain full governance of their data; they do not need to export it for use thanks to Platform as a Service (PaaS) operation. The upstream and downstream processing of the data sources is done in a totally automatic and fluid way.
- The integration of data is unlimited thanks to the strong interoperability of LOAMICS-DataLake. Whatever the sources, systems or protocols used for your real time data, your Business Intelligence applications, your visualization tools, and all your other applications can use the information from the Data Lake platform. This connectivity is full of all Microsoft Azure services.
- Your data science specialists do not have to prepare the data and can focus on higher value-added tasks, such as envisioning disruptive machine learning models, to gain productivity and performance. Data Sets are created automatically in real time by the Data Lake software, and their use cases are unlimited.

Whatever the size of your company or the type of your activity, you can be sure to significantly improve the return on investment of your data placement on the LOAMICS-DataLake.

### European hub Gaia X

LOAMICS has joined the European hub Gaia X which contributes to strengthen the sovereignty and governance of European data. The users of our Data Lake storage solution are thus assured to meet the requirements of the GDPR. They can operate freely on the entire European market. This gives them a recognized competitive advantage in terms of commercial openness. It is conferred by a secure sharing of data and the creation of a European data ecosystem of industrial quality. This ecosystem can be used with confidence by even the most advanced research teams.

### MyDataModels' partner

By partnering with MyDataModels in June 2021, LOAMICS is taking another step towards much faster and more powerful Big Data analysis capabilities. This will enable marketing strategy decisions to be made at a level unmatched in the Big Data market. This partnership simplifies complex data management processes, reduces the level of human intervention and strengthens data governance and sovereignty. Data is instantly accessible and easily lined up when desired.

## The LOAMICS-Suite totale

LOAMICS-Suite totale is composed of 3 modules including LOAMICS-DataLake. In addition to this data management application, LOAMICS-Collect is used for data collection and LOAMICS-AlgoEngine for data processing. They are all part of a specialized and optimized pipeline that brings Big Data within the reach of companies of all types and sizes. This suite is a true artificial intelligence accelerator that enables decision making based on data mining and self-service analysis. Once collected, the data is cleansed and made available in the Data Lake as a single data source. Regardless of volume and format, it is easier to access, analyze, freely cross-reference, and exchange.

Your organization can finally move from being a simple data user to a real business built around and on its data.
`),
  },
  algoengine: {
    slug: "algoengine",
    index: "03",
    name: "AlgoEngine",
    role: "Connect, process & analyze",
    intro:
      "Opting for the LOAMICS-AlgoEngine to engineer your data means reducing the number of your technical contacts. This simplification has a technological impact on the deployment of your solutions. You have fewer tools to use, the assistance to the collaborators is reduced, and the maintenance is less complex. This multi-level simplification allows for better interoperability. AlgoEngine offers a relevant access to data in terms of use and control. This facilitated decision support increases the level of ROI in terms of time and tools. The security of the whole is reinforced by that of the cloud.",
    body: md(`
## What is data engineering?

Data engineering focuses on the elaboration and structuring of data flows to enable optimal exploitation. This step in the data processing process is crucial in view of the multiplication of data flows and the quantity of data. Gartner, the leading consulting firm in the field, defines data engineering as follows:

> Data engineering is the discipline of making the right data accessible and available to different types of data consumers. | Gartner

It includes data scientists, business analysts, data analysts and many others across the enterprise.

### To organize, structure and select data

The objective of data engineering is to select, sort and arrange data in a way that guarantees its quality and relevance. Data engineering is therefore an essential complement to data science.

The two disciplines, which were once confused, are now distinct from each other. Without data engineering, companies can quickly suffocate under the weight of useless data. Do you remember the expression "finding a needle in a haystack"? This perfectly illustrates one of the primary functions of data engineering. The objective of the data engineer is to identify, access and use relevant data.

### Data pipelines and data science models

The very basis of data engineering is the creation of data pipelines. Like other kinds of engineers, data engineers imagine and build structures. Data engineering must allow for scalability as well as optimal security.

Another aspect of data engineering is the production of data science models. In recent years, many tools have emerged to facilitate this aspect of the work. This is notably the case of the LOAMICS-Suite Totale and its AlgoEngine module.

## Collect, process, and analyze data in real time

Data is multiplying exponentially. To make the right decisions, you need to use the right data. All data science professionals will tell you about the well-known phrase in the industry: “Garbage in, garbage out”.

The role of data engineering is therefore mainly at the level of ETL / ELT processes and the structuring of databases into data lakes. There are different main areas of work:

- Collecting data from different sources (ETL/ELT). The data engineer works with existing software but can also develop his own tools
- Structuring the data
- Identify and eliminate erroneous or irrelevant data
- Standardize the data so that it can be processed

This organizational work is essential. The percentage of data science projects that make it to production is around 87%. One of the major reasons for this low success rate is that data exists in different forms, in different units with different security or privacy protocols. So, the data needs to be collected and cleaned up to allow it to be used. Moreover, the collection, processing, and analysis of data in real time is crucial for the development of machine learning models and artificial intelligence algorithms. Indeed, to ensure proper functioning, the quality of the data, especially the training data, makes a real difference.

## Connect algorithms to your data

Machine Learning is a set of techniques used by Data Scientists that has been widely talked about in the last few years. Because its applications are varied and very promising.

AlgoEngine provides you with all the algorithms that allow you to connect your data to these revolutionary algorithms. It is the one that connects the data in the data lake to the visualization applications, dashboards, and predictive analytics you may want to develop.

### ML models connect your data to outcomes

Once your data scientist has collected, cleaned, and mined the data, he or she can create a Machine Learning model. This model connects the data it receives as input to the results it gets as output. Instead of performing calculations using traditional algorithms, it establishes a statistical link between the new data to produce new results. This connection between data, via ML algorithms, is called learning. In fact, your models can be re-trained on newer data to provide even more accurate and relevant predictions. It is all this magic on data that AlgoEngine can accomplish. The module is also capable of deploying traditional algorithms that have proven successful in the past.

## Discover our other software

AlgoEngine is part of the LOAMICS-Suite Totale and is in fact its third and final module. This last link in the chain, the ultimate step in the data processing pipeline, relies on two other software programs. DataCollect collects data from any source, in any format and in real time. Then there's DataLake, which, as the name suggests, is the storage software that works in synergy with your cloud instance to provide secure access to your enterprise data.

Our software is constantly evolving in terms of technology. We are currently strengthening our cloud virtualization abilities, increasing security of customer data, and scaling up our AI capabilities. Our software provides simplified access to data, making it easier and faster to create value. The security of the company's data assets allows for tighter governance.

This simplified access to data also enhances team collaboration and information sharing. All companies using LOAMICS AlgoEngine can benefit from the ease of data processing. The origin and the conditions of collection have no impact on the use of the data. The interoperability between tools and uses allows an unlimited number of deployment types.
`),
  },
};
