import AutoIDGenFooter from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
            <header>
                {/* Navbar */}
                <Navbar/>
            </header>
            <main>{children}</main>
                {/* Footer */}
                <AutoIDGenFooter/>
            
        </>
    );
}