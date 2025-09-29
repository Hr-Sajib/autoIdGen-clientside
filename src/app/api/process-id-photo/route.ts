import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse multipart/form-data request
    const formData = await req.formData();

    // Forward the formData to the AI server
    const aiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_AI_SERVER_URL}/process-id-photo`,
      {
        method: "POST",
        body: formData,
      }
    );

    // Forward the response back to the client
    const contentType = aiResponse.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const json = await aiResponse.json();
      return NextResponse.json(json, { status: aiResponse.status });
    } else {
      const blob = await aiResponse.blob();
      return new Response(blob, {
        status: aiResponse.status,
        headers: {
          "Content-Type": contentType || "application/octet-stream",
        },
      });
    }
  } catch (error) {
    console.error("❌ API route error:", error);
    return NextResponse.json(
      { error: "Failed to process image", details: (error as Error).message },
      { status: 500 }
    );
  }
}
