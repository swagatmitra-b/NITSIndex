"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return;
  return (
    <Button
      variant="outline"
      className="p-2"
      onClick={() => (theme == "light" ? setTheme("dark") : setTheme("light"))}
    >
      {theme == "light" ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ThemeButton;
