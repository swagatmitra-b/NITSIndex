"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import { useState } from "react";

export default function Chart({
  names,
  votes,
}: {
  names: string[];
  votes: number[];
}) {
  const [width] = useState<number>(
    window.screen.width > 500 ? 600 : 350
  );
  return (
    <BarChart
      colors={["blue"]}
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
      width={width}
      height={400}
      className="dark:text-white"
    />
  );
}
