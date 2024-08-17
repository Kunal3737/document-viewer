import { http, HttpResponse } from "msw";
import {
  INITIAL_DATA,
  LOCAL_STORAGE_KEY,
  saveDocumentsToLocalStorage,
} from "../utils";

interface Document {
  type: string;
  title: string;
  position: number;
  thumbnail: string;
}

const getDocumentsFromLocalStorage = (): Document[] => {
  const savedDocuments = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedDocuments && savedDocuments.length > 0
    ? JSON.parse(savedDocuments)
    : INITIAL_DATA;
};

export const handlers = [
  http.get("/api/documents", () => {
    const response = getDocumentsFromLocalStorage();
    return HttpResponse.json(response);
  }),

  http.post("/api/documents", async ({ request }) => {
    // const { documents }: { documents: Document[] } = await request.json();
    const { documents } = (await request.json()) as { documents: Document[] };
    saveDocumentsToLocalStorage(documents);
    return HttpResponse.json({
      message: "Data Changed",
    });
  }),
];
