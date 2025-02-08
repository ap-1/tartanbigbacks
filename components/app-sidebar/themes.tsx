"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            className="my-auto"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <SunIcon className="size-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute size-5 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />

            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};
