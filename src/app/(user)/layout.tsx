'use client';

import Container from "@/components/layout/Dashboard/Container";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
       
        <div className="min-h-screen bg-white">
            {/* <Container> */}
                {children}
            {/* </Container> */}
        </div>
       
    );
}