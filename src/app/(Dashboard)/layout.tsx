// 'use client';

// import Container from "@/components/layout/Dashboard/Container";
// import PrivateRoute from "@/lib/providers/PrivateRoute";
// import { ReactNode } from "react";

// export default function Layout({ children }: { children: ReactNode }) {
//     return (
//         <PrivateRoute>

//         <div className="min-h-screen bg-white">
//             <Container>
//                 {children}
//             </Container>
//         </div>
//         </PrivateRoute>
//     );
// }

'use client';

import Container from "@/components/layout/Dashboard/Container";
import PrivateRoute from "@/lib/providers/PrivateRoute";
import { ReactNode, useState, useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // server-rendered HTML এ কিছু দেখাবে না

    return (
        <PrivateRoute>
            <div className="min-h-screen bg-white">
                <Container>
                    {children}
                </Container>
            </div>
        </PrivateRoute>
    );
}
