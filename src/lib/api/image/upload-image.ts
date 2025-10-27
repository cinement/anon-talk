import { imageEndpoints } from "./endpoints";
import type { ImageUploadResponse } from "@/entities/image/model";

interface UploadImageByAnonRequest {
  file: File;
}

export async function uploadImageByAnon(request: UploadImageByAnonRequest): Promise<ImageUploadResponse> {
  const formData = new FormData();

  formData.append("image", request.file);

  const response = await fetch(imageEndpoints.uploadImageByAnon(), {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
