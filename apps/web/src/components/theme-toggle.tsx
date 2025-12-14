"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 避免 hydration 错误：只在客户端挂载后显示主题文本
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      size="icon"
      variant="text"
      className="h-7"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="!size-[1.1rem]" />
      {mounted && (
        <span className="sr-only">{theme === "dark" ? "Light" : "Dark"}</span>
      )}
    </Button>
  );
}
