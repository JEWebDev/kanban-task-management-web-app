"use client";
import ToggleSidebarButton from "@/components/shared/buttons/ToggleSidebarButton";
import "./globals.css";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { useSidebarStore } from "@/stores/sidebar";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarIsOpen = useSidebarStore((state) => state.SidebarIsOpen);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={``}>
        <ThemeProvider attribute={"class"} enableSystem>
          <div
            className={`grid grid-cols-[1fr] grid-rows-[auto_1fr] ${sidebarIsOpen ? "md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]" : "md:grid-cols-[1fr]"} md:grid-rows-[auto_1fr] h-screen`}
          >
            <Header className="col-span-2" />
            <Sidebar />
            <main className="w-full h-full flex gap-6 overflow-x-auto overflow-y-hidden bg-light-grey dark:bg-very-dark-grey p-6">
              <ToggleSidebarButton />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
