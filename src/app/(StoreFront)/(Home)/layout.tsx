import AutoIDGenFooter from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <header>
                {/* Navbar */}
                <Navbar/>
            </header>
            <main className="flex-1 flex items-center justify-center">{children}</main>
                {/* Footer */}
                <AutoIDGenFooter/>
            
        </div>
    );
}