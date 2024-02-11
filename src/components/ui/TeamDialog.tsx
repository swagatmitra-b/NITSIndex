"use client";

import { trpc } from "@/trpc_client/client";
import {
  Dialog,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const TeamDialog = () => {
  const team = trpc.getTeam.useQuery();
  return (
    <Dialog>
      <DialogTrigger>Team</DialogTrigger>
      <DialogContent className="">
        <ul className="list-disc p-5">
          {team.isSuccess ? (
            team.data.map((member) => (
              <li key={member.id}>
                <a href={member.github} target="_blank" className=" underline">
                  {member.name}
                </a>
              </li>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default TeamDialog;
