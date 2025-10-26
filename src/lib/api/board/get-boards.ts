import { boardEndpoints } from "./endpoints";

export interface GetBoardsResponse {
  id: number;
  name: string;
  seq: number;
}

export async function getBoards(): Promise<GetBoardsResponse[]> {
  const response = await fetch(boardEndpoints.getBoards());

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
