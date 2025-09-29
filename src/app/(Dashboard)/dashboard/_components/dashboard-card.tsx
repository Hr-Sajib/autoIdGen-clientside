"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FolderOpen, CreditCard, FileText, Clock } from "lucide-react"
import {
  useGetProjectsCountQuery,
  useGetGeneratedCardsQuery,
  useGetPendingCardsQuery,
} from "@/lib/feature/Analytics/analyticsApi"
import { Skeleton } from "@/components/ui/skeleton" // ✅ skeleton directly here

export function MetricsCards() {
  // 🔹 Skeleton component inside same file
  const MetricsCardSkeleton = () => (
    <Card className="bg-white border border-gray-200">
      <CardContent className="p-4 space-y-4">
        {/* Icon placeholder */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-10 bg-blue-600/10 rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 bg-blue-600/10 w-24" /> {/* title */}
          <Skeleton className="h-7 bg-blue-600/10 w-20" /> {/* value */}
          <Skeleton className="h-4 bg-blue-600/10 w-32" /> {/* description */}
        </div>
      </CardContent>
    </Card>
  )

  // 🔹 Queries
  const {
    data: projectsCountData,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useGetProjectsCountQuery()

  const {
    data: generatedCardsData,
    isLoading: isGeneratedLoading,
    isError: isGeneratedError,
  } = useGetGeneratedCardsQuery()

  const {
    data: pendingCardsData,
    isLoading: isPendingLoading,
    isError: isPendingError,
  } = useGetPendingCardsQuery()

  // 🔹 Derived state
  const isSubmissionsLoading = isGeneratedLoading || isPendingLoading
  const isSubmissionsError = isGeneratedError || isPendingError
  const submissionsCount =
    (generatedCardsData?.data?.count || 0) +
    (pendingCardsData?.data?.count || 0)

  // 🔹 Metrics config
  const metrics = [
    {
      title: "Total Project",
      value: isProjectsError
        ? "Error"
        : projectsCountData?.data?.count?.toString() || "0",
      description: "Active ID card projects",
      icon: FolderOpen,
      loading: isProjectsLoading,
    },
    {
      title: "ID Card Generated",
      value: isGeneratedError
        ? "Error"
        : generatedCardsData?.data?.count?.toString() || "0",
      description: "Total cards across all projects",
      icon: CreditCard,
      loading: isGeneratedLoading,
    },
    {
      title: "Submissions",
      value: isSubmissionsError ? "Error" : submissionsCount.toString(),
      description: "Information submitted",
      icon: FileText,
      loading: isSubmissionsLoading,
    },
    {
      title: "Pending",
      value: isPendingError
        ? "Error"
        : pendingCardsData?.data?.count?.toString() || "0",
      description: "Awaiting submission",
      icon: Clock,
      loading: isPendingLoading,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric, index) =>
        metric.loading ? (
          <MetricsCardSkeleton key={index} />
        ) : (
          <Card
            key={index}
            className="bg-white border border-gray-200 hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <metric.icon className="h-6 w-6 font-bold text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-md font-medium text-gray-800">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  )
}
