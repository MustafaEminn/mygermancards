import { z } from "zod";
import { ZodLocalStorage } from "zod-localstorage";

import { EStorage } from "../constants/storage";

if (!localStorage.getItem(EStorage.CARD_IDS)) {
  localStorage.setItem(EStorage.CARD_IDS, "[]");
}

if (!localStorage.getItem(EStorage.PACKAGES)) {
  localStorage.setItem(EStorage.PACKAGES, "[]");
}

export const PackagesZod = z.array(
  z.object({
    name: z.string(),
    created_at: z.number(),
    updated_at: z.number(),
    cardsId: z.string(),
  })
);

export const CardIdsZod = z.array(z.string());

export const CardZod = z.array(
  z.object({
    id: z.string(),
    cardsId: z.string(),
    article: z.string(),
    word: z.string(),
    meanOfWord: z.string(),
    doMemorized: z.boolean(),
  })
);

let LocalStorageKeys = {
  [EStorage.CARD_IDS]: CardIdsZod,
  [EStorage.PACKAGES]: PackagesZod,
  [EStorage.CARD]: CardZod,
};

const cardIds = localStorage.getItem(EStorage.CARD_IDS);

if (cardIds) {
  let cardLocalStorageKeys: Record<string, typeof CardZod> = {};
  (JSON.parse(cardIds) as Array<string>).forEach((cardId) => {
    if (!localStorage.getItem(`${EStorage.CARD}${cardId}`)) {
      localStorage.setItem(`${EStorage.CARD}${cardId}`, "[]");
    }
    cardLocalStorageKeys[`${EStorage.CARD}${cardId}`] = CardZod;
  });

  LocalStorageKeys = {
    ...cardLocalStorageKeys,
    ...LocalStorageKeys,
  };
}

export const Storage = new ZodLocalStorage(LocalStorageKeys);

// let todoItems: z.infer<typeof TodoItems> = [];
//
// const result = Storage.getItem("TODO_ITEMS");
//
// if (result.success) todoItems = result.data;
//
// todoItems.push({ name: "Write some code", completed: false });
//
// console.log("setting item in localstorage");
// Storage.setItem("TODO_ITEMS", todoItems);
//
// const newResult = Storage.getItem("TODO_ITEMS");
// if (!newResult.success) process.exit();
//
// console.log(newResult.data);
