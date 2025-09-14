import AutoIDGenFooter from "@/components/Footer";
import Navbar from "@/components/Navbar";
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