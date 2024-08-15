export const INITIAL_DATA = Object.freeze([
  {
    type: "bankdraft",
    title: "Bank Draft",
    position: 0,
    thumbnail: "https://openmoji.org/data/color/svg/1F4B3.svg",
  },
  {
    type: "bill-of-lading",
    title: "Bill of Lading",
    position: 1,
    thumbnail: "https://openmoji.org/data/color/svg/1F6A2.svg",
  },
  {
    type: "invoice",
    title: "Invoice",
    position: 2,
    thumbnail: "https://openmoji.org/data/color/svg/1F4C4.svg",
  },
  {
    type: "bank-draft-2",
    title: "Bank Draft 2",
    position: 3,
    thumbnail: "https://openmoji.org/data/color/svg/1F3E6.svg",
  },
  {
    type: "bill-of-lading-2",
    title: "Bill of Lading 2",
    position: 4,
    thumbnail: "https://openmoji.org/data/color/svg/1F69A.svg",
  },
]);

export const LOCAL_STORAGE_KEY = "documents";

export const saveDocumentsToLocalStorage = (documents) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(documents));
  } catch (error) {
    console.error("Failed to save documents to local storage", error);
  }
};
