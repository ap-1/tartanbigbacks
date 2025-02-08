import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

export const metadata: Metadata = {
    title: "Project",
    description: "For TartanHacks 2025",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <Navbar />
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
