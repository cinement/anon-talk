export type ImageType = "USER_PROFILE" | "MOVIE_POST" | "MISC" | "ANON";

export interface Image {
  id: number;
  filename: string;
  imageUrl: string;
  type: ImageType;
  createdBy: number;
  createdAt: string;
}

export interface ImageUploadParams {
  file: File;
}

export interface ImageUploadResponse {
  data: Image;
}
