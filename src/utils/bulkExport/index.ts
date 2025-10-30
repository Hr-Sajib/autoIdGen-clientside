// // utils/downloadBulkExport.ts
// import JSZip from "jszip";
// import { saveAs } from "file-saver";
// import { projectApi } from "@/lib/feature/Project/projectApi";
// // import StoreProvider from "@/app/StoreProvider";
// import { makeStore } from "@/lib/store";

// export async function downloadBulkExport(batchId: string) {
//   try {
//     // Call RTK Query endpoint directly
//     const result = await makeStore().dispatch(
//       projectApi.endpoints.bulkExport.initiate(batchId)
//     );

//     const json: any = result.data;

//     if (!json?.success || !json?.data) {
//       console.error("No data found for bulk export");
//       return;
//     }

//     const zip = new JSZip();

//     const fetchPromises = json.data.map(async (item: any) => {
//       try {
//         const response = await fetch(item.cardImageUrl);
//         const blob = await response.blob();
//         const fileName = `${item.serialOrRollNumber}-${item.name}.jpg`;
//         zip.file(fileName, blob);
//       } catch (err) {
//         console.error("Error fetching image:", item.cardImageUrl, err);
//       }
//     });

//     await Promise.all(fetchPromises);

//     const content = await zip.generateAsync({ type: "blob" });
//     saveAs(content, `Batch-${batchId}-Cards.zip`);
//   } catch (err) {
//     console.error("Bulk export download failed:", err);
//   }
// }




// // utils/bulkExport.ts
// import JSZip from "jszip";
// import { saveAs } from "file-saver";
// import { projectApi } from "@/lib/feature/Project/projectApi";
// import { makeStore } from "@/lib/store";

// export async function downloadBulkExportWithProgress(
//   batchId: string,
//   onProgress: (progress: number) => void
// ) {
//   try {
//     // Initial progress
//     onProgress(5);

//     // Call RTK Query endpoint directly
//     const result = await makeStore().dispatch(
//       projectApi.endpoints.bulkExport.initiate(batchId)
//     );

//     const json: any = result.data;

//     if (!json?.success || !json?.data) {
//       console.error("No data found for bulk export");
//       throw new Error("No data found for bulk export");
//     }

//     // Data fetched successfully
//     onProgress(15);

//     const zip = new JSZip();
//     const totalFiles = json.data.length;
//     let completedFiles = 0;

//     // Create fetch promises with progress tracking
//     const fetchPromises = json.data.map(async (item: any, index: number) => {
//       try {
//         const response = await fetch(item.cardImageUrl);
//         const blob = await response.blob();
//         const fileName = `${item.serialOrRollNumber}-${item.name}.jpg`;
//         zip.file(fileName, blob);

//         // Update progress after each file
//         completedFiles++;
//         const fileProgress = Math.floor((completedFiles / totalFiles) * 70); // 15% to 85%
//         onProgress(15 + fileProgress);
//       } catch (err) {
//         console.error("Error fetching image:", item.cardImageUrl, err);
//       }
//     });

//     // Wait for all files to be fetched
//     await Promise.all(fetchPromises);

//     // Files fetched, now generating ZIP
//     onProgress(90);

//     // Generate ZIP file
//     const content = await zip.generateAsync(
//       { type: "blob" },
//       (metadata) => {
//         // Update progress during ZIP generation
//         const zipProgress = Math.floor(metadata.percent);
//         onProgress(90 + Math.floor(zipProgress / 10)); // 90% to 100%
//       }
//     );

//     // Save the file
//     saveAs(content, `Batch-${batchId}-Cards.zip`);
    
//     // Complete
//     onProgress(100);
//   } catch (err) {
//     console.error("Bulk export download failed:", err);
//     throw err;
//   }
// }

// Original function without progress (keep for backward compatibility)
// export async function downloadBulkExport(batchId: string) {
//   try {
//     const result = await makeStore().dispatch(
//       projectApi.endpoints.bulkExport.initiate(batchId)
//     );

//     const json: any = result.data;

//     if (!json?.success || !json?.data) {
//       console.error("No data found for bulk export");
//       return;
//     }

//     const zip = new JSZip();

//     const fetchPromises = json.data.map(async (item: any) => {
//       try {
//         const response = await fetch(item.cardImageUrl);
//         const blob = await response.blob();
//         const fileName = `${item.serialOrRollNumber}-${item.name}.jpg`;
//         zip.file(fileName, blob);
//       } catch (err) {
//         console.error("Error fetching image:", item.cardImageUrl, err);
//       }
//     });

//     await Promise.all(fetchPromises);

//     const content = await zip.generateAsync({ type: "blob" });
//     saveAs(content, `Batch-${batchId}-Cards.zip`);
//   } catch (err) {
//     console.error("Bulk export download failed:", err);
//   }
// }














// utils/bulkExport.ts
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { projectApi } from "@/lib/feature/Project/projectApi";
import { makeStore } from "@/lib/store";

export async function downloadBulkExportWithProgress(
  batchId: string,
  onProgress: (progress: number) => void
) {
  try {
    onProgress(2); // start

    // --- 1️⃣ Fetch the list of items ---
    const result = await makeStore().dispatch(
      projectApi.endpoints.bulkExport.initiate(batchId)
    );

    const json: any = result.data;
    if (!json?.success || !json?.data) {
      throw new Error("No data found for bulk export");
    }

    onProgress(10);

    const zip = new JSZip();
    const totalFiles = json.data.length;

    let totalBytes = 0;
    const fileSizes: number[] = [];

    // --- 2️⃣ Pre-fetch HEAD requests to estimate sizes (optional but improves accuracy) ---
    const sizePromises = json.data.map(async (item: any) => {
      try {
        const head = await fetch(item.cardImageUrl, { method: "HEAD" });
        const size = parseInt(head.headers.get("Content-Length") || "0");
        fileSizes.push(size);
        totalBytes += size;
      } catch {
        fileSizes.push(0);
      }
    });

    await Promise.all(sizePromises);

    let downloadedBytes = 0;
    onProgress(15);

    // --- 3️⃣ Download images with stream-based progress ---
    for (let i = 0; i < totalFiles; i++) {
      const item = json.data[i];
      try {
        const response = await fetch(item.cardImageUrl);
        const reader = response.body?.getReader();
        const total = fileSizes[i] || parseInt(response.headers.get("Content-Length") || "0") || 0;

        let chunks: Uint8Array[] = [];
        let received = 0;

        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;
          chunks.push(value);
          received += value.length;
          downloadedBytes += value.length;

          // --- Calculate progress accurately (up to 90%) ---
          const downloadProgress = 15 + Math.min((downloadedBytes / totalBytes) * 75, 75);
          onProgress(Math.floor(downloadProgress));
        }

        const blob = new Blob(chunks);
        const fileName = `${item.serialOrRollNumber}-${item.name}.jpg`;
        zip.file(fileName, blob);
      } catch (err) {
        console.error("Error downloading image:", item.cardImageUrl, err);
      }
    }

    // --- 4️⃣ Generate ZIP file (90–100%) ---
    await zip.generateAsync(
      { type: "blob" },
      (metadata) => {
        const zipProgress = Math.floor(metadata.percent / 10); // 0–10 range
        onProgress(90 + zipProgress);
      }
    ).then((content) => {
      saveAs(content, `Batch-${batchId}-Cards.zip`);
      onProgress(100);
    });
  } catch (err) {
    console.error("Bulk export failed:", err);
    throw err;
  }
}
