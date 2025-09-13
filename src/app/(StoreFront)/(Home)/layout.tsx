import Navbar from "@/app/components/Navbar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
            <header>
                {/* Navbar */}
                <Navbar/>
            </header>
            <main>{children}</main>
            <footer>
                {/* Footer */}
            </footer>
        </>
    );
}