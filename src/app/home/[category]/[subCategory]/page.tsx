"use client";
import { trpc } from "@/trpc_client/client";
import Chart from "@/components/Chart";
import ChartCard from "@/components/ChartCard";
import { type Item } from "@/lib/utils";
import { useEffect, useState } from "react";

const page = ({ params }: { params: { subCategory: string } }) => {
  const [itemData, setItemData] = useState<{
    names: string[];
    votes: number[];
    top: Omit<Item, "count">[];
  }>({
    names: [],
    votes: [],
    top: [],
  });
  const subCategory = decodeURI(params.subCategory);
  const subCategoryId = parseInt(
    subCategory.split(" ")[subCategory.split(" ").length - 1]
  );
  const getStats = trpc.getStats.useQuery({ subCategoryId });

  useEffect(() => {
    if (getStats.data) {
      let names = getStats.data[0].map((item) => item.name);
      let votes = getStats.data[0].map((item) => item.votes);
      setItemData({ names, votes, top: getStats.data[1] });
    }
  }, [getStats.data]);
  return (
    <div className="w-full flex flex-col items-center mt-10">
      {itemData.names.length ? (
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-10">
            {subCategory.split(" ")[0]}
          </h1>
          <div className="flex flex-col md:flex-row gap-5">
            <Chart {...itemData} />
            <div className="flex flex-col gap-2 items-center">
              {itemData.top.map((item, i) => {
                if (item.pic)
                  return (
                    <ChartCard {...item} multiplier={i + 1} key={item.id} />
                  );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default page;
