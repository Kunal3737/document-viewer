import { http, HttpResponse } from "msw";
import {
  INITIAL_DATA,
  LOCAL_STORAGE_KEY,
  saveDocumentsToLocalStorage,
} from "../utils";

const getDocumentsFromLocalStorage = () => {
  const savedDocuments = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedDocuments || savedDocuments.length > 0
    ? JSON.parse(savedDocuments)
    : INITIAL_DATA;
};

export const handlers = [
  http.get("/api/documents", () => {
    const response = getDocumentsFromLocalStorage();
    return HttpResponse.json(response);
  }),

  http.post("/api/documents", async ({ request }) => {
    const { documents } = await request.json();
    saveDocumentsToLocalStorage(documents);
    return HttpResponse.json({
      message: "Data Changed",
    });
  }),
];
