import Link from "next/link";
import { Button } from "./ui/button";
import ThemeButton from "./ThemeButton";

const NavBarOuter = () => {
  return (
    <div className="flex justify-between p-3">
      <ThemeButton />
      <div className="flex gap-3">
        <Link href="/login">
          <Button variant="outline" className="p-2">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline" className="p-2">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavBarOuter;
