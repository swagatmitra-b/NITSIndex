"use client";
import { GitPullRequestArrow, LogOut, Settings, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from "next-auth/react";
import TeamDialog from "./TeamDialog";

const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-10 h-10 p-1 border-black">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 md:mr-14 mr-2">
          {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Users className="mr-2 h-4 w-4" />
            <TeamDialog />
          </DropdownMenuItem> */}
        <Link href="/home/contribute">
          <DropdownMenuItem>
            <GitPullRequestArrow className="mr-2 h-4 w-4" />
            <span>Contribute</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
