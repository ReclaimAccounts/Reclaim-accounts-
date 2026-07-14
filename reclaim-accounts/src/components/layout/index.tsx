import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { FloatingSocial } from "@/components/floating-social";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col selection:bg-primary/30">
      <Navbar />
      <main
        style={{ paddingTop: "calc(4rem + var(--banner-height, 0px))" }}
        className="flex-1 flex flex-col relative w-full"
      >
        {children}
      </main>
      <Footer />
      <FloatingSocial />
    </div>
  );
}
