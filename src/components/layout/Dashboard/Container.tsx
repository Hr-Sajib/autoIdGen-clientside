import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";

export default function Container({ children }: { children: ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    return (
        <div className="w-full mx-auto px-6">
            <Sidebar onToggle={setIsSidebarCollapsed} />
            <main className={`transition-all duration-200 ${isSidebarCollapsed ? "md:ml-16" : "md:ml-64"}`}>
                {children}
            </main>
        </div>
    );
}