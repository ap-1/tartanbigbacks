import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";

import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const satoshi = localFont({
    src: "./fonts/Satoshi-Variable.woff2",
    display: "swap",
});

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
        <html lang="en" suppressHydrationWarning className={satoshi.className}>
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
