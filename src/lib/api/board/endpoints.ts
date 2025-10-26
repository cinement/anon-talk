const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/v1/boards`;

export const boardEndpoints = {
  getBoards: () => `${BASE_URL}` as const,
};
