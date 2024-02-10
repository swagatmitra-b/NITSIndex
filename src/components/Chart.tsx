"use client";

import { BarChart } from "@mui/x-charts/BarChart";

export default function Chart({
  names,
  votes,
}: {
  names: string[];
  votes: number[];
}) {
  return (
    <BarChart
      colors={[]}
      xAxis={[
        {
          id: "barCategories",
          data: names,
          scaleType: "band",
        },
      ]}
      series={[
        {
          id: "votes",
          data: votes,
        },
      ]}
      width={500}
      height={300}
    />
  );
}
