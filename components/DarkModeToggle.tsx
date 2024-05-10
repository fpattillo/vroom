"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";

export function DarkModeToggle() {
  const { data: session, status } = useSession();
  console.log(session);
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
    // @ts-ignore
    session.user?.theme
  );

  const handleToggle = () => {
    if (currentTheme === "light") {
      setTheme("dark");
      setCurrentTheme("dark");
    } else {
      setTheme("light");
      setCurrentTheme("light");
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={handleToggle}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
