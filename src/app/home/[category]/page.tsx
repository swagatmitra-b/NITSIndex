"use client";

import { trpc } from "@/trpc_client/client";
import SubCategoryCard from "@/components/SubCategoryCard";
import { useState, useEffect } from "react";
import { type subCategoryType, type Item } from "@/lib/utils";

const page = ({ params }: { params: { category: string } }) => {
  const [cardData, setCardData] = useState<{
    subCategory: subCategoryType[];
    facePics: Item[];
  }>({
    subCategory: [],
    facePics: [],
  });
  const subs = trpc.getSubCategories.useQuery({ category: params.category });
  useEffect(() => {
    if (subs.data) {
      setCardData({
        subCategory: subs.data[0] as subCategoryType[],
        facePics: subs.data[1] as Item[],
      });
    }
  }, [subs.data]);
  return (
    <div className="flex flex-col items-center md:grid grid-cols-3 gap-10 p-20 w-full">
      {cardData.subCategory.map((subCat, i) => (
        <SubCategoryCard
          {...cardData.facePics[i]}
          key={subCat.id}
          subCategory={subCat.name}
          subCategoryId={subCat.id}
          category={params.category}
        />
      ))}
    </div>
  );
};

export default page;
