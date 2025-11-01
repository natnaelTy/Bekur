"use client";

import React from "react";
import { LaptopMinimalIcon, MoonIcon, SunIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [value, setValue] = useState("system");

  useEffect(() => {
    if (theme === "light" || theme === "dark" || theme === "system") {
      setValue(theme);
    }
  }, [theme]);

  const select = (val: string) => {
    setValue(val);
    setTheme(val);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent dark:bg-transparent rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 text-black dark:text-white">
          {value === "light" ? (
            <SunIcon />
          ) : value === "dark" ? (
            <MoonIcon />
          ) : (
            <LaptopMinimalIcon />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-gray-950">
        <DropdownMenuItem onClick={() => select("light")} className=" hover:dark:bg-gray-900">
          <SunIcon className="mr-2" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => select("system")} className=" hover:dark:bg-gray-900">
          <LaptopMinimalIcon className="mr-2" /> System
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => select("dark")} className=" hover:dark:bg-gray-900">
          <MoonIcon className="mr-2" /> Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
