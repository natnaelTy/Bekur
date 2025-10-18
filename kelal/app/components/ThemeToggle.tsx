"use client";

import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { useTheme } from "next-themes";

const Example = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeSwitcher
      onChange={(value) => setTheme(value)}
    />
  );
};

export default Example;
