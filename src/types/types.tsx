export type MetricsData = {
  days: string[];
} & Record<string, number[]>;

export type MetricKey = Exclude<keyof MetricsData, "days">;
