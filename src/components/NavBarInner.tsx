import Dropdown from "./Dropdown";
import SidePopup from "./SidePopup";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-between py-3 md:px-10 px-2">
      <SidePopup />
      {/* <Button>Dark</Button> */}
      <div className="flex gap-2">
        <Link href="/home">
          <Button variant="outline" className="p-2">
            <Home />
          </Button>
        </Link>
        <Dropdown />
      </div>
    </div>
  );
};

export default NavBar;
