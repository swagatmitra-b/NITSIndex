import Link from "next/link";
import { Button } from "./ui/button";

const NavBarOuter = () => {
  return (
    <div className="flex justify-end p-3">
      <div className="flex gap-3">
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default NavBarOuter;
