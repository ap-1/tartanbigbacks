"use client";
import { Home, Inbox, MoonIcon, SunIcon } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export function AppSidebar() {
    const { theme, setTheme } = useTheme();

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <div className="flex flex-row justify-between">
                        <Link
                            href="/"
                            className="font-black my-auto flex flex-row gap-x-1"
                        >
                            <Image
                                src="/icon.svg"
                                className="my-auto size-16 dark:invert"
                                alt="Andrew Carnegie"
                                width={32}
                                height={32}
                            />
                            <p className="my-auto text-4xl">HIT</p>
                        </Link>

                        <Button
                            className="my-auto"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                        >
                            <SunIcon className="size-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
                            <MoonIcon className="absolute size-5 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />

                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </div>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            Let's go
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
