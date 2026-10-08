import { ModulePageView } from "@/components/software/ModulePageView";
import { LiveIngest } from "@/components/viz/LiveIngest";
import { SchemaOnRead } from "@/components/viz/SchemaOnRead";
import { DataPrep } from "@/components/viz/DataPrep";
import type { Locale } from "@/i18n/config";

export const DataCollectView = ({ locale }: { locale: Locale }) => (
  <ModulePageView locale={locale} slug="data-collect" demo={<LiveIngest />} />
);
export const DataLakeView = ({ locale }: { locale: Locale }) => (
  <ModulePageView locale={locale} slug="datalake" demo={<SchemaOnRead />} />
);
export const AlgoEngineView = ({ locale }: { locale: Locale }) => (
  <ModulePageView locale={locale} slug="algoengine" demo={<DataPrep />} />
);
