import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Dispatch, SetStateAction } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CategoryType = {
  id: number;
  name: string;
};
export type subCategoryType = {
  id: number;
  name: string;
  categoryId: number;
};

export type subCategoryCardProps = {
  subCategoryId: number;
  category: string;
  subCategory: string;
  name: string;
  count: number;
  votes: number;
  pic: string | null;
};

export type Item = {
  id: number;
  name: string;
  subCategoryId: number;
  votes: number;
  pic: string | null;
  count: number;
};

export type VoteDataType = {
  categories: CategoryType[];
  subCategories: subCategoryType[];
  votedSubCategories: subCategoryType[];
};

export type ContextType = {
  voteData: VoteDataType;
  setVoteData: Dispatch<SetStateAction<VoteDataType>>;
};
