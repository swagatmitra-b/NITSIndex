import Dropdown from "./Dropdown";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-end py-3 px-10 gap-2">
      <Link href="/home">
        <Button variant="outline" className="p-2">
          <Home />
        </Button>
      </Link>
      <Dropdown />
    </div>
  );
};

export default NavBar;
