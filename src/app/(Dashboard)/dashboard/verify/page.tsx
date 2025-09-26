"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useVerificationStatusMutation } from "@/lib/feature/Card/cardApi";

export default function VerifyPage() {
  const [batchId, setBatchId] = useState("");
  const [payload, setPayload] = useState("");
  const [verifyStatus, setVerifyStatus] = useState<any>(null);

  const [verifyCard, { isLoading }] = useVerificationStatusMutation();

const handleVerify = async () => {
  try {
    const res = await verifyCard({ batchId, payloadString: payload }).unwrap()
    setVerifyStatus(res)
  } catch (err: unknown) {
    const errorMessage =
      (err as { data?: { message?: string } })?.data?.message ||
      "Verification failed"

    setVerifyStatus({ error: errorMessage })
  }
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Verify ID Card
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Batch ID
            </label>
            <Input
              placeholder="Enter Batch ID"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payload String
            </label>
            <Input
              placeholder="Enter Payload String"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />
          </div>

          <Button
            onClick={handleVerify}
            className="w-full"
            disabled={isLoading || !batchId || !payload}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
          </Button>

          {verifyStatus && (
            <div className="mt-4 p-3 rounded-lg border bg-gray-100">
              {verifyStatus.error ? (
                <p className="text-red-600 font-medium">{verifyStatus.error}</p>
              ) : (
                <>
                  <p className="text-green-600 font-medium">✅ Verified</p>
                  <pre className="mt-2 text-sm text-gray-800 whitespace-pre-wrap">
                    {JSON.stringify(verifyStatus, null, 2)}
                  </pre>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
