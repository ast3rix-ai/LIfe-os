"use client";

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { PageTransition } from "@/components/page-transition";
import { AnimatePresence } from "framer-motion";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Sidebar />
      {/* Main content area */}
      <div className="md:ml-[240px]">
        <div className="pt-14 md:pt-0">
          <Header />
          <main className="p-4 md:p-6">
            <AnimatePresence mode="wait">
              <PageTransition>{children}</PageTransition>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
