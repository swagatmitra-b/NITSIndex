"use client";
import { trpc } from "@/trpc_client/client";
import { Button } from "@/components/ui/chadExporter";
import Link from "next/link";

const SidePanel = () => {
  const categories = trpc.getCategories.useQuery();
  return (
    <div className="w-1/5 h-screen text-center py-10">
      <h1 className="text-2xl font-semibold">Categories</h1>
      <div className="flex flex-col h-3/4 justify-evenly">
        {categories.isFetched &&
          categories.data
            ?.sort((a, b) => a.id - b.id)
            .map((data) => {
              return (
                <Link
                  href={`/home/${data.name.split(" ").join("").toLowerCase()}`}
                  key={data.id as number}
                >
                  <Button variant="link" className="capitalize text-md">
                    {data.name}
                  </Button>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default SidePanel;
