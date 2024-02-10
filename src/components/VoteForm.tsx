"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { trpc } from "@/trpc_client/client";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { DialogClose } from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Item } from "@/lib/utils";
import { subCategoryType } from "@/lib/utils";
import { VoteSchema, type VoteSchemaType } from "@/lib/zodSchema";
import { Vote } from "@/lib/ContextProvider";
import { useState } from "react";
import { Input } from "./ui/input";

export const VoteForm = ({
  items,
  subCategory,
  category,
}: {
  items: Omit<Item, "count">[];
  subCategory: subCategoryType;
  category: string;
}) => {
  const [showBar, setShowBar] = useState(false);
  const [suggest, setSuggest] = useState("");
  const { voteData, setVoteData } = Vote();
  const { handleSubmit, control } = useForm<VoteSchemaType>({
    resolver: zodResolver(VoteSchema),
  });
  const { data: session } = useSession();
  const voteNow = trpc.vote.useMutation();
  const suggestion = trpc.suggest.useMutation();
  const checkSuggest = () => {
    if (!suggest) return;
    suggestion.mutate({
      suggestion: suggest,
      subCategory: subCategory.name,
      category,
      usermail: session?.user?.email as string,
    });
  };
  const onSubmit = (data: VoteSchemaType) => {
    let ballot = JSON.parse(data.value);
    ballot.id = parseInt(ballot.id);
    ballot.subCategoryId = parseInt(ballot.subCategoryId);
    console.log(ballot);
    voteNow.mutate({ ...ballot });
    setVoteData({
      ...voteData,
      votedSubCategories: [...voteData.votedSubCategories, subCategory],
    });
  };

  return (
    <Form {...useForm()}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={control}
          name="value"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-lg font-semibold">
                {subCategory.name}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2 w-full"
                >
                  {items &&
                    items.map((item) => (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={item.id}
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={`{"subCategoryId": "${item.subCategoryId}", "id": "${item.id}", "email": "${session?.user?.email}"}`}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant="link"
          className="p-0"
          onClick={() => setShowBar(!showBar)}
        >
          Missing a favourite?
        </Button>
        {showBar && (
          <Input
            onChange={(e) => setSuggest(e.target.value)}
            placeholder="your favourite"
          />
        )}
        <div className="flex flex-col w-1/2">
          <DialogClose asChild>
            <Button type="submit" onClick={() => checkSuggest()}>
              Submit
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};

export default VoteForm;
