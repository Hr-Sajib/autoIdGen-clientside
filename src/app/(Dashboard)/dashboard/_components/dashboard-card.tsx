import { Card, CardContent } from "@/components/ui/card"
import { FolderOpen, CreditCard, FileText, Clock } from "lucide-react"

const metrics = [
  {
    title: "Total Project",
    value: "0",
    description: "Active ID card projects",
    icon: FolderOpen,
  },
  {
    title: "ID Card Generated",
    value: "0",
    description: "Total cards across all projects",
    icon: CreditCard,
  },
  {
    title: "Submissions",
    value: "0",
    description: "Information submitted",
    icon: FileText,
  },
  {
    title: "Pending",
    value: "0",
    description: "Awaiting submission",
    icon: Clock,
  },
]

export function MetricsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Card key={index} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
