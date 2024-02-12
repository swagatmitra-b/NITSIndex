"use client";

import { trpc } from "@/trpc_client/client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

const TeamDialog = () => {
  const team = trpc.getTeam.useQuery();
  return (
    <Dialog>
      <DialogTrigger className="w-full text-left">Team</DialogTrigger>
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
