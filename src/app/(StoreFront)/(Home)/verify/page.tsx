"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Shield, CheckCircle, XCircle, Hash, FileText, Copy, Check } from "lucide-react"
import { useVerificationStatusMutation } from "@/lib/feature/Card/cardApi"

export default function VerifyPage() {
  const [batchId, setBatchId] = useState("")
  const [payload, setPayload] = useState("")
  const [verifyStatus, setVerifyStatus] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const [verifyCard, { isLoading }] = useVerificationStatusMutation()

  const handleVerify = async () => {
    try {
      const res = await verifyCard({ batchId, payloadString: payload }).unwrap()
      setVerifyStatus(res)
    } catch (err: unknown) {
      const errorMessage = (err as { data?: { message?: string } })?.data?.message || "Verification failed"
      setVerifyStatus({ error: errorMessage })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatJsonResponse = (data: any) => {
    return JSON.stringify(data, null, 2)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-[90%] sm:max-w-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">ID Card Verification</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Verify the authenticity of your ID cards with our secure verification system
            </p>
          </div>

          {/* Main Card */}
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900 text-xl sm:text-2xl font-semibold text-center">
                Enter Verification Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Batch ID Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Hash className="h-4 w-4" />
                  Batch ID
                </label>
                <Input
                  placeholder="Enter your batch ID"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className="h-10 sm:h-12 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>

              {/* Payload Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4" />
                  Payload String
                </label>
                <Input
                  placeholder="Enter your payload string"
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  className="h-10 sm:h-12 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleVerify}
                className="w-full h-10 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200"
                disabled={isLoading || !batchId || !payload}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Verify ID Card
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Card */}
          {verifyStatus && (
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900 text-lg sm:text-xl font-semibold">
                    Verification Results
                  </CardTitle>
                  {!verifyStatus.error && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(formatJsonResponse(verifyStatus))}
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {verifyStatus.error ? (
                  <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-red-600 font-semibold text-sm sm:text-base mb-1">
                        Verification Failed
                      </h3>
                      <p className="text-red-500 text-sm">{verifyStatus.error}</p>
                    </div>
                  </div>
                ) : verifyStatus.status === "success" ? (
                  verifyStatus.data ? (
                    // ✅ Verified
                    <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-green-600 font-semibold text-sm sm:text-base mb-1">
                          Verification Successful
                        </h3>
                        <p className="text-green-500 text-sm">{verifyStatus.message}</p>
                      </div>
                    </div>
                  ) : (
                    // ❌ Not Verified
                    <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-red-600 font-semibold text-sm sm:text-base mb-1">
                          Verification Failed
                        </h3>
                        <p className="text-red-500 text-sm">{verifyStatus.message}</p>
                      </div>
                    </div>
                  )
                ) : null}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}