"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { trpc } from "@/trpc_client/client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";

const SidePopup = () => {
  const categories = trpc.getCategories.useQuery();
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="outline" className=" p-2">
          <AlignLeft />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-1/2">
        <SheetHeader className="mt-4">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          {categories.isFetched &&
            categories.data
              ?.sort((a, b) => a.id - b.id)
              .map((data) => {
                return (
                  <Link
                    href={`/home/${data.name
                      .split(" ")
                      .join("")
                      .toLowerCase()}`}
                    key={data.id as number}
                  >
                    <SheetClose asChild>
                      <Button variant="link" className="capitalize text-md">
                        {data.name}
                      </Button>
                    </SheetClose>
                  </Link>
                );
              })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidePopup;
