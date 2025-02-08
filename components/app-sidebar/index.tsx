import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { AppSidebarContent } from "@/components/app-sidebar/content";
import { ThemeSwitcher } from "@/components/app-sidebar/themes";

export const AppSidebar = () => {
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

                        <ThemeSwitcher />
                    </div>

                    <SidebarGroupContent>
                        <SidebarMenu className="pt-6 px-2">
                            <AppSidebarContent />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};
