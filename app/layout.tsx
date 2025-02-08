import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import "./globals.css";
import { Auth } from "@/components/auth";

const satoshi = localFont({
    src: "./fonts/Satoshi-Variable.woff2",
    display: "swap",
});

export const metadata: Metadata = {
    title: "HIT",
    description: "For TartanHacks 2025",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${satoshi.className} antialiased`}
        >
            <body>
                <ThemeProvider attribute="class">
                    <SidebarProvider>
                        <AppSidebar />
                        <main className="w-full">
                            <SidebarTrigger className="scale-[125%] ml-6 mt-[26px]" />
                            <Auth />
                            {children}
                        </main>
                    </SidebarProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
