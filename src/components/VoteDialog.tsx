"use client";
import { trpc } from "@/trpc_client/client";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from "@/components/ui/chadExporter";
import { useEffect } from "react";
import { Vote } from "@/lib/ContextProvider";
import type { subCategoryType, CategoryType } from "@/lib/utils";
import InnerVoteDialog from "./InnerVoteDialog";

const VoteDialog = () => {
  const { voteData, setVoteData } = Vote();
  const { data: session } = useSession();
  const email = session?.user?.email as string;
  const student = trpc.getStudent.useQuery({ email });
  const all = trpc.getAll.useQuery();

  useEffect(() => {
    if (student.data && all.data) {
      setVoteData({
        categories: all.data[0] as CategoryType[],
        subCategories: all.data[1].flat() as subCategoryType[],
        votedSubCategories: student.data.votedSubCategories,
      });
    }
  }, [all.data, student.data]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Vote now</Button>
      </DialogTrigger>
      <DialogContent className="h-5/6 overflow-y-scroll">
        <div className="flex-col items-center">
          {all.isPending ? (
            <h1 className="text-black">Loading...</h1>
          ) : (
            voteData.categories.map((cat) => {
              return (
                <div className="flex flex-col gap-2 my-4" key={cat.id}>
                  <DialogHeader>
                    <DialogTitle className="capitalize">{cat.name}</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-3 w-full gap-2">
                    {voteData.subCategories.map((subCat) => {
                      if (subCat.categoryId == cat.id) {
                        const hasVoted = voteData.votedSubCategories.find(
                          (item) =>
                            item.categoryId == cat.id &&
                            item.name == subCat.name
                        );
                        return (
                          <InnerVoteDialog
                            key={subCat.id}
                            subCategory={subCat}
                            category={cat.name}
                            disabled={hasVoted ? true : false}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VoteDialog;
