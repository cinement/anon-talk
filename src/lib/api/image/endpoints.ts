const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/v1/images`;

export const imageEndpoints = {
  uploadImageByAnon: () => `${BASE_URL}/by-anon` as const,
};
