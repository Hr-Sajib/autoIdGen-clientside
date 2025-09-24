// utils/downloadBulkExport.ts
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { projectApi } from "@/lib/feature/Project/projectApi";
// import StoreProvider from "@/app/StoreProvider";
import { makeStore } from "@/lib/store";

export async function downloadBulkExport(batchId: string) {
  try {
    // Call RTK Query endpoint directly
    const result = await makeStore().dispatch(
      projectApi.endpoints.bulkExport.initiate(batchId)
    );

    const json: any = result.data;

    if (!json?.success || !json?.data) {
      console.error("No data found for bulk export");
      return;
    }

    const zip = new JSZip();

    const fetchPromises = json.data.map(async (item: any) => {
      try {
        const response = await fetch(item.cardImageUrl);
        const blob = await response.blob();
        const fileName = `${item.serialOrRollNumber}-${item.name}.jpg`;
        zip.file(fileName, blob);
      } catch (err) {
        console.error("Error fetching image:", item.cardImageUrl, err);
      }
    });

    await Promise.all(fetchPromises);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `Batch-${batchId}-Cards.zip`);
  } catch (err) {
    console.error("Bulk export download failed:", err);
  }
}
