"use client";
import { useState } from "react";
import { createContext, useContext } from "react";
import { ContextType } from "./utils";
import type { CategoryType, subCategoryType } from "./utils";

const votingCtx = createContext<ContextType | null>(null);
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [voteData, setVoteData] = useState<{
    categories: CategoryType[];
    subCategories: subCategoryType[];
    votedSubCategories: subCategoryType[];
  }>({
    categories: [],
    subCategories: [],
    votedSubCategories: [],
  });
  return (
    <votingCtx.Provider value={{ voteData, setVoteData }}>
      {children}
    </votingCtx.Provider>
  );
};

export const Vote = () => useContext(votingCtx) as ContextType;

export default ContextProvider;
