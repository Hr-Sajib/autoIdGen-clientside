import { MetricsCards } from "./_components/dashboard-card";
import { DashboardHeader } from "./_components/dashboard-header";
import { ProjectOverview } from "./_components/project-overview";


export default function Dashboard() {
    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader />
            <div className="w-full mx-auto px-6 py-8">
                <MetricsCards />
                <ProjectOverview />
            </div>
        </div>
    )
}
