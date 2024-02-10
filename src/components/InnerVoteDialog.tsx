"use client";
import { trpc } from "@/trpc_client/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  Button,
} from "@/components/ui/chadExporter";
import VoteForm from "@/components/VoteForm";
import { Item } from "@/lib/utils";
import { subCategoryType } from "@/lib/utils";

const InnerVoteDialog = ({
  subCategory,
  disabled,
  category
}: {
  subCategory: subCategoryType;
  disabled: boolean;
  category: string
}) => {
  const items = trpc.getItems.useQuery({ subCategoryId: subCategory.id });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" disabled={disabled}>
          {subCategory.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <div className="flex items-center space-x-2">
          <div className="flex-col">
            <VoteForm
              items={items.data as Omit<Item, "count">[]}
              subCategory={subCategory}
              category={category}
            />
          </div>
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

export default InnerVoteDialog;
