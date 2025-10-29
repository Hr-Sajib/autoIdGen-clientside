import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { usePathname } from "next/navigation";

export default function Container({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    console.log(pathname);

    return (
        <div className="w-full mx-auto px-0 md:px-6">
            {pathname.includes("/dashboard") &&
                <Sidebar onToggle={setIsSidebarCollapsed} />}
            <main className={`transition-all duration-200 ${isSidebarCollapsed ? "md:ml-16" : "md:ml-64"}`}>
                {children}
            </main>
        </div>
    );
}