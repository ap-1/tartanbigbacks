import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

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
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
