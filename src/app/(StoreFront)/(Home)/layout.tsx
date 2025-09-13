import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
            <header>
                {/* Navbar */}
            </header>
            <main>{children}</main>
            <footer>
                {/* Footer */}
            </footer>
        </>
    );
}