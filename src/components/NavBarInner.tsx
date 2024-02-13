import Dropdown from "./Dropdown";
import SidePopup from "./SidePopup";
import ThemeButton from "./ThemeButton";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-between py-3 md:px-10 px-2">
      <div className="flex gap-2">
        <SidePopup />
        <ThemeButton />
      </div>
      <div className="flex gap-2">
        <h1 className="hidden md:block text-4xl font-semibold mr-2">NITSIndex</h1>
        <Link href="/home">
          <Button variant="outline" className="p-2 dark:bg-slate-950">
            <Home />
          </Button>
        </Link>
        <Dropdown />
      </div>
    </div>
  );
};

export default NavBar;
