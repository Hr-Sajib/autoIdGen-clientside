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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-00 to-slate-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative flex justify-center items-center min-h-screen">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-purple-500/20 rounded-full">
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white">ID Card Verification</h1>
            <p className="text-slate-400 text-lg">
              Verify the authenticity of your ID cards with our secure verification system
            </p>
          </div>

          {/* Main Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-white text-2xl font-semibold text-center">
                Enter Verification Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Batch ID Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Hash className="h-4 w-4" />
                  Batch ID
                </label>
                <Input
                  placeholder="Enter your batch ID"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 h-12"
                />
              </div>

              {/* Payload Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <FileText className="h-4 w-4" />
                  Payload String
                </label>
                <Input
                  placeholder="Enter your payload string"
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 h-12"
                />
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleVerify}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
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
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-xl font-semibold">Verification Results</CardTitle>
                  {!verifyStatus.error && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(formatJsonResponse(verifyStatus))}
                      className="text-slate-300 hover:text-white hover:bg-white/10"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {verifyStatus.error ? (
                  <div className="flex items-start gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <XCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-red-400 font-semibold mb-1">Verification Failed</h3>
                      <p className="text-red-300">{verifyStatus.error}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-green-400 font-semibold mb-1">Verification Successful</h3>
                        <p className="text-green-300">ID card has been successfully verified</p>
                      </div>
                    </div>

                    {/* Response Data */}
                    {/* <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <h4 className="text-slate-300 font-medium">Response Data:</h4>
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          JSON
                        </Badge>
                      </div>
                      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
                          {formatJsonResponse(verifyStatus)}
                        </pre>
                      </div>
                    </div> */}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
