"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import LogOutButton from "@/app/(Dashboard)/dashboard/_components/buttons/LogOutButton"

interface SidebarProps {
    onToggle?: (isCollapsed: boolean) => void
}

export function Sidebar({ onToggle }: SidebarProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false)

    const handleDesktopToggle = () => {
        const newCollapsed = !isDesktopCollapsed
        setIsDesktopCollapsed(newCollapsed)
        onToggle?.(newCollapsed)
    }

    return (
        <>
            {/* Mobile menu button */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden fixed top-4 left-4 z-50 hover:bg-blue-600"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="hidden md:block fixed top-4 left-4 z-50 hover:bg-blue-600"
                onClick={handleDesktopToggle}
            >
                <div className="ml-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
            </Button>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-40 h-full bg-white border-r border-gray-200 transform transition-all duration-200 ease-in-out",
                    "md:translate-x-0",
                    isDesktopCollapsed ? "md:w-16" : "md:w-64",
                    isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64",
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 pb-10 border-b border-gray-200">
                        <div className="flex items-center gap-2 ml-12 -mb-12">
                            <div
                                className={cn(
                                    "font-semibold text-gray-900 transition-opacity duration-200",
                                    isDesktopCollapsed ? "md:hidden" : "block",)}
                            >
                                <div className="flex items-center gap-2">
                                    {!isDesktopCollapsed && (
                                        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs font-bold">A</span>
                                        </div>
                                    )}
                                    <span>AutoIDGen</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4">
                        <Button
                            variant="default"
                            className={cn(
                                "w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200",
                                isDesktopCollapsed ? "md:justify-center md:px-2" : "justify-start gap-3",
                            )}
                        >
                            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            <Link href="/dashboard">
                                <span className={cn("transition-opacity duration-200", isDesktopCollapsed ? "md:hidden" : "block")}>
                                    Dashboard
                                </span>
                            </Link>
                        </Button>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200">
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full text-gray-600 hover:text-gray-900 transition-all duration-200",
                                isDesktopCollapsed ? "md:justify-center md:px-2" : "justify-start gap-3",
                            )}
                        >
                            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            <span className={cn("transition-opacity duration-200", isDesktopCollapsed ? "md:hidden" : "block")}>
                                Sign Out
                            </span>
                        </Button>
                        <LogOutButton/>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isMobileOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsMobileOpen(false)} />
            )}
        </>
    )
}
